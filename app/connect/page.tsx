import type { Metadata } from "next";

const eyebrow = "font-mono text-[11px] uppercase tracking-widest text-muted";

export const metadata: Metadata = {
  title: "Find Us",
  description:
    "Find NarraNexus everywhere: GitHub, Discord, LinkedIn, X, and our WeChat group.",
};

interface ConnectLink {
  label: string;
  desc: string;
  href: string;
  icon: keyof typeof ICONS;
}

const links: ConnectLink[] = [
  {
    label: "GitHub",
    desc: "Source code, issues & releases",
    href: "https://github.com/NetMindAI-Open/NarraNexus",
    icon: "github",
  },
  {
    label: "Discord",
    desc: "Join the community server",
    href: "https://discord.gg/qjDCTu6zuR",
    icon: "discord",
  },
  {
    label: "LinkedIn",
    desc: "NetMind.AI on LinkedIn",
    href: "https://www.linkedin.com/company/netmind-ai",
    icon: "linkedin",
  },
  {
    label: "X",
    desc: "@NetMindAI",
    href: "https://x.com/NetMindAI",
    icon: "x",
  },
  {
    label: "WeChat Group",
    desc: "Scan the QR code to join",
    href: "https://connect.narranexus.workers.dev/",
    icon: "wechat",
  },
];

const ICONS = {
  github: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  discord: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M20.32 4.37a19.79 19.79 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.37-.44.87-.61 1.25a18.27 18.27 0 0 0-5.48 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.04c-1.7.29-3.33.8-4.89 1.52a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06c2.05 1.5 4.04 2.42 5.99 3.03a.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.23-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1-.01-.13c.13-.1.25-.2.37-.3a.07.07 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08.01c.12.1.25.2.37.29a.08.08 0 0 1-.01.13c-.6.35-1.22.64-1.87.89a.08.08 0 0 0-.04.11c.36.69.77 1.36 1.22 1.99a.08.08 0 0 0 .09.03c1.96-.61 3.95-1.52 6-3.03a.08.08 0 0 0 .03-.06c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.62l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.79l4.72 6.23 5.48-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  ),
  wechat: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M8.69 2.19C3.89 2.19 0 5.48 0 9.53c0 2.32 1.28 4.39 3.28 5.75a.6.6 0 0 1 .24.65l-.42 1.58c-.13.47.32.87.75.65l1.83-1.07a.9.9 0 0 1 .72-.08c.75.2 1.55.31 2.38.31.2 0 .4 0 .59-.02a5.87 5.87 0 0 1-.15-1.3c0-3.5 3.13-6.33 7-6.33.24 0 .48.01.71.03C16.4 5.4 12.98 2.19 8.69 2.19Zm-2.6 3.9a1.09 1.09 0 1 1 0 2.18 1.09 1.09 0 0 1 0-2.18Zm5.21 0a1.09 1.09 0 1 1 0 2.18 1.09 1.09 0 0 1 0-2.18ZM17.5 9.9c-3.42 0-6.19 2.42-6.19 5.4 0 2.99 2.77 5.4 6.19 5.4.65 0 1.28-.09 1.87-.25a.72.72 0 0 1 .57.07l1.5.87c.35.2.77-.13.65-.52l-.34-1.24a.48.48 0 0 1 .19-.53c1.6-1.09 2.62-2.77 2.62-4.8 0-2.98-2.77-5.4-6.19-5.4Zm-2.19 3.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Zm4.38 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" />
    </svg>
  ),
};

export default function ConnectPage() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 pt-20 md:pt-24 pb-20 md:pb-28">
      <div className="max-w-xl">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
          <span className={eyebrow}>Find Us</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-700 leading-[1.08] tracking-tight mb-5">
          Find us everywhere
        </h1>

        <p className="font-body font-300 text-base md:text-lg text-muted leading-relaxed mb-10">
          Follow along, ask questions, or say hello. Here&rsquo;s every place
          NarraNexus shows up.
        </p>

        <ul className="border-t border-rule">
          {links.map((link) => (
            <li key={link.label} className="border-b border-rule">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-5 hover:bg-paper-2/40 transition-colors -mx-2 px-2"
              >
                <span className="flex-none w-9 h-9 flex items-center justify-center border border-rule text-ink group-hover:border-ink transition-colors">
                  {ICONS[link.icon]}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-body text-base font-500 text-ink">
                    {link.label}
                  </span>
                  <span className="block font-body text-sm text-muted mt-0.5">
                    {link.desc}
                  </span>
                </span>
                <span
                  className="flex-none font-mono text-muted group-hover:text-ink transition-colors"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
