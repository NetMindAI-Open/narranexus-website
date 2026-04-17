"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink, ArrowRight } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  { key: "features", href: "/#features" },
  { key: "docs", href: "/docs/getting-started/quick-start" },
  { key: "blog", href: "/blog" },
  { key: "roadmap", href: "/#roadmap" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "backdrop-blur-md bg-background/80 border-b border-border"
        : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.svg"
            alt="NarraNexus"
            className="h-10 w-auto rounded"
          />
          <span className="text-xl font-bold tracking-tight">NarraNexus</span>
        </Link>

        {/* Center: Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="text-sm font-mono tracking-wide text-muted hover:text-glow-cyan hover:text-accent transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
          <a
            href="https://github.com/NetMindAI-Open/NarraNexus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono tracking-wide text-muted hover:text-glow-cyan hover:text-accent transition-colors flex items-center gap-1"
          >
            {t("github")}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Right: Actions (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href="/docs/getting-started/quick-start"
            className="group font-mono flex items-center gap-1.5 rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm text-white transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-glow-cyan"
          >
            {t("getStarted")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-accent" />
          </Link>
        </div>

        {/* Mobile nav */}
        <MobileNav />
      </nav>
    </header>
  );
}
