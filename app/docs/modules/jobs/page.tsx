export default function JobsModulePage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Modules
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Jobs Module
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Not everything happens in a single conversation. Jobs let your agent
        work on complex tasks over time &mdash; scheduling follow-ups,
        running overnight workflows, and monitoring conditions until
        they&apos;re met.
      </p>

      <hr className="border-rule mb-8" />

      {/* What Jobs Are For */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          What Jobs Are For
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          A conversation ends when you close the window, but your agent&apos;s
          work doesn&apos;t have to. Jobs are background tasks that keep
          running after the chat is over:
        </p>
        <div className="space-y-px bg-rule mb-6">
          {[
            {
              use: "Overnight work",
              desc: "\"Research these 50 companies and have a report ready by morning.\"",
            },
            {
              use: "Scheduled check-ins",
              desc: "\"Remind me every Monday about pending invoices.\"",
            },
            {
              use: "Condition monitoring",
              desc: "\"Watch this competitor's pricing page and tell me when it changes.\"",
            },
            {
              use: "Multi-step workflows",
              desc: "\"Send the proposal, follow up in 3 days if no reply, then escalate.\"",
            },
          ].map((item) => (
            <div key={item.use} className="bg-paper p-4">
              <span className="font-heading text-sm font-700">
                {item.use}
              </span>
              <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed italic">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          You don&apos;t need to learn any special syntax. Just describe what
          you want in natural language and the agent decides the right job type,
          schedule, and execution plan. When the job completes &mdash; or hits
          something worth reporting &mdash; the agent sends the results back
          to you through the chat.
        </p>
      </section>

      {/* Job Types */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">Job Types</h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          When the agent creates a job via{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            job_create
          </code>
          , it picks one of four execution patterns based on what you asked for:
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              type: "ONE_OFF",
              desc: "Run once at a specific time. Good for reminders, delayed actions, or \"do this tomorrow at 9am\" requests.",
            },
            {
              type: "SCHEDULED",
              desc: "Run on a cron schedule. Good for periodic reports, daily digests, or weekly check-ins.",
            },
            {
              type: "RECURRING",
              desc: "Repeat at a fixed interval until cancelled. Good for polling external services or regular data collection.",
            },
            {
              type: "ONGOING",
              desc: "Run continuously until an end condition is met. Good for goal tracking, follow-up chains, and \"keep doing this until X happens\" requests.",
            },
          ].map((item) => (
            <div key={item.type} className="bg-paper p-4 flex gap-6">
              <code className="font-mono text-xs text-ink w-24 shrink-0">
                {item.type}
              </code>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Status Lifecycle */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Status Lifecycle
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Jobs transition through well-defined states:
        </p>
        <div className="border border-rule bg-paper-2/30 p-6 mb-4">
          <pre className="font-mono text-xs text-ink leading-relaxed">
            {`PENDING → ACTIVE → IN_PROGRESS → COMPLETED
                ↘                    ↘ FAILED
                 → BLOCKED            → CANCELLED
                                      → ARCHIVED`}
          </pre>
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          After each execution, the system analyzes results to determine
          whether the job completed, failed, or needs to run again. You can
          also tell the agent to pause or cancel a job at any time &mdash;
          it uses{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            job_pause
          </code>{" "}
          and{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            job_cancel
          </code>{" "}
          behind the scenes. ONGOING jobs can also resolve naturally when
          you mention in chat that the goal has been met.
        </p>
      </section>

      {/* Execution */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          How Jobs Execute
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          A background poller checks for due jobs and runs them through the
          full agent pipeline &mdash; the same pipeline used for chat, but
          with a specialized context:
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              step: "1. Poll",
              desc: "Background trigger finds jobs where next_run_time has passed. Up to 5 jobs run in parallel.",
            },
            {
              step: "2. Context",
              desc: "Builds execution context with the job's description, related entities from the Social Network, and outputs from dependency jobs.",
            },
            {
              step: "3. Execute",
              desc: "Agent runs with its full tool set — it can search the web, call APIs, send messages, or use any skill it has learned.",
            },
            {
              step: "4. Analyze",
              desc: "Results are analyzed to determine status and next steps. If the job produced something worth reporting, it's sent to the user's inbox.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-paper p-4 flex gap-6">
              <span className="font-heading text-sm font-700 w-24 shrink-0">
                {item.step}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
          Jobs can also declare dependencies on other jobs &mdash; a job
          won&apos;t execute until its dependencies have completed, enabling
          multi-step workflows where each stage builds on the previous one.
        </p>
      </section>

      {/* Tool reference */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">Tools</h2>
        <span className="font-mono text-[10px] text-muted">Port 7803</span>
        <div className="space-y-px bg-rule mt-4">
          {[
            { tool: "job_create", desc: "Create a new background job with type, schedule, and instructions" },
            { tool: "job_retrieval_semantic", desc: "Search for jobs by natural language query" },
            { tool: "job_retrieval_by_id", desc: "Fetch a specific job by ID" },
            { tool: "job_retrieval_by_keywords", desc: "Search for jobs matching specific keywords" },
            { tool: "job_update", desc: "Update job properties (title, description, trigger config, status)" },
            { tool: "job_pause", desc: "Pause an active job (can be resumed later)" },
            { tool: "job_cancel", desc: "Cancel a job permanently" },
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
