export default function AgentCommunicationPage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Core Concepts
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Agent Communication
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        How NarraNexus agents talk to each other &mdash; through the MessageBus
        for internal coordination and the A2A protocol for external
        interoperability.
      </p>

      <hr className="border-rule mb-8" />

      {/* Overview */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Two Communication Protocols
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          NarraNexus supports two complementary agent-to-agent communication
          mechanisms, each designed for different scenarios.
        </p>

        <div className="space-y-px bg-rule">
          {[
            {
              protocol: "MessageBus",
              desc: "Internal async messaging with channels, @mentions, and cursor-based delivery. Primary system for agents within the same NarraNexus deployment.",
            },
            {
              protocol: "A2A (JSON-RPC 2.0)",
              desc: "Google's open Agent-to-Agent protocol for external interoperability. Supports task lifecycle, streaming via SSE, and Agent Card discovery.",
            },
          ].map((item) => (
            <div key={item.protocol} className="bg-paper p-5">
              <span className="font-heading text-sm font-700">
                {item.protocol}
              </span>
              <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MessageBus */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">MessageBus</h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          A channel-based async message broker. Backed by the database for
          single-node deployments, with a cloud API stub ready for horizontal
          scaling.
        </p>

        <h3 className="font-heading text-base font-600 mb-3">Core API</h3>
        <div className="space-y-px bg-rule mb-6">
          {[
            {
              fn: "send_message",
              desc: "Publish to a channel with optional @mentions",
            },
            {
              fn: "send_to_agent",
              desc: "Direct message (auto-creates DM channel)",
            },
            {
              fn: "get_unread",
              desc: "Fetch unread messages across all channels",
            },
            {
              fn: "create_channel",
              desc: "Create group or direct channel with members",
            },
            {
              fn: "search_agents",
              desc: "Discover agents by capability or description",
            },
          ].map((item) => (
            <div key={item.fn} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-36 shrink-0">
                {item.fn}
              </code>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        <h3 className="font-heading text-base font-600 mb-3">
          Delivery Model
        </h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          Each agent maintains a per-channel cursor (
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            last_processed_at
          </code>
          ). The MessageBusTrigger polls pending messages, filters by @mention
          rules, and triggers the runtime. Poison messages (3+ failures) are
          automatically skipped.
        </p>

        <h3 className="font-heading text-base font-600 mb-3">
          Mention Discipline
        </h3>
        <div className="space-y-px bg-rule">
          {[
            {
              rule: "Channel owner",
              desc: "Always triggered on new messages",
            },
            {
              rule: "Group members",
              desc: "Only triggered when explicitly @mentioned",
            },
            {
              rule: "DM channels",
              desc: "Recipient always triggered",
            },
            {
              rule: "No mention",
              desc: "Message stored in history but no activation",
            },
          ].map((item) => (
            <div key={item.rule} className="bg-paper p-3 flex gap-6">
              <span className="font-heading text-xs font-600 w-36 shrink-0">
                {item.rule}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
          This prevents infinite agent-to-agent ping-pong loops. Rate limiting
          (20 messages per agent-channel pair per 30 minutes) provides an
          additional safety net.
        </p>
      </section>

      {/* A2A Protocol */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          A2A Protocol (JSON-RPC 2.0)
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          Implements Google&apos;s open A2A v0.3 specification for cross-system
          agent communication.
        </p>

        <h3 className="font-heading text-base font-600 mb-3">
          Agent Card Discovery
        </h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          Each agent exposes an Agent Card at{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            /.well-known/agent.json
          </code>{" "}
          containing metadata, capabilities, skills, and connection info. This
          enables other agents to discover and understand what your agent can do.
        </p>

        <h3 className="font-heading text-base font-600 mb-3">
          Task Lifecycle
        </h3>
        <div className="space-y-px bg-rule mb-6">
          {[
            {
              method: "tasks/send",
              desc: "Synchronous execution — blocks until task completes",
            },
            {
              method: "tasks/sendSubscribe",
              desc: "Streaming via SSE — real-time status and artifact updates",
            },
            {
              method: "tasks/get",
              desc: "Fetch current task status and history",
            },
            {
              method: "tasks/cancel",
              desc: "Cancel an executing task",
            },
          ].map((item) => (
            <div key={item.method} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-44 shrink-0">
                {item.method}
              </code>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        <h3 className="font-heading text-base font-600 mb-3">
          Message Parts
        </h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          A single message can carry multiple content types:{" "}
          <strong className="font-500 text-ink">TextPart</strong> (plain text),{" "}
          <strong className="font-500 text-ink">FilePart</strong> (base64-encoded
          files), and{" "}
          <strong className="font-500 text-ink">DataPart</strong> (structured
          JSON for forms and configs). Tasks move through states: submitted,
          working, completed, failed, cancelled, or input-required for
          multi-turn interactions.
        </p>
      </section>

      {/* Design principles */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          Design Principles
        </h2>
        <div className="space-y-px bg-rule">
          {[
            {
              principle: "Shared Poller",
              desc: "One MessageBusTrigger instance polls all agents with 3 concurrent workers. Never one poller per agent.",
            },
            {
              principle: "Cursor-Based Delivery",
              desc: "Fire-and-forget safety. Unprocessed messages re-trigger on next poll. Poison messages auto-skip after 3 failures.",
            },
            {
              principle: "Protocol Independence",
              desc: "MessageBusService abstract interface supports SQLite, MySQL, and future cloud API backends.",
            },
            {
              principle: "Autonomy with Guardrails",
              desc: "Agents handle bus messages autonomously but enforce reply discipline — no filler replies, no ping-pong loops.",
            },
          ].map((item) => (
            <div key={item.principle} className="bg-paper p-5">
              <span className="font-heading text-sm font-700">
                {item.principle}
              </span>
              <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
