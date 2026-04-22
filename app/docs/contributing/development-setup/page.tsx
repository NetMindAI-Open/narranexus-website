export default function DevelopmentSetupPage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Contributing
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Development Setup
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Set up the NarraNexus development environment from source &mdash;
        backend, frontend, and all supporting services.
      </p>

      <hr className="border-rule mb-8" />

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">Prerequisites</h2>
        <div className="space-y-px bg-rule">
          {[
            { req: "Python 3.11+", desc: "Backend runtime" },
            { req: "Node.js 18+", desc: "Frontend build tooling" },
            { req: "Git", desc: "Version control" },
            { req: "Make", desc: "Task runner (see Makefile)" },
          ].map((item) => (
            <div key={item.req} className="bg-paper p-3 flex gap-6">
              <span className="font-heading text-sm font-700 w-28 shrink-0">
                {item.req}
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
          Clone &amp; Install
        </h2>
        <div className="border border-rule bg-paper-2/30 p-4 space-y-3">
          <div>
            <p className="font-mono text-[10px] text-muted mb-1">Clone</p>
            <code className="font-mono text-xs text-ink">
              git clone https://github.com/NetMindAI-Open/NarraNexus.git && cd
              NarraNexus
            </code>
          </div>
          <div>
            <p className="font-mono text-[10px] text-muted mb-1">
              Backend dependencies
            </p>
            <code className="font-mono text-xs text-ink">
              pip install -e &quot;.[dev]&quot;
            </code>
          </div>
          <div>
            <p className="font-mono text-[10px] text-muted mb-1">
              Frontend dependencies
            </p>
            <code className="font-mono text-xs text-ink">
              cd frontend && npm install
            </code>
          </div>
          <div>
            <p className="font-mono text-[10px] text-muted mb-1">
              Environment
            </p>
            <code className="font-mono text-xs text-ink">
              cp .env.example .env
            </code>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Running Services
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Four processes need to run in parallel, each in its own terminal:
        </p>
        <div className="space-y-px bg-rule">
          {[
            { cmd: "make dev-backend", desc: "FastAPI server — port 8000" },
            { cmd: "make dev-mcp", desc: "MCP tool servers for all modules" },
            { cmd: "make dev-poller", desc: "ModulePoller — instance state monitoring" },
            { cmd: "make dev-frontend", desc: "Vite dev server" },
          ].map((item) => (
            <div key={item.cmd} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-36 shrink-0">
                {item.cmd}
              </code>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Quality Checks
        </h2>
        <div className="space-y-px bg-rule">
          {[
            { cmd: "make lint", desc: "Ruff (backend) + ESLint (frontend)" },
            { cmd: "make typecheck", desc: "Pyright (backend) + tsc (frontend)" },
            { cmd: "make test", desc: "Run pytest test suite" },
            { cmd: "make db-sync-dry", desc: "Preview database schema changes" },
            { cmd: "make db-sync", desc: "Apply database schema changes" },
          ].map((item) => (
            <div key={item.cmd} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-36 shrink-0">
                {item.cmd}
              </code>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          Project Structure
        </h2>
        <div className="border border-rule bg-paper-2/30 p-4">
          <pre className="font-mono text-xs text-ink leading-relaxed">
            {`NarraNexus/
├── backend/              # FastAPI routes
├── frontend/             # React + Vite
├── src/xyz_agent_context/
│   ├── agent_runtime/    # 7-step pipeline
│   ├── context_runtime/  # Context assembly
│   ├── narrative/        # Narrative system
│   ├── module/           # All modules
│   ├── schema/           # Pydantic models
│   ├── repository/       # Data access layer
│   ├── services/         # Background services
│   └── utils/            # Shared utilities
└── .mindflow/            # Documentation system`}
          </pre>
        </div>
      </section>
    </article>
  );
}
