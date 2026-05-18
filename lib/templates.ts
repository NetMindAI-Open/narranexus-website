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
 *   2. add an entry below; mirror values from the bundle's manifest.json
 *      (unzip -p the-bundle.nxbundle manifest.json | jq)
 *   3. git add + commit + push → Vercel auto-deploys
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
  categories: string[];
  tags: string[];

  /**
   * Public download path. Phase 1 uses relative paths under /templates/
   * (served from public/). Phase 2 swaps to object-storage URLs without
   * touching consumers — they just `fetch(bundle_url)`.
   */
  bundle_url: string;
  bundle_size_bytes: number;
  /** From the bundle's manifest.json integrity_sha256 field. */
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
      "A 6-agent team that produces a polished HTML morning briefing every weekday at 06:30 Asia/Shanghai.",
    long_description:
      "Financial Morning Briefing is a 6-agent team coordinated by the Briefing Maestro. Five specialist analysts — global markets, macro policy, holdings watcher, industry desk, sentiment scout — collaborate via the message bus to produce a daily pre-market briefing. The Maestro synthesizes their findings into a structured 5-section HTML artifact (impact judgments, watchlist tags, sources) and ships it on a schedule. Bring your own holdings.json and sector preferences and the team will personalize over time without ever pushing an intake form at you.",
    categories: ["finance", "team"],
    tags: ["scheduled", "lark", "html-report", "multi-agent", "briefing"],
    bundle_url: "/templates/financial-briefing-team-20260515-0603.nxbundle",
    bundle_size_bytes: 865142,
    bundle_sha256:
      "81226fb559d3019019a93382c5ba2503726c4820dd57ede138d23ff08d52ae83",
    author: { name: "NarraNexus team" },
    license: "MIT",
    manifest_summary: {
      bundle_format_version: "1.1",
      narranexus_version_exported: "1.3.4",
      agent_count: 6,
      unique_skill_count: 2,
      requires_external_mcp: false,
      requires_credentials: ["Lark (for daily delivery)"],
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
    updated_at: "2026-05-15",
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
