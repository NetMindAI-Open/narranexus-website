"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { SidebarSection } from "@/lib/docs";

interface SidebarProps {
  sections: SidebarSection[];
  locale: string;
}

export function Sidebar({ sections, locale }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {sections.map((section) => (
        <SidebarGroup
          key={section.slug}
          section={section}
          locale={locale}
          pathname={pathname}
        />
      ))}
    </nav>
  );
}

function SidebarGroup({
  section,
  locale,
  pathname,
}: {
  section: SidebarSection;
  locale: string;
  pathname: string;
}) {
  const isActive = section.items.some((item) => {
    const href =
      locale === "en" ? `/docs/${item.slug}` : `/${locale}/docs/${item.slug}`;
    return pathname === href;
  });

  const [open, setOpen] = useState(isActive);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-1 px-2 py-1.5 text-sm font-semibold text-foreground hover:text-accent transition-colors"
      >
        <ChevronRight
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
        />
        {section.title}
      </button>
      {open && (
        <div className="ml-4 border-l border-border pl-2 space-y-0.5">
          {section.items.map((item) => {
            const href =
              locale === "en"
                ? `/docs/${item.slug}`
                : `/${locale}/docs/${item.slug}`;
            const active = pathname === href;

            return (
              <Link
                key={item.slug}
                href={href}
                className={`block px-2 py-1 text-sm rounded transition-colors ${
                  active
                    ? "text-accent font-medium"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
