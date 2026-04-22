export default function BlogPost() {
  return (
    <article className="max-w-[1400px] mx-auto px-6 py-20">
      <div className="max-w-2xl">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            NarraNexus &middot; Blog
          </span>
        </div>

        <span className="font-mono text-xs text-muted">
          March 13, 2026 &middot; 1 min read
        </span>

        <h1 className="font-heading text-4xl font-800 leading-tight mt-2 mb-6">
          NarraNexus v0.2.0: Connected Agents
        </h1>

        <hr className="border-rule mb-8" />

        <div className="space-y-6 font-body font-300 text-sm text-muted leading-relaxed">
          <p>
            We are excited to announce our most substantial update yet for
            NarraNexus.
          </p>

          <h2 className="font-heading text-xl font-700 text-ink pt-4">
            Inter-Agent Communication via Matrix
          </h2>
          <p>
            Agents can now exchange messages through a self-hosted
            Matrix/Synapse homeserver. This enables group conversations,
            @mentions, and coordinated workflows between agents.
          </p>

          <h2 className="font-heading text-xl font-700 text-ink pt-4">
            ClawHub Skill Marketplace
          </h2>
          <p>
            Users can browse and add agent skills via a chat interface with
            streamlined one-click installation.
          </p>

          <h2 className="font-heading text-xl font-700 text-ink pt-4">
            LLM Cost Tracking
          </h2>
          <p>
            Real-time monitoring of API calls across Claude, OpenAI, and Gemini
            platforms with per-model cost breakdowns.
          </p>

          <h2 className="font-heading text-xl font-700 text-ink pt-4">
            Desktop Application
          </h2>
          <p>
            A new desktop client with automatic updates and simplified service
            orchestration.
          </p>

          <hr className="border-rule" />

          <h2 className="font-heading text-xl font-700 text-ink pt-4">
            Upgrade
          </h2>
          <div className="border border-rule bg-paper-2/30 p-4">
            <pre className="font-mono text-sm text-ink leading-relaxed">
              {`git pull origin main
bash run.sh`}
            </pre>
          </div>
        </div>
      </div>
    </article>
  );
}
