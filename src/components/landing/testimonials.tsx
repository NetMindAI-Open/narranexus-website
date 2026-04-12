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
          <h2 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">
            {t("title")}
          </h2>

          <div className="rounded-xl border border-border bg-card p-8">
            <a
              href="https://github.com/NetMindAI-Open/NarraNexus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent transition-colors hover:brightness-110"
            >
              <Star className="h-5 w-5" />
              <span className="font-semibold">Star us on GitHub</span>
            </a>
            <p className="mt-4 text-sm text-muted">
              More testimonials coming as the community grows.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
