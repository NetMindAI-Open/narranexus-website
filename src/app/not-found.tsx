import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-[#0f0f23] text-[#e2e8f0]">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-[#818cf8]">404</h1>
          <p className="mb-8 text-lg text-[#94a3b8]">Page not found</p>
          <Link href="/" className="rounded-lg bg-[#818cf8] px-6 py-3 font-semibold text-white">
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
