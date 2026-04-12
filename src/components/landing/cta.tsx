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
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-muted">
            {t("description")}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#quick-start"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:brightness-110"
            >
              {t("getStarted")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="https://github.com/NetMindAI-Open/NarraNexus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Github className="h-4 w-4" />
              {t("github")}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
