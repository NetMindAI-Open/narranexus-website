export default function SkillsModulePage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Modules
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Skills Module
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Manages user-installed skills in the workspace. Discovers skills, tracks
        configuration, stores study summaries, and provides tools for skill
        setup &mdash; all filesystem-based, no database required.
      </p>

      <hr className="border-rule mb-8" />

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          How Skills Work
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Skills are self-contained capability packages installed in the
          agent&apos;s workspace. Each skill lives in its own directory under{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            skills/
          </code>
          .
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              step: "Discovery",
              desc: "Scans the skills/ directory, parses SKILL.md frontmatter for metadata, detects required env vars",
            },
            {
              step: "Configuration",
              desc: "Tracks required credentials per skill. The agent uses skill_list_required_env to check what\u2019s needed, then skill_save_config to register each credential. Status shows as needs (missing) or ready.",
            },
            {
              step: "Study",
              desc: "Agent reads SKILL.md, registers credentials, and saves a structured study summary via skill_save_study_summary",
            },
            {
              step: "Runtime",
              desc: "Configured env vars are injected at runtime. Skills table with status displayed in agent instructions.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-paper p-4 flex gap-6">
              <span className="font-heading text-sm font-700 w-28 shrink-0">
                {item.step}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Installation Methods
        </h2>
        <div className="space-y-px bg-rule">
          {[
            {
              method: "From ClawHub",
              desc: "clawhub install <slug> --dir skills/ --force --no-input",
            },
            {
              method: "From GitHub/URL",
              desc: "Clone or download to skills/<skill-name>/",
            },
          ].map((item) => (
            <div key={item.method} className="bg-paper p-4 flex gap-6">
              <span className="font-heading text-sm font-700 w-36 shrink-0">
                {item.method}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
          After installation, the agent follows a study protocol: read SKILL.md,
          register credentials, save summary, and report readiness.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Workspace Rules
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Skills enforce strict workspace isolation:
        </p>
        <ul className="list-none space-y-1.5">
          {[
            "All files created/downloaded go into skills/<skill-name>/",
            "Credentials stored locally AND registered via skill_save_config",
            "System-level tools (pip install) are the only exception to workspace containment",
            "Relative paths used in prompts to avoid path duplication",
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
      </section>

      {/* Tool reference */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          Tools
        </h2>
        <div className="space-y-px bg-rule">
          {[
            {
              tool: "skill_save_config",
              desc: "Save credential/env var for a skill",
            },
            {
              tool: "skill_list_required_env",
              desc: "Query required env vars and their configuration status",
            },
            {
              tool: "skill_save_study_summary",
              desc: "Save structured Markdown study documentation",
            },
          ].map((item) => (
            <div key={item.tool} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-48 shrink-0">
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
