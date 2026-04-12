import Link from "next/link";
import "@/styles/globals.css";

export default function NotFound() {
  return (
    <html className="dark">
      <body className="flex min-h-screen items-center justify-center bg-background text-foreground font-sans antialiased">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-accent">404</h1>
          <p className="mb-8 text-lg text-muted">Page not found</p>
          <Link
            href="/"
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
