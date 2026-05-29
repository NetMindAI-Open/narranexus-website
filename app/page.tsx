import Link from "next/link";
import { HomeBriefingMockup } from "@/components/home-briefing-mockup";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const setupSteps = [
  {
    icon: "spark",
    title: "Set it up",
    desc: "Open the cloud app, install the macOS build, or run it locally from source. Pick the surface that fits. Your team is ready in minutes.",
    tag: "WEB · DESKTOP · LOCAL",
  },
  {
    icon: "stack",
    title: "Browse a template",
    desc: "Pick a ready-made agent team: a research desk, a content studio, a briefing bot. Or start blank and shape your own.",
    tag: "TEMPLATES",
  },
  {
    icon: "chat",
    title: "Import & start talking",
    desc: "One click to import. Your agents are online, share memory, and use tools out of the box. No wiring, no glue code.",
    tag: "ZERO CONFIG",
  },
];

const scenarios = [
  {
    icon: "chart",
    title: "Your AI research team",
    desc: "Daily morning briefings, market scans, deep dives. Agents that hold context across weeks of research instead of starting from scratch.",
  },
  {
    icon: "film",
    title: "Your content studio",
    desc: "From idea to script to draft. Writers, editors, and producers that hand off cleanly. They remember what shipped last week.",
  },
  {
    icon: "heart",
    title: "A warm friend",
    desc: "Someone who remembers what you told them last Tuesday. A companion that picks up where you left off, in your tone of voice.",
  },
];

const coreFeatures = [
  {
    icon: "book",
    title: "Remembers the whole story, not just the last chapter",
    subtitle: "Narrative Memory",
    desc: "Topics become persistent storylines that carry their own history and active modules. New messages route to the right thread automatically. New subjects open a fresh one.",
    link: "/docs/core-concepts/narrative",
  },
  {
    icon: "people",
    title: "Brings its own team to the job",
    subtitle: "Team Collaboration",
    desc: "Spin up a research desk, a content team, or an on-call rotation. Agents coordinate over a shared message bus: DM, group chat, hand-offs, and shared context across the whole team.",
    link: "/docs/modules/agent-comms",
  },
  {
    icon: "clock",
    title: "Works while you sleep",
    subtitle: "Jobs & Long Tasks",
    desc: "Schedule one-offs, cron jobs, or always-on daemons. Agents work in the background and report back through chat when the results are ready.",
    link: "/docs/modules/jobs",
  },
  {
    icon: "network",
    title: "Builds its own circle of contacts and fans",
    subtitle: "Social Network",
    desc: "Every person, team, and agent it meets joins a graph your agent maintains: roles, expertise, communication style, history. It adapts who it talks to and how, based on who's asking.",
    link: "/docs/modules/social-network",
  },
];

const faqs = [
  {
    q: "Is there a free tier?",
    a: "Yes. New cloud accounts get a system-provided token quota covering Agent inference, embeddings, and helper calls. Enough to try the product end-to-end before you bring your own keys.",
  },
  {
    q: "Can I bring my own model or API key?",
    a: "Yes. NarraNexus runs on a three-slot architecture: Agent, Embedding, and Helper. You can plug in NetMind.AI Power (covers all three), OpenRouter, Yunwu, or any custom Anthropic / OpenAI-compatible endpoint.",
  },
  {
    q: "Do my chats stay private?",
    a: "Yes. Every agent is private by default: only you see its conversations. You can flip an agent public so others can discover and talk to it, but their chats stay isolated from yours.",
  },
  {
    q: "Will my agent remember things between sessions?",
    a: "Short-term memory in the active conversation is handled by the Chat module. Cross-session long-term memory lives in Narrative. Your agent picks up the right thread even weeks later, organized by topic rather than timestamp.",
  },
  {
    q: "Can I run it fully locally?",
    a: "Yes. The macOS desktop app ships with a bundled runtime and runs entirely on your machine: no account, no network round-trip. From source, one bash run.sh starts the full stack.",
  },
  {
    q: "Multi-device login?",
    a: "Supported. JWT tokens are per-device, so you can stay signed in on laptop, desktop, and phone in parallel. Agent narratives live server-side and stay in sync across them.",
  },
];

