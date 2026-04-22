export default function GuidelinesPage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Contributing
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Guidelines
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Code style, naming conventions, architecture rules, and contribution
        standards for the NarraNexus project.
      </p>

      <hr className="border-rule mb-8" />

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Architecture Rules
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          The system enforces a strict top-down dependency direction. Upper
          layers may call lower layers, but never the reverse.
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              rule: "Module independence",
              desc: "Modules never reference or depend on each other. Cross-module data flows through ContextData.extra_data.",
            },
            {
              rule: "Private implementations",
              desc: "Business logic lives in _*_impl/ directories (underscore prefix). Not exported or imported externally.",
            },
            {
              rule: "Repository pattern",
              desc: "All database access goes through repository/ — never inline SQL in modules or services.",
            },
            {
              rule: "Schema centralization",
              desc: "Pydantic models in schema/. Table definitions in utils/schema_registry.py.",
            },
            {
              rule: "No backward compatibility",
              desc: "The project is pre-1.0. Remove dead code, rename freely. No compatibility shims.",
            },
          ].map((item) => (
            <div key={item.rule} className="bg-paper p-4 flex gap-6">
              <span className="font-heading text-sm font-700 w-44 shrink-0">
                {item.rule}
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
          Naming Conventions
        </h2>
        <div className="space-y-px bg-rule">
          {[
            { type: "Classes", convention: "PascalCase", example: "AgentRuntime, NarrativeService" },
            { type: "Functions", convention: "snake_case", example: "hook_data_gathering, get_by_id" },
            { type: "Variables", convention: "snake_case", example: "agent_id, ctx_data" },
            { type: "Constants", convention: "UPPER_SNAKE_CASE", example: "MODULE_MAP, MAX_NARRATIVES" },
            { type: "Private packages", convention: "_ prefix", example: "_agent_runtime_steps/, _module_impl/" },
            { type: "IDs", convention: "prefix + 8 random chars", example: "evt_a1b2c3d4, nar_e5f6g7h8" },
          ].map((item) => (
            <div key={item.type} className="bg-paper p-3 flex gap-6">
              <span className="font-heading text-xs font-600 w-32 shrink-0">
                {item.type}
              </span>
              <span className="font-mono text-xs text-ink w-36 shrink-0">
                {item.convention}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.example}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Database Conventions
        </h2>
        <div className="space-y-px bg-rule">
          {[
            {
              rule: "Table registration",
              desc: "All tables defined in utils/schema_registry.py via _register(TableDef(...)). auto_migrate() runs on startup.",
            },
            {
              rule: "Dual dialect",
              desc: "Every Column specifies both sqlite_type and mysql_type. Never assume a single backend.",
            },
            {
              rule: "Module tables",
              desc: "Module-specific tables use instance_ prefix (e.g., instance_jobs, instance_social_entities).",
            },
            {
              rule: "No dangerous changes",
              desc: "Never narrow column types or completely change types. Add columns, don't modify existing ones destructively.",
            },
            {
              rule: "Timestamps",
              desc: "Use default=\"(datetime('now'))\" — auto-translated to CURRENT_TIMESTAMP(6) for MySQL.",
            },
          ].map((item) => (
            <div key={item.rule} className="bg-paper p-4 flex gap-6">
              <span className="font-heading text-sm font-700 w-36 shrink-0">
                {item.rule}
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
          Code Quality
        </h2>
        <ul className="list-none space-y-1.5">
          {[
            "All code must be in English — no Chinese in source files, comments, or variable names",
            "Every file must have a file header comment with @file_name, @author, @date, @description",
            "Functions must have docstrings describing workflow, args, and returns",
            "Fix root causes, not symptoms — if a bug fix requires a large refactor, do it",
            "No LLM or framework lock-in — design abstractions so providers can be swapped",
            "Run make lint and make typecheck before submitting PRs",
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

      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          PR Process
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          When submitting a pull request:
        </p>
        <div className="border border-rule bg-paper-2/30 p-6">
          <ol className="list-none space-y-3">
            {[
              "Check that all affected layers are updated (API, service, implementation, schema, repository)",
              "Update .mindflow/mirror/ docs for any modified code files",
              "Run make lint, make typecheck, and make test",
              "Verify both run.sh and desktop app behavior if you changed runtime code",
              "Include before/after screenshots for any frontend changes",
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
