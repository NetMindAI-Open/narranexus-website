import Link from "next/link";

export default function MemoryModulePage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Modules
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Memory
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        NarraNexus gives agents persistent memory that spans sessions, topics,
        and time. Every interaction is recorded, organized into semantic
        storylines, and retrieved when relevant.
      </p>

      <hr className="border-rule mb-8" />

      {/* Memory model */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          The Memory Model
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Memory in NarraNexus operates at three levels:
        </p>

        <div className="space-y-px bg-rule">
          {[
            {
              level: "Events",
              desc: "The atomic unit. Every user-agent interaction produces an Event record containing reasoning steps, final output, and an embedding vector for semantic search.",
            },
            {
              level: "Narratives",
              desc: "Events are grouped into Narratives — topic-based storylines that may span multiple sessions over days or weeks. Each Narrative holds an ordered list of event references, a dynamic summary, and a routing embedding.",
            },
            {
              level: "Instance State",
              desc: "Each module instance persists its own state. ChatModule stores conversation history; JobModule stores task config and progress. This state travels with the Narrative.",
            },
          ].map((item) => (
            <div key={item.level} className="bg-paper p-5">
              <span className="font-heading text-sm font-700">
                {item.level}
              </span>
              <p className="font-body font-300 text-sm text-muted mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Two memory backends */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Memory Backends
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          NarraNexus provides two memory backends. They can work independently
          or together &mdash; EverMemOS results are injected alongside builtin
          memory when available.
        </p>

        <div className="space-y-4">
          <Link
            href="/docs/modules/memory/builtin"
            className="block border border-rule bg-paper p-6 hover:bg-paper-2/30 transition-colors"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-heading text-lg font-700">
                Builtin Memory
              </span>
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                Default
              </span>
            </div>
            <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
              Short-term cross-topic awareness + long-term Narrative-scoped
              history + vector search. Works out of the box with no extra
              infrastructure. Sufficient for most use cases.
            </p>
            <span className="font-mono text-xs text-ink">
              Learn more &rarr;
            </span>
          </Link>

          <Link
            href="/docs/modules/memory/evermemos"
            className="block border border-rule bg-paper p-6 hover:bg-paper-2/30 transition-colors"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-heading text-lg font-700">
                EverMemOS
              </span>
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                Optional
              </span>
            </div>
            <p className="font-body font-300 text-sm text-muted leading-relaxed mb-3">
              Episodic memory with auto-segmentation, hybrid RRF search
              (BM25 + vector), and deep cross-session recall. Requires external
              services (Milvus, Elasticsearch, MongoDB). Designed for production
              deployments with many users.
            </p>
            <span className="font-mono text-xs text-ink">
              Learn more &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* How memory flows through the pipeline */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Memory in the Pipeline
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-6">
          When a user sends a message, memory is restored and updated across
          multiple pipeline steps:
        </p>

        <div className="border border-rule bg-paper-2/30 p-6">
          <ol className="list-none space-y-3">
            {[
              "Narrative selected by topic continuity or vector search (Step 1)",
              "EverMemOS episode search launched in parallel (Step 0, if enabled)",
              "ChatModule loads dual-track memory: long-term from current Narrative + short-term from recent other topics (Step 2)",
              "All memory merged into ContextData and assembled into the system prompt (Step 3)",
              "After execution: new Event persisted, Narrative summary updated, EverMemOS written async (Step 4)",
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

      {/* Document knowledge (RAG) */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Document Knowledge (RAG)
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Alongside conversation memory, agents can maintain a document
          knowledge base via the GeminiRAGModule. This is separate from
          conversation memory &mdash; it stores uploaded documents (PDF, TXT,
          MD) and enables semantic retrieval via Google Gemini File Search.
        </p>
        <div className="space-y-px bg-rule">
          {[
            { tool: "rag_query", desc: "Semantic search across uploaded documents (top-K retrieval)" },
            { tool: "rag_upload_file", desc: "Upload a file to the knowledge base" },
            { tool: "rag_upload_text", desc: "Upload text content directly" },
          ].map((item) => (
            <div key={item.tool} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-32 shrink-0">
                {item.tool}
              </code>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
          RAG is agent-level (shared across users) and requires a{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            GOOGLE_API_KEY
          </code>{" "}
          environment variable. MCP tools exposed on port 7805.
        </p>
      </section>

      {/* When to use which */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          Which Backend Do I Need?
        </h2>
        <div className="space-y-px bg-rule">
          {[
            {
              scenario: "Local development, single user",
              recommendation: "Builtin only",
            },
            {
              scenario: "Small team, < 10 agents",
              recommendation: "Builtin only",
            },
            {
              scenario: "Production with many users, deep history matters",
              recommendation: "Builtin + EverMemOS",
            },
            {
              scenario: "Cross-session recall across hundreds of conversations",
              recommendation: "Builtin + EverMemOS",
            },
          ].map((item) => (
            <div key={item.scenario} className="bg-paper p-3 flex gap-6">
              <span className="font-body font-300 text-sm text-muted flex-1">
                {item.scenario}
              </span>
              <span className="font-heading text-xs font-600 shrink-0">
                {item.recommendation}
              </span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
