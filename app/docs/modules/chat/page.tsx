export default function ChatModulePage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Modules
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Chat Module
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Manages conversational sessions between agent and user. Each session
        is scoped to a Narrative, giving the agent topic-aware memory and
        isolated conversation history.
      </p>

      <hr className="border-rule mb-8" />

      {/* Session Management */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Session Management
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          The ChatModule creates one session (instance) per user per{" "}
          <a
            href="/docs/core-concepts/narrative"
            className="font-500 text-ink underline"
          >
            Narrative
          </a>
          . When you talk about project planning, that conversation lives in
          one session. When you switch to a personal topic, a different session
          tracks that history. This means:
        </p>

        <div className="space-y-px bg-rule mb-4">
          {[
            {
              point: "Topic isolation",
              desc: "Conversations about different topics don\u2019t bleed into each other. Each session carries its own history.",
            },
            {
              point: "Automatic scoping",
              desc: "When the Narrative system routes your message to a topic, the matching ChatModule session is loaded automatically.",
            },
            {
              point: "Cross-topic awareness",
              desc: "While sessions are isolated, the agent still loads recent messages from other sessions so it knows what you were just discussing.",
            },
          ].map((item) => (
            <div key={item.point} className="bg-paper p-4 flex gap-6">
              <span className="font-heading text-sm font-700 w-40 shrink-0">
                {item.point}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          Sessions are created dynamically &mdash; there is no fixed
          &ldquo;main&rdquo; session. The agent can also retrieve past
          conversation history from any session using{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            get_chat_history
          </code>
          , which is useful when it needs to recall what was said in a
          specific topic.
        </p>
      </section>

      {/* How Communication Works */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          How Communication Works
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          A core design principle in NarraNexus: all agent reasoning, tool
          calls, and internal processing are{" "}
          <strong className="font-500 text-ink">invisible to the user</strong>.
          The only way an agent delivers a visible message is by calling{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            send_message_to_user_directly
          </code>
          .
        </p>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          This gives the agent full control over what users see. Background
          tasks complete silently, routine operations stay hidden, and only
          meaningful results are surfaced. The agent follows delivery
          discipline:
        </p>

        <div className="space-y-px bg-rule">
          {[
            {
              situation: "User talks directly",
              behavior: "Always respond with a visible message",
            },
            {
              situation: "Background job completes",
              behavior: "Send the final report, not progress updates",
            },
            {
              situation: "IM channel message received",
              behavior: "Only forward if @mentioned, urgent, or critical",
            },
            {
              situation: "Routine processing",
              behavior: "Stay silent \u2014 no confirmations or status updates",
            },
          ].map((item) => (
            <div key={item.situation} className="bg-paper p-3 flex gap-6">
              <span className="font-body font-300 text-sm text-muted flex-1">
                {item.situation}
              </span>
              <span className="font-heading text-xs font-600 shrink-0">
                {item.behavior}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* What Gets Recorded */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          What Gets Recorded
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          After each interaction, the ChatModule persists three things:
        </p>

        <div className="space-y-px bg-rule mb-4">
          {[
            {
              what: "Conversation history",
              desc: "The user\u2019s message and the agent\u2019s visible reply are appended to the session\u2019s message store. For background tasks where the agent chose not to message the user, a lightweight activity summary is stored instead.",
            },
            {
              what: "Status report",
              desc: "A compact summary of the session state (conversation count, latest exchange) stored at the Narrative level. Used by the Narrative system when making routing decisions.",
            },
            {
              what: "Message embeddings",
              desc: "Each user\u2013agent message pair is embedded as a vector, enabling semantic search over older conversations for future retrieval.",
            },
          ].map((item) => (
            <div key={item.what} className="bg-paper p-5">
              <span className="font-heading text-sm font-700">
                {item.what}
              </span>
              <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          This recorded history is what the agent sees as context in future
          conversations. For details on how memory is loaded and budgeted, see{" "}
          <a
            href="/docs/modules/memory/builtin"
            className="font-500 text-ink underline"
          >
            Builtin Memory
          </a>
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
            {
              tool: "send_message_to_user_directly",
              desc: "Deliver a visible message to the user",
            },
            {
              tool: "get_chat_history",
              desc: "Retrieve past conversation from a specific session",
            },
          ].map((item) => (
            <div key={item.tool} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-56 shrink-0">
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
