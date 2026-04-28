import Link from "next/link";

export default function BlogPost() {
  return (
    <article className="max-w-[1400px] mx-auto px-6 py-16 md:py-20">
      <div className="max-w-2xl">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            NarraNexus &middot; Blog
          </span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <time className="font-mono text-xs text-muted" dateTime="2026-03-13">
            March 13, 2026
          </time>
          <span className="w-1 h-1 bg-muted/50" aria-hidden="true" />
          <span className="font-mono text-xs text-muted">2 min read</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-700 leading-tight tracking-tight mt-2 mb-6">
          NarraNexus v0.2.0: Connected Agents
        </h1>

        <hr className="border-rule mb-8" />

        <div className="space-y-6 font-body font-300 text-sm sm:text-base text-muted leading-relaxed">
          <p>
            We are excited to announce our most substantial update yet for
            NarraNexus. This release focuses on making agents truly connected —
            to each other, to new capabilities, and to the tools you already use.
          </p>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-700 text-ink pt-2">
              Inter-Agent Communication via Matrix
            </h2>
            <p>
              Agents can now exchange messages through a self-hosted
              Matrix/Synapse homeserver. This enables group conversations,
              @mentions, and coordinated workflows between agents.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-700 text-ink pt-2">
              ClawHub Skill Marketplace
            </h2>
            <p>
              Users can browse and add agent skills via a chat interface with
              streamlined one-click installation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-700 text-ink pt-2">
              LLM Cost Tracking
            </h2>
            <p>
              Real-time monitoring of API calls across Claude, OpenAI, and
              Gemini platforms with per-model cost breakdowns.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-700 text-ink pt-2">
              Desktop Application
            </h2>
            <p>
              A new desktop client with automatic updates and simplified service
              orchestration.
            </p>
          </section>

          <hr className="border-rule my-2" />

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-700 text-ink pt-2">
              Upgrade
            </h2>
            <div className="border border-rule bg-paper-2/30 p-4 overflow-x-auto">
              <pre className="font-mono text-xs sm:text-sm text-ink leading-relaxed">
                <code>{`git pull origin main
bash run.sh`}</code>
              </pre>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-rule">
          <Link
            href="/blog"
            className="font-mono text-xs text-ink hover:text-muted transition-colors"
          >
            &larr; Back to blog
          </Link>
        </div>
      </div>
    </article>
  );
}