const roadmap = [
  {
    version: "v1.0",
    date: "2026-03",
    title: "Foundation",
    done: true,
    items: [
      "Core agent runtime with 7-step pipeline",
      "Narrative memory engine",
      "Module system with hot-pluggable capabilities",
      "Built-in MCP tools",
      "Multi-LLM provider support",
    ],
  },
  {
    version: "v1.0.5",
    date: "2026-03",
    title: "Desktop & Cloud",
    done: true,
    items: [
      "macOS desktop app with bundled runtime",
      "Cloud deployment with multi-tenant auth",
      "Agent-to-agent communication (DM & group chat)",
      "Skill system & ClawHub marketplace integration",
      "Dashboard v2 with job tracking & cost monitoring",
    ],
  },
  {
    version: "v2.0",
    date: "2026 Q2",
    title: "Scale & Integrate",
    done: false,
    items: [
      "Docker Compose one-command deployment",
      "IM platform integrations (Telegram, Lark)",
      "Community plugin system",
      "Multimodal interaction support",
    ],
  },
];

/* Shared classes */
const sectionWrap = "max-w-[1400px] mx-auto px-6 py-16 md:py-20";
const eyebrow = "font-mono text-[11px] uppercase tracking-widest text-muted";
const sectionHeading = "font-heading text-2xl sm:text-3xl md:text-4xl font-700";

/* ------------------------------------------------------------------ */
/*  Inline icons — simple stroke glyphs, 24px, currentColor             */
/* ------------------------------------------------------------------ */

