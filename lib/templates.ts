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
    slug: "kol-assistant",
    name: "KOL Assistant",
    short_description:
      "A 4-agent team for content creators: parse inbound sponsor emails, manage CRM, monitor brand mentions across social platforms, and orchestrate the sponsorship pipeline.",
    long_description:
      "KOL Assistant handles a creator's sponsorship pipeline end-to-end with four specialised agents.\n\nThe Email Intake Agent reads incoming sponsor inquiries from your inbox (Gmail) and parses out the offer terms. The Sponsorship CRM Agent tracks each sponsor as a record with relationship history and negotiation status. The Sponsorship Workflow Manager coordinates the moving pieces and emits structured HTML sponsor reports when a deal closes.\n\nReviewScout is the fourth and most operational agent: it monitors mentions of your name, brand, or product across X (Twitter), Reddit, Hacker News, Product Hunt, and Zhihu via the bundled bb-browser tooling, so you can track the conversation around your content without manually refreshing feeds. First-time use needs you to log in to each platform locally — sessions are cached on disk and only need refreshing when cookies expire.",
    usage_tip:
      "This is a 4-agent team. The **Sponsorship Workflow Manager** is the natural starting point — talk to it to drive a sponsorship through its stages; it coordinates the others.\n\n- **Email Intake Agent** — parses incoming sponsor inquiries from Gmail; works mostly in support of the Workflow Manager.\n- **Sponsorship CRM Agent** — ask it about a specific sponsor's history and negotiation status.\n- **ReviewScout** — talk to it directly to pull a brand-mention report across X, Reddit, Hacker News, Product Hunt, and Zhihu.\n\nExpect: structured HTML sponsor reports from the Workflow Manager when a deal progresses, and mention digests from ReviewScout. ReviewScout's first run needs you logged in to those platforms locally (sessions cache on disk) — see the prerequisites in the sidebar.",
    categories: ["sponsorship", "team"],
    tags: ["kol", "creator", "sponsorship", "crm", "social-listening", "gmail", "multi-agent"],
    bundle_url: "/templates/KOL_assistant-20260518.nxbundle",
    bundle_size_bytes: 330104,
    bundle_sha256:
      "af9b06b9fd19ab1429597d0f274f6724fabd773aafefaf8b6691271e21cb252c",
    author: { name: "NarraNexus team contributor" },
    license: "MIT",
    manifest_summary: {
      bundle_format_version: "1.0",
      narranexus_version_exported: "1.3.4",
      agent_count: 4,
      unique_skill_count: 7,
      requires_external_mcp: false,
      requires_credentials: [
        "Maton AI API key (Email Intake — MATON_API_KEY)",
        "Gmail account access (Email Intake)",
        "Google Chrome installed locally + manual login to X / Reddit / Zhihu / LinkedIn / Product Hunt (ReviewScout)",
      ],
    },
    agents: [
      { name: "Sponsorship Workflow Manager", agent_id: "agent_f7b2d4417b0c" },
      { name: "Email Intake Agent", agent_id: "agent_bd0cab20fab6" },
      { name: "Sponsorship CRM Agent", agent_id: "agent_ae460d666546" },
      { name: "ReviewScout", agent_id: "agent_145f25d42a9c" },
    ],
    created_at: "2026-05-18",
    updated_at: "2026-05-18",
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
    slug: "gaokao-team",
    name: "Gaokao Grading Team",
    short_description:
      "A 5-agent exam-review team that simulates a candidate workflow and grades Chinese, Math, and English submissions before producing an overall assessment.",
    long_description:
      "Gaokao Grading Team is a 5-agent team for reviewing Gaokao-style exam performance. A candidate agent works with subject-specific graders for Chinese, Math, and English, then a comprehensive evaluator synthesizes the subject feedback into an overall assessment.\n\nThe template includes dedicated answer-reference skills for 2026 Chinese Paper 1, Math Paper 1, and English Paper 1, allowing each subject grader to evaluate against the bundled material rather than acting as a generic tutor.\n\nUse it as a structured demo of multi-agent grading, subject-specialist review, and final report synthesis.",
    usage_tip:
      "**Start with the 考生 agent** to submit or discuss answers. The subject graders handle their own domains, and 综合评估 is the final synthesis point.\n\nSuggested flow:\n- Ask 考生 to provide the exam response or start a review session\n- Let 语文阅卷, 数学阅卷, and 英语阅卷 evaluate their subject areas\n- Ask 综合评估 for the final cross-subject summary, strengths, weaknesses, and improvement priorities\n\nExpect: subject-level grading feedback followed by an integrated assessment. Configure your LLM providers in Settings → Providers before running the team.",
    categories: ["education", "team"],
    tags: ["gaokao", "grading", "multi-agent", "exam-review", "assessment"],
    bundle_url: "/templates/gaokao-team.nxbundle",
    bundle_size_bytes: 5827206,
    bundle_sha256:
      "26b86d2c1e443ced39e2c8a68c03dacd9c71673eaad9dbd193109fba5d568a77",
    author: { name: "NarraNexus team" },
    license: "MIT",
    manifest_summary: {
      bundle_format_version: "1.1",
      narranexus_version_exported: "1.8.2",
      agent_count: 5,
      unique_skill_count: 3,
      requires_external_mcp: false,
      requires_credentials: [],
    },
    agents: [
      { name: "数学阅卷", agent_id: "agent_53682ffaf098" },
      { name: "英语阅卷", agent_id: "agent_11a1dbfda6b4" },
      { name: "语文阅卷", agent_id: "agent_ed13f9cadb31" },
      { name: "综合评估", agent_id: "agent_e70e2c7679a1" },
      { name: "考生", agent_id: "agent_463c52a8037a" },
    ],
    created_at: "2026-06-16",
    updated_at: "2026-06-17",
  },
];

export function getTemplate(slug: string): Template | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}

export function allCategories(): string[] {
  const set = new Set<string>();
  for (const t of TEMPLATES) t.categories.forEach((c) => set.add(c));
  return Array.from(set).sort();
}

/** Bytes → human-readable size string. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
