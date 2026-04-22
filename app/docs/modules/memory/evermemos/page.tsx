export default function EverMemOSPage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Modules &middot; Memory
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        EverMemOS
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        An episodic memory service with auto-segmentation, hybrid search, and
        deep cross-session recall. Optional infrastructure for production
        deployments that need memory at scale.
      </p>

      <hr className="border-rule mb-8" />

      {/* What it provides */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          What It Provides
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          EverMemOS adds a dedicated memory layer on top of builtin memory.
          While builtin memory handles recent conversations, EverMemOS manages
          the long tail &mdash; hundreds or thousands of past interactions
          organized into searchable episodes.
        </p>

        <div className="space-y-px bg-rule">
          {[
            {
              feature: "Episodic Memory",
              desc: "Conversations are automatically segmented into episodes — coherent units of interaction with summaries, participants, and timestamps. Episodes are the primary retrieval unit.",
            },
            {
              feature: "Hybrid RRF Search",
              desc: "Reciprocal Rank Fusion combining BM25 keyword search (via Elasticsearch) with vector similarity search (via Milvus). Produces more accurate results than either method alone.",
            },
            {
              feature: "Auto-Segmentation",
              desc: "The system automatically determines episode boundaries from conversation flow. No manual tagging or annotation required.",
            },
            {
              feature: "Parallel Retrieval",
              desc: "Episode search runs in parallel with narrative selection (Step 0), not blocking the main pipeline. Results are awaited just before LLM execution.",
            },
          ].map((item) => (
            <div key={item.feature} className="bg-paper p-5">
              <span className="font-heading text-sm font-700">
                {item.feature}
              </span>
              <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Architecture
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          EverMemOS runs as a separate HTTP service (default port 1995) backed
          by three storage engines:
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              component: "Milvus",
              role: "Vector database storing 1024-dim episode embeddings for semantic similarity search",
            },
            {
              component: "Elasticsearch",
              role: "Full-text search engine providing BM25 keyword retrieval with CJK support",
            },
            {
              component: "MongoDB",
              role: "Document store for raw memory objects, metadata, and episode content",
            },
          ].map((item) => (
            <div key={item.component} className="bg-paper p-3 flex gap-6">
              <span className="font-heading text-sm font-700 w-32 shrink-0">
                {item.component}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.role}
              </span>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
          All three are deployed via Docker. The NarraNexus backend communicates
          with EverMemOS through its HTTP API &mdash; no direct database
          connections.
        </p>
      </section>

      {/* Pipeline integration */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Pipeline Integration
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          EverMemOS integrates at four points in the runtime pipeline:
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              step: "Step 0",
              action: "Episode search launched as a parallel async task, runs concurrently with Steps 1-2",
            },
            {
              step: "Step 1",
              action: "Narrative retrieval can optionally use EverMemOS for narrative-level search, with fallback to native vector search",
            },
            {
              step: "Step 1.5",
              action: "Retrieved episodes injected into the system prompt as a \"Relevant Memory\" section",
            },
            {
              step: "Step 4",
              action: "New Events written to EverMemOS asynchronously (non-blocking) via the MemoryModule's post-execution hook",
            },
          ].map((item) => (
            <div key={item.step} className="bg-paper p-3 flex gap-6">
              <span className="font-mono text-xs text-ink w-16 shrink-0">
                {item.step}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.action}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Graceful degradation */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Graceful Degradation
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          If the EverMemOS service is unavailable (Docker not running, network
          timeout, service error), the system falls back silently to native
          vector retrieval. No user-visible errors, no pipeline failures. The
          agent continues to function with builtin memory only. This means you
          can enable EverMemOS in configuration and deploy the infrastructure
          later &mdash; the code is ready whenever the services are.
        </p>
      </section>

      {/* Data flow */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Data Flow
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Memory is organized by agent. Each agent has its own conversation
          group in EverMemOS, isolated from other agents.
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              direction: "Write",
              desc: "After each pipeline run, user input and agent output are converted to messages and posted to /api/v1/memories. EverMemOS handles segmentation into episodes automatically.",
            },
            {
              direction: "Read",
              desc: "On each new query, the client calls /api/v1/memories/search with the user's input. Returns ranked episodes with text, summaries, scores, and participant info.",
            },
          ].map((item) => (
            <div key={item.direction} className="bg-paper p-4 flex gap-6">
              <span className="font-heading text-sm font-700 w-16 shrink-0">
                {item.direction}
              </span>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* When to use */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          When To Use
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          EverMemOS is worth deploying when:
        </p>
        <ul className="list-none space-y-1.5">
          {[
            "Your agents serve many users with long conversation histories",
            "Cross-session recall quality is critical to your use case",
            "You need keyword + semantic hybrid search for precise memory retrieval",
            "You're running in production with Docker infrastructure already in place",
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
        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
          For local development or small deployments,{" "}
          <a
            href="/docs/modules/memory/builtin"
            className="font-500 text-ink underline"
          >
            builtin memory
          </a>{" "}
          alone is sufficient.
        </p>
      </section>
    </article>
  );
}
