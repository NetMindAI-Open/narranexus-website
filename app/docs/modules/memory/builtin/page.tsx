export default function BuiltinMemoryPage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Modules &middot; Memory
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Builtin Memory
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        The default memory system &mdash; dual-track conversation history with
        vector search. No external services required. Sufficient for most use
        cases.
      </p>

      <hr className="border-rule mb-8" />

      {/* What it provides */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          What It Provides
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Builtin memory gives agents two complementary views of conversation
          history, loaded automatically by the ChatModule during every pipeline
          run.
        </p>

        <div className="space-y-px bg-rule">
          {[
            {
              track: "Short-term Memory",
              desc: "The 15 most recent messages from other Narratives (other topics). Gives the agent cross-topic awareness — it knows what you were just talking about even if the current Narrative is different. Serialized into the system prompt as a \"Recent Other Topics\" section.",
            },
            {
              track: "Long-term Memory",
              desc: "The current Narrative's full conversation history, limited to the 30 most recent messages. Included as chronological message pairs in the LLM messages array. Per-message truncation at 4,000 characters prevents any single paste from dominating context.",
            },
            {
              track: "Vector Search",
              desc: "Narratives and Events carry embedding vectors (1536 dimensions). When a user switches topics, the system searches existing Narratives by vector similarity to find the right storyline to resume — or creates a new one if the topic is genuinely new.",
            },
          ].map((item) => (
            <div key={item.track} className="bg-paper p-5">
              <span className="font-heading text-sm font-700">
                {item.track}
              </span>
              <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          How It Works
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          The ChatModule&apos;s{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            hook_data_gathering
          </code>{" "}
          method loads memory in a specific sequence:
        </p>

        <div className="border border-rule bg-paper-2/30 p-6">
          <ol className="list-none space-y-3">
            {[
              "Load long-term memory from the current Narrative's ChatModule instances",
              "Load short-term memory: recent messages from all other Narratives for this user",
              "Tag each message with memory_type (long_term or short_term) and source instance_id",
              "For non-chat sources (jobs, A2A): only load the assistant side to avoid clutter",
              "Merge, sort, and return the combined history into ContextData",
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
      </section>

      {/* Memory in the LLM context */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Memory in the LLM Context
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          The two memory tracks occupy different positions in the final LLM
          call, optimized for how language models process context:
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              position: "System prompt",
              content: "Short-term memory (cross-topic) + Narrative summary + module instructions",
              why: "System prompt is read once and cached. Cross-topic context here gives broad awareness without consuming message slots.",
            },
            {
              position: "Messages array",
              content: "Long-term memory (current topic) as user/assistant pairs",
              why: "Conversation turns in the messages array let the LLM follow the thread naturally, maintaining dialogue coherence.",
            },
          ].map((item) => (
            <div key={item.position} className="bg-paper p-5">
              <div className="flex gap-6 mb-1">
                <span className="font-heading text-sm font-700 w-32 shrink-0">
                  {item.position}
                </span>
                <span className="font-body font-300 text-sm text-muted">
                  {item.content}
                </span>
              </div>
              <p className="font-body font-300 text-xs text-muted mt-2 leading-relaxed">
                {item.why}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Budgets */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Memory Budgets
        </h2>
        <div className="space-y-px bg-rule">
          {[
            { param: "Long-term messages", value: "30 most recent" },
            { param: "Short-term messages", value: "15 most recent (cross-Narrative)" },
            { param: "Per-message truncation", value: "4,000 characters" },
            { param: "Short-term budget", value: "40,000 characters total" },
          ].map((item) => (
            <div key={item.param} className="bg-paper p-3 flex gap-6">
              <span className="font-body font-300 text-sm text-muted flex-1">
                {item.param}
              </span>
              <code className="font-mono text-xs text-ink shrink-0">
                {item.value}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* When to use */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          When To Use
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Builtin memory is the right choice for most deployments:
        </p>
        <ul className="list-none space-y-1.5">
          {[
            "Local development and testing — zero setup, works immediately",
            "Single-user or small-team agents with moderate conversation history",
            "Agents where topic-switching and cross-session continuity are needed but conversation depth is manageable",
            "Any deployment where you want to avoid external infrastructure dependencies",
          ].map((item) => (
            <li
              key={item}
              className="font-body font-300 text-sm text-muted flex items-start gap-2"
            >
              <span className="w-1 h-1 bg-muted block shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
          If you need deeper cross-session recall across hundreds of
          conversations, consider adding{" "}
          <a
            href="/docs/modules/memory/evermemos"
            className="font-500 text-ink underline"
          >
            EverMemOS
          </a>{" "}
          alongside builtin memory.
        </p>
      </section>
    </article>
  );
}
