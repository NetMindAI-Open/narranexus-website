export default function ContextEngineeringPage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Core Concepts
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Context Engineering
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        What the agent actually sees when it thinks. How Narrative context,
        memory, module instructions, and tools are assembled into the LLM
        input for every interaction.
      </p>

      <hr className="border-rule mb-8" />

      {/* ── What the Agent Sees ── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          What the Agent Sees
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Every LLM call has two parts: a{" "}
          <strong className="font-500 text-ink">system prompt</strong> (stable
          context the model reads once) and a{" "}
          <strong className="font-500 text-ink">messages array</strong>{" "}
          (conversation turns the model follows). NarraNexus constructs both
          dynamically for every interaction.
        </p>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          Here is the structure of a typical agent call, from top to bottom:
        </p>

        {/* System prompt breakdown */}
        <div className="border border-rule mb-6">
          <div className="bg-ink/8 px-5 py-3 border-b border-rule">
            <span className="font-heading text-sm font-700">System Prompt</span>
            <span className="font-mono text-[10px] text-muted ml-3">
              read once, cached
            </span>
          </div>

          <div className="divide-y divide-rule">
            {[
              {
                section: "Narrative Context",
                source: "Narrative",
                content:
                  "The selected Narrative\u2019s name, description, dynamic summary, participant list, and timestamps. This tells the agent what storyline it\u2019s in and what has happened so far.",
              },
              {
                section: "Relevant Memory",
                source: "EverMemOS",
                content:
                  "If EverMemOS is enabled, semantically relevant episodes from past conversations are injected here. These are retrieved in parallel during pipeline initialization and provide deep cross-session recall.",
              },
              {
                section: "Auxiliary Narratives",
                source: "Narrative",
                content:
                  "Brief summaries of up to two other recent storylines, giving the agent cross-topic awareness. The agent knows what else you\u2019ve been working on without loading full histories.",
              },
              {
                section: "Module Instructions",
                source: "Modules",
                content:
                  "Each active module contributes an instruction block describing its tools and how to use them. Sorted by priority (Awareness first, then Chat, Jobs, etc.) and deduplicated \u2014 even if multiple instances of a module exist, instructions appear only once.",
              },
              {
                section: "Cross-Topic Memory",
                source: "ChatModule",
                content:
                  "Recent messages (up to 15) from other Narratives \u2014 conversations about different topics. Gives the agent the ability to reference what you \u201Cjust said\u201D even if it was in a different storyline. Budget: 40,000 characters.",
              },
              {
                section: "Bootstrap",
                source: "Creator",
                content:
                  "On the first 3 interactions only, the agent creator\u2019s Bootstrap.md is injected at highest priority. This provides initial personality, goals, and constraints. It expires automatically once the AwarenessModule has built a persistent profile.",
              },
            ].map((item) => (
              <div key={item.section} className="p-4 flex gap-5">
                <div className="w-40 shrink-0">
                  <span className="font-heading text-sm font-600">
                    {item.section}
                  </span>
                  <p className="font-mono text-[10px] text-muted mt-0.5">
                    {item.source}
                  </p>
                </div>
                <p className="font-body font-300 text-sm text-muted leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Messages array */}
        <div className="border border-rule mb-6">
          <div className="bg-ink/8 px-5 py-3 border-b border-rule">
            <span className="font-heading text-sm font-700">
              Messages Array
            </span>
            <span className="font-mono text-[10px] text-muted ml-3">
              conversation turns
            </span>
          </div>

          <div className="divide-y divide-rule">
            {[
              {
                section: "Current Topic History",
                source: "ChatModule",
                content:
                  "The most recent 30 messages from the current Narrative\u2019s ChatModule instance, as chronological user/assistant pairs. Each message is truncated at 4,000 characters to prevent any single paste from dominating context. This is the long-term memory for the active storyline.",
              },
              {
                section: "Current Message",
                source: "User",
                content:
                  "The user\u2019s input for this turn \u2014 the message that triggered this pipeline run.",
              },
            ].map((item) => (
              <div key={item.section} className="p-4 flex gap-5">
                <div className="w-40 shrink-0">
                  <span className="font-heading text-sm font-600">
                    {item.section}
                  </span>
                  <p className="font-mono text-[10px] text-muted mt-0.5">
                    {item.source}
                  </p>
                </div>
                <p className="font-body font-300 text-sm text-muted leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MCP Tools */}
        <div className="border border-rule">
          <div className="bg-ink/8 px-5 py-3 border-b border-rule">
            <span className="font-heading text-sm font-700">
              Available Tools
            </span>
            <span className="font-mono text-[10px] text-muted ml-3">
              MCP tool servers
            </span>
          </div>

          <div className="p-4">
            <p className="font-body font-300 text-sm text-muted leading-relaxed">
              Each active module&apos;s MCP server URL is collected and passed
              to the agent framework. The LLM discovers available tools
              automatically. URLs are deduplicated by module class &mdash; if
              three JobModule instances exist, only one MCP URL is registered.
              See{" "}
              <a
                href="/docs/tools/overview"
                className="font-500 text-ink underline"
              >
                Tools &amp; MCP
              </a>{" "}
              for the full tool architecture.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why This Structure ── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Why This Structure
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          The placement of each piece is deliberate, optimized for how language
          models process context:
        </p>

        <div className="space-y-px bg-rule">
          {[
            {
              decision: "Narrative summary in system prompt",
              reason:
                "The system prompt is read once and cached. Putting the storyline overview here gives the agent broad awareness without consuming message slots. It\u2019s the agent\u2019s \u201Cbriefing\u201D before the conversation starts.",
            },
            {
              decision: "Chat history as message pairs",
              reason:
                "Conversation turns in the messages array let the LLM follow the dialogue naturally. The model treats them as real exchanges, maintaining coherence and tone across turns.",
            },
            {
              decision: "Cross-topic memory in system prompt",
              reason:
                "Short-term memory from other Narratives belongs in the system prompt because it\u2019s reference material, not part of the current conversation. The agent can use it (\u201Clike you mentioned earlier\u201D) without it cluttering the dialogue flow.",
            },
            {
              decision: "Module instructions sorted by priority",
              reason:
                "Awareness comes first (defines who the agent is), Chat second (defines how it communicates), then task modules. This ordering mirrors how a person would process context \u2014 identity before tools.",
            },
          ].map((item) => (
            <div key={item.decision} className="bg-paper p-4">
              <span className="font-heading text-sm font-700">
                {item.decision}
              </span>
              <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed">
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How Modules Contribute ── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          How Modules Contribute
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Context assembly is not centralized &mdash; each module enriches the
          context through its{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            hook_data_gathering
          </code>{" "}
          hook, called sequentially before execution. This keeps context
          construction modular: add a module, and its data automatically appears
          in the agent&apos;s context.
        </p>

        <div className="space-y-px bg-rule">
          {[
            {
              module: "ChatModule",
              contributes:
                "Long-term memory (current Narrative history) and short-term memory (cross-Narrative recent messages)",
            },
            {
              module: "AwarenessModule",
              contributes:
                "Agent identity profile \u2014 role, personality, goals, injected as the awareness placeholder in instructions",
            },
            {
              module: "SocialNetworkModule",
              contributes:
                "Entity profiles for the current user and any relevant agents or groups",
            },
            {
              module: "JobModule",
              contributes:
                "Active job descriptions, progress, and completion conditions",
            },
            {
              module: "SkillModule",
              contributes:
                "Installed skill definitions and workspace rules",
            },
            {
              module: "MemoryModule",
              contributes:
                "EverMemOS episode search results (launched in parallel, awaited before execution)",
            },
          ].map((item) => (
            <div key={item.module} className="bg-paper p-3 flex gap-5">
              <span className="font-heading text-sm font-600 w-40 shrink-0">
                {item.module}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.contributes}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── What's Next ── */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          What&apos;s Next
        </h2>
        <div className="space-y-px bg-rule">
          {[
            {
              label: "Memory",
              desc: "Deep dive into builtin memory budgets and EverMemOS episode retrieval",
              href: "/docs/modules/memory",
            },
            {
              label: "Tools & MCP",
              desc: "How module tools are exposed and discovered by the agent",
              href: "/docs/tools/overview",
            },
            {
              label: "Architecture",
              desc: "The runtime pipeline that drives context assembly",
              href: "/docs/core-concepts/architecture",
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
