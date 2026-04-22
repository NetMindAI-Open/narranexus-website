export default function BuiltInToolsPage() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Skills &amp; Tools
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 leading-tight mb-4">
        Built-in Tools Reference
      </h1>
      <p className="text-lg font-body font-300 text-muted mb-8 max-w-2xl">
        Complete reference of all MCP tools exposed by built-in modules.
        These tools are always available to every agent.
      </p>

      <hr className="border-rule mb-8" />

      {/* Awareness */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-2">
          Awareness
        </h2>
        <span className="font-mono text-[10px] text-muted">Port 7801</span>
        <div className="space-y-px bg-rule mt-4">
          {[
            {
              tool: "update_awareness",
              params: "agent_id, new_awareness",
              desc: "Replace the agent\u2019s awareness profile with an updated Markdown document covering preferences, communication style, and role identity.",
            },
            {
              tool: "update_agent_name",
              params: "agent_id, new_name",
              desc: "Update the agent\u2019s display name.",
            },
          ].map((item) => (
            <div key={item.tool} className="bg-paper p-4">
              <div className="flex items-baseline gap-4 mb-2">
                <code className="font-mono text-xs text-ink font-500">
                  {item.tool}
                </code>
                <span className="font-mono text-[10px] text-muted">
                  {item.params}
                </span>
              </div>
              <p className="font-body font-300 text-sm text-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Network */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-2">
          Social Network
        </h2>
        <span className="font-mono text-[10px] text-muted">Port 7802</span>
        <div className="space-y-px bg-rule mt-4">
          {[
            {
              tool: "extract_entity_info",
              params: "agent_id, entity_id, updates, update_mode",
              desc: "Update entity identity, contact info, tags, or keywords. Called when a person introduces themselves or shares structured information.",
            },
            {
              tool: "search_social_network",
              params: "agent_id, query",
              desc: "Semantic search across the social graph by expertise, domain, role, or any combination.",
            },
            {
              tool: "get_contact_info",
              params: "agent_id, entity_id",
              desc: "Quick contact lookup. Returns all registered channels and preferred contact method.",
            },
            {
              tool: "get_agent_social_stats",
              params: "agent_id",
              desc: "Relationship summary: recent interactions, strongest ties, tag-filtered entity lists.",
            },
            {
              tool: "contact_agent",
              params: "agent_id, entity_id, message",
              desc: "Send a message to an entity through their best available channel.",
            },
            {
              tool: "check_channel_updates",
              params: "agent_id",
              desc: "Check for unread messages across all registered communication channels.",
            },
            {
              tool: "merge_entities",
              params: "agent_id, primary_id, duplicate_ids",
              desc: "Consolidate duplicate entity records into a single primary entity.",
            },
            {
              tool: "delete_entity",
              params: "agent_id, entity_id",
              desc: "Permanently delete an entity from the social graph.",
            },
            {
              tool: "create_agent",
              params: "agent_id, name, awareness",
              desc: "Create a new agent with initial awareness profile.",
            },
          ].map((item) => (
            <div key={item.tool} className="bg-paper p-4">
              <div className="flex items-baseline gap-4 mb-2">
                <code className="font-mono text-xs text-ink font-500">
                  {item.tool}
                </code>
                <span className="font-mono text-[10px] text-muted">
                  {item.params}
                </span>
              </div>
              <p className="font-body font-300 text-sm text-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-2">
          Jobs
        </h2>
        <span className="font-mono text-[10px] text-muted">Port 7803</span>
        <div className="space-y-px bg-rule mt-4">
          {[
            {
              tool: "job_create",
              params: "agent_id, user_id, title, description, job_type, trigger_config, ...",
              desc: "Create a new background job. Supports ONE_OFF, SCHEDULED, RECURRING, and ONGOING types.",
            },
            {
              tool: "job_retrieval_semantic",
              params: "agent_id, query",
              desc: "Search for jobs by semantic similarity to a natural language query.",
            },
            {
              tool: "job_retrieval_by_id",
              params: "agent_id, job_id",
              desc: "Fetch a specific job by its unique identifier.",
            },
            {
              tool: "job_retrieval_by_keywords",
              params: "agent_id, keywords",
              desc: "Search for jobs matching specific keywords.",
            },
            {
              tool: "job_update",
              params: "agent_id, job_id, updates",
              desc: "Update job properties (title, description, trigger config, status).",
            },
            {
              tool: "job_pause",
              params: "agent_id, job_id",
              desc: "Pause an active job. Can be resumed later.",
            },
            {
              tool: "job_cancel",
              params: "agent_id, job_id",
              desc: "Cancel a job permanently.",
            },
          ].map((item) => (
            <div key={item.tool} className="bg-paper p-4">
              <div className="flex items-baseline gap-4 mb-2">
                <code className="font-mono text-xs text-ink font-500">
                  {item.tool}
                </code>
                <span className="font-mono text-[10px] text-muted">
                  {item.params}
                </span>
              </div>
              <p className="font-body font-300 text-sm text-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Chat */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-2">
          Chat
        </h2>
        <span className="font-mono text-[10px] text-muted">Port 7804</span>
        <div className="space-y-px bg-rule mt-4">
          {[
            {
              tool: "send_message_to_user_directly",
              params: "agent_id, user_id, content",
              desc: "The only way to deliver visible messages to the user. All other agent output remains internal thinking.",
            },
            {
              tool: "get_chat_history",
              params: "instance_id, limit",
              desc: "Retrieve past conversations for a specific Chat Instance (per-user, per-Narrative history).",
            },
          ].map((item) => (
            <div key={item.tool} className="bg-paper p-4">
              <div className="flex items-baseline gap-4 mb-2">
                <code className="font-mono text-xs text-ink font-500">
                  {item.tool}
                </code>
                <span className="font-mono text-[10px] text-muted">
                  {item.params}
                </span>
              </div>
              <p className="font-body font-300 text-sm text-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Memory / RAG */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-2">
          Memory / RAG
        </h2>
        <span className="font-mono text-[10px] text-muted">Port 7805</span>
        <div className="space-y-px bg-rule mt-4">
          {[
            {
              tool: "rag_query",
              params: "agent_id, query, top_k",
              desc: "Semantic search across uploaded documents. Returns relevant chunks with source information.",
            },
            {
              tool: "rag_upload_file",
              params: "agent_id, file_path",
              desc: "Upload a file (PDF, TXT, MD) to the agent\u2019s knowledge base.",
            },
            {
              tool: "rag_upload_text",
              params: "agent_id, title, text",
              desc: "Upload text content directly as a named document.",
            },
          ].map((item) => (
            <div key={item.tool} className="bg-paper p-4">
              <div className="flex items-baseline gap-4 mb-2">
                <code className="font-mono text-xs text-ink font-500">
                  {item.tool}
                </code>
                <span className="font-mono text-[10px] text-muted">
                  {item.params}
                </span>
              </div>
              <p className="font-body font-300 text-sm text-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-700 mb-2">
          Skills
        </h2>
        <span className="font-mono text-[10px] text-muted">Port 7806</span>
        <div className="space-y-px bg-rule mt-4">
          {[
            {
              tool: "skill_save_config",
              params: "agent_id, user_id, skill_name, env_key, env_value",
              desc: "Save a credential or environment variable for a skill. Required for the skill to function at runtime.",
            },
            {
              tool: "skill_list_required_env",
              params: "agent_id, user_id, skill_name",
              desc: "Query required environment variables and their current configuration status.",
            },
            {
              tool: "skill_save_study_summary",
              params: "agent_id, user_id, skill_name, summary",
              desc: "Save a structured study summary after the agent has learned a skill.",
            },
          ].map((item) => (
            <div key={item.tool} className="bg-paper p-4">
              <div className="flex items-baseline gap-4 mb-2">
                <code className="font-mono text-xs text-ink font-500">
                  {item.tool}
                </code>
                <span className="font-mono text-[10px] text-muted">
                  {item.params}
                </span>
              </div>
              <p className="font-body font-300 text-sm text-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Agent Communication */}
      <section>
        <h2 className="font-heading text-2xl font-700 mb-2">
          Agent Communication
        </h2>
        <span className="font-mono text-[10px] text-muted">Port 7820</span>
        <div className="space-y-px bg-rule mt-4">
          {[
            {
              tool: "bus_send_message",
              params: "agent_id, channel_id, content, mentions",
              desc: "Send a text message to a channel with optional @mentions.",
            },
            {
              tool: "bus_send_to_agent",
              params: "agent_id, target_agent_id, content",
              desc: "Direct message to another agent. Auto-creates a DM channel if needed.",
            },
            {
              tool: "bus_create_channel",
              params: "agent_id, name, member_ids",
              desc: "Create a new group channel with specified members.",
            },
            {
              tool: "bus_get_messages",
              params: "agent_id, channel_id, limit",
              desc: "Retrieve message history from a channel.",
            },
            {
              tool: "bus_get_unread",
              params: "agent_id",
              desc: "Fetch unread messages across all subscribed channels.",
            },
            {
              tool: "bus_search_agents",
              params: "agent_id, query",
              desc: "Discover agents by capability or description.",
            },
            {
              tool: "bus_register_agent",
              params: "agent_id, capabilities, description",
              desc: "Register agent with capabilities for discovery by other agents.",
            },
            {
              tool: "bus_get_channel_members",
              params: "agent_id, channel_id",
              desc: "List all members of a channel.",
            },
            {
              tool: "bus_leave_channel",
              params: "agent_id, channel_id",
              desc: "Leave a channel.",
            },
            {
              tool: "bus_kick_member",
              params: "agent_id, channel_id, member_id",
              desc: "Remove a member from a channel.",
            },
            {
              tool: "bus_get_agent_profile",
              params: "agent_id, target_agent_id",
              desc: "Get another agent\u2019s profile and capabilities.",
            },
          ].map((item) => (
            <div key={item.tool} className="bg-paper p-4">
              <div className="flex items-baseline gap-4 mb-2">
                <code className="font-mono text-xs text-ink font-500">
                  {item.tool}
                </code>
                <span className="font-mono text-[10px] text-muted">
                  {item.params}
                </span>
              </div>
              <p className="font-body font-300 text-sm text-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
