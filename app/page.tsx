"use client";

import Link from "next/link";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const painPoints = [
  {
    pain: "Agents forget everything between sessions",
    solution: "Narrative Memory",
    desc: "Conversations are organized into topic-based storylines that persist for weeks. Your agent picks up right where you left off \u2014 even if the last message was 3 weeks ago on a different topic.",
  },
  {
    pain: "Agents don\u2019t know who they\u2019re talking to",
    solution: "Social Intelligence",
    desc: "Agents build a graph of everyone they interact with \u2014 names, roles, expertise, communication style. They adapt how they work based on who\u2019s asking.",
  },
  {
    pain: "Agent capabilities are monolithic and rigid",
    solution: "Modular Architecture",
    desc: "Hot-swap capability modules without touching core logic. Add memory, jobs, skills, or agent-to-agent communication as independent plugins.",
  },
];

const capabilities = [
  {
    title: "Narrative Memory",
    subtitle: "Conversations become storylines",
    desc: "Every topic becomes a persistent Narrative with its own history, active modules, and summary. The agent routes new messages to the right storyline automatically \u2014 or creates a new one when the topic is genuinely new.",
    link: "/docs/core-concepts/narrative",
  },
  {
    title: "Social Graph",
    subtitle: "Agents that know people",
    desc: "Identity, expertise, contact details, and communication personas \u2014 all learned from conversations and updated continuously. The agent remembers who prefers bullet points, who needs formal reports, and who hasn\u2019t been contacted in a while.",
    link: "/docs/modules/social-network",
  },
  {
    title: "Autonomous Work",
    subtitle: "Background tasks that just happen",
    desc: "Schedule one-off reminders, recurring checks, or ongoing monitoring tasks. Jobs run in the background with full context and report results through chat when they complete.",
    link: "/docs/modules/jobs",
  },
  {
    title: "Extensible by Design",
    subtitle: "Nothing is hardcoded",
    desc: "Modules are independent and hot-swappable. Skills install from a marketplace. LLM providers swap without code changes. Build with Claude, OpenAI, or Gemini \u2014 or switch between them.",
    link: "/docs/core-concepts/modules",
  },
];

const architectureLayers = [
  {
    label: "Frontend",
    tech: "React \u00b7 Tauri Desktop",
    color: "bg-[#334dff]/8",
    borderColor: "border-[#334dff]/20",
  },
  {
    label: "API Gateway",
    tech: "FastAPI \u00b7 REST + WebSocket",
    color: "bg-[#334dff]/12",
    borderColor: "border-[#334dff]/25",
  },
  {
    label: "Agent Runtime",
    tech: "6-Step Pipeline \u00b7 Context Engine",
    color: "bg-[#334dff]/18",
    borderColor: "border-[#334dff]/30",
  },
  {
    label: "Module System",
    tech: "Hot-Swappable \u00b7 MCP Tools",
    color: "bg-[#334dff]/24",
    borderColor: "border-[#334dff]/35",
  },
  {
    label: "Services",
    tech: "Narrative \u00b7 Memory \u00b7 Social \u00b7 Jobs",
    color: "bg-[#334dff]/30",
    borderColor: "border-[#334dff]/40",
  },
  {
    label: "Data Layer",
    tech: "SQLite \u00b7 MySQL \u00b7 Vector Store",
    color: "bg-[#334dff]/36",
    borderColor: "border-[#334dff]/45",
  },
];

const modules = [
  { name: "Awareness", desc: "Self-knowledge" },
  { name: "Chat", desc: "Session management" },
  { name: "Memory", desc: "Dual-track recall" },
  { name: "Social Network", desc: "Relationship graph" },
  { name: "Jobs", desc: "Background tasks" },
  { name: "Skills", desc: "Marketplace plugins" },
  { name: "Agent Comms", desc: "Multi-agent bus" },
  { name: "RAG", desc: "Document knowledge" },
];

const showcaseTabs = [
  {
    id: "narrative",
    label: "Narrative Memory",
    title: "Topic-Aware Conversations",
    points: [
      "Messages automatically routed to the right topic storyline",
      "3-stage selection: continuity detection \u2192 semantic search \u2192 agent decision",
      "8 default Narratives per user \u2014 from greetings to deep technical discussions",
      "Cross-topic awareness: the agent knows what you discussed elsewhere",
    ],
  },
  {
    id: "social",
    label: "Social Intelligence",
    title: "Relationships That Grow",
    points: [
      "Entities created automatically from conversations \u2014 no manual entry",
      "Identity, expertise, and communication personas update with every interaction",
      "Semantic search across the social graph by role, domain, or expertise",
      "Multi-channel contact: reach people through their preferred platform",
    ],
  },
  {
    id: "jobs",
    label: "Autonomous Jobs",
    title: "Work That Happens in the Background",
    points: [
      "One-off reminders, scheduled checks, recurring tasks, and ongoing monitoring",
      "Jobs execute with full Narrative context and Social Network awareness",
      "Post-execution LLM analysis determines next steps automatically",
      "Results reported through chat \u2014 only when there\u2019s something to say",
    ],
  },
  {
    id: "multi",
    label: "Multi-Agent",
    title: "Agents That Collaborate",
    points: [
      "MessageBus with channels, direct messages, and @mentions",
      "Agent discovery by capability \u2014 find the right agent for the task",
      "Rate limiting and poison message detection prevent runaway loops",
      "Reply discipline: agents only respond when they have something to contribute",
    ],
  },
];

