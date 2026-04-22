export default function AwarenessModulePage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Modules
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Awareness Module
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        The agent&apos;s persistent self-knowledge &mdash; who it is, how
        you like to work, and how it should behave. Updated continuously
        from conversations, injected into every interaction.
      </p>

      <hr className="border-rule mb-8" />

      {/* Overview */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">Overview</h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          The AwarenessModule maintains a structured profile for each agent
          that shapes all of its behavior. Unlike static configuration, this
          profile evolves over time as the agent learns from conversations.
          It is injected into the system prompt on every interaction, so the
          agent always knows who it is and how you prefer to work.
        </p>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          The profile is organized into four dimensions:
        </p>

        <div className="space-y-px bg-rule">
          {[
            {
              dim: "Topic Organization",
              desc: "How the user likes topics grouped, continuity vs. multi-tasking, Narrative switching preferences",
            },
            {
              dim: "Task Execution",
              desc: "Work style \u2014 task granularity, tool usage patterns, proactivity level, background task preferences",
            },
            {
              dim: "Communication",
              desc: "Interaction preferences \u2014 tone, response format, explanation depth, language",
            },
            {
              dim: "Role & Identity",
              desc: "The agent\u2019s role definition, capability boundaries, and behavioral principles",
            },
          ].map((item) => (
            <div key={item.dim} className="bg-paper p-4 flex gap-6">
              <span className="font-heading text-sm font-700 w-40 shrink-0">
                {item.dim}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
          When an agent is first created, it starts with a generic awareness
          profile. As conversations happen, the agent builds this profile
          into a rich, structured document that persists across all sessions.
        </p>
      </section>

      {/* How Awareness Updates */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          How Awareness Updates
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          The agent itself decides when to update its awareness profile. It
          is guided by instructions that tell it what to watch for and what
          to record. There are two types of signals:
        </p>

        <div className="space-y-px bg-rule mb-6">
          {[
            {
              signal: "Explicit feedback",
              confidence: "High",
              action: "Record immediately",
              examples:
                "\"Always use bullet points\", \"I prefer formal tone\", \"You are a research assistant focused on AI papers\"",
            },
            {
              signal: "Implicit patterns",
              confidence: "Medium",
              action: "Observe 2\u20133 times before recording",
              examples:
                "User repeatedly asks for shorter answers, consistently corrects formatting, shows preference for step-by-step breakdowns",
            },
          ].map((item) => (
            <div key={item.signal} className="bg-paper p-5">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-heading text-sm font-700">
                  {item.signal}
                </span>
                <span className="font-mono text-[10px] text-muted">
                  {item.confidence} confidence &middot; {item.action}
                </span>
              </div>
              <p className="font-body font-300 text-sm text-muted leading-relaxed">
                {item.examples}
              </p>
            </div>
          ))}
        </div>

        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Crucially, the agent is instructed to{" "}
          <strong className="font-500 text-ink">
            never record one-time requests or temporary context
          </strong>
          . If you say &ldquo;summarize this in French&rdquo; once, that
          doesn&apos;t become a permanent preference. Only persistent
          patterns and explicit instructions are saved.
        </p>

        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          When the agent detects something worth recording, it calls{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            update_awareness
          </code>{" "}
          with the complete updated profile. The profile is stored as a
          Markdown document &mdash; the agent maintains the full structured
          format on every update, merging new observations into the existing
          sections. If the user defines the agent&apos;s identity
          (&ldquo;your name is Atlas&rdquo;), the agent calls{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            update_agent_name
          </code>{" "}
          to update its display name accordingly.
        </p>
      </section>

      {/* Tool reference */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          Tools
        </h2>
        <div className="space-y-px bg-rule">
          {[
            {
              tool: "update_awareness",
              desc: "Replace the awareness profile with an updated Markdown document",
            },
            {
              tool: "update_agent_name",
              desc: "Update the agent\u2019s display name",
            },
          ].map((item) => (
            <div key={item.tool} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-40 shrink-0">
                {item.tool}
              </code>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
