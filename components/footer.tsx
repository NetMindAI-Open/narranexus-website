import Link from "next/link";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Roadmap", href: "/#roadmap" },
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
      { label: "GitHub", href: "https://github.com/NetMindAI-Open/NarraNexus" },
      { label: "Discussions", href: "https://github.com/NetMindAI-Open/NarraNexus/discussions" },
      { label: "Issues", href: "https://github.com/NetMindAI-Open/NarraNexus/issues" },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "NetMind", href: "https://netmind.ai" },
      { label: "NetMind.AI", href: "https://netmind.ai" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
        <div className="mt-12 pt-6 border-t border-rule">
          <p className="font-mono text-xs text-muted">
            &copy; 2026 NetMind. All rights reserved. &middot; CC BY-NC 4.0
          </p>
          <p className="font-mono text-xs text-muted mt-1">
            An open-source project by NetMind and the NetMindAI community.
          </p>
        </div>
      </div>
    </footer>
  );
}
