/**
 * Template registry — Phase 1 curated approach.
 *
 * Each entry maps a .nxbundle file (stored under public/templates/) to its
 * presentation metadata. The bundle's internal manifest.json already carries
 * canonical technical fields (agent names, skill list, exported version,
 * sha256); we mirror the user-facing subset here so we don't have to unzip
 * the bundle on every page render.
 *
 * Phase 1: TypeScript module, hand-curated.
 * Phase 2+: this will move to an API / KV / DB once user uploads ship.
 *
 * Adding a new template (current workflow):
 *   1. cp my-template.nxbundle public/templates/
 *   2. compute file sha256:
 *        shasum -a 256 public/templates/my-template.nxbundle
 *      (this is the FILE hash — NOT the manifest's internal integrity_sha256)
 *   3. peek the manifest for agent count / version / etc.:
 *        unzip -p public/templates/my-template.nxbundle manifest.json | jq
 *   4. add an entry below
 *   5. git add + commit + push → Vercel auto-deploys
 */

export interface TemplateAgent {
  name: string;
  agent_id: string;
}

export interface TemplateManifestSummary {
  bundle_format_version: string;
  narranexus_version_exported: string;
  agent_count: number;
  /** Distinct skills (a skill installed across N agents counts once). */
  unique_skill_count: number;
  /** Whether the bundle suggests external MCP servers the importer will need to confirm. */
  requires_external_mcp: boolean;
  /**
   * Non-trivial extra credentials beyond a basic LLM provider that the user
   * needs to configure for the template to actually work — e.g. "lark" for
   * a team that delivers messages via Lark, "slack" for a Slack-bound agent.
   * Display verbatim; an empty list means "just an LLM key is enough".
   */
  requires_credentials: string[];
}

export interface Template {
  /** URL-safe id, used in /templates/[slug] route. */
  slug: string;
  name: string;
  /** One-liner shown on cards. */
  short_description: string;
  /** Long prose for the detail page. Plain text or light markdown. */
  long_description: string;
  /**
   * "How to actually use this" guidance for the detail page — which agent
   * to talk to first, what to say, what to expect back. Templates ship
   * multi-agent teams and skill-driven bots; a new user cannot infer the
   * entry point from the agent list alone. Light markdown (bold, lists).
   */
  usage_tip: string;
  categories: string[];
  tags: string[];

  /**
   * Public download path. Phase 1 uses relative paths under /templates/
   * (served from public/). Phase 2 swaps to object-storage URLs without
   * touching consumers — they just `fetch(bundle_url)`.
   */
  bundle_url: string;
  bundle_size_bytes: number;
  /**
   * sha256 of the .nxbundle file itself (NOT the manifest.json's internal
   * `integrity_sha256` field — that one hashes pre-zip staged content and
   * will not match what a download-then-hash check on the wire produces).
   * Compute with: `shasum -a 256 path/to/file.nxbundle`.
   * Verified by NarraNexus's POST /api/bundle/import/from-url after fetch.
   */
  bundle_sha256: string;

  author: { name: string; url?: string };
  license: string;

  manifest_summary: TemplateManifestSummary;
  agents: TemplateAgent[];

  /** ISO date strings. */
  created_at: string;
  updated_at: string;

  /** When true, omit from the templates index and from generateStaticParams. The entry remains for archival / unhide. */
  hidden?: boolean;
}

