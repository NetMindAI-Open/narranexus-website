"use client";

import { useState } from "react";
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
      className={`block py-1.5 text-sm font-body transition-colors ${
        item.indent ? "pl-6 pr-3" : "px-3"
      } ${
        isActive
          ? "font-500 text-ink bg-paper-3/50 border-l-2 border-ink"
          : "font-300 text-muted hover:text-ink hover:bg-paper-2/50"
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
  const [open, setOpen] = useState(isActive || !!isChildActive);

  return (
    <>
      <li className="flex items-center">
        <Link
          href={item.href}
          className={`flex-1 block py-1.5 text-sm font-body transition-colors px-3 ${
            isActive
              ? "font-500 text-ink bg-paper-3/50 border-l-2 border-ink"
              : "font-300 text-muted hover:text-ink hover:bg-paper-2/50"
          }`}
        >
          {item.label}
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="px-2 py-1.5 text-muted hover:text-ink transition-colors"
          aria-label={open ? "Collapse" : "Expand"}
        >
          <svg
            className={`w-3 h-3 transition-transform ${open ? "rotate-90" : ""}`}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
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

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[288px] shrink-0 border-r border-rule overflow-y-auto py-8 pr-6">
      <nav className="space-y-6">
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
    </aside>
  );
}
