export default function LearnASkillPage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Skills &amp; Tools
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Learn a Skill
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Teach your agent new capabilities by pointing it at a skill URL.
        The agent reads the instructions, handles setup, and reports back
        what it can now do.
      </p>

      <hr className="border-rule mb-8" />

      {/* The user experience */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          How It Works
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          A skill must be hosted somewhere publicly accessible first &mdash;
          on a website, GitHub, or ClawHub. Once it&apos;s available, just
          tell your agent to learn it in natural language:
        </p>
        <div className="border border-rule bg-paper-2/30 p-6 mb-6">
          <p className="font-body font-400 text-sm text-ink leading-relaxed italic">
            &ldquo;Read https://arena42.ai/skill.md, choose a competition,
            and follow the instructions to participate.&rdquo;
          </p>
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          The agent then follows a structured study protocol:
        </p>
        <div className="border border-rule bg-paper-2/30 p-6">
          <ol className="list-none space-y-3">
            {[
              "Installs the skill to its workspace (downloads from the URL to skills/<name>/)",
              "Reads SKILL.md to understand what the skill does and what it requires",
              "Completes any registration or setup (API keys, account creation, OAuth)",
              "Saves credentials so they persist across sessions",
              "Creates background jobs if the skill includes recurring tasks",
              "Reports back to you with a summary of what it learned and what it can now do",
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
          If any step requires your input (e.g., an OAuth login or a
          verification code), the agent will ask you and wait before
          continuing.
        </p>
      </section>

      {/* Where to find skills */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Where to Find Skills
        </h2>

        <div className="space-y-px bg-rule mb-4">
          {[
            {
              source: "ClawHub",
              desc: "A community marketplace for agent skills. Browse published skills and install by slug.",
              how: "Tell your agent: \"Install the twitter-bot skill from ClawHub\"",
            },
            {
              source: "GitHub",
              desc: "Any public repository with a SKILL.md in its root. The agent clones the repo into its workspace.",
              how: "Tell your agent: \"Learn the skill at https://github.com/user/repo\"",
            },
            {
              source: "Any URL",
              desc: "Any publicly accessible SKILL.md file. Developers can host skills on their own websites.",
              how: "Tell your agent: \"Read https://example.com/skill.md and learn it\"",
            },
          ].map((item) => (
            <div key={item.source} className="bg-paper p-5">
              <span className="font-heading text-sm font-700">
                {item.source}
              </span>
              <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed">
                {item.desc}
              </p>
              <p className="font-body font-300 text-xs text-muted mt-2 leading-relaxed border-t border-rule pt-2">
                {item.how}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What happens after */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          After Learning
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Once a skill is learned, the agent remembers it across all future
          sessions:
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              what: "Credentials persist",
              desc: "API keys and tokens saved during study are available in every future interaction. No need to re-enter them.",
            },
            {
              what: "Instructions are internalized",
              desc: "The skill\u2019s capabilities appear in the agent\u2019s instructions. It knows what it can do and when to use it.",
            },
            {
              what: "Background jobs keep running",
              desc: "If the skill set up recurring tasks (e.g., check competitions daily), those continue autonomously.",
            },
            {
              what: "Status is tracked",
              desc: "Each skill shows as ready or needs configuration in the agent\u2019s skill table. You can check status anytime.",
            },
          ].map((item) => (
            <div key={item.what} className="bg-paper p-4 flex gap-6">
              <span className="font-heading text-sm font-700 w-40 shrink-0">
                {item.what}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* What happens during study */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          What Happens During Study
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Under the hood, the agent follows a structured study protocol:
        </p>
        <div className="border border-rule bg-paper-2/30 p-6">
          <ol className="list-none space-y-3">
            {[
              "Agent reads SKILL.md from top to bottom, parsing frontmatter for metadata",
              "Required env vars from frontmatter are registered in the system\u2019s tracking",
              "Agent follows setup instructions \u2014 visiting URLs, creating accounts, saving credentials via skill_save_config",
              "If HEARTBEAT.md exists, agent creates background jobs for recurring tasks via job_create",
              "Agent saves a structured study summary via skill_save_study_summary \u2014 this is reported to the user",
              "Skill status changes to ready; credentials are available in all future sessions",
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

    </article>
  );
}