export const TEMPLATES: Template[] = [
  {
    slug: "financial-morning-briefing",
    name: "Financial Morning Briefing",
    short_description:
      "A 6-agent analyst team that delivers an analyst-grade HTML market briefing every day at 08:00 Asia/Shanghai — every item layered data → context → deep read.",
    long_description:
      "Financial Morning Briefing is a 6-agent team coordinated by the Briefing Maestro. Five specialist analysts — global markets (incl. crypto & Asia), macro & central-bank policy, a holdings watcher, an industry desk, and a sentiment scout — collaborate over the message bus, then Maestro synthesizes an analyst-grade report.\n\nThis is a news ANALYST, not a wire service: every item carries three layers (data/fact → context → deep read), the report leads with a Top-Story Deep Dive, and the risk section ends on an overall 7-step market rating. A cron job runs Maestro at 08:00 Asia/Shanghai daily — bound to a continuing narrative so each day contrasts against the prior call — and the finished HTML lands as an artifact.\n\nShare your holdings and watchlist in plain language (no intake form) and the team personalizes over time.",
    usage_tip:
      "**Talk only to the Briefing Maestro.** The five analysts work behind the scenes and never message you — Maestro is the single entry point.\n\nThings to say to Maestro (any language works):\n- \"run today's briefing now\" — get a briefing on demand instead of waiting for the 08:00 schedule\n- name your positions in plain text (\"I hold NVDA, TSM, and some BTC\") — they persist to holdings.json, no form\n- set preferences — \"keep it short\", \"focus on semiconductors\", \"reply in Chinese\" — saved to user_preferences.md\n\nExpect back: a structured multi-section HTML briefing as an artifact — a Top-Story Deep Dive, market sections with the data → context → deep-read layering, and a risk section with a 7-step market rating.\n\nBefore it can run, configure your LLM providers in Settings → Providers (agent, embedding, helper_llm slots) — credentials are never shipped inside a template.",
    categories: ["finance", "team"],
    tags: ["scheduled", "html-report", "multi-agent", "briefing", "markets"],
    bundle_url: "/templates/briefing_team.nxbundle",
    bundle_size_bytes: 316909,
    bundle_sha256:
      "58316c737c7d37f26b4ed17e9911e0a920b1aeec5fb35f7e15056349b3f3c4bd",
    author: { name: "NarraNexus team" },
    license: "MIT",
    manifest_summary: {
      bundle_format_version: "1.1",
      narranexus_version_exported: "1.3.4",
      agent_count: 6,
      unique_skill_count: 2,
      requires_external_mcp: false,
      requires_credentials: [],
    },
    agents: [
      { name: "Briefing Maestro", agent_id: "agent_e2ace957a084" },
      { name: "Global Markets Analyst", agent_id: "agent_52337f11d1ef" },
      { name: "Macro Policy Analyst", agent_id: "agent_a4e1a9d3eaec" },
      { name: "Holdings Watcher", agent_id: "agent_580df6fe7190" },
      { name: "Industry Desk", agent_id: "agent_85ecf71105d6" },
      { name: "Sentiment Scout", agent_id: "agent_a52c2a2276aa" },
    ],
    created_at: "2026-05-15",
    updated_at: "2026-05-21",
  },
  {
    slug: "marketing-team",
    name: "Marketing Team",
    short_description:
      "A 4-agent marketing team that automates the sponsorship pipeline end-to-end: parsing inbound sponsor emails, tracking each deal in a CRM, and listening for brand mentions across X, Reddit, Hacker News, and Product Hunt.",
    long_description:
      "Marketing Team is a 4-agent crew that runs your sponsorship and partnership pipeline.\n\nThe Sponsorship Workflow Manager coordinates the team and handles inbound Gmail traffic: it reads sponsor inquiries, parses the offer terms, and routes the work to the right specialist. The Email Intake Agent does the initial classification on incoming mail. The Sponsorship CRM Agent maintains a record of every sponsor (brand, offer, budget, status, next step).\n\nReviewScout is the social-listening specialist: it watches X (Twitter), Reddit, Hacker News, and Product Hunt for mentions of your brand or product through the bundled bb-browser-sites tooling, so you stay aware of the conversation without manually refreshing feeds. First-time use needs you to log in to each platform locally; sessions are cached on disk and only need refreshing when cookies expire.",
    usage_tip:
      "This is a 4-agent team. The **Sponsorship Workflow Manager** is the natural starting point: talk to it to drive a deal through its stages; it coordinates the others.\n\n- **Email Intake Agent** does first-line triage on incoming sponsor mail; works mostly behind the Workflow Manager.\n- **Sponsorship CRM Agent** answers questions about a specific sponsor's history and status.\n- **ReviewScout** is the one to talk to directly for a brand-mention report across X, Reddit, Hacker News, and Product Hunt.\n\nExpect: structured updates from the Workflow Manager as deals progress, and mention digests from ReviewScout. ReviewScout's first run needs you logged in to those platforms locally (sessions cache on disk). See the prerequisites in the sidebar.",
    categories: ["marketing", "sponsorship", "team"],
    tags: ["marketing", "sponsorship", "crm", "social-listening", "gmail", "multi-agent"],
    bundle_url: "/templates/marketing_team-20260527.nxbundle",
    bundle_size_bytes: 140497,
    bundle_sha256:
      "0fa87e83c9397b447184bcc3a621a5c95827f516e7dbf058cf535a8046c7782c",
    author: { name: "NarraNexus team contributor" },
    license: "MIT",
    manifest_summary: {
      bundle_format_version: "1.1",
      narranexus_version_exported: "1.3.4",
      agent_count: 4,
      unique_skill_count: 6,
      requires_external_mcp: false,
      requires_credentials: [
        "Gmail account access (Sponsorship Workflow Manager / Email Intake)",
        "Google Chrome installed locally + manual login to X / Reddit / Hacker News / Product Hunt (ReviewScout)",
      ],
    },
    agents: [
      { name: "Sponsorship Workflow Manager", agent_id: "agent_ae460d666546" },
      { name: "Email Intake Agent", agent_id: "agent_29c2498090d7" },
      { name: "Sponsorship CRM Agent", agent_id: "agent_e429f3f0875a" },
      { name: "ReviewScout", agent_id: "agent_145f25d42a9c" },
    ],
    created_at: "2026-05-27",
    updated_at: "2026-05-27",
  },
  {
    slug: "manga-agent",
    name: "Manga Agent",
    short_description:
      "A single agent that turns ordered manga panels into a narrated bilibili-style 解说 video — Chinese voiceover, burned subtitles, panel motion.",
    long_description:
      "Manga Agent takes a folder of manga pages or individual panels and produces a fully rendered explainer video in the bilibili 解说 style: one panel on screen at a time, Chinese voiceover narrating the story in a lightly comedic register, and yellow subtitles burned into the final MP4.\n\nThe agent ships the `manga_explainer` skill, which bundles its own rendering toolchain — panel cropping, composition planning, TTS via Microsoft Edge TTS (free, no API key, native Chinese voices), and final ffmpeg assembly with subtitle burning. The agent reads your uploaded images, plans a panel-by-panel composition, drafts the narration, and runs the render pipeline end to end.\n\nBecause the pipeline executes on the host, install this on a NarraNexus instance you control (desktop DMG or self-hosted) where ffmpeg and ffprobe are on PATH.",
    usage_tip:
      "Talk to the single **Manga Agent**. To make a video:\n1. Upload manga images (jpg / png / webp) — individual panels, full pages, or a ZIP of a whole chapter.\n2. Ask for a video — e.g. \"做成解说视频\" or \"turn this chapter into a recap video\".\n\nThe agent crops the panels, drafts the 解说 narration, and runs the render. Expect a finished MP4 back as an artifact.\n\nIt won't bother for a 1-2 panel snippet (too short to narrate) or if you only ask for a text summary — there it just answers directly. ffmpeg + ffprobe must be on the host's PATH for the render step to work.",
    categories: ["content-creation", "video"],
    tags: ["manga", "video", "解说", "bilibili", "tts", "single-agent", "ffmpeg"],
    bundle_url: "/templates/manga_agent_v1.nxbundle",
    bundle_size_bytes: 3059950,
    bundle_sha256:
      "ffbba0893a9ee90fb9fa7af92ce98b92d198537ef29d9c46da2675eef9cc56a2",
    author: { name: "NarraNexus team contributor" },
    license: "MIT",
    manifest_summary: {
      bundle_format_version: "1.0",
      narranexus_version_exported: "1.3.4",
      agent_count: 1,
      unique_skill_count: 1,
      requires_external_mcp: false,
      requires_credentials: [
        "ffmpeg + ffprobe on the host PATH (video rendering)",
        "Desktop DMG or self-hosted install recommended — the render pipeline runs on the host",
        "No API key needed — uses free Microsoft Edge TTS for Chinese narration",
      ],
    },
    agents: [{ name: "Manga Agent", agent_id: "agent_444f2c620021" }],
    created_at: "2026-05-19",
    updated_at: "2026-05-21",
    hidden: true,
  },
  {
    slug: "pm-bridge-bot",
    name: "PM Bridge Bot",
    short_description:
      "A single bot that bridges your internal team and external clients — files every conversation into a dual-folder knowledge base and answers with role-aware personas.",
    long_description:
      "PM Bridge Bot is a project-management assistant that sits between an internal team and external clients. It keeps a dual-folder knowledge base — an `internal/` scope only your team can search and a `shared/` scope for client-facing material — and files every chat, document, and meeting note into the right place.\n\nIt ships two skills. The onboarding skill walks you through a short setup (your internal team and external client groups) and generates a `config.json` that hard-codes each group's knowledge-base access scope. The knowledge-manager skill then handles dual-folder search, classification (chat / doc / meeting-note / other), and file ingestion. The bot answers with a role-appropriate persona — a different tone for internal teammates vs. external clients.\n\nLanguage is auto-detected from each message; there is no language picker.",
    usage_tip:
      "Talk to the **Client Agent bot**. On the very first message it sends a welcome — reply **\"start\"** (or \"开始\") to begin onboarding.\n\nOnboarding is short: it asks you to name your internal team group and your external client group, then generates `config.json` — the hard-coded isolation layer that decides which knowledge-base folders are searchable in which context.\n\nAfter setup, just use it: paste a conversation or drop a document and it files the item into the right `internal/` or `shared/` sub-folder (chat / doc / meeting-note / other); ask a question and it searches only the folders the current context is allowed to see. You can resume a half-finished onboarding any time by saying \"start\" again.",
    categories: ["productivity", "knowledge-base"],
    tags: ["pm", "knowledge-base", "client-comms", "onboarding", "single-agent"],
    bundle_url: "/templates/pm-bridge-bot.nxbundle",
    bundle_size_bytes: 28978,
    bundle_sha256:
      "5c76ca3780e87f6aecb0eb53831467fef030c9b4ec03f6de8acbbb0fb8e06391",
    author: { name: "NarraNexus team contributor" },
    license: "MIT",
    manifest_summary: {
      bundle_format_version: "1.1",
      narranexus_version_exported: "1.3.4",
      agent_count: 1,
      unique_skill_count: 2,
      requires_external_mcp: false,
      requires_credentials: [],
    },
    agents: [{ name: "Client Agent bot", agent_id: "agent_5094b522bded" }],
    created_at: "2026-05-20",
    updated_at: "2026-05-20",
  },
  {
    slug: "web-development-team",
    name: "Web Development Team",
    short_description:
      "A 4-agent build-and-ship pipeline — PM scopes the work, Web Developer builds it, Design Reviewer signs off, Vercel Deployment Agent ships it.",
    long_description:
      "Web Development Team is the full build-and-ship pipeline for frontend or Supabase-backed web apps. A Product Manager turns your brief into a scoped plan; the Web Developer implements (frontend-first by default, Supabase for any backing data); a Design Reviewer inspects the result against the brief; and the Vercel Deployment Agent ships the live URL.\n\nThe team ships 7 bundled skills covering the modern web-app toolchain: **impeccable** for design discipline, **frontend-design** + **agency-frontend-developer** for the front of house, **supabase** for the data layer, **image-generation** for placeholder + production assets, **vercel-deployments** for shipping, and a couple more covering the gaps. The PM-first orchestration keeps scope tight; the Vercel hand-off keeps the loop short — brief in, URL out.\n\nUse it for landing pages, portfolios, small SaaS dashboards, and Supabase-backed prototypes. The agents read each other's outputs, so you don't relay messages between them — give the PM the brief and let the pipeline run.",
    usage_tip:
      "Always start with the **Product Manager**. Drop a brief in plain English:\n\n> \"Build a marketing site for a coffee subscription startup. Hero with a video background, 3 plans, an about section, a waitlist form backed by Supabase. Brand is warm and editorial.\"\n\nWhat happens next:\n- PM returns a scoped plan + clarifying questions (answer them inline)\n- **Web Developer** implements the frontend, wires Supabase if needed, opens a preview\n- **Design Reviewer** inspects the result against the brief and your brand notes\n- **Vercel Deployment Agent** ships the production URL\n\nSkills worth invoking directly when relevant:\n- **impeccable** — for a discipline pass on a design decision (\"impeccable critique the hero\")\n- **supabase** — for schema + RLS work (\"set up the waitlist table with RLS\")\n- **vercel-deployments** — for a manual redeploy or env-var update\n\nNeeds a Vercel token. Supabase project URL + anon key only if you ask for a data layer.",
    categories: ["development", "web"],
    tags: [
      "web-development",
      "frontend",
      "supabase",
      "vercel",
      "team",
      "impeccable",
      "design-review",
    ],
    bundle_url: "/templates/Web_Development-20260603.nxbundle",
    bundle_size_bytes: 1286355,
    bundle_sha256:
      "8bb5e3a55ec37885a9251ce5e6486e01c234c65f9fea59299968d1e797d9fb8e",
    author: { name: "NarraNexus team contributor" },
    license: "MIT",
    manifest_summary: {
      bundle_format_version: "1.1",
      narranexus_version_exported: "1.3.4",
      agent_count: 4,
      unique_skill_count: 7,
      requires_external_mcp: false,
      requires_credentials: [
        "Vercel token (for the Vercel Deployment Agent)",
        "Supabase project URL + anon key (optional, only if your app needs a backend)",
      ],
    },
    agents: [
      { name: "Product Manager", agent_id: "agent_de9d27421538" },
      { name: "Web Developer", agent_id: "agent_62bd838e1fb5" },
      { name: "Design Reviewer", agent_id: "agent_cd2f8240a8ab" },
      { name: "Vercel Deployment Agent", agent_id: "agent_b1bb719c1a08" },
    ],
    created_at: "2026-06-03",
    updated_at: "2026-06-03",
  },
  {
    slug: "overnight-coder",
    name: "Overnight Coder",
    short_description:
      "An autonomous developer that picks up your TODO list at midnight and lands reviewable PRs by 7 AM — full test runs, meaningful commits, decisions logged.",
    long_description:
      "Overnight Coder works through coding tasks while your team sleeps. You hand it a list of tickets at end of day; it picks them up at midnight, reads the existing codebase to match your conventions, writes the code, runs the full test suite, and opens well-documented pull requests ready for morning review.\n\nThe agent ships two skills:\n- **git-commit-writer** crafts disciplined commits from staged diffs (imperative mood, the *why* not the *what*).\n- **cost-optimizer** audits expensive LLM calls so a long autonomous session doesn't surprise you on the bill.\n\nIt never pushes to main directly — every change goes through a PR with description, how-to-test, and a list of decisions made. Ambiguous tasks get a question comment, not a guess; any code it touches gets read before it's rewritten. By 7 AM you get a session report with PR links, test results, files touched, and any items that need a human decision.",
    usage_tip:
      "Talk to **Overnight Coder** at end of day. Give it a clear task list — branch names suggested, priorities flagged if relevant. For example:\n\n> \"Tonight: (1) fix the bug in /api/search query encoding, (2) add pagination to the products page, (3) refactor the auth middleware to the new token format.\"\n\nExpect back:\n- A pre-flight session plan with estimated time per task and branch names\n- A morning report (PR links, test status, decisions that need your call)\n\nAsk it to use specific skills:\n- **git-commit-writer** — \"write the commit message for the staged changes\"\n- **cost-optimizer** — \"audit my recent Claude usage and find expensive calls\"\n\nBest on desktop / self-hosted NarraNexus where the agent can actually run your test suite.",
    categories: ["development", "automation"],
    tags: [
      "autonomous",
      "coding",
      "pull-requests",
      "overnight",
      "single-agent",
      "git-commit-writer",
      "cost-optimizer",
    ],
    bundle_url: "/templates/overnight-coder.nxbundle",
    bundle_size_bytes: 10219,
    bundle_sha256:
      "d8401fac845faf5e731d66cb8a93f1aecdcca8cd6361af2b3b759d38308caf28",
    author: { name: "Community contributor" },
    license: "MIT",
    manifest_summary: {
      bundle_format_version: "1.1",
      narranexus_version_exported: "1.7.2",
      agent_count: 1,
      unique_skill_count: 2,
      requires_external_mcp: false,
      requires_credentials: [
        "Git access to the repo you want it to work on",
        "Test runner reachable from the agent's workspace (Desktop / self-hosted recommended)",
      ],
    },
    agents: [{ name: "Overnight Coder", agent_id: "agent_d25dc396193c" }],
    created_at: "2026-06-02",
    updated_at: "2026-06-02",
  },
  {
    slug: "sql-assistant",
    name: "SQL Assistant",
    short_description:
      "Ask in plain English, get optimized SQL with an explanation and index suggestions — works across PostgreSQL, MySQL, SQLite.",
    long_description:
      "SQL Assistant turns natural-language questions into optimized SQL queries. Ask \"show me users who signed up last week but never logged in\" and it returns the LEFT JOIN plus a paragraph explaining how the query works and which index will make it fast.\n\nBeyond translation, the agent debugs slow queries: paste an EXPLAIN ANALYZE plan and it identifies full table scans, missing indexes, and subquery rewrites — typical wins take a 12-second query under 200ms. It also documents schemas, suggests fixes for SQL errors, and explains execution plans in simple terms.\n\nIt ships the **model-cost-compare** skill so you can decide whether a heavy query-generation session is worth the LLM cost — compare token prices across major models and pick the right one.\n\nGuardrail: it warns before any DELETE or UPDATE without a WHERE clause, and never executes destructive statements itself — you copy the SQL out and run it.",
    usage_tip:
      "Talk to **SQL Assistant**. Three modes:\n\n**1. Plain-English → SQL**\n> \"From `orders`, `users`, and `refunds`, give me the top 10 net-revenue users last quarter, excluding any with refund rate over 50%.\"\n\nIt outputs the SQL + a quick explanation and any index recommendations.\n\n**2. Optimize a slow query**\n> Paste your query or EXPLAIN ANALYZE plan and say \"this takes 12 seconds, help me optimize.\"\n\n**3. Debug an error**\n> Paste the error and the query — it diagnoses and suggests a fix.\n\nAsk it to use **model-cost-compare** (\"compare model costs for this workload\") when planning a heavy session and want the cheapest capable model.\n\nWorks against PostgreSQL, MySQL, and SQLite syntax. The agent never runs destructive statements — you copy the SQL out and execute yourself.",
    categories: ["development", "data"],
    tags: [
      "sql",
      "database",
      "query-optimization",
      "postgres",
      "mysql",
      "single-agent",
      "model-cost-compare",
    ],
    bundle_url: "/templates/sql-assistant.nxbundle",
    bundle_size_bytes: 7909,
    bundle_sha256:
      "dce3590e3856657055e5fdf16d058bc16b93d5e1ab65fa6c32592e81a65e21f2",
    author: { name: "Community contributor" },
    license: "MIT",
    manifest_summary: {
      bundle_format_version: "1.1",
      narranexus_version_exported: "1.7.2",
      agent_count: 1,
      unique_skill_count: 1,
      requires_external_mcp: false,
      requires_credentials: [],
    },
    agents: [{ name: "SQL Assistant", agent_id: "agent_43fa5b5b9ee3" }],
    created_at: "2026-06-02",
    updated_at: "2026-06-02",
  },
  {
    slug: "travel-planner",
    name: "Travel Planner",
    short_description:
      "Plans trips like a local — day-by-day itineraries with timing, costs in USD, transit between stops, and 2-3 options at every price tier.",
    long_description:
      "Travel Planner builds the kind of trip a friend who lives there would plan: balanced between bucket-list highlights and hidden gems, obsessively organized on logistics, every line item priced in USD.\n\nGive it a destination, number of travelers, dates, and a budget — it produces a day-by-day itinerary with morning/afternoon/evening blocks, transit time between stops (it won't stack a 9 AM in Shibuya with a 10 AM in Asakusa), opening hours, advance-booking notes, and a full budget breakdown across hotels, food, activities, and transit.\n\n2-3 options per category at different price tiers (budget / mid-range / luxury) so you decide rather than feel locked in. Visa requirements, vaccination needs, safety advisories, seasonal closures, and local holidays all surfaced upfront. Packing lists and pre-trip checklists tailored to the destination.\n\nThe agent doesn't book — it plans. You handle the actual reservations using the names and links it provides.",
    usage_tip:
      "Talk to **Travel Planner**. Give it the basics in one message:\n\n> \"5 days in Tokyo, 2 travelers, late November, mid-range budget ~$3000 total (excluding flights). Must do: teamLab, Tsukiji. Avoid: super-touristy stuff.\"\n\nExpect back:\n- A total budget breakdown (hotels / food / activities / transit / buffer)\n- A day-by-day itinerary with timing, costs, opening hours, and transit notes between stops\n- 2-3 alternatives for accommodation, dining, and activities at different price points\n- Visa / vaccination / safety notes for international trips, plus a pre-trip checklist\n\nFollow-up questions work great:\n- \"What if it rains on day 3 — what's the backup plan?\"\n- \"Swap the budget hotel for something nicer, keep the total under $3500.\"\n- \"My partner is gluten-free, redo the dining recs.\"\n\nThe agent won't book anything — it gives you names, prices, and links so you book yourself.",
    categories: ["personal", "lifestyle"],
    tags: ["travel", "itinerary", "planning", "budget", "single-agent"],
    bundle_url: "/templates/travel-planner.nxbundle",
    bundle_size_bytes: 6657,
    bundle_sha256:
      "4cdcb237cccd1bb82fc72082bbed10152accdb79b5303fc9f49ed56617b5d2d9",
    author: { name: "Community contributor" },
    license: "MIT",
    manifest_summary: {
      bundle_format_version: "1.1",
      narranexus_version_exported: "1.7.2",
      agent_count: 1,
      unique_skill_count: 0,
      requires_external_mcp: false,
      requires_credentials: [],
    },
    agents: [{ name: "Travel Planner", agent_id: "agent_67dafae08e7c" }],
    created_at: "2026-06-02",
    updated_at: "2026-06-02",
  },
  {
    slug: "phishing-detector",
    name: "Phishing Detector",
    short_description:
      "Paste a suspicious email or URL — get a 0-100 phishing score with specific red flags, recommended action, and a safe analysis (no clicks).",
    long_description:
      "Phishing Detector analyzes emails, URLs, and messages for phishing and social-engineering indicators. Paste a suspicious email and it returns a 0-100 risk score with concrete red flags: sender-domain homoglyph attacks (paypa1.com vs paypal.com), urgency language, generic greetings, link/text mismatches, and unrelated link destinations.\n\nIt structures the analysis so you understand *why* something is suspicious — not just a binary yes/no. Specific indicators get cited, the recommended action is explicit (\"do NOT click any links, go to paypal.com directly\"), and uncertain cases get flagged for human review rather than waved through.\n\nFor teams, it can also produce weekly phishing-attempt summaries: counts by attack type (credential phishing, invoice scams, CEO impersonation), trends month-over-month, and which functions are getting targeted. Pair it with a Slack channel or a cron schedule for a passive monitoring posture.\n\nSafety: the agent never visits or fetches suspicious URLs — it analyzes the structure of the URL and message only.",
    usage_tip:
      "Talk to **Phishing Detector** any time you get a sketchy email or message. Three modes:\n\n**1. Single-message check**\n> Paste the email body, the sender, and any URLs.\n> \"Is this legit?\"\n\nGet back: phishing score (0-100), specific red flags, and a recommended action.\n\n**2. URL-only check**\n> \"Is `hxxp://paypa1-secure.xyz/login` safe?\"\n\nThe agent analyzes domain structure *without ever visiting the URL*.\n\n**3. Trend / summary report**\n> \"Give me a March phishing report from the messages I flagged.\"\n\nGet a breakdown by attack type, trend lines, and recommended actions for the team.\n\nThe agent is intentionally cautious — it flags ambiguous cases for human review rather than greenlight them.",
    categories: ["security", "productivity"],
    tags: ["phishing", "security", "email", "url-check", "single-agent"],
    bundle_url: "/templates/phishing-detector.nxbundle",
    bundle_size_bytes: 6003,
    bundle_sha256:
      "1f5c539c06bb2861ccafa53dfc640f9c2de57d8303d5746b38b9ee34e88ff5c1",
    author: { name: "Community contributor" },
    license: "MIT",
    manifest_summary: {
      bundle_format_version: "1.1",
      narranexus_version_exported: "1.7.2",
      agent_count: 1,
      unique_skill_count: 0,
      requires_external_mcp: false,
      requires_credentials: [],
    },
    agents: [{ name: "Phishing Detector", agent_id: "agent_5f9b21650469" }],
    created_at: "2026-06-02",
    updated_at: "2026-06-02",
  },
];

export function getTemplate(slug: string): Template | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}

export function allCategories(): string[] {
  const set = new Set<string>();
  for (const t of TEMPLATES) {
    if (t.hidden) continue;
    t.categories.forEach((c) => set.add(c));
  }
  return Array.from(set).sort();
}

/** Bytes → human-readable size string. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
