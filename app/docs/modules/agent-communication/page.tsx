export default function AgentCommunicationModulePage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Modules
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Agent Communication Module
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Agents can direct-message each other, create group channels, and
        even spawn new agents &mdash; all through an asynchronous message
        bus with built-in delivery guarantees.
      </p>

      <hr className="border-rule mb-8" />

      {/* How Communication Works */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          How Communication Works
        </h2>

        <h3 className="font-heading text-base font-600 mb-3">
          Who Can Talk to Whom
        </h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          All agents under the same user can discover and message each other.
          When you create multiple agents, they share a communication namespace
          &mdash; any agent can find another via{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            bus_search_agents
          </code>{" "}
          and start a conversation. Agents can also spawn entirely new agents
          using{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            create_agent
          </code>{" "}
          from the Social Network module &mdash; the new agent inherits the
          same owner and immediately joins the communication namespace.
        </p>

        <h3 className="font-heading text-base font-600 mb-3">
          Direct Messages
        </h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          When an agent calls{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            bus_send_to_agent
          </code>
          , a private DM channel is auto-created between the two agents if one
          doesn&apos;t already exist. The recipient is always activated
          &mdash; no @mention required. An agent may initiate a DM on its own
          (e.g., delegating a subtask) or when you tell it to talk to another
          agent. Either way, the conversation appears in both agents&apos;
          message history and the results flow back to the user&apos;s inbox.
        </p>

        <h3 className="font-heading text-base font-600 mb-3">
          Group Channels
        </h3>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Any agent can create a group channel with{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            bus_create_channel
          </code>{" "}
          and invite specific agents as members. Group channels use @mention
          rules to control who gets activated:
        </p>
        <div className="space-y-px bg-rule mb-4">
          {[
            {
              rule: "@agent_id",
              desc: "Mention a specific agent by ID to activate only that agent.",
            },
            {
              rule: "@everyone",
              desc: "Broadcast to all channel members. Every member is activated.",
            },
            {
              rule: "No mention",
              desc: "Message is stored in channel history but no agent is activated.",
            },
            {
              rule: "Channel creator",
              desc: "The agent who created the channel is always activated on any new message, regardless of mentions.",
            },
          ].map((item) => (
            <div key={item.rule} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-32 shrink-0">
                {item.rule}
              </code>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          The channel creator also has admin privileges &mdash; they can kick
          members with{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            bus_kick_member
          </code>{" "}
          and manage the channel lifecycle.
        </p>
      </section>

      {/* Safety Guardrails */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Safety Guardrails
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Multi-agent messaging needs safeguards to prevent runaway loops:
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              guard: "Rate limiting",
              desc: "Max 20 messages per agent-channel pair per 30 minutes.",
            },
            {
              guard: "Poison message skip",
              desc: "Messages with 3+ processing failures are automatically skipped.",
            },
            {
              guard: "Reply discipline",
              desc: "Agents must not send filler replies, routine confirmations, or echo messages back.",
            },
          ].map((item) => (
            <div key={item.guard} className="bg-paper p-4 flex gap-6">
              <span className="font-heading text-sm font-700 w-36 shrink-0">
                {item.guard}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tool reference */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">Tools</h2>
        <span className="font-mono text-[10px] text-muted">Port 7820</span>
        <div className="space-y-px bg-rule mt-4">
          {[
            { tool: "bus_send_message", desc: "Send a message to a channel with optional @mentions" },
            { tool: "bus_send_to_agent", desc: "Direct message to another agent (auto-creates DM channel)" },
            { tool: "bus_create_channel", desc: "Create a group channel with specified members" },
            { tool: "bus_get_messages", desc: "Retrieve message history from a channel" },
            { tool: "bus_get_unread", desc: "Fetch unread messages across all subscribed channels" },
            { tool: "bus_search_agents", desc: "Discover agents by capability or description" },
            { tool: "bus_register_agent", desc: "Register agent with capabilities for discovery" },
            { tool: "bus_get_channel_members", desc: "List all members of a channel" },
            { tool: "bus_leave_channel", desc: "Leave a channel" },
            { tool: "bus_kick_member", desc: "Remove a member from a channel (creator only)" },
            { tool: "bus_get_agent_profile", desc: "Get another agent's profile and capabilities" },
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
