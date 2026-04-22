export default function ArchitecturePage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Core Concepts
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Architecture
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        A layered system with strict dependency direction, multiple message
        entry points, and a 6-step runtime pipeline at its core.
      </p>

      <hr className="border-rule mb-8" />

      {/* ── 1. System Architecture ── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          System Architecture
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          NarraNexus is organized into seven layers. Upper layers call
          downward; lower layers never reference upper layers. This keeps each
          layer replaceable without cascading changes.
        </p>

        {/* Layer stack — visual bars */}
        <div className="space-y-px mb-6">
          {[
            {
              layer: "API",
              dir: "backend/routes/",
              color: "bg-ink/5",
              desc: "HTTP and WebSocket endpoints. Request validation, response serialization. No business logic lives here.",
            },
            {
              layer: "Orchestration",
              dir: "agent_runtime/",
              color: "bg-ink/8",
              desc: "The AgentRuntime sequences every interaction through a 6-step pipeline. This is the brain of the system.",
            },
            {
              layer: "Service Protocol",
              dir: "*_service.py",
              color: "bg-ink/5",
              desc: "Stable public interfaces for Narrative selection and Module management. Bridge pattern delegates to private implementations.",
            },
            {
              layer: "Implementation",
              dir: "_*_impl/",
              color: "bg-ink/8",
              desc: "Concrete business logic behind each service. Underscore-prefixed packages, never imported directly.",
            },
            {
              layer: "Background",
              dir: "services/",
              color: "bg-ink/5",
              desc: "Long-running polling processes: JobTrigger (scheduled tasks), MessageBusTrigger (agent messaging), ModulePoller (instance state).",
            },
            {
              layer: "Data Access",
              dir: "repository/",
              color: "bg-ink/8",
              desc: "Generic BaseRepository with typed CRUD operations. Handles pagination, batch queries, and N+1 prevention.",
            },
            {
              layer: "Data",
              dir: "schema/, utils/",
              color: "bg-ink/5",
              desc: "Pydantic models and a singleton AsyncDatabaseClient. Supports both SQLite (local) and MySQL (production).",
            },
          ].map((l, i) => (
            <div key={l.layer} className={`${l.color} p-4 flex gap-5`}>
              <div className="w-8 shrink-0">
                <span className="font-mono text-xs text-muted">{i + 1}</span>
              </div>
              <div className="w-32 shrink-0">
                <span className="font-heading text-sm font-700">
                  {l.layer}
                </span>
                <p className="font-mono text-[10px] text-muted mt-0.5">
                  {l.dir}
                </p>
              </div>
              <p className="font-body font-300 text-sm text-muted">
                {l.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          The Orchestration layer (AgentRuntime) is the only layer that touches
          both services and the API boundary. Everything below it is reusable
          across different entry points &mdash; the same pipeline runs whether
          a message comes from a WebSocket, a scheduled job, or another agent.
        </p>
      </section>

      {/* ── 2. How Messages Enter the System ── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          How Messages Enter the System
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          The runtime pipeline always runs the same steps regardless of where
          the message came from. What changes is the trigger &mdash; the
          mechanism that initiates the run. Each trigger attaches a{" "}
          <strong className="font-500 text-ink">WorkingSource</strong> tag so
          the agent can adapt its behavior to different message sources.
        </p>

        <div className="space-y-px bg-rule mb-6">
          {[
            {
              source: "User chat",
              tag: "CHAT",
              how: "WebSocket connection from the frontend. User sends a message, the pipeline runs, tokens stream back in real time. This is the default path.",
            },
            {
              source: "Scheduled jobs",
              tag: "JOB",
              how: "The JobTrigger polls the database for due tasks (recurring reminders, monitoring jobs, one-off tasks). When a job fires, the pipeline runs autonomously and delivers results to the user\u2019s inbox.",
            },
            {
              source: "Other agents",
              tag: "MESSAGE_BUS",
              how: "The MessageBusTrigger polls for unread messages in agent channels. When an agent is @mentioned or receives a DM, the pipeline runs with the message as input.",
            },
            {
              source: "IM integrations",
              tag: "MATRIX",
              how: "External messaging platforms (Matrix is implemented; Telegram and Lark are planned). Messages arrive via platform-specific triggers and are normalized into the standard pipeline input.",
            },
          ].map((item) => (
            <div key={item.source} className="bg-paper p-4 flex gap-5">
              <div className="w-32 shrink-0">
                <span className="font-heading text-sm font-700">
                  {item.source}
                </span>
                <p className="mt-1">
                  <span className="px-2 py-0.5 border border-rule font-mono text-[10px] text-muted">
                    {item.tag}
                  </span>
                </p>
              </div>
              <p className="font-body font-300 text-sm text-muted">
                {item.how}
              </p>
            </div>
          ))}
        </div>

        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          A core design principle:{" "}
          <strong className="font-500 text-ink">
            for N agents, never create N listeners.
          </strong>{" "}
          Background triggers (JobTrigger, MessageBusTrigger) use a single
          shared poller that routes work to the correct agent. This keeps
          resource usage constant regardless of how many agents are deployed.
        </p>
      </section>

      {/* ── 3. Runtime Pipeline ── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Runtime Pipeline
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          Every message &mdash; regardless of source &mdash; flows through this
          pipeline. Implementation files live in{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            agent_runtime/_agent_runtime_steps/
          </code>
          . The pipeline has three phases.
        </p>

        {/* Phase 1 — Prepare */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-heading text-base font-700">Prepare</span>
            <span className="font-mono text-[10px] text-muted">
              Steps 0 &ndash; 2.5
            </span>
          </div>
          <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
            Load agent state, find the right storyline, decide which modules
            are needed, and gather all context. The user sees progress
            indicators during this phase.
          </p>

          <div className="space-y-px bg-rule">
            {[
              {
                step: "Step 0",
                name: "Initialize",
                desc: "Load agent config, create the Event record, start or resume a Session, load the agent\u2019s Awareness profile. If EverMemOS is enabled, episode search is launched in parallel here \u2014 it runs concurrently with the next steps and is awaited just before execution.",
              },
              {
                step: "Step 1",
                name: "Select Narrative",
                desc: "Determine which storyline this message belongs to. An LLM continuity check compares the query against the current Narrative. If the topic changed, vector search finds a matching existing Narrative or creates a new one.",
              },
              {
                step: "Step 1.5",
                name: "Load History",
                desc: "Read the conversation\u2019s markdown history file. Parse previous interactions and instance state to inform module decisions in the next step.",
              },
              {
                step: "Step 2",
                name: "Load Modules",
                desc: "An LLM decision determines which module instances should be active for this interaction (add, keep, or remove). Module objects are instantiated and MCP servers started. The execution path is chosen: Agent Loop (99% \u2014 full LLM reasoning) or Direct Trigger (1% \u2014 skip LLM, call a tool directly).",
              },
              {
                step: "Step 2.5",
                name: "Sync Instances",
                desc: "Establish instance-to-Narrative links in the database. Create new records for added instances, archive completed ones. If a JobModule instance was created, the corresponding Job record is initialized.",
              },
            ].map((s) => (
              <div key={s.step} className="bg-paper p-4 flex gap-5">
                <div className="w-16 shrink-0">
                  <span className="font-mono text-xs font-500 text-ink">
                    {s.step}
                  </span>
                </div>
                <div>
                  <span className="font-heading text-sm font-700">
                    {s.name}
                  </span>
                  <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 2 — Execute */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-heading text-base font-700">Execute</span>
            <span className="font-mono text-[10px] text-muted">
              Step 3
            </span>
          </div>
          <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
            The agent thinks and responds. This is where the user sees tokens
            streaming in real time.
          </p>

          <div className="space-y-px bg-rule">
            <div className="bg-paper p-4 flex gap-5">
              <div className="w-16 shrink-0">
                <span className="font-mono text-xs font-500 text-ink">
                  Step 3
                </span>
              </div>
              <div>
                <span className="font-heading text-sm font-700">
                  Agent Loop
                </span>
                <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed mb-3">
                  The ContextRuntime assembles the full context: module
                  instructions, conversation history (dual-track memory),
                  EverMemOS episodes (if available), social network data,
                  awareness profile, and MCP tool URLs. This context is passed
                  to the LLM as a system prompt + message history.
                </p>
                <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
                  The agent runs in a loop &mdash; it can reason, call tools
                  via MCP, observe results, and continue reasoning until it
                  produces a final response. Each token is streamed to the
                  user in real time via WebSocket.
                </p>
                <p className="font-body font-300 text-sm text-muted leading-relaxed">
                  For the rare Direct Trigger path (1%), the LLM is skipped
                  entirely &mdash; the system calls the target MCP tool
                  directly and returns the result.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 3 — Persist */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-heading text-base font-700">Persist</span>
            <span className="font-mono text-[10px] text-muted">
              Steps 4 &ndash; 5
            </span>
          </div>
          <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
            Save everything that happened, then run module hooks in the
            background. The user has already seen the response &mdash; this
            phase is mostly invisible.
          </p>

          <div className="space-y-px bg-rule">
            {[
              {
                step: "Step 4",
                name: "Persist Results",
                blocking: true,
                desc: "Record the execution trajectory, update the Event with the final output, refresh the Narrative summary and embedding (LLM call for the main Narrative), update the Session, and log token costs. This step blocks briefly because the Event data is needed by hooks.",
              },
              {
                step: "Step 5",
                name: "Post-process",
                blocking: false,
                desc: "Dispatched to a background task \u2014 the user\u2019s connection closes immediately. Each active module\u2019s hook_after_event_execution runs in parallel: ChatModule saves messages, SocialNetworkModule extracts entity info (1\u20133 LLM calls), JobModule evaluates completion conditions, MemoryModule writes to EverMemOS. Callback results trigger any dependent instances.",
              },
            ].map((s) => (
              <div key={s.step} className="bg-paper p-4 flex gap-5">
                <div className="w-16 shrink-0">
                  <span className="font-mono text-xs font-500 text-ink">
                    {s.step}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading text-sm font-700">
                      {s.name}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 ${
                        s.blocking
                          ? "text-muted bg-paper-2"
                          : "text-muted bg-paper-2"
                      }`}
                    >
                      {s.blocking ? "blocking" : "background"}
                    </span>
                  </div>
                  <p className="font-body font-300 text-sm text-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
              label: "Narrative",
              desc: "How topic-based storylines are created, matched, and resumed",
              href: "/docs/core-concepts/narrative",
            },
            {
              label: "Modules",
              desc: "The capability system that powers each pipeline step",
              href: "/docs/core-concepts/modules",
            },
            {
              label: "Context Engineering",
              desc: "How the system prompt and message history are assembled",
              href: "/docs/core-concepts/context-engineering",
            },
            {
              label: "Custom Modules",
              desc: "Build your own module with hooks, MCP tools, and IM integrations",
              href: "/docs/modules/custom-modules",
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
