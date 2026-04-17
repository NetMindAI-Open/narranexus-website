"use client";

import { useState } from "react";
import { Menu, X, ExternalLink, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { key: "features", href: "/#features" },
  { key: "docs", href: "/docs/getting-started/quick-start" },
  { key: "blog", href: "/blog" },
  { key: "roadmap", href: "/#roadmap" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="h-9 w-9 flex items-center justify-center rounded-lg border border-border hover:bg-card"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed inset-0 top-16 bg-background z-40 flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg py-3 border-b border-border/30 font-mono tracking-wide text-muted hover:text-glow-cyan hover:text-accent transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}

          <a
            href="https://github.com/NetMindAI-Open/NarraNexus"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="text-lg py-3 border-b border-border/30 font-mono tracking-wide text-muted hover:text-glow-cyan hover:text-accent transition-colors flex items-center gap-2"
          >
            {t("github")}
            <ExternalLink className="h-4 w-4" />
          </a>

          <div className="flex items-center gap-3 mt-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <Link
            href="/docs/getting-started/quick-start"
            onClick={() => setOpen(false)}
            className="mt-4 group font-mono flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-5 py-3 text-white transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-glow-cyan"
          >
            {t("getStarted")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-accent" />
          </Link>
        </div>
      )}
    </div>
  );
}
