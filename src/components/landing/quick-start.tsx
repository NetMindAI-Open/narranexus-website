"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Download } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const command =
  "git clone https://github.com/NetMindAI-Open/NarraNexus.git && cd NarraNexus && bash run.sh";

const DMG_URL =
  "https://github.com/NetMindAI-Open/NarraNexus/releases/latest/download/NarraNexus-1.0.9-universal.dmg";

const osTabs = ["Linux", "macOS"] as const;

export function QuickStart() {
  const t = useTranslations("quickStart");
  const [activeOS, setActiveOS] = useState<(typeof osTabs)[number]>("Linux");

  return (
    <section id="quick-start" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <h2 className="mb-4 text-center font-mono text-3xl font-bold uppercase tracking-[0.2em] text-white md:text-4xl text-glow-cyan">
            <span className="text-accent">{">"}</span> {t("title")}
            <span className="ml-2 animate-pulse text-accent">_</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center font-mono text-muted tracking-wide">
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
                className={`rounded-none border border-hud px-4 py-2 font-mono text-sm tracking-wide transition-colors ${
                  activeOS === os
                    ? "bg-accent/10 text-glow-cyan border-accent text-accent"
                    : "bg-transparent text-muted hover:bg-white/[0.02] hover:text-white"
                }`}
              >
                {os}
              </button>
            ))}
          </div>

          {/* Content per OS */}
          {activeOS === "macOS" ? (
            <div className="group relative rounded-none border border-hud bg-transparent p-8 text-center transition-colors hover:border-accent">
              <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <p className="mb-6 font-mono text-muted">
                {t("macDownload")}
              </p>
              <a
                href={DMG_URL}
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-8 py-3 font-mono font-semibold text-white transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-glow-cyan"
              >
                <Download className="h-5 w-5" />
                {t("downloadDmg")}
              </a>
              <p className="mt-4 font-mono text-xs text-muted">
                <span className="text-accent">~</span>/NarraNexus-1.0.9-universal.dmg
              </p>
            </div>
          ) : (
            <div className="group relative rounded-none border border-hud bg-transparent transition-colors hover:border-accent">
              <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-hud px-4 py-2 bg-accent/5">
                <span className="font-mono text-xs text-accent">[{activeOS}]</span>
                <CopyButton text={command} />
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-sm text-foreground text-glow-cyan/50">
                <code><span className="text-accent">$</span> {command}</code>
              </pre>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
