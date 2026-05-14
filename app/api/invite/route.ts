/**
 * POST /api/invite — server-side proxy to the NarraNexus backend's
 * public invite-code endpoint.
 *
 * Why a proxy instead of calling the backend directly from the browser:
 *  - no CORS dance (the browser only ever talks to this same origin)
 *  - the backend origin stays out of the client bundle
 *  - this edge is the natural place to add a Cloudflare Turnstile / honeypot
 *    check before spending a backend round-trip (not wired yet — TODO)
 *
 * The backend endpoint never returns the invite code in its body — it is
 * delivered only by email — so this proxy has nothing sensitive to strip.
 */

const BACKEND_URL =
  process.env.NARRANEXUS_API_URL ?? "https://agent.narra.nexus";

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!email) {
    return Response.json(
      { success: false, error: "Please enter your email address." },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${BACKEND_URL}/api/invite/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await upstream
      .json()
      .catch(() => ({ success: false, error: "Upstream returned no body." }));
    return Response.json(data, {
      status: upstream.ok ? 200 : upstream.status,
    });
  } catch {
    return Response.json(
      {
        success: false,
        error: "Could not reach the server. Please try again later.",
      },
      { status: 502 },
    );
  }
}
