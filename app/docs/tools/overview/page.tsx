import Link from "next/link";

export default function ToolsOverviewPage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Skills &amp; Tools
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        What Your Agent Can Do
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Every NarraNexus agent comes with built-in capabilities and can learn
        new ones from any public URL. No code changes required.
      </p>

      <hr className="border-rule mb-8" />

      {/* Two layers */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Built-in Tools
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Every agent ships with 46 tools across 7 modules. These are always
          available &mdash; the agent uses them to send messages, manage
          relationships, create background jobs, search knowledge bases, and
          more. Each module runs its own MCP server, and tools are collected
          automatically during context assembly.
        </p>
        <div className="space-y-px bg-rule mb-4">
          {[
            { module: "Awareness", count: "2 tools", examples: "update_awareness, update_agent_name" },
            { module: "Chat", count: "2 tools", examples: "send_message_to_user_directly, get_chat_history" },
            { module: "Social Network", count: "9 tools", examples: "extract_entity_info, search_social_network, contact_agent, ..." },
            { module: "Jobs", count: "7 tools", examples: "job_create, job_retrieval_semantic, job_update, ..." },
            { module: "Memory (RAG)", count: "3 tools", examples: "rag_query, rag_upload_file, rag_upload_text" },
            { module: "Skills", count: "3 tools", examples: "skill_save_config, skill_list_required_env, skill_save_study_summary" },
            { module: "Agent Comms", count: "11 tools", examples: "bus_send_message, bus_search_agents, bus_send_to_agent, ..." },
          ].map((item) => (
            <div key={item.module} className="bg-paper p-3 flex gap-6">
              <span className="font-heading text-xs font-600 w-28 shrink-0">
                {item.module}
              </span>
              <span className="font-mono text-[10px] text-muted w-16 shrink-0">
                {item.count}
              </span>
              <span className="font-body font-300 text-xs text-muted">
                {item.examples}
              </span>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          <Link
            href="/docs/tools/built-in-tools"
            className="font-500 text-ink underline"
          >
            Full tools reference &rarr;
          </Link>
        </p>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Extensible Skills
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Beyond built-in tools, agents can learn new capabilities from
          skill packages. A skill is an instruction set &mdash; a{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            SKILL.md
          </code>{" "}
          file that teaches the agent how to use a new API, service, or
          workflow. Point your agent at any public URL with a SKILL.md and
          it handles the rest: reads the instructions, registers accounts,
          saves credentials, sets up recurring tasks, and reports back what
          it can now do.
        </p>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Skills are available through{" "}
          <strong className="font-500 text-ink">ClawHub</strong>, a
          community marketplace, or from any public URL (GitHub, your own
          website, etc.).
        </p>

        <div className="space-y-4">
          <Link
            href="/docs/tools/create-a-skill"
            className="block border border-rule bg-paper p-6 hover:bg-paper-2/30 transition-colors"
          >
            <span className="font-heading text-base font-700">
              Create a Skill
            </span>
            <p className="font-body font-300 text-sm text-muted mt-1">
              How to write a SKILL.md and publish it for others to use
            </p>
            <span className="font-mono text-xs text-ink mt-2 block">
              Read guide &rarr;
            </span>
          </Link>

          <Link
            href="/docs/tools/learn-a-skill"
            className="block border border-rule bg-paper p-6 hover:bg-paper-2/30 transition-colors"
          >
            <span className="font-heading text-base font-700">
              Learn a Skill
            </span>
            <p className="font-body font-300 text-sm text-muted mt-1">
              How to teach your agent new capabilities from ClawHub or any
              URL
            </p>
            <span className="font-mono text-xs text-ink mt-2 block">
              Read guide &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* How they work together */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          How They Work Together
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Built-in tools and skills are complementary. Skills don&apos;t add
          new MCP tools &mdash; they teach the agent how to use its existing
          tools for new purposes:
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              example: "Arena42 skill",
              how: "Teaches the agent to use shell commands and HTTP calls to register on arena42.ai, then job_create to set up competition monitoring",
            },
            {
              example: "NexusMatrix skill",
              how: "Teaches the agent to use the Matrix protocol API for inter-agent messaging, with contact_agent for delivery",
            },
          ].map((item) => (
            <div key={item.example} className="bg-paper p-4 flex gap-6">
              <span className="font-heading text-sm font-700 w-32 shrink-0">
                {item.example}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.how}
              </span>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
          Think of built-in tools as the agent&apos;s hands, and skills as
          instruction manuals that teach it new things to do with those hands.
        </p>
      </section>

      {/* What skills are and aren't */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          What Skills Are (and Aren&apos;t)
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Skills are <strong className="font-500 text-ink">instruction
          packages</strong>, not code plugins. A skill teaches the agent how
          to use its existing tools for new purposes &mdash; it doesn&apos;t
          add new tools to the system.
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              can: true,
              item: "Teach the agent to use a new API or service",
            },
            {
              can: true,
              item: "Set up credentials and recurring background tasks",
            },
            {
              can: true,
              item: "Provide detailed instructions for complex workflows",
            },
            {
              can: false,
              item: "Add new MCP tools or modify the agent\u2019s core capabilities",
            },
            {
              can: false,
              item: "Run arbitrary code inside the agent process",
            },
          ].map((item, i) => (
            <div key={i} className="bg-paper p-3 flex gap-4">
              <span className={`font-mono text-xs shrink-0 mt-0.5 ${
                item.can ? "text-ink" : "text-muted"
              }`}>
                {item.can ? "Yes" : "No"}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.item}
              </span>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
          For how the SkillModule manages skills internally, see{" "}
          <Link
            href="/docs/modules/skills"
            className="font-500 text-ink underline"
          >
            Skills Module
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
