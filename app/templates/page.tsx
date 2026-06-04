"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TEMPLATES, allCategories } from "@/lib/templates";

const eyebrow =
  "font-mono text-[11px] uppercase tracking-widest text-muted";

export default function TemplatesIndex() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = useMemo(() => allCategories(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEMPLATES.filter((t) => {
      if (t.hidden) return false;
      if (activeCategory && !t.categories.includes(activeCategory)) return false;
      if (!q) return true;
      const haystack = [
        t.name,
        t.short_description,
        t.long_description,
        ...t.tags,
        ...t.categories,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeCategory]);

  return (
    <section className="max-w-[1400px] mx-auto px-6 pt-16 md:pt-20 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" aria-hidden="true" />
        <span className={eyebrow}>Templates</span>
      </div>

      <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-700 leading-[1.08] tracking-tight mb-4">
        Start from a working agent
      </h1>

      <p className="font-body font-300 text-base md:text-lg text-muted max-w-2xl mb-10 leading-relaxed">
        Curated <code className="font-mono text-sm">.nxbundle</code> templates —
        download and import into your NarraNexus to bootstrap a single agent or
        an entire coordinated team in minutes.
      </p>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search templates…"
          className="flex-1 max-w-md px-3 py-2 border border-rule bg-paper font-body text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink transition-colors"
        />
        <div className="flex gap-2 flex-wrap">
          <CategoryChip
            label="All"
            active={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          />
          {categories.map((c) => (
            <CategoryChip
              key={c}
              label={c}
              active={activeCategory === c}
              onClick={() => setActiveCategory(c)}
            />
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="border border-rule p-10 text-center">
          <p className="font-body text-sm text-muted">
            No templates match your filter.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
          {filtered.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              className="group bg-paper p-6 hover:bg-paper-2/30 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                {t.categories.map((c) => (
                  <span
                    key={c}
                    className="font-mono text-[9px] uppercase tracking-wider text-muted px-1.5 py-0.5 border border-rule"
                  >
                    {c}
                  </span>
                ))}
                <span className="ml-auto font-mono text-[10px] text-muted">
                  {t.manifest_summary.agent_count} agent
                  {t.manifest_summary.agent_count === 1 ? "" : "s"}
                </span>
              </div>

              <h2 className="font-heading text-lg font-700 leading-tight mb-2 group-hover:text-muted transition-colors">
                {t.name}
              </h2>
              <p className="font-body font-300 text-sm text-muted leading-relaxed flex-1 mb-4">
                {t.short_description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-rule mt-auto">
                <span className="font-mono text-[10px] text-muted">
                  by {t.author.name}
                </span>
                <span className="font-mono text-xs text-ink group-hover:translate-x-0.5 transition-transform">
                  View &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Footer note about Phase 1 curation */}
      <p className="mt-12 font-body font-300 text-xs text-muted max-w-2xl">
        These templates are curated by the NarraNexus team. Want to share one
        of your own?{" "}
        <a
          href="https://github.com/NetMindAI-Open/NarraNexus/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-ink transition-colors"
        >
          Open an issue
        </a>{" "}
        with your <code className="font-mono text-[11px]">.nxbundle</code> attached.
        Self-serve submission is coming.
      </p>
    </section>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border transition-colors ${
        active
          ? "bg-ink text-paper border-ink"
          : "border-rule text-muted hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
