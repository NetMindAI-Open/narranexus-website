/**
 * Transactional SMTP mailer for invite-code delivery.
 *
 * Generic on purpose — knows how to send an email, not what to say. The
 * invite-code email body is composed by the caller. Reads SMTP_* from the
 * Next server environment; when SMTP_HOST is unset, send() is a logged
 * no-op that returns false (so callers can persist the code regardless of
 * whether delivery actually went through).
 *
 * Configuration (env, set on the website deployment — Vercel / etc.):
 *   SMTP_HOST       enables the mailer; unset → no-op
 *   SMTP_PORT       default 587
 *   SMTP_USER       login user (optional, omitted for unauthenticated relays)
 *   SMTP_PASSWORD   login password / Gmail App Password
 *   SMTP_FROM       From: header; defaults to SMTP_USER
 *   SMTP_USE_TLS    "true" (default) → STARTTLS on port 587; "false" → plaintext
 */

import nodemailer, { type Transporter } from "nodemailer";

let _transporter: Transporter | null = null;

function smtpHost(): string | null {
  return process.env.SMTP_HOST?.trim() || null;
}

export function isConfigured(): boolean {
  return smtpHost() !== null;
}

function getTransporter(): Transporter {
  if (_transporter) return _transporter;
  const host = smtpHost();
  if (!host) {
    throw new Error("mailer: SMTP_HOST not configured");
  }
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER || undefined;
  const pass = process.env.SMTP_PASSWORD || undefined;
  const useTls = (process.env.SMTP_USE_TLS ?? "true").toLowerCase() !== "false";

  _transporter = nodemailer.createTransport({
    host,
    port,
    // For 587 we want STARTTLS, so secure=false + requireTLS=true.
    // For 465 (implicit TLS) you'd set secure=true; we don't do that here.
    secure: false,
    requireTLS: useTls,
    auth: user && pass ? { user, pass } : undefined,
  });
  return _transporter;
}

export interface SendArgs {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Send one email. Never throws — a delivery failure must not abort the
 * caller's flow (the invite code is already persisted; the operator can
 * resend later). Returns true on success, false on any failure.
 */
export async function sendEmail({
  to,
  subject,
  text,
  html,
}: SendArgs): Promise<boolean> {
  if (!isConfigured()) {
    console.warn(`[mailer] SMTP_HOST not set — skipping email to ${to}`);
    return false;
  }
  try {
    const from =
      process.env.SMTP_FROM ||
      process.env.SMTP_USER ||
      "no-reply@narra.nexus";
    await getTransporter().sendMail({ from, to, subject, text, html });
    console.log(`[mailer] sent email to ${to} (subject=${subject})`);
    return true;
  } catch (err) {
    console.error(`[mailer] failed to send to ${to}:`, err);
    return false;
  }
}
