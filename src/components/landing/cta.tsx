"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Github } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function CTA() {
  const t = useTranslations("cta");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <h2 className="mb-4 align-middle font-mono text-3xl font-bold uppercase tracking-[0.2em] text-white md:text-4xl text-glow-cyan">
            <span className="text-accent">{">"}</span> {t("title")}
            <span className="ml-2 animate-pulse text-accent">_</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl font-mono text-muted tracking-wide">
            {t("description")}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#quick-start"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-8 py-3 font-mono font-semibold text-white transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-glow-cyan"
            >
              {t("getStarted")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-accent" />
            </a>

            <a
              href="https://github.com/NetMindAI-Open/NarraNexus"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-8 py-3 font-mono font-semibold text-white/80 transition-all duration-300 hover:border-white/50 hover:text-white"
            >
              <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
              {t("github")}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
