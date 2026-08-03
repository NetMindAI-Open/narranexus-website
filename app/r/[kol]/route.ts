import { NextRequest, NextResponse } from "next/server";

const ATTRIBUTION_WINDOW_SECONDS = 60 * 60 * 24 * 30;
const KOL_CODE_PATTERN = /^[a-z0-9_-]{2,64}$/;

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ kol: string }> },
) {
  const { kol } = await params;
  const kolCode = kol.trim().toLowerCase();

  if (!KOL_CODE_PATTERN.test(kolCode)) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  const response = NextResponse.redirect(new URL("/", request.url), 302);
  const hostname = request.nextUrl.hostname;
  const isNarraDomain =
    hostname === "narra.nexus" || hostname.endsWith(".narra.nexus");

  const cookieOptions = {
    maxAge: ATTRIBUTION_WINDOW_SECONDS,
    path: "/",
    secure: request.nextUrl.protocol === "https:",
    httpOnly: true,
    sameSite: "lax" as const,
    ...(isNarraDomain ? { domain: ".narra.nexus" } : {}),
  };

  response.cookies.set("narra_ref", kolCode, cookieOptions);
  response.cookies.set("narra_ref_click", crypto.randomUUID(), cookieOptions);
  response.headers.set("Cache-Control", "no-store");

  return response;
}