function Icon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    className,
    "aria-hidden": true,
  };
  switch (name) {
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M5.6 18.4l4.2-4.2M14.2 9.8l4.2-4.2" />
        </svg>
      );
    case "stack":
      return (
        <svg {...common}>
          <path d="M3 7l9-4 9 4-9 4-9-4z" />
          <path d="M3 12l9 4 9-4" />
          <path d="M3 17l9 4 9-4" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 5h16v11H8l-4 4V5z" />
          <path d="M8 10h8M8 13h5" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M3 20h18" />
          <path d="M6 16l4-5 4 3 5-8" />
          <circle cx="6" cy="16" r="1" />
          <circle cx="10" cy="11" r="1" />
          <circle cx="14" cy="14" r="1" />
          <circle cx="19" cy="6" r="1" />
        </svg>
      );
    case "film":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" />
          <path d="M3 10h18M3 14h18M7 6v12M17 6v12" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.7A4 4 0 0119 10c0 5.5-7 10-7 10z" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M3 4h7a2 2 0 012 2v14H5a2 2 0 01-2-2V4zM21 4h-7a2 2 0 00-2 2v14h7a2 2 0 002-2V4z" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3 20v-1.5a4 4 0 014-4h4a4 4 0 014 4V20" />
          <path d="M15 20v-1a3 3 0 013-3h0a3 3 0 013 3v1" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 3" />
        </svg>
      );
    case "network":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
          <path d="M11 7L6 17M13 7l5 10M7 19h10" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 pt-20 md:pt-24 pb-16 md:pb-20">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
          <span className={eyebrow}>Multi-Agent Product · Open Source</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-700 leading-[1.05] tracking-tight max-w-4xl mb-5 md:mb-6">
          An agent team,
          <br />
          ready in one click.
        </h1>

        <p className="font-body font-300 text-base sm:text-lg md:text-xl text-muted max-w-2xl mb-8 md:mb-10 leading-relaxed">
          NarraNexus isn&rsquo;t another framework for wiring agents together.
          It&rsquo;s a ready-to-run team of agents that already remember,
          collaborate, and use tools. Start from a template, or compose your
          own.
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          <a
            href="https://agent.narra.nexus"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-ink text-paper font-body text-sm font-400 hover:bg-muted transition-colors"
          >
            Try Online
          </a>
          {/* Direct download of the latest signed macOS build. GitHub's
              /releases/latest/download/<asset> URL 302s to the asset, which
              is served Content-Disposition: attachment — so the click
              downloads the .dmg without navigating away. The build always
              names the asset NarraNexus.dmg, so this URL is release-stable. */}
          <a
            href="https://github.com/NetMindAI-Open/NarraNexus/releases/latest/download/NarraNexus.dmg"
            className="px-6 py-2.5 bg-ink text-paper font-body text-sm font-400 hover:bg-muted transition-colors"
          >
            Download for macOS
          </a>
          <Link
            href="/docs/getting-started/quick-start"
            className="px-6 py-2.5 border border-ink text-ink font-body text-sm font-400 hover:bg-ink hover:text-paper transition-colors"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/NetMindAI-Open/NarraNexus"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 border border-rule text-muted font-body text-sm font-400 hover:border-ink hover:text-ink transition-colors"
          >
            GitHub
          </a>
        </div>

        <p className="font-body font-300 text-xs text-muted mt-4">
          The cloud version is invite-only while we scale up.{" "}
          <Link
            href="/invite"
            className="text-ink underline underline-offset-2 hover:text-muted transition-colors"
          >
            Request an invite code
          </Link>
          , or run the desktop / local version with no invite needed.
        </p>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── Setup in 3 steps ─────────────────────────────────────── */}
      <section className={sectionWrap}>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
          <span className={eyebrow}>Get started</span>
        </div>

        <h2 className={`${sectionHeading} mb-3`}>
          A working agent team in three steps.
        </h2>
        <p className="font-body font-300 text-muted mb-10 md:mb-12 max-w-2xl">
          No config sprawl. No bespoke wiring. Pick a surface, drop in a
          template, start the conversation.
        </p>

        <div className="grid md:grid-cols-3 gap-px bg-rule">
          {setupSteps.map((s, i) => (
            <div key={s.title} className="bg-paper p-6 md:p-8 flex flex-col">
              <Icon name={s.icon} className="w-6 h-6 text-ink mb-5" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-lg font-700 mb-3">
                {s.title}
              </h3>
              <p className="font-body font-300 text-sm text-muted leading-relaxed mb-5 flex-1">
                {s.desc}
              </p>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted pt-4 border-t border-rule">
                {s.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── Scenarios ────────────────────────────────────────────── */}
      <section className={sectionWrap}>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
          <span className={eyebrow}>Built for</span>
        </div>

        <h2 className={`${sectionHeading} mb-3`}>
          Three places to start.
        </h2>
        <p className="font-body font-300 text-muted mb-10 md:mb-12 max-w-2xl">
          Three starting points. Concept-level for now. Drop in a template
          and the team is live.
        </p>

        <div className="grid md:grid-cols-3 gap-px bg-rule">
          {scenarios.map((s) => (
            <div key={s.title} className="bg-paper p-6 md:p-8 flex flex-col">
              <Icon name={s.icon} className="w-6 h-6 text-ink mb-5" />
              <h3 className="font-heading text-lg font-700 mb-3">
                {s.title}
              </h3>
              <p className="font-body font-300 text-sm text-muted leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── In Practice (imagery) ────────────────────────────────── */}
      <section className={sectionWrap}>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
          <span className={eyebrow}>In practice</span>
        </div>

        <h2 className={`${sectionHeading} mb-3 max-w-3xl`}>
          Your agent, at work.
        </h2>
        <p className="font-body font-300 text-muted mb-10 md:mb-12 max-w-2xl">
          The Financial Morning Briefing template mid-flow. Briefing Maestro
          coordinates five analysts behind the scenes, then delivers the
          day&rsquo;s brief in your language, while you make coffee.
        </p>

        {/* Print-mat frame: paper-2 acts as the museum mat, hairline
            rule bounds the inset mockup, mono caption strip beneath.
            The mockup itself is a stylized rendition of the cloud app
            (see components/home-briefing-mockup.tsx); built in HTML so
            it stays crisp at every viewport and never goes out of sync
            with a static screenshot. */}
        <figure className="bg-paper-2 border border-rule p-3 md:p-4">
          <HomeBriefingMockup />
          <figcaption className="font-mono text-[10px] uppercase tracking-widest text-muted pt-3 md:pt-4 flex flex-wrap gap-x-3 gap-y-1">
            <span>Briefing Maestro</span>
            <span aria-hidden="true">·</span>
            <span>Financial Morning Briefing · 金融晨报</span>
            <span aria-hidden="true">·</span>
            <span>Cloud</span>
          </figcaption>
        </figure>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── Core Features ────────────────────────────────────────── */}
      <section id="features" className={`scroll-mt-16 ${sectionWrap}`}>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
          <span className={eyebrow}>Capabilities</span>
        </div>

        <h2 className={`${sectionHeading} mb-3`}>
          What every agent comes with.
        </h2>
        <p className="font-body font-300 text-muted mb-10 md:mb-12 max-w-2xl">
          No wiring, no extensions. Four things your agent already has, the
          moment you import it.
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-rule">
          {coreFeatures.map((c) => (
            <div key={c.title} className="bg-paper p-6 md:p-8 group">
              <Icon name={c.icon} className="w-6 h-6 text-ink mb-5" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {c.subtitle}
              </span>
              <h3 className="font-heading text-xl font-700 mt-1 mb-3">
                {c.title}
              </h3>
              <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
                {c.desc}
              </p>
              <Link
                href={c.link}
                className="inline-flex items-center gap-1 font-mono text-xs text-ink hover:text-muted transition-colors"
              >
                <span>Learn more</span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className={sectionWrap}>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
          <span className={eyebrow}>FAQ</span>
        </div>

        <h2 className={`${sectionHeading} mb-10 md:mb-12`}>
          Common questions
        </h2>

        <dl className="border-t border-rule">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="grid md:grid-cols-[280px_1fr] gap-4 md:gap-12 border-b border-rule py-6 md:py-7"
            >
              <dt className="font-heading text-base md:text-lg font-700 text-ink">
                {f.q}
              </dt>
              <dd className="font-body font-300 text-sm md:text-[15px] text-muted leading-relaxed">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-sm text-muted font-body font-300">
          <Link
            href="/docs"
            className="underline underline-offset-2 hover:text-ink transition-colors"
          >
            Full beginner guide and FAQ &rarr;
          </Link>
        </p>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── Roadmap ──────────────────────────────────────────────── */}
      <section id="roadmap" className={`scroll-mt-16 ${sectionWrap}`}>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
          <span className={eyebrow}>Roadmap</span>
        </div>

        <h2 className={`${sectionHeading} mb-10 md:mb-12`}>
          Where we are going
        </h2>

        <ol className="relative">
          {roadmap.map((r, idx) => {
            const isLast = idx === roadmap.length - 1;
            return (
              <li key={r.version} className="flex gap-4 sm:gap-8">
                <div className="w-16 sm:w-24 shrink-0 pt-0.5">
                  <span className="font-mono text-xs text-muted">{r.date}</span>
                </div>
                <div
                  className={`flex-1 pl-6 sm:pl-8 relative ${isLast ? "" : "pb-10"}`}
                >
                  {/* Timeline line */}
                  <span
                    className={`absolute left-0 top-2 bottom-0 w-px bg-rule ${
                      isLast ? "hidden" : ""
                    }`}
                    aria-hidden="true"
                  />
                  {/* Timeline dot — shipped milestones earn Linotype Blue
                      (#334dff via --color-secondary). The single moment of
                      the secondary accent on the homepage, per the Ink-or-
                      Blue Rule: blue carries technical specificity, and
                      "in production" is exactly that. */}
                  <span
                    className={`absolute -left-[4px] top-1.5 w-2.5 h-2.5 border ${
                      r.done ? "bg-secondary border-secondary" : "bg-paper border-muted"
                    }`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="font-mono text-sm font-500 text-ink">
                      {r.version}
                    </span>
                    <span className="font-heading text-lg font-700">
                      {r.title}
                    </span>
                    {r.done && (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted px-1.5 py-0.5 border border-rule">
                        Shipped
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1">
                    {r.items.map((item) => (
                      <li
                        key={item}
                        className="font-body font-300 text-sm text-muted leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className={sectionWrap}>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
          <span className={eyebrow}>Tonight</span>
        </div>

        <h2 className={`${sectionHeading} mb-5 md:mb-6 max-w-3xl`}>
          Talk to your first agent tonight.
        </h2>
        <p className="font-body font-300 text-base md:text-lg text-muted max-w-2xl mb-8 md:mb-10 leading-relaxed">
          Sixty seconds from open to your first reply.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="https://agent.narra.nexus"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 bg-ink text-paper font-body text-sm font-400 hover:bg-muted transition-colors"
          >
            Try Online
          </a>
          <a
            href="https://github.com/NetMindAI-Open/NarraNexus/releases/latest/download/NarraNexus.dmg"
            className="font-body font-300 text-sm text-muted hover:text-ink transition-colors underline underline-offset-2"
          >
            Or download for macOS
          </a>
        </div>

        <p className="font-body font-300 text-xs text-muted mt-6">
          Cloud is invite-only while we scale up.{" "}
          <Link
            href="/invite"
            className="text-ink underline underline-offset-2 hover:text-muted transition-colors"
          >
            Request a code
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
