"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";

const columns = [
  {
    titleKey: "product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Roadmap", href: "/#roadmap" },
      { label: "Changelog", href: "/blog" },
    ],
  },
  {
    titleKey: "docs",
    links: [
      { label: "Quick Start", href: "/docs/getting-started/quick-start" },
      { label: "Architecture", href: "/docs/core-concepts/architecture" },
      { label: "API Reference", href: "/docs/api-reference/rest-api" },
    ],
  },
  {
    titleKey: "community",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/johnsonice/narranexus-website",
        external: true,
      },
      {
        label: "Discussions",
        href: "https://github.com/johnsonice/narranexus-website/discussions",
        external: true,
      },
      {
        label: "Issues",
        href: "https://github.com/johnsonice/narranexus-website/issues",
        external: true,
      },
    ],
  },
  {
    titleKey: "organization",
    links: [
      {
        label: "Netmind",
        href: "https://www.netmind.ai/",
        external: true,
      },
      {
        label: "NetMind.AI",
        href: "https://netmind.ai",
        external: true,
      },
      {
        label: "Twitter / X",
        href: "https://x.com/NetmindAi",
        external: true,
      },
    ],
  },
] as const;

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {columns.map((col) => (
            <div key={col.titleKey}>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {t(col.titleKey as "product" | "docs" | "community" | "organization")}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
