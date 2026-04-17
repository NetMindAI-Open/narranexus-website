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
          <h2 className="mb-4 text-center font-mono text-3xl font-bold uppercase tracking-[0.2em] text-white md:text-4xl text-glow-cyan">
            <span className="text-accent">{">"}</span> {t("title")}
            <span className="ml-2 animate-pulse text-accent">_</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center font-mono text-muted tracking-wide">
            {t("description")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex justify-center">
            <a
              href="https://www.netmind.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 rounded-none border border-white/10 bg-transparent px-8 py-5 transition-all hover:bg-white/[0.02] hover:border-accent"
            >
              <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div>
                <h3 className="font-mono text-lg font-semibold uppercase text-white transition-colors group-hover:text-glow-cyan">
                  Netmind
                </h3>
                <p className="mt-1 font-mono text-sm text-muted transition-colors group-hover:text-white/80">AI research and product company.</p>
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
