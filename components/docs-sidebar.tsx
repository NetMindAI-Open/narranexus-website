"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  indent?: boolean;
  children?: NavItem[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const docsNav: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Quick Start", href: "/docs/getting-started/quick-start" },
      { label: "First Agent", href: "/docs/getting-started/first-agent" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { label: "Architecture", href: "/docs/core-concepts/architecture" },
      { label: "Narrative", href: "/docs/core-concepts/narrative" },
      { label: "Modules", href: "/docs/core-concepts/modules" },
      { label: "Context Engineering", href: "/docs/core-concepts/context-engineering" },
      { label: "Agent Communication", href: "/docs/core-concepts/agent-communication" },
    ],
  },
  {
    title: "Modules",
    items: [
      { label: "Awareness", href: "/docs/modules/awareness" },
      { label: "Chat", href: "/docs/modules/chat" },
      { label: "Social Network", href: "/docs/modules/social-network" },
      {
        label: "Memory",
        href: "/docs/modules/memory",
        children: [
          { label: "Builtin Memory", href: "/docs/modules/memory/builtin" },
          { label: "EverMemOS", href: "/docs/modules/memory/evermemos" },
        ],
      },
      { label: "Jobs", href: "/docs/modules/jobs" },
      { label: "Skills", href: "/docs/modules/skills" },
      { label: "Agent Communication", href: "/docs/modules/agent-communication" },
      { label: "Custom Modules", href: "/docs/modules/custom-modules" },
    ],
  },
  {
    title: "Skills & Tools",
    items: [
      { label: "Overview", href: "/docs/tools/overview" },
      { label: "Create a Skill", href: "/docs/tools/create-a-skill" },
      { label: "Learn a Skill", href: "/docs/tools/learn-a-skill" },
      { label: "Built-in Tools Reference", href: "/docs/tools/built-in-tools" },
    ],
  },
  {
    title: "Contributing",
    items: [
      { label: "Development Setup", href: "/docs/contributing/development-setup" },
      { label: "Guidelines", href: "/docs/contributing/guidelines" },
    ],
  },
];

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.href;
  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={`block py-1.5 text-sm font-body transition-colors border-l-2 ${
        item.indent ? "pl-6 pr-3" : "px-3"
      } ${
        isActive
          ? "font-500 text-ink bg-paper-3/50 border-ink"
          : "font-300 text-muted hover:text-ink hover:bg-paper-2/50 border-transparent"
      }`}
    >
      {item.label}
    </Link>
  );
}

function CollapsibleNavItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const isChildActive = item.children?.some((c) => pathname === c.href);
  const isActive = pathname === item.href;
  // null = follow active state, true/false = user override
  const [userOpen, setUserOpen] = useState<boolean | null>(null);
  const open = userOpen ?? (isActive || !!isChildActive);

  return (
    <>
      <li className="flex items-stretch">
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={`flex-1 block py-1.5 text-sm font-body transition-colors px-3 border-l-2 ${
            isActive
              ? "font-500 text-ink bg-paper-3/50 border-ink"
              : "font-300 text-muted hover:text-ink hover:bg-paper-2/50 border-transparent"
          }`}
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setUserOpen(!open)}
          className="px-2 text-muted hover:text-ink transition-colors"
          aria-label={open ? `Collapse ${item.label}` : `Expand ${item.label}`}
          aria-expanded={open}
        >
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M4.5 2.5L8 6L4.5 9.5" />
          </svg>
        </button>
      </li>
      {open &&
        item.children?.map((child) => (
          <li key={child.href}>
            <NavLink item={{ ...child, indent: true }} pathname={pathname} />
          </li>
        ))}
    </>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <nav className="space-y-6" aria-label="Documentation">
      {docsNav.map((section) => (
        <div key={section.title}>
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted mb-2 px-3">
            {section.title}
          </h3>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              if (item.children) {
                return (
                  <CollapsibleNavItem
                    key={item.href}
                    item={item}
                    pathname={pathname}
                  />
                );
              }
              return (
                <li key={item.href}>
                  <NavLink item={item} pathname={pathname} />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock scroll when open
  useEffect(() => {
    if (mobileOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Current page label for the mobile toggle
  const currentLabel =
    docsNav
      .flatMap((s) => s.items)
      .flatMap((i) => (i.children ? [i, ...i.children] : [i]))
      .find((i) => i.href === pathname)?.label ?? "Documentation";

  return (
    <>
      {/* Mobile toggle bar */}
      <div className="lg:hidden sticky top-14 z-30 bg-paper/95 backdrop-blur-sm border-b border-rule">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="w-full flex items-center justify-between px-6 py-3 text-left"
          aria-expanded={mobileOpen}
          aria-controls="docs-mobile-nav"
        >
          <span className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Docs
            </span>
            <span className="font-mono text-xs text-muted">/</span>
            <span className="font-body text-sm font-400 text-ink truncate">
              {currentLabel}
            </span>
          </span>
          <svg
            className="w-4 h-4 text-muted shrink-0"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M3 6h10M3 10h10" strokeLinecap="square" />
          </svg>
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[288px] shrink-0 border-r border-rule overflow-y-auto py-8 pr-6 sticky top-14 max-h-[calc(100vh-3.5rem)]">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        id="docs-mobile-nav"
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-[320px] max-w-[85vw] bg-paper border-r border-rule transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Documentation (mobile)"
        aria-hidden={!mobileOpen}
      >
        <div className="h-14 flex items-center justify-between px-6 border-b border-rule">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Docs
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="-mr-2 p-2 text-ink hover:text-muted transition-colors"
            aria-label="Close navigation"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M5 5L15 15M15 5L5 15" strokeLinecap="square" />
            </svg>
          </button>
        </div>
        <div
          className="py-6 pr-6 overflow-y-auto max-h-[calc(100vh-3.5rem)]"
          onClick={(e) => {
            // Close when a nav link is clicked; ignore the chevron toggle buttons
            const target = e.target as HTMLElement;
            if (target.closest("a")) setMobileOpen(false);
          }}
        >
          <SidebarContent pathname={pathname} />
        </div>
      </aside>
    </>
  );
}
