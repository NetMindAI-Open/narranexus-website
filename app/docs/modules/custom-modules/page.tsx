export default function CustomModulesPage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Modules
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Custom Modules
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        How to build and register your own modules &mdash; from the base class
        interface to MCP tool exposure and lifecycle hooks.
      </p>

      <hr className="border-rule mb-8" />

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          XYZBaseModule Interface
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Every module inherits from{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            XYZBaseModule
          </code>{" "}
          and implements these core methods:
        </p>
        <div className="space-y-px bg-rule">
          {[
            {
              method: "get_config()",
              req: "Required",
              desc: "Returns ModuleConfig with name, priority, enabled, description, and module_type (\"capability\" or \"task\")",
            },
            {
              method: "hook_data_gathering(ctx_data)",
              req: "Optional",
              desc: "Called before LLM execution. Enriches ContextData with module-specific data. Must return ContextData.",
            },
            {
              method: "hook_after_event_execution(params)",
              req: "Optional",
              desc: "Called after LLM execution. Async post-processing — DB updates, summaries, memory consolidation.",
            },
            {
              method: "get_mcp_config()",
              req: "Required",
              desc: "Returns MCPServerConfig with server_name and URL, or None if no tools needed.",
            },
            {
              method: "create_mcp_server()",
              req: "Optional",
              desc: "Returns a FastMCP instance for tool registration.",
            },
            {
              method: "get_instructions(ctx_data)",
              req: "Optional",
              desc: "Returns instruction text with dynamic placeholders ({awareness}, {user_id}, etc.).",
            },
          ].map((item) => (
            <div key={item.method} className="bg-paper p-4">
              <div className="flex gap-6 mb-1">
                <code className="font-mono text-xs text-ink w-56 shrink-0">
                  {item.method}
                </code>
                <span className="font-mono text-[10px] text-muted">
                  {item.req}
                </span>
              </div>
              <p className="font-body font-300 text-sm text-muted pl-0">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          ModuleConfig
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          The configuration object has exactly five fields:
        </p>
        <div className="space-y-px bg-rule">
          {[
            { field: "name", desc: "Must match MODULE_MAP key and class name" },
            { field: "priority", desc: "Instruction sort order (0 = highest). Awareness=0, Chat=1, Job=2, ..." },
            { field: "enabled", desc: "Activation flag" },
            { field: "description", desc: "Human-readable purpose" },
            { field: "module_type", desc: "\"capability\" (auto-loaded) or \"task\" (LLM-decided creation)" },
          ].map((item) => (
            <div key={item.field} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-28 shrink-0">
                {item.field}
              </code>
              <span className="font-body font-300 text-sm text-muted">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mt-4">
          Instance ID prefixes are derived automatically from the class name
          (e.g.,{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            ChatModule
          </code>{" "}
          &rarr;{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 bg-paper-2">
            chat_
          </code>
          ). No manual specification needed.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Registration Checklist
        </h2>
        <div className="border border-rule bg-paper-2/30 p-6">
          <ol className="list-none space-y-3">
            {[
              "Create module directory: module/your_module/",
              "Implement XYZBaseModule with get_config() and get_mcp_config()",
              "Register in module/__init__.py MODULE_MAP",
              "Add database tables via utils/schema_registry.py using _register(TableDef(...))",
              "Place Repository in repository/, Schema in schema/, private logic in _your_module_impl/",
              "Assign next available MCP port (7807+)",
              "Add MCP tools via create_mcp_server() if needed",
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

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          MCP Server Architecture
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          Key design decisions for MCP tool exposure:
        </p>
        <ul className="list-none space-y-1.5">
          {[
            "One MCP Server per module type (not per Agent) — all Agents share the same server instance",
            "Agent identification via explicit tool parameters (agent_id, instance_id)",
            "Data isolation through WHERE clause filtering, not connection-level isolation",
            "Stateless — no per-Agent state stored in the MCP process",
            "Database access via get_mcp_db_client() class method (lazy initialization)",
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

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-4">
          Port Allocation
        </h2>
        <div className="space-y-px bg-rule">
          {[
            { port: "7801", module: "AwarenessModule" },
            { port: "7802", module: "SocialNetworkModule" },
            { port: "7803", module: "JobModule" },
            { port: "7804", module: "ChatModule" },
            { port: "7805", module: "GeminiRAGModule" },
            { port: "7806", module: "SkillModule" },
            { port: "7807+", module: "Available for new modules" },
          ].map((item) => (
            <div key={item.port} className="bg-paper p-3 flex gap-6">
              <code className="font-mono text-xs text-ink w-16 shrink-0">
                {item.port}
              </code>
              <span className="font-body font-300 text-sm text-muted">
                {item.module}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Adding IM integrations */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-4">
          Adding a New IM Integration
        </h2>
        <p className="font-body font-300 text-sm text-muted leading-relaxed mb-4">
          New messaging platform integrations (Telegram, Lark, Slack, etc.)
          follow a standard checklist. The channel system uses a shared
          poller pattern &mdash; one background process routes messages to
          agents, never one listener per agent.
        </p>
        <div className="border border-rule bg-paper-2/30 p-6 mb-4">
          <ol className="list-none space-y-3">
            {[
              "Create a channel module with trigger, context builder, and MCP tools",
              "Register an async sender function in ChannelSenderRegistry for reply routing",
              "Implement ChannelContextBuilderBase for platform-specific prompt assembly",
              "Attach a ChannelTag to every incoming message before calling AgentRuntime",
              "Use the shared poller pattern \u2014 never per-agent listeners",
              "Register the module in MODULE_MAP and assign a port",
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
        <p className="font-body font-300 text-sm text-muted leading-relaxed">
          Contact info for entities is stored as nested JSON in
          SocialNetworkModule. Adding new channels requires zero changes to
          the social network schema &mdash; just deep-merge the new channel
          data.
        </p>
      </section>
    </article>
  );
}
