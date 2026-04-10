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
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          {t("title")}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.key} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {t(`${feature.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
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
