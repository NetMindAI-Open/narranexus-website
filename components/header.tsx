"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics/track";
import type { CtaLocation, CtaName, Destination } from "@/lib/analytics/types";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  track?: { cta_name: CtaName; cta_location: CtaLocation; destination?: Destination };
}

const navItems: NavItem[] = [
  { label: "Features", href: "/#features" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs/getting-started/quick-start" },
  { label: "Blog", href: "/blog" },
  { label: "Roadmap", href: "/#roadmap" },
  {
    label: "Request Access",
    href: "/invite",
    track: { cta_name: "get_invite_code", cta_location: "navbar", destination: "invite_page" },
  },
  {
    label: "GitHub",
    href: "https://github.com/NetMindAI-Open/NarraNexus",
    external: true,
  },
];

export function Header() {
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/docs");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileOpen]);

  const isNavActive = (href: string) => {
    if (href.startsWith("/docs") && isDocs) return true;
    if (href === "/blog" && pathname.startsWith("/blog")) return true;
    if (href === "/templates" && pathname.startsWith("/templates")) return true;
    if (href === "/invite" && pathname.startsWith("/invite")) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-rule">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center -ml-1" aria-label="NarraNexus home">
          <Image
            src="/images/logo-light-mode.png"
            alt=""
            width={1360}
            height={840}
            className="block h-8 w-auto mr-0.5"
            priority
          />
          <span
            className="font-sans text-[16px] leading-none text-ink"
            style={{
              fontWeight: 520,
              letterSpacing: "-0.01em",
            }}
          >
            NarraNexus
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={
                item.track
                  ? () => track({ event: "cta_click", ...item.track! })
                  : undefined
              }
              className={`font-body text-sm font-400 transition-colors ${
                isNavActive(item.href)
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href="/docs/getting-started/quick-start"
            onClick={() =>
              track({
                event: "cta_click",
                cta_name: "get_started",
                cta_location: "navbar",
                destination: "docs_get_started",
              })
            }
            className="hidden sm:inline-block px-4 py-1.5 border border-ink text-ink text-sm font-body font-400 hover:bg-ink hover:text-paper transition-colors"
          >
            Get Started
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden -mr-2 p-2 text-ink hover:text-muted transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path d="M5 5L15 15M15 5L5 15" strokeLinecap="square" />
              ) : (
                <>
                  <path d="M3 6H17" strokeLinecap="square" />
                  <path d="M3 10H17" strokeLinecap="square" />
                  <path d="M3 14H17" strokeLinecap="square" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden border-t border-rule bg-paper transition-[max-height] duration-300 ease-out ${
          mobileOpen ? "max-h-96" : "max-h-0"
        }`}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("a")) setMobileOpen(false);
        }}
      >
        <nav className="px-6 py-4 flex flex-col" aria-label="Mobile">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={
                item.track
                  ? () => track({ event: "cta_click", ...item.track! })
                  : undefined
              }
              className={`py-3 font-body text-base font-400 border-b border-rule last:border-b-0 transition-colors ${
                isNavActive(item.href) ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/docs/getting-started/quick-start"
            onClick={() =>
              track({
                event: "cta_click",
                cta_name: "get_started",
                cta_location: "navbar",
                destination: "docs_get_started",
              })
            }
            className="mt-4 sm:hidden inline-flex items-center justify-center px-4 py-2.5 bg-ink text-paper text-sm font-body font-400 hover:bg-muted transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
