export default function SocialNetworkModulePage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Modules
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Social Network Module
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        A persistent social graph of users, agents, and groups. Captures
        identity, expertise, contact details, and behavioral personas that
        evolve through conversation analysis.
      </p>

      <hr className="border-rule mb-8" />

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">Entity Types</h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          The social graph tracks three types of entities. Concepts, platforms,
          and APIs are{" "}
          <strong className="font-500 text-ink">not entities</strong> &mdash;
          they belong as keywords.
        </p>
        <div className="space-y-px bg-rule">
          {[
            { type: "user", desc: "Human users interacting with the agent" },
            { type: "agent", desc: "Other AI agents in the system" },
            { type: "group", desc: "Teams or squads acting as a collective" },
          ].map((item) => (
            <div key={item.type} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-20 shrink-0">
                {item.type}
              </code>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Entity Structure
        </h2>
        <div className="space-y-px bg-rule">
          {[
            { field: "entity_description", desc: "Natural language description, auto-updated via LLM after conversations" },
            { field: "identity_info", desc: "Structured fields \u2014 organization, position, background" },
            { field: "contact_info", desc: "Multi-channel contacts \u2014 email, matrix, slack (nested JSON, deep-merge friendly)" },
            { field: "keywords", desc: "3\u20135 contextual tags \u2014 topics, domains, expertise levels (strictly enforced)" },
            { field: "persona", desc: "Communication persona auto-generated from conversation patterns" },
            { field: "embedding", desc: "Semantic vector for similarity search across the graph" },
          ].map((item) => (
            <div key={item.field} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-36 shrink-0">
                {item.field}
              </code>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          How the Graph Updates
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Entity data is updated through two complementary mechanisms. The
          module exposes tools that the agent uses to capture information as
          it flows through conversations:
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              when: "During conversation",
              how: "When a person introduces themselves or shares structured info (tags, contact, identity), the agent calls extract_entity_info to immediately update the entity record.",
            },
            {
              when: "After conversation",
              how: "A post-execution hook analyzes the full exchange via LLM, appends new information to the entity description, updates interaction count and communication persona automatically.",
            },
          ].map((item) => (
            <div key={item.when} className="bg-paper p-4 flex gap-6">
              <span className="font-heading text-sm font-700 w-36 shrink-0">
                {item.when}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.how}
              </span>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
          The agent can also search the graph semantically using{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            search_social_network
          </code>{" "}
          to find people by expertise, domain, or role, look up contact
          details with{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            get_contact_info
          </code>
          , or reach out to someone through their best available channel
          via{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            contact_agent
          </code>
          . When duplicate entities are detected, they can be consolidated
          with{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            merge_entities
          </code>
          .
        </p>
      </section>

      {/* Tool reference */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          Tools
        </h2>
        <div className="space-y-px bg-rule">
          {[
            { tool: "extract_entity_info", desc: "Update entity identity, contact, tags, keywords" },
            { tool: "search_social_network", desc: "Semantic search by expertise, domain, or role" },
            { tool: "get_contact_info", desc: "Quick contact lookup for a known entity" },
            { tool: "get_agent_social_stats", desc: "Relationship summary \u2014 recent interactions, strongest ties" },
            { tool: "contact_agent", desc: "Send message to entity through best available channel" },
            { tool: "check_channel_updates", desc: "Check for updates across all registered channels" },
            { tool: "merge_entities", desc: "Consolidate duplicate entity records" },
          ].map((item) => (
            <div key={item.tool} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-44 shrink-0">
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
