import Link from "next/link";
import { notFound } from "next/navigation";
import { TEMPLATES, formatBytes, getTemplate } from "@/lib/templates";

const eyebrow =
  "font-mono text-[11px] uppercase tracking-widest text-muted";

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) return {};
  return {
    title: t.name,
    description: t.short_description,
  };
}

export default async function TemplateDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) notFound();

  return (
    <article className="max-w-[1400px] mx-auto px-6 pt-12 md:pt-16 pb-20">
      <Link
        href="/templates"
        className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-ink transition-colors mb-8"
      >
        <span aria-hidden="true">&larr;</span> All templates
      </Link>

      <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-12">
        {/* Main column */}
        <div>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {t.categories.map((c) => (
              <span
                key={c}
                className="font-mono text-[10px] uppercase tracking-wider text-muted px-1.5 py-0.5 border border-rule"
              >
                {c}
              </span>
            ))}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-700 leading-[1.05] tracking-tight mb-4">
            {t.name}
          </h1>

          <p className="font-body font-300 text-base md:text-lg text-muted mb-8 leading-relaxed">
            by{" "}
            {t.author.url ? (
              <a
                href={t.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-2 hover:text-muted transition-colors"
              >
                {t.author.name}
              </a>
            ) : (
              <span className="text-ink">{t.author.name}</span>
            )}{" "}
            · {t.license}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              type="button"
              disabled
              title="Coming soon — Phase 2"
              className="px-5 py-2.5 bg-muted/30 text-muted font-body text-sm font-400 border border-rule cursor-not-allowed"
            >
              Install in NarraNexus
              <span className="ml-2 font-mono text-[9px] uppercase tracking-wider opacity-70">
                soon
              </span>
            </button>
            <a
              href={t.bundle_url}
              download
              className="px-5 py-2.5 border border-ink text-ink font-body text-sm font-400 hover:bg-ink hover:text-paper transition-colors"
            >
              Download .nxbundle
              <span className="ml-2 font-mono text-[10px] text-muted">
                {formatBytes(t.bundle_size_bytes)}
              </span>
            </a>
          </div>

          {/* Long description */}
          <section className="mb-10">
            <p className="font-body font-300 text-base text-ink leading-relaxed whitespace-pre-line">
              {t.long_description}
            </p>
          </section>

          {/* Agent list */}
          <section className="mb-10">
            <h2 className="font-heading text-xl font-700 mb-4">
              Agents in this template
            </h2>
            <ul className="grid sm:grid-cols-2 gap-px bg-rule border border-rule">
              {t.agents.map((a) => (
                <li
                  key={a.agent_id}
                  className="bg-paper px-4 py-3 font-body text-sm text-ink"
                >
                  {a.name}
                </li>
              ))}
            </ul>
          </section>

          {/* Manual import instructions */}
          <section className="border-l-2 border-rule pl-4 py-1">
            <h2 className={`${eyebrow} mb-2`}>How to install (manual)</h2>
            <ol className="font-body font-300 text-sm text-muted leading-relaxed list-decimal pl-5 space-y-1">
              <li>Click <strong>Download .nxbundle</strong> above.</li>
              <li>
                Open your NarraNexus app and go to{" "}
                <span className="font-mono">Settings → Import bundle</span>.
              </li>
              <li>Drag the downloaded file in, review the preflight, confirm.</li>
            </ol>
            <p className="font-body font-300 text-xs text-muted mt-3 leading-relaxed">
              One-click install (a deep link that imports directly into your
              cloud or desktop NarraNexus) is the next milestone.
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 self-start">
          <div className="border border-rule">
            <SidebarRow label="Agents" value={String(t.manifest_summary.agent_count)} />
            <SidebarRow
              label="Unique skills"
              value={String(t.manifest_summary.unique_skill_count)}
            />
            <SidebarRow
              label="Min NarraNexus"
              value={t.manifest_summary.narranexus_version_exported}
            />
            <SidebarRow
              label="Bundle format"
              value={t.manifest_summary.bundle_format_version}
            />
            <SidebarRow label="Size" value={formatBytes(t.bundle_size_bytes)} />
            <SidebarRow label="License" value={t.license} />
            <SidebarRow label="Updated" value={t.updated_at} last />
          </div>

          {/* Requires */}
          {t.manifest_summary.requires_credentials.length > 0 && (
            <div className="mt-5 border border-rule p-4">
              <div className={`${eyebrow} mb-2`}>You will also need</div>
              <ul className="space-y-1">
                {t.manifest_summary.requires_credentials.map((r) => (
                  <li
                    key={r}
                    className="font-body font-300 text-sm text-muted"
                  >
                    • {r}
                  </li>
                ))}
              </ul>
              <p className="font-body font-300 text-[11px] text-muted mt-3 leading-relaxed">
                Plus an LLM provider key (OpenAI / Claude / Gemini / NetMind) —
                the same one you configure for any NarraNexus agent.
              </p>
            </div>
          )}

          {/* Tags */}
          {t.tags.length > 0 && (
            <div className="mt-5">
              <div className={`${eyebrow} mb-2`}>Tags</div>
              <div className="flex flex-wrap gap-1.5">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-muted px-1.5 py-0.5 border border-rule"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        </aside>
      </div>
    </article>
  );
}

function SidebarRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between px-4 py-2.5 ${
        last ? "" : "border-b border-rule"
      }`}
    >
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {label}
      </span>
      <span className="font-body text-sm text-ink">{value}</span>
    </div>
  );
}
