"use client";

import { useTranslations } from "next-intl";
import {
  MessageSquare,
  BookOpen,
  Puzzle,
  Store,
  Bot,
  DollarSign,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { LucideIcon } from "lucide-react";

interface FeatureCard {
  key: string;
  icon: LucideIcon;
}

const features: FeatureCard[] = [
  { key: "communication", icon: MessageSquare },
  { key: "memory", icon: BookOpen },
  { key: "modules", icon: Puzzle },
  { key: "skills", icon: Store },
  { key: "llm", icon: Bot },
  { key: "costs", icon: DollarSign },
];

export function Features() {
  const t = useTranslations("features");

  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-16 text-center font-mono text-3xl font-bold uppercase tracking-[0.2em] text-white md:text-4xl text-glow-cyan">
          <span className="text-accent">{">"}</span> {t("title")}
          <span className="ml-2 animate-pulse text-accent">_</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.key} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-none border border-white/10 bg-transparent p-8 transition-all duration-300 hover:border-accent hover:bg-white/[0.02] border-hud">

                  {/* Decorative glowing corners */}
                  <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="mb-6 flex h-14 w-14 items-center justify-center border border-white/10 bg-transparent text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-glow-cyan">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300 group-hover:text-glow-cyan">
                    {t(`${feature.key}.title`)}
                  </h3>
                  <p className="font-mono text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/80">
                    {t(`${feature.key}.description`)}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
