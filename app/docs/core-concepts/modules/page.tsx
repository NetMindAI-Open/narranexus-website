import Link from "next/link";

export default function ModulesPage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Core Concepts
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Modules
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Hot-swappable capabilities that give agents awareness, memory, social
        intelligence, and the ability to act on the world.
      </p>

      <hr className="border-rule mb-8" />

      {/* What is a Module */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          What is a Module?
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          A module is a self-contained unit of capability. Each module owns a
          specific domain &mdash; memory, social relationships, scheduling,
          skills &mdash; and integrates with the agent through two mechanisms:
        </p>

        <div className="space-y-px bg-rule mb-6">
          {[
            {
              mechanism: "Lifecycle Hooks",
              desc: "Passive influence on every pipeline run. hook_data_gathering injects context before the LLM executes; hook_after_event_execution runs post-processing in the background (entity extraction, memory writes, job evaluation).",
            },
            {
              mechanism: "MCP Tools",
              desc: "Active capabilities the LLM can call during execution. Each module exposes tools via its own MCP server. The agent discovers available tools automatically based on which modules are active.",
            },
          ].map((item) => (
            <div key={item.mechanism} className="bg-paper p-4">
              <span className="font-heading text-sm font-700">
                {item.mechanism}
              </span>
              <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          Modules are independent by design &mdash; they never reference or
          depend on each other. This makes them hot-swappable: enable, disable,
          or replace any module without affecting the rest of the system.
        </p>
      </section>

      {/* Module types */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">Module Types</h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Modules come in two types, determined by how they are activated:
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              type: "Capability",
              tag: "auto-loaded",
              desc: "Always active. These modules run on every interaction \u2014 Awareness, Chat, Social Network, Memory. The agent doesn\u2019t decide whether to use them; they\u2019re part of the baseline.",
            },
            {
              type: "Task",
              tag: "LLM-decided",
              desc: "Created on demand. When the user asks the agent to do something that requires a specific module (schedule a job, learn a skill, message another agent), the LLM decides to create an instance. The instance lives within a Narrative and persists across sessions.",
            },
          ].map((item) => (
            <div key={item.type} className="bg-paper p-4">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-heading text-sm font-700">
                  {item.type}
                </span>
                <span className="font-mono text-[10px] text-muted">
                  {item.tag}
                </span>
              </div>
              <p className="font-body font-300 text-sm text-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Instances and Narratives */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Instances &amp; Narratives
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Modules themselves are stateless templates. The state lives in{" "}
          <strong className="font-500 text-ink">instances</strong> &mdash;
          concrete activations of a module bound to a specific{" "}
          <a
            href="/docs/core-concepts/narrative"
            className="font-500 text-ink underline"
          >
            Narrative
          </a>
          .
        </p>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          When you switch topics, the agent switches Narratives &mdash; and
          with it, the set of active module instances. A job running in one
          Narrative doesn&apos;t appear in another. Your chat history in one
          storyline is separate from another. This is how modules stay
          organized across topics.
        </p>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          During Step 2 of the{" "}
          <a
            href="/docs/core-concepts/architecture"
            className="font-500 text-ink underline"
          >
            runtime pipeline
          </a>
          , the LLM evaluates which instances should be active for this
          interaction &mdash; keeping existing ones, adding new ones, or
          archiving completed ones.
        </p>
      </section>

      {/* Built-in modules */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-6">
          Built-in Modules
        </h2>
        <div className="space-y-px bg-rule">
          {[
            {
              name: "Awareness",
              type: "capability",
              desc: "Persistent agent identity \u2014 role, personality, goals. Auto-collected from conversations.",
              href: "/docs/modules/awareness",
            },
            {
              name: "Chat",
              type: "capability",
              desc: "Dual-track conversation history. Thinking vs speaking paradigm. Message delivery.",
              href: "/docs/modules/chat",
            },
            {
              name: "Social Network",
              type: "capability",
              desc: "Entity graph of users, agents, and groups. Relationship tracking and interaction patterns.",
              href: "/docs/modules/social-network",
            },
            {
              name: "Memory",
              type: "capability",
              desc: "Cross-session recall via builtin memory and optional EverMemOS. Document RAG.",
              href: "/docs/modules/memory",
            },
            {
              name: "Jobs",
              type: "task",
              desc: "Scheduled, recurring, and ongoing background tasks with autonomous execution.",
              href: "/docs/modules/jobs",
            },
            {
              name: "Skills",
              type: "task",
              desc: "Installable capabilities from ClawHub marketplace or GitHub URLs.",
              href: "/docs/modules/skills",
            },
            {
              name: "Agent Communication",
              type: "task",
              desc: "Inter-agent messaging via MessageBus. @mention addressing, channels, and group discussions.",
              href: "/docs/modules/agent-communication",
            },
          ].map((m) => (
            <Link
              key={m.name}
              href={m.href}
              className="flex items-start justify-between bg-paper p-4 hover:bg-paper-2/50 transition-colors group"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-heading text-base font-700 group-hover:text-muted transition-colors">
                    {m.name}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {m.type}
                  </span>
                </div>
                <p className="font-body font-300 text-sm text-muted mt-0.5">
                  {m.desc}
                </p>
              </div>
              <span className="font-mono text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Custom modules */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          Custom Modules
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          You can build your own modules following the same pattern &mdash;
          inherit from XYZBaseModule, implement hooks and MCP tools, register
          in MODULE_MAP.{" "}
          <Link
            href="/docs/modules/custom-modules"
            className="font-500 text-ink underline"
          >
            See the full guide
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
