"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Download } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const command =
  "git clone https://github.com/johnsonice/narranexus-website.git && cd NarraNexus && bash run.sh";

const DMG_URL =
  "https://github.com/johnsonice/narranexus-website/releases/latest/download/NarraNexus-1.0.9-universal.dmg";

const osTabs = ["Linux", "macOS"] as const;

export function QuickStart() {
  const t = useTranslations("quickStart");
  const [activeOS, setActiveOS] = useState<(typeof osTabs)[number]>("Linux");

  return (
    <section id="quick-start" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-muted">
            {t("description")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          {/* OS tabs */}
          <div className="mb-4 flex gap-2">
            {osTabs.map((os) => (
              <button
                key={os}
                onClick={() => setActiveOS(os)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeOS === os
                    ? "bg-accent text-white"
                    : "bg-card text-muted hover:text-foreground"
                }`}
              >
                {os}
              </button>
            ))}
          </div>

          {/* Content per OS */}
          {activeOS === "macOS" ? (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <p className="mb-6 text-muted">
                {t("macDownload")}
              </p>
              <a
                href={DMG_URL}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:brightness-110"
              >
                <Download className="h-5 w-5" />
                {t("downloadDmg")}
              </a>
              <p className="mt-4 text-xs text-muted">
                NarraNexus-1.0.9-universal.dmg · macOS (Universal)
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-4 py-2">
                <span className="text-xs text-muted">{activeOS}</span>
                <CopyButton text={command} />
              </div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground">
                <code>{command}</code>
              </pre>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
