/**
 * POST /api/invite — public invite-code request endpoint.
 *
 * Flow (post 2026-05-15 architecture pivot):
 *   1. Validate email + apply per-IP rate limit
 *   2. Call NarraNexus's server-to-server endpoint
 *        POST {NARRANEXUS_API_URL}/api/invite/internal/issue
 *      with X-Internal-Secret = INTERNAL_INVITE_SECRET
 *   3. NarraNexus returns {status, code} (code only when status==='issued')
 *   4. If issued, send the email from this server via SMTP (lib/mailer.ts)
 *   5. Return {status, message} to the browser — NEVER the code
 *
 * The code transit:   browser ←  no code  ─ this route ←  code  ─ NarraNexus
 * The code is only ever in transit between two trusted servers.
 */

import { sendEmail } from "@/lib/mailer";

const BACKEND_URL =
  process.env.NARRANEXUS_API_URL ?? "https://agent.narra.nexus";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// ─── Process-local rate limiter ──────────────────────────────────────────────
// Single Next.js process per region; abuse beyond this is the job of a real
// edge layer (Cloudflare Turnstile). Keep it simple: per-IP, sliding window.

interface Bucket {
  hits: number[];
}
const ipBuckets = new Map<string, Bucket>();
const IP_LIMIT = 5;
const IP_WINDOW_MS = 10 * 60 * 1000; // 10 min

function rateLimitOk(ip: string): boolean {
  const now = Date.now();
  const bucket = ipBuckets.get(ip) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < IP_WINDOW_MS);
  if (bucket.hits.length >= IP_LIMIT) {
    ipBuckets.set(ip, bucket);
    return false;
  }
  bucket.hits.push(now);
  ipBuckets.set(ip, bucket);
  return true;
}

function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

// ─── Email body composition (scenario-specific, lives next to the route) ────

function inviteEmailBody(code: string): { text: string; html: string } {
  const text =
    `Welcome to NarraNexus!\n\n` +
    `Your invite code is: ${code}\n\n` +
    `Create your account at https://agent.narra.nexus and enter this ` +
    `code when prompted.\n\n` +
    `This code can be used once. If you didn't request it, you can ` +
    `safely ignore this email.\n`;
  const html =
    `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;` +
    `font-size:15px;line-height:1.6;color:#1a1a1a">` +
    `<p>Welcome to <strong>NarraNexus</strong>!</p>` +
    `<p>Your invite code is:</p>` +
    `<p style="font-size:22px;font-weight:700;letter-spacing:2px;` +
    `font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${code}</p>` +
    `<p>Create your account at ` +
    `<a href="https://agent.narra.nexus">agent.narra.nexus</a> and ` +
    `enter this code when prompted.</p>` +
    `<p style="color:#666;font-size:13px">This code can be used once. ` +
    `If you didn't request it, you can safely ignore this email.</p>` +
    `</div>`;
  return { text, html };
}

// ─── Route handler ───────────────────────────────────────────────────────────

interface UpstreamIssueResponse {
  success: boolean;
  status?: "issued" | "waitlisted" | "already_registered";
  code?: string | null;
  error?: string;
}

export async function POST(request: Request) {
  // 1. Parse + validate email
  let email = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // 2. Rate limit
  if (!rateLimitOk(clientIp(request))) {
    return Response.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  // 3. Internal call to NarraNexus
  const secret = process.env.INTERNAL_INVITE_SECRET;
  if (!secret) {
    console.error("[invite] INTERNAL_INVITE_SECRET not configured");
    return Response.json(
      {
        success: false,
        error: "Invite issuance is not configured on this deployment.",
      },
      { status: 503 },
    );
  }

  let upstream: UpstreamIssueResponse;
  try {
    const r = await fetch(`${BACKEND_URL}/api/invite/internal/issue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Secret": secret,
      },
      body: JSON.stringify({ email }),
    });
    if (!r.ok) {
      console.error(
        `[invite] upstream returned ${r.status}: ${await r.text().catch(() => "(no body)")}`,
      );
      return Response.json(
        { success: false, error: "Could not issue invite code. Please try again later." },
        { status: 502 },
      );
    }
    upstream = (await r.json()) as UpstreamIssueResponse;
  } catch (err) {
    console.error("[invite] upstream fetch failed:", err);
    return Response.json(
      { success: false, error: "Could not reach the server. Please try again later." },
      { status: 502 },
    );
  }

  if (!upstream.success) {
    return Response.json(
      { success: false, error: upstream.error || "Invite issuance failed." },
      { status: 400 },
    );
  }

  // 4. Send email when there is a fresh / re-issued live code
  if (upstream.status === "issued" && upstream.code) {
    const { text, html } = inviteEmailBody(upstream.code);
    await sendEmail({
      to: email,
      subject: "Your NarraNexus invite code",
      text,
      html,
    });
    // Even if SMTP fails the code is persisted upstream; we deliberately
    // do NOT surface the SMTP failure to the visitor (an operator can
    // retrieve the code from /api/admin/invite and resend out of band).
    return Response.json({
      success: true,
      status: "issued",
      message:
        "Invite code sent — check your email, including the spam folder.",
    });
  }

  if (upstream.status === "waitlisted") {
    return Response.json({
      success: true,
      status: "waitlisted",
      message:
        "We've reached capacity for now — you're on the waitlist and we'll email you when a spot opens up.",
    });
  }

  if (upstream.status === "already_registered") {
    return Response.json({
      success: true,
      status: "already_registered",
      message:
        "This email has already been used to register. Please sign in instead.",
    });
  }

  // Unknown status — pass through defensively.
  return Response.json({
    success: true,
    status: upstream.status ?? null,
    message: "",
  });
}
