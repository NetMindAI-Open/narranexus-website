"use client";

import { useState } from "react";

type Mode = "local" | "desktop" | "cloud";

const modes: { key: Mode; label: string; tagline: string }[] = [
  {
    key: "local",
    label: "Local (from source)",
    tagline: "Full control. Run all services locally via tmux.",
  },
  {
    key: "desktop",
    label: "Desktop App",
    tagline: "One-click launch. macOS only for now.",
  },
  {
    key: "cloud",
    label: "Cloud",
    tagline: "Try instantly. No installation required.",
  },
];

function LocalMode() {
  return (
    <>
      {/* Step 1 — Clone & Install */}
      <section className="mb-10">
        <h3 className="font-heading text-lg font-700 mb-3">
          1. Clone &amp; Install
        </h3>
        <div className="border border-rule bg-paper-2/30 p-4 mb-3">
          <pre className="font-mono text-sm text-ink leading-relaxed whitespace-pre-wrap">
            {`git clone https://github.com/user/NarraNexus.git
cd NarraNexus
bash run.sh`}
          </pre>
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          The script checks for{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">uv</code>
          ,{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">node</code>
          , and{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">tmux</code>
          . If any are missing it prints install instructions and exits. Once
          dependencies pass, it installs Python and frontend packages, then
          launches a tmux session with all seven services:
        </p>
        <div className="mt-3 space-y-px bg-rule">
          {[
            { window: "DB Proxy", port: "8100", desc: "SQLite HTTP proxy" },
            { window: "Backend", port: "8000", desc: "FastAPI server" },
            { window: "MCP", port: "7801+", desc: "Module tool servers" },
            { window: "Poller", port: "\u2014", desc: "Instance state monitor" },
            { window: "Jobs", port: "\u2014", desc: "Scheduled job trigger" },
            { window: "BusTrigger", port: "\u2014", desc: "Message bus event trigger" },
            { window: "Frontend", port: "5173", desc: "Vite dev server" },
          ].map((item) => (
            <div key={item.window} className="bg-paper p-2.5 flex gap-4">
              <span className="font-mono text-xs text-ink w-24 shrink-0">
                {item.window}
              </span>
              <span className="font-mono text-xs text-muted w-14 shrink-0">
                {item.port}
              </span>
              <span className="font-body font-300 text-xs text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Step 2 — Configure LLM */}
      <section className="mb-10">
        <h3 className="font-heading text-lg font-700 mb-3">
          2. Configure LLM Providers
        </h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
          Open{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            http://localhost:5173
          </code>{" "}
          in your browser and log in. On first launch the app redirects you to
          the <strong className="font-500 text-ink">Setup</strong> page
          automatically.
        </p>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
          Add at least one LLM provider. The fastest path:
        </p>
        <div className="border border-rule bg-paper-2/30 p-4 mb-3">
          <ol className="list-none space-y-2">
            {[
              "Click a preset (NetMind.AI Power, Yunwu, or OpenRouter) and paste your API key",
              "Or add a custom Anthropic / OpenAI provider with your own base URL and key",
              "Or use Claude Code OAuth if you have the CLI installed and logged in",
            ].map((step, i) => (
              <li
                key={i}
                className="font-body font-300 text-sm text-muted flex gap-3"
              >
                <span className="font-mono text-xs text-ink shrink-0 mt-0.5">
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          Then assign models to the three required slots:
        </p>
        <div className="mt-3 space-y-px bg-rule">
          {[
            {
              slot: "Agent",
              protocol: "Anthropic",
              purpose:
                "Main dialogue \u2014 powers the agent via Claude Agent SDK",
            },
            {
              slot: "Embedding",
              protocol: "OpenAI",
              purpose:
                "Vector search \u2014 generates embeddings for Narratives and Events",
            },
            {
              slot: "Helper LLM",
              protocol: "OpenAI",
              purpose:
                "Auxiliary tasks \u2014 topic detection, summarization, entity extraction",
            },
          ].map((item) => (
            <div key={item.slot} className="bg-paper p-3 flex gap-4">
              <span className="font-heading text-sm font-600 w-24 shrink-0">
                {item.slot}
              </span>
              <span className="font-mono text-[10px] text-muted w-20 shrink-0 mt-0.5">
                {item.protocol}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.purpose}
              </span>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-3">
          Click <strong className="font-500 text-ink">Apply Changes</strong>,
          then <strong className="font-500 text-ink">Get Started</strong>.
          You&apos;re ready.
        </p>
      </section>
    </>
  );
}

function DesktopMode() {
  return (
    <>
      <section className="mb-10">
        <h3 className="font-heading text-lg font-700 mb-3">
          1. Download &amp; Install
        </h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
          Download the latest{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            .dmg
          </code>{" "}
          from the{" "}
          <a
            href="https://github.com/NetMindAI-Open/NarraNexus/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="font-500 text-ink underline"
          >
            releases page
          </a>{" "}
          and drag NarraNexus to your Applications folder.
        </p>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          The desktop app bundles a standalone Python runtime and all
          dependencies. No separate installation of Python, Node.js, or Docker
          required.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-heading text-lg font-700 mb-3">2. Launch</h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
          Open the app. It automatically starts all backend services (API, MCP
          servers, poller, job trigger, bus trigger) and opens the frontend. A
          local SQLite database is created at{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            ~/.narranexus/nexus.db
          </code>
          .
        </p>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          Wait for the status indicator to turn green &mdash; all services are
          healthy.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-heading text-lg font-700 mb-3">
          3. Configure LLM Providers
        </h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          Same as the local flow &mdash; on first launch the app redirects to
          the Setup page. Add a provider, assign the three model slots (Agent,
          Embedding, Helper LLM), click{" "}
          <strong className="font-500 text-ink">Get Started</strong>.
        </p>
      </section>
    </>
  );
}

function CloudMode() {
  return (
    <>
      <section className="mb-10">
        <h3 className="font-heading text-lg font-700 mb-3">
          1. Open the Cloud Instance
        </h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
          Navigate to the hosted instance:
        </p>
        <div className="border border-rule bg-paper-2/30 p-4">
          <code className="font-mono text-sm text-ink">
            https://agent.narra.nexus
          </code>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="font-heading text-lg font-700 mb-3">
          2. Create an Account
        </h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
          On the login page, click{" "}
          <strong className="font-500 text-ink">Create Account</strong>. Fill in
          a username, password, and the invite code:
        </p>
        <div className="border border-rule bg-paper-2/30 p-4 mb-3">
          <div className="flex items-center gap-4">
            <span className="font-body font-300 text-sm text-muted shrink-0">
              Invite code
            </span>
            <code className="font-mono text-sm text-ink">
              narranexuscloudxyz
            </code>
          </div>
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          After registration, sign in with your new credentials.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-heading text-lg font-700 mb-3">
          3. Start Using
        </h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          The cloud instance comes with pre-configured LLM providers &mdash; no
          setup required. Create an agent and start chatting immediately. You can
          add your own API keys later in{" "}
          <strong className="font-500 text-ink">Settings</strong>.
        </p>
      </section>
    </>
  );
}

export default function QuickStartPage() {
  const [active, setActive] = useState<Mode>("local");

  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Getting Started
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Quick Start
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Three ways to run NarraNexus. Pick the one that fits your situation.
      </p>

      <hr className="border-rule mb-8" />

      {/* Prerequisites */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-700 mb-4">Prerequisites</h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          The Cloud option requires nothing &mdash; just a browser. The
          Desktop app bundles its own runtime, so no separate installs are
          needed. For Local (from source), make sure you have:
        </p>
        <div className="space-y-px bg-rule mb-4">
          {[
            {
              name: "Python 3.13+",
              note: "uv is used for package management",
              modes: "Local",
            },
            {
              name: "Node.js 20+",
              note: "Frontend dev server",
              modes: "Local",
            },
            {
              name: "tmux",
              note: "Services run in a single tmux session",
              modes: "Local",
            },
            {
              name: "Git",
              note: "Clone the repository",
              modes: "Local",
            },
          ].map((item) => (
            <div key={item.name} className="bg-paper p-3 flex gap-4">
              <span className="font-heading text-sm font-600 w-28 shrink-0">
                {item.name}
              </span>
              <span className="font-body font-300 text-sm text-muted flex-1">
                {item.note}
              </span>
              <span className="font-mono text-[10px] text-muted shrink-0 mt-0.5">
                {item.modes}
              </span>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          On macOS:{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            brew install uv node tmux
          </code>
          . On Linux:{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            apt install tmux nodejs
          </code>{" "}
          and install{" "}
          <a
            href="https://docs.astral.sh/uv/getting-started/installation/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-500 text-ink underline"
          >
            uv
          </a>{" "}
          separately.
        </p>
      </section>

      <hr className="border-rule mb-8" />

      {/* Mode tabs */}
      <div className="flex border-b border-rule mb-8">
        {modes.map((mode) => (
          <button
            key={mode.key}
            onClick={() => setActive(mode.key)}
            className={`py-3 px-5 font-heading text-sm transition-colors border-b-2 -mb-px ${
              active === mode.key
                ? "font-700 text-ink border-ink"
                : "font-400 text-muted border-transparent hover:text-ink"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Tagline */}
      <p className="font-body font-300 text-sm text-muted mb-8">
        {modes.find((m) => m.key === active)?.tagline}
      </p>

      {/* Mode content */}
      {active === "local" && <LocalMode />}
      {active === "desktop" && <DesktopMode />}
      {active === "cloud" && <CloudMode />}

      {/* Next steps — shared */}
      <hr className="border-rule mb-8" />

      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          What&apos;s Next
        </h2>
        <div className="space-y-px bg-rule">
          {[
            {
              label: "First Agent",
              desc: "Create an agent, explore capabilities, watch memory form",
              href: "/docs/getting-started/first-agent",
            },
            {
              label: "Architecture",
              desc: "Understand the 7-layer system and runtime pipeline",
              href: "/docs/core-concepts/architecture",
            },
            {
              label: "Modules",
              desc: "Explore all built-in capability modules",
              href: "/docs/core-concepts/modules",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="bg-paper p-4 flex gap-6 hover:bg-paper-2/30 transition-colors block"
            >
              <span className="font-heading text-sm font-700 w-28 shrink-0">
                {item.label}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
