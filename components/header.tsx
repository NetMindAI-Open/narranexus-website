"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Features", href: "/#features" },
  { label: "Docs", href: "/docs/getting-started/quick-start" },
  { label: "Blog", href: "/blog" },
  { label: "Roadmap", href: "/#roadmap" },
  {
    label: "GitHub",
    href: "https://github.com/NetMindAI-Open/NarraNexus",
    external: true,
  },
];

export function Header() {
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/docs");

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-rule">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.svg"
            alt="NarraNexus"
            width={36}
            height={24}
            className="block"
          />
          <span className="font-heading font-700 text-sm tracking-[0.15em] text-ink uppercase">
            NarraNexus
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={`font-body text-sm font-400 transition-colors ${
                isDocs && item.href.startsWith("/docs")
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="/docs/getting-started/quick-start"
            className="hidden sm:block px-4 py-1.5 border border-ink text-ink text-sm font-body font-400 hover:bg-ink hover:text-paper transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
