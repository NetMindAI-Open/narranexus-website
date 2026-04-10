"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CopyButton } from "@/components/ui/copy-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const command =
  "git clone https://github.com/NetMindAI-Open/NarraNexus.git && cd NarraNexus && bash run.sh";

const osTabs = ["Linux", "macOS", "Windows (WSL2)"] as const;

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

          {/* Code block */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="text-xs text-muted">{activeOS}</span>
              <CopyButton text={command} />
            </div>
            <pre className="overflow-x-auto p-4 text-sm text-foreground">
              <code>{command}</code>
            </pre>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
