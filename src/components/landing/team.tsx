"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const orgs = [
  {
    name: "Netmind",
    url: "https://www.netmind.ai/",
    description: "AI research and product company.",
  },
];

export function Team() {
  const t = useTranslations("team");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-muted">
            {t("description")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex justify-center">
            <a
              href="https://www.netmind.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border bg-card px-8 py-5 transition-colors hover:border-accent/50"
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Netmind
                </h3>
                <p className="mt-1 text-sm text-muted">AI research and product company.</p>
              </div>
              <ExternalLink className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent" />
            </a>
          </div>

          <p className="mt-8 text-center text-sm text-muted">
            {t("license")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
