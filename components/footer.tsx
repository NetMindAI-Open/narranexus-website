"use client";

import Link from "next/link";
import { track } from "@/lib/analytics/track";
import type { CtaLocation, CtaName } from "@/lib/analytics/types";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  track?: { cta_name: CtaName; cta_location: CtaLocation };
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Roadmap", href: "/#roadmap" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Quick Start", href: "/docs/getting-started/quick-start" },
      { label: "Architecture", href: "/docs/core-concepts/architecture" },
      { label: "Modules", href: "/docs/core-concepts/modules" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/NetMindAI-Open/NarraNexus", external: true },
      { label: "Discussions", href: "https://github.com/NetMindAI-Open/NarraNexus/discussions", external: true },
      { label: "Issues", href: "https://github.com/NetMindAI-Open/NarraNexus/issues", external: true },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "NetMind.AI", href: "https://netmind.ai", external: true },
      {
        label: "Try Online",
        href: "https://agent.narra.nexus",
        external: true,
        track: { cta_name: "try_online", cta_location: "footer" },
      },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-mono text-xs font-400 uppercase tracking-widest text-muted mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={
                        link.track
                          ? () => track({ event: "cta_click", ...link.track! })
                          : undefined
                      }
                      className="text-sm font-body font-300 text-muted hover:text-ink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-rule flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-mono text-xs text-muted">
            &copy; {year} NetMind &middot; CC BY-NC 4.0
          </p>
          <p className="font-mono text-xs text-muted">
            An open-source project by NetMind and the NarraNexus community.
          </p>
        </div>
      </div>
    </footer>
  );
}
