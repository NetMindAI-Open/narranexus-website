export default function NarrativePage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Core Concepts
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Narrative
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Narratives give agents continuity, context, and a sense of ongoing
        relationships. They are the reason an agent can resume a conversation
        weeks later and still know what you were working on.
      </p>

      <hr className="border-rule mb-8" />

      {/* ── 1. What is a Narrative ── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          What is a Narrative?
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          A Narrative is not a chat session. It is a{" "}
          <strong className="font-500 text-ink">persistent storyline</strong>{" "}
          &mdash; a semantic container that groups related conversations across
          sessions, days, or even the lifetime of an agent. When you talk about
          &ldquo;building a recommendation system&rdquo; today and come back to
          it next week, the agent routes you to the same Narrative and picks up
          where you left off.
        </p>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          Narratives do more than organize chat history. They are the anchor
          for everything that belongs to a topic:
        </p>

        <div className="space-y-px bg-rule mb-6">
          {[
            {
              role: "Memory continuity",
              desc: "Each Narrative holds an ordered list of Events (interactions) and a dynamic summary that evolves with every conversation turn. When the agent is routed to a Narrative, it gets the full context of that storyline.",
            },
            {
              role: "Module binding",
              desc: "Active module instances \u2014 running jobs, chat histories, skill study sessions \u2014 are bound to the Narrative they belong to. Switch topics, and the agent\u2019s active toolset switches with it.",
            },
            {
              role: "Social context",
              desc: "Each Narrative tracks its participants (users, agents, system) with roles. The agent knows who is involved in this storyline and what their relationship is.",
            },
            {
              role: "Goal persistence",
              desc: "Long-running goals (an ONGOING job, a multi-session research project) stay alive as long as their Narrative exists. The agent can be reminded of stale goals and pick them back up.",
            },
          ].map((item) => (
            <div key={item.role} className="bg-paper p-4">
              <span className="font-heading text-sm font-700">
                {item.role}
              </span>
              <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. How Narratives are Created ── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          How Narratives Are Created
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          Narratives come into existence through two paths.
        </p>

        {/* Default Narratives */}
        <div className="mb-8">
          <h3 className="font-heading text-lg font-700 mb-3">
            Default Narratives
          </h3>
          <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
            When an agent is created, the system generates eight default
            Narratives for each user. These cover common interaction patterns
            that don&apos;t warrant a dedicated topic:
          </p>
          <div className="space-y-px bg-rule mb-4">
            {[
              {
                code: "N-01",
                name: "Greeting & Courtesy",
                desc: "Hello, goodbye, small talk",
              },
              {
                code: "N-02",
                name: "Casual Chat",
                desc: "Emotional expression, venting, casual conversation",
              },
              {
                code: "N-03",
                name: "Jokes & Entertainment",
                desc: "Pure entertainment requests",
              },
              {
                code: "N-04",
                name: "Agent Help",
                desc: "Questions about the agent\u2019s features and capabilities",
              },
              {
                code: "N-05",
                name: "Persona Configuration",
                desc: "Setting the agent\u2019s identity and personality",
              },
              {
                code: "N-06",
                name: "Task Lookup",
                desc: "Viewing or searching task lists",
              },
              {
                code: "N-07",
                name: "General One-Shot Question",
                desc: "Independent questions with no follow-up",
              },
              {
                code: "N-08",
                name: "Unclassified",
                desc: "Fallback for unparseable input",
              },
            ].map((item) => (
              <div key={item.code} className="bg-paper p-3 flex gap-4">
                <span className="font-mono text-xs text-muted w-10 shrink-0">
                  {item.code}
                </span>
                <span className="font-heading text-sm font-600 w-44 shrink-0">
                  {item.name}
                </span>
                <span className="font-body font-300 text-sm text-muted">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
          <p className="font-body font-300 text-sm text-muted leading-relaxed">
            Default Narratives have strict topic boundaries. The moment a user
            mentions a specific object or task, the system switches to a
            dedicated Narrative. Default Narratives also receive minimal
            updates &mdash; no LLM summary refresh, no embedding update.
          </p>
        </div>

        {/* Conversation-driven Narratives */}
        <div>
          <h3 className="font-heading text-lg font-700 mb-3">
            Conversation-Driven Narratives
          </h3>
          <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
            When the agent detects a genuinely new topic that doesn&apos;t
            match any existing Narrative, it creates a new one automatically.
            The system:
          </p>
          <div className="border border-rule bg-paper-2/30 p-5">
            <ol className="list-none space-y-2.5">
              {[
                "Extracts and summarizes a name and description from the user\u2019s message",
                "Creates an embedding vector for future semantic retrieval",
                "Initializes a dynamic summary that updates as the conversation progresses",
                "Binds module instances (ChatModule and others) \u2014 connecting the Narrative to the capabilities the agent needs for this topic",
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
          <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
            From this point on, the Narrative lives independently. It
            accumulates Events, updates its summary after every interaction,
            and refreshes its routing embedding periodically so that future
            messages about the same topic find their way back.
          </p>
        </div>
      </section>

      {/* ── 3. How Narratives Work in Conversation ── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          How Narratives Work in Conversation
        </h2>

        {/* Selection */}
        <div className="mb-10">
          <h3 className="font-heading text-lg font-700 mb-3">
            Narrative Selection
          </h3>
          <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
            When a message arrives, the system must decide which Narrative it
            belongs to. This happens in three stages during Step 1 of the{" "}
            <a
              href="/docs/core-concepts/architecture"
              className="font-500 text-ink underline"
            >
              runtime pipeline
            </a>
            .
          </p>

          <div className="space-y-6 mb-4">
            {/* Stage 1 */}
            <div className="border border-rule">
              <div className="bg-paper-2/30 px-5 py-3 border-b border-rule flex items-center gap-3">
                <span className="font-mono text-xs text-ink">Stage 1</span>
                <h4 className="font-heading text-sm font-700">
                  Continuity Detection
                </h4>
              </div>
              <div className="p-5">
                <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
                  If the user has an active session with a current Narrative,
                  an LLM call checks whether the new message belongs to the
                  same storyline. It compares the previous query and response
                  against the current message, the Narrative&apos;s summary
                  and keywords, and the time elapsed.
                </p>
                <p className="font-body font-300 text-sm text-muted leading-relaxed">
                  Key insight:{" "}
                  <strong className="font-500 text-ink">
                    conversational continuity &ne; same Narrative
                  </strong>
                  . A user may speak continuously but switch topics.
                  Continuity is judged by{" "}
                  <em>business intent</em>, not surface-level phrasing.
                </p>
                <div className="mt-3 space-y-px bg-rule">
                  <div className="bg-paper p-2.5 flex gap-4">
                    <span className="font-mono text-xs text-ink w-20 shrink-0">
                      Continuous
                    </span>
                    <span className="font-body font-300 text-xs text-muted">
                      Stay in current Narrative. Retrieve auxiliary Narratives
                      for cross-topic awareness.
                    </span>
                  </div>
                  <div className="bg-paper p-2.5 flex gap-4">
                    <span className="font-mono text-xs text-ink w-20 shrink-0">
                      Topic shift
                    </span>
                    <span className="font-body font-300 text-xs text-muted">
                      Proceed to Stage 2 &mdash; find the right Narrative.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="border border-rule">
              <div className="bg-paper-2/30 px-5 py-3 border-b border-rule flex items-center gap-3">
                <span className="font-mono text-xs text-ink">Stage 2</span>
                <h4 className="font-heading text-sm font-700">
                  Semantic Search
                </h4>
              </div>
              <div className="p-5">
                <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
                  The user&apos;s message is converted to an embedding vector
                  and compared against the routing embeddings of all existing
                  Narratives. Candidates are ranked by similarity score.
                </p>
                <p className="font-body font-300 text-sm text-muted leading-relaxed">
                  If{" "}
                  <a
                    href="/docs/modules/memory/evermemos"
                    className="font-500 text-ink underline"
                  >
                    EverMemOS
                  </a>{" "}
                  is enabled, it provides hybrid search (BM25 keyword +
                  vector similarity via Reciprocal Rank Fusion), producing
                  more accurate candidate scoring. Otherwise, the system
                  falls back to native vector search with cosine similarity.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="border border-rule">
              <div className="bg-paper-2/30 px-5 py-3 border-b border-rule flex items-center gap-3">
                <span className="font-mono text-xs text-ink">Stage 3</span>
                <h4 className="font-heading text-sm font-700">
                  Agent Decision
                </h4>
              </div>
              <div className="p-5">
                <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
                  The system routes based on the similarity score:
                </p>
                <div className="space-y-px bg-rule">
                  <div className="bg-paper p-2.5 flex gap-4">
                    <span className="font-mono text-xs text-ink w-28 shrink-0">
                      High confidence
                    </span>
                    <span className="font-body font-300 text-xs text-muted">
                      Score above threshold (&ge; 0.70) &mdash; return the
                      match directly, no LLM call needed.
                    </span>
                  </div>
                  <div className="bg-paper p-2.5 flex gap-4">
                    <span className="font-mono text-xs text-ink w-28 shrink-0">
                      Uncertain
                    </span>
                    <span className="font-body font-300 text-xs text-muted">
                      Score in the mid-range &mdash; an LLM judges across
                      the top candidates, default Narratives, and any
                      participant Narratives to pick the best match.
                    </span>
                  </div>
                  <div className="bg-paper p-2.5 flex gap-4">
                    <span className="font-mono text-xs text-ink w-28 shrink-0">
                      No match
                    </span>
                    <span className="font-body font-300 text-xs text-muted">
                      No candidate is close enough &mdash; create a new
                      Narrative for this topic.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What a Narrative carries */}
        <div className="mb-10">
          <h3 className="font-heading text-lg font-700 mb-3">
            What a Narrative Carries into the Conversation
          </h3>
          <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
            Once a Narrative is selected, it loads everything the agent needs
            to continue the storyline. This is what makes cross-session memory
            work &mdash; the context isn&apos;t rebuilt from scratch, it&apos;s
            restored from the Narrative.
          </p>

          <div className="space-y-px bg-rule">
            {[
              {
                what: "Chat history",
                where: "Messages array",
                desc: "The ChatModule instance bound to this Narrative provides the recent conversation history (up to 30 messages). Each user gets their own ChatModule instance, so multi-party Narratives maintain independent conversation threads.",
              },
              {
                what: "Dynamic summary",
                where: "System prompt",
                desc: "An LLM-maintained rolling summary of what has happened in this storyline. Updated after every interaction. Injected into the system prompt so the agent has a compressed overview even beyond the 30-message window.",
              },
              {
                what: "Active modules",
                where: "MCP tools",
                desc: "Module instances bound to this Narrative are loaded and their MCP tools become available. If there\u2019s a running job, the agent sees its status. If a skill was being studied, the study context is restored.",
              },
              {
                what: "Participants",
                where: "System prompt",
                desc: "The actor list \u2014 who created this Narrative, which agents participate, which users are involved. Roles (creator, participant, agent) give the agent social context for the interaction.",
              },
              {
                what: "Cross-topic awareness",
                where: "System prompt",
                desc: "Up to two auxiliary Narratives (other recent topics) are loaded alongside the main one, providing brief summaries so the agent knows what else you\u2019ve been discussing.",
              },
            ].map((item) => (
              <div key={item.what} className="bg-paper p-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-heading text-sm font-700">
                    {item.what}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {item.where}
                  </span>
                </div>
                <p className="font-body font-300 text-sm text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How Narratives stay alive */}
        <div>
          <h3 className="font-heading text-lg font-700 mb-3">
            How Narratives Evolve
          </h3>
          <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
            After each interaction (Step 4 of the pipeline), the selected
            Narrative dynamically updates:
          </p>
          <div className="border border-rule bg-paper-2/30 p-5">
            <ol className="list-none space-y-2.5">
              {[
                "The Event is appended to the Narrative\u2019s event list",
                "An LLM refreshes the dynamic summary (name, keywords, and a structured bullet-point summary) based on the latest conversation",
                "Every 5 interactions, the routing embedding is regenerated so future semantic search stays accurate as the topic evolves",
                "Instance bindings are updated \u2014 completed modules move to history, new ones are linked",
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
          <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
            Narratives are living documents. A storyline that started as
            &ldquo;quick Python question&rdquo; and evolved into a deep
            multi-session project will have its name, summary, and embedding
            updated to reflect the current state &mdash; not the original
            message that created it.
          </p>
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
              desc: "How conversation history and cross-session recall work within Narratives",
              href: "/docs/modules/memory",
            },
            {
              label: "Context Engineering",
              desc: "How Narrative data is assembled into the system prompt",
              href: "/docs/core-concepts/context-engineering",
            },
            {
              label: "Modules",
              desc: "The capability system whose instances bind to Narratives",
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