const personas = [
  {
    title: "Personal Assistant",
    desc: "An agent that remembers your preferences, manages reminders, and adapts to how you like to communicate \u2014 across days, weeks, and topics.",
  },
  {
    title: "Team Coordinator",
    desc: "Multi-agent systems where each agent has a specialty \u2014 research, scheduling, code review \u2014 and they coordinate through the MessageBus.",
  },
  {
    title: "Developers",
    desc: "Build agents with persistent memory and social awareness in hours, not weeks. Modular architecture means you extend, not rewrite.",
  },
  {
    title: "Researchers",
    desc: "Experiment with narrative-driven agent architectures. Study how topic-based memory and social graphs affect agent behavior over time.",
  },
];

const roadmap = [
  {
    version: "v0.1.0",
    date: "2026-02",
    title: "Foundation",
    done: true,
    items: [
      "Core agent runtime",
      "Matrix protocol integration",
      "Basic memory system",
      "Docker deployment",
    ],
  },
  {
    version: "v0.2.0",
    date: "2026-03",
    title: "Intelligence Layer",
    done: true,
    items: [
      "Narrative memory engine",
      "Multi-LLM support",
      "Skill marketplace",
      "Cost tracking dashboard",
    ],
  },
  {
    version: "v0.3.0",
    date: "2026 Q2",
    title: "Scale & Connect",
    done: false,
    items: [
      "MCP server integration",
      "Agent-to-agent workflows",
      "Advanced RAG pipeline",
      "Community plugin system",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [activeTab, setActiveTab] = useState("narrative");
  const activeShowcase = showcaseTabs.find((t) => t.id === activeTab)!;

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 pt-24 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-ink block" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Open-Source Agent Framework
          </span>
        </div>

        <h1 className="font-heading text-5xl md:text-7xl font-800 leading-[1.05] max-w-4xl mb-6">
          Agents That Remember
          <br />
          Who You Are
        </h1>

        <p className="font-body font-300 text-lg md:text-xl text-muted max-w-2xl mb-10">
          Most agent frameworks treat every conversation as day one.
          NarraNexus gives agents persistent memory, social identity, and
          evolving expertise &mdash; across sessions, topics, and teams.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://agent.narra.nexus"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-ink text-paper font-body text-sm font-400 hover:bg-muted transition-colors"
          >
            Try Online
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
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── Problem → Solution ───────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Why NarraNexus
          </span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl font-700 mb-12">
          The problems we solve
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-rule">
          {painPoints.map((p) => (
            <div key={p.solution} className="bg-paper p-8">
              <p className="font-body font-300 text-sm text-muted mb-4 leading-relaxed">
                &ldquo;{p.pain}&rdquo;
              </p>
              <div className="w-6 h-px bg-ink mb-4" />
              <h3 className="font-heading text-lg font-700 mb-2">
                {p.solution}
              </h3>
              <p className="font-body font-300 text-sm text-muted leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── Key Capabilities ─────────────────────────────────────── */}
      <section id="features" className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Capabilities
          </span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl font-700 mb-12">
          What makes NarraNexus different
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-rule">
          {capabilities.map((c) => (
            <div key={c.title} className="bg-paper p-8">
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
                className="font-mono text-xs text-ink hover:text-muted transition-colors"
              >
                Learn more &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── Architecture ─────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Architecture
          </span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl font-700 mb-3">
          System Overview
        </h2>
        <p className="font-body font-300 text-muted mb-10">
          A layered pipeline from user interface to persistent storage.
        </p>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Layer stack */}
          <div className="space-y-1.5">
            {architectureLayers.map((layer, i) => (
              <div
                key={layer.label}
                className={`${layer.color} border ${layer.borderColor} p-4 flex items-center justify-between`}
                style={{ marginLeft: `${i * 12}px` }}
              >
                <div>
                  <span className="font-heading text-sm font-700 text-ink">
                    {layer.label}
                  </span>
                  <span className="font-body font-300 text-xs text-muted ml-3">
                    {layer.tech}
                  </span>
                </div>
                {i < architectureLayers.length - 1 && (
                  <span className="font-mono text-xs text-muted/50">
                    &darr;
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Module grid */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-3">
              Module System
            </span>
            <div className="grid grid-cols-2 gap-px bg-rule">
              {modules.map((m) => (
                <div
                  key={m.name}
                  className="bg-paper p-3 flex flex-col"
                >
                  <span className="font-heading text-xs font-700">
                    {m.name}
                  </span>
                  <span className="font-body font-300 text-[11px] text-muted mt-0.5">
                    {m.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted font-body font-300">
          <Link
            href="/docs/core-concepts/architecture"
            className="underline underline-offset-2 hover:text-ink transition-colors"
          >
            Read the full architecture guide &rarr;
          </Link>
        </p>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── See It in Action ─────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            In Practice
          </span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl font-700 mb-10">
          See it in action
        </h2>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-rule mb-8 overflow-x-auto">
          {showcaseTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 font-body text-sm font-400 transition-colors whitespace-nowrap border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-ink text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h3 className="font-heading text-xl font-700 mb-4">
              {activeShowcase.title}
            </h3>
            <ul className="space-y-3">
              {activeShowcase.points.map((point, i) => (
                <li
                  key={i}
                  className="font-body font-300 text-sm text-muted leading-relaxed flex gap-3"
                >
                  <span className="w-5 h-5 border border-rule flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-mono text-[10px] text-muted">
                      {i + 1}
                    </span>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual placeholder */}
          <div className="border border-rule bg-paper-2/30 p-8 flex items-center justify-center min-h-[280px]">
            <div className="text-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-2">
                {activeShowcase.label}
              </span>
              <div className="w-48 h-32 border border-rule bg-paper mx-auto mb-3 flex items-center justify-center">
                <span className="font-mono text-xs text-muted/40">
                  Screenshot
                </span>
              </div>
              <span className="font-body font-300 text-xs text-muted">
                Screenshots coming soon
              </span>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── Who Is It For ────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Use Cases
          </span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl font-700 mb-12">
          Who is it for
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
          {personas.map((p) => (
            <div key={p.title} className="bg-paper p-6">
              <h3 className="font-heading text-base font-700 mb-2">
                {p.title}
              </h3>
              <p className="font-body font-300 text-sm text-muted leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── Quick Start ──────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Quick Start
          </span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl font-700 mb-3">
          Try it in 60 seconds
        </h2>
        <p className="font-body font-300 text-muted mb-8">
          Three ways to get started, from zero-install to full local setup.
        </p>

        <div className="grid md:grid-cols-3 gap-px bg-rule">
          {/* Cloud */}
          <div className="bg-paper p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-heading text-base font-700">
                Cloud
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted px-1.5 py-0.5 border border-rule">
                Fastest
              </span>
            </div>
            <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
              No installation. Open in your browser, create an account, and
              start chatting with your agent immediately.
            </p>
            <a
              href="https://agent.narra.nexus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-1.5 bg-ink text-paper text-sm font-body font-400 hover:bg-muted transition-colors"
            >
              Open NarraNexus Web
            </a>
          </div>

          {/* Desktop */}
          <div className="bg-paper p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-heading text-base font-700">
                Desktop App
              </span>
            </div>
            <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
              Download the macOS app. Bundled Python, auto-starts all services.
              No terminal required.
            </p>
            <span className="font-mono text-xs text-muted">
              Download (macOS) &rarr;
            </span>
          </div>

          {/* Local */}
          <div className="bg-paper p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-heading text-base font-700">
                From Source
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted px-1.5 py-0.5 border border-rule">
                Developer
              </span>
            </div>
            <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
              Full local setup with tmux, 7 services, and hot-reload for
              development.
            </p>
            <div className="border border-rule bg-paper-2/30 p-3">
              <code className="font-mono text-xs text-ink break-all">
                git clone ...NarraNexus && bash run.sh
              </code>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted font-body font-300">
          <Link
            href="/docs/getting-started/quick-start"
            className="underline underline-offset-2 hover:text-ink transition-colors"
          >
            Detailed setup guide &rarr;
          </Link>
        </p>
      </section>

      <hr className="border-rule max-w-[1400px] mx-auto" />

      {/* ── Roadmap ──────────────────────────────────────────────── */}
      <section id="roadmap" className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Roadmap
          </span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl font-700 mb-12">
          Where we are going
        </h2>

        <div className="space-y-0">
          {roadmap.map((r) => (
            <div key={r.version} className="flex gap-8 pb-8">
              <div className="w-24 shrink-0">
                <span className="font-mono text-xs text-muted">{r.date}</span>
              </div>
              <div className="border-l border-rule pl-8 pb-4 relative">
                {/* Timeline dot */}
                <span
                  className={`absolute -left-[5px] top-1 w-2.5 h-2.5 border ${
                    r.done
                      ? "bg-ink border-ink"
                      : "bg-paper border-muted"
                  }`}
                />
                <div className="flex items-baseline gap-3 mb-2">
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
                      className="font-body font-300 text-sm text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
