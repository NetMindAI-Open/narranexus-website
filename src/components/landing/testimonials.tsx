"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <h2 className="mb-8 font-mono text-3xl font-bold uppercase tracking-[0.2em] text-white md:text-4xl text-glow-cyan">
            <span className="text-accent">{">"}</span> {t("title")}
            <span className="ml-2 animate-pulse text-accent">_</span>
          </h2>

          <div className="group relative rounded-none border border-hud bg-transparent p-8 transition-colors hover:border-accent">
            <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
            <a
              href="https://github.com/NetMindAI-Open/NarraNexus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-accent transition-colors hover:text-glow-cyan"
            >
              <Star className="h-5 w-5" />
              <span className="font-mono font-semibold uppercase tracking-wide">Star us on GitHub</span>
            </a>
            <p className="mt-4 font-mono text-sm text-muted">
              More testimonials coming as the community grows.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
