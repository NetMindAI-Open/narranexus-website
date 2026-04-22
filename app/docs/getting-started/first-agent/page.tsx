export default function FirstAgentPage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Getting Started
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        First Agent
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Create an agent, explore what it can do, and watch Narrative memory and
        social connections form in real time.
      </p>

      <hr className="border-rule mb-8" />

      {/* ── 1. Create an Agent ── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          1. Create an Agent
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Click the{" "}
          <strong className="font-500 text-ink">+</strong> button in the
          sidebar to create a new agent. Give it a name and a short description
          &mdash; that&apos;s all you need to get started.
        </p>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          Behind the scenes, the system creates the agent record, initializes
          all capability modules (Awareness, Chat, SocialNetwork, Memory,
          Skills), and prepares the default Narrative.
        </p>
      </section>

      {/* ── 2. Things to Try ── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          2. Things to Try
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          Each example below shows a different capability. Try any of them in
          any order &mdash; they&apos;re independent.
        </p>

        {/* 2a — Define Identity */}
        <div className="border border-rule mb-6">
          <div className="bg-paper-2/30 px-5 py-3 border-b border-rule">
            <h3 className="font-heading text-base font-700">
              Define Your Agent&apos;s Identity
            </h3>
          </div>
          <div className="p-5">
            <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
              Tell the agent who it is &mdash; its name, purpose, personality,
              and goals. The{" "}
              <a
                href="/docs/modules/awareness"
                className="font-500 text-ink underline"
              >
                AwarenessModule
              </a>{" "}
              automatically captures these into a persistent profile that shapes
              all future interactions.
            </p>
            <div className="border border-rule bg-paper-2/30 p-4 mb-3">
              <p className="font-mono text-xs text-muted leading-relaxed">
                &ldquo;You are a research assistant focused on AI papers. Use a
                concise, technical tone. Always cite sources.&rdquo;
              </p>
            </div>
            <p className="font-body font-300 text-sm text-muted leading-relaxed">
              We recommend giving an identity introduction early on, but
              it&apos;s not strictly required &mdash; the agent will
              automatically collect awareness signals from future conversations
              too.
            </p>
          </div>
        </div>

        {/* 2b — Learn a Skill */}
        <div className="border border-rule mb-6">
          <div className="bg-paper-2/30 px-5 py-3 border-b border-rule">
            <h3 className="font-heading text-base font-700">Learn a Skill</h3>
          </div>
          <div className="p-5">
            <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
              Agents can learn new capabilities from external sources. Try
              sending:
            </p>
            <div className="border border-rule bg-paper-2/30 p-4 mb-3">
              <p className="font-mono text-xs text-muted leading-relaxed">
                &ldquo;Read https://arena42.ai/skill.md, choose a competition,
                and follow the instructions to participate.&rdquo;
              </p>
            </div>
            <p className="font-body font-300 text-sm text-muted leading-relaxed">
              The agent fetches the skill definition, studies it, and gains the
              ability to act on it. See{" "}
              <a
                href="/docs/modules/skills"
                className="font-500 text-ink underline"
              >
                Skills
              </a>{" "}
              for how skill installation works under the hood.
            </p>
          </div>
        </div>

        {/* 2c — Create a Background Job */}
        <div className="border border-rule mb-6">
          <div className="bg-paper-2/30 px-5 py-3 border-b border-rule">
            <h3 className="font-heading text-base font-700">
              Create a Background Job
            </h3>
          </div>
          <div className="p-5">
            <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
              Ask the agent to do something on a schedule:
            </p>
            <div className="border border-rule bg-paper-2/30 p-4 mb-3">
              <p className="font-mono text-xs text-muted leading-relaxed">
                &ldquo;Remind me to take a break every 2 hours.&rdquo;
              </p>
            </div>
            <p className="font-body font-300 text-sm text-muted leading-relaxed">
              The agent creates a recurring Job. The JobTrigger polls for due
              tasks and executes them autonomously, delivering results to your
              chat. See{" "}
              <a
                href="/docs/modules/jobs"
                className="font-500 text-ink underline"
              >
                Jobs
              </a>{" "}
              for the full job lifecycle.
            </p>
          </div>
        </div>

        {/* 2d — Agent-to-Agent Communication */}
        <div className="border border-rule">
          <div className="bg-paper-2/30 px-5 py-3 border-b border-rule">
            <h3 className="font-heading text-base font-700">
              Let Agents Talk to Each Other
            </h3>
          </div>
          <div className="p-5">
            <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
              Create a second agent, then ask the first one to collaborate:
            </p>
            <div className="border border-rule bg-paper-2/30 p-4 mb-3">
              <p className="font-mono text-xs text-muted leading-relaxed">
                &ldquo;Discuss with @SecondAgent what the best approach is for
                building a recommendation system.&rdquo;
              </p>
            </div>
            <p className="font-body font-300 text-sm text-muted leading-relaxed">
              The agents exchange messages via the MessageBus. Check your{" "}
              <strong className="font-500 text-ink">Inbox</strong> to see the
              group discussion unfold. See{" "}
              <a
                href="/docs/modules/agent-communication"
                className="font-500 text-ink underline"
              >
                Agent Communication
              </a>{" "}
              for the messaging architecture.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Observe What Happened ── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          3. Observe What Happened
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          After trying a few of the examples above, look at what the system
          built automatically behind the scenes.
        </p>

        {/* Narratives */}
        <div className="mb-8">
          <h3 className="font-heading text-lg font-700 mb-3">
            Narrative Formation
          </h3>
          <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
            Each topic you discussed became its own{" "}
            <a
              href="/docs/core-concepts/narrative"
              className="font-500 text-ink underline"
            >
              Narrative
            </a>{" "}
            &mdash; a semantic container grouping related conversations across
            sessions. Open the Narrative panel to see the storylines the system
            created.
          </p>
          <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
            Try this: ask the agent about a project idea, then switch to an
            unrelated question (like a recipe), then go back to the project.
            The agent recalls the full context from the first conversation
            &mdash; cross-session memory in action. The system detects the
            topic shift and routes you back to the correct Narrative
            automatically.
          </p>
          <div className="space-y-px bg-rule">
            {[
              {
                level: "Events",
                desc: "Each interaction recorded with an embedding vector for semantic search",
              },
              {
                level: "Narratives",
                desc: "Events grouped into topic-based storylines that span sessions",
              },
            ].map((item) => (
              <div key={item.level} className="bg-paper p-3 flex gap-6">
                <span className="font-heading text-sm font-700 w-24 shrink-0">
                  {item.level}
                </span>
                <span className="font-body font-300 text-sm text-muted">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Network */}
        <div>
          <h3 className="font-heading text-lg font-700 mb-3">
            Social Network Building
          </h3>
          <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
            While you were chatting, the{" "}
            <a
              href="/docs/modules/social-network"
              className="font-500 text-ink underline"
            >
              SocialNetworkModule
            </a>{" "}
            was silently building a graph of entities. Open the Social Network
            view to see:
          </p>
          <ul className="list-none space-y-1.5">
            {[
              "Your user entity \u2014 with preferences and interaction patterns the agent learned from your messages",
              "Other social entities \u2014 agents, humans, and groups mentioned in conversation. If you tried agent-to-agent communication, each agent builds a profile of the other",
              "Relationships \u2014 interaction frequency, trust levels, and communication patterns between entities. These are used for future retrieval and context building",
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
              label: "Architecture",
              desc: "Understand the 7-layer system and runtime pipeline",
              href: "/docs/core-concepts/architecture",
            },
            {
              label: "Modules",
              desc: "Explore all built-in modules and their capabilities",
              href: "/docs/core-concepts/modules",
            },
            {
              label: "Memory",
              desc: "Learn how cross-session recall works under the hood",
              href: "/docs/modules/memory",
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
