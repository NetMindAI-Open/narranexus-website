"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface Milestone {
  version: string;
  date: string;
  title: string;
  items: string[];
  released: boolean;
}

const milestones: Milestone[] = [
  {
    version: "v0.1.0",
    date: "2026-02",
    title: "Foundation",
    items: [
      "Core agent runtime",
      "Matrix protocol integration",
      "Basic memory system",
      "Docker deployment",
    ],
    released: true,
  },
  {
    version: "v0.2.0",
    date: "2026-03",
    title: "Intelligence Layer",
    items: [
      "Narrative memory engine",
      "Multi-LLM support",
      "Skill marketplace",
      "Cost tracking dashboard",
    ],
    released: true,
  },
  {
    version: "v0.3.0",
    date: "2026 Q2",
    title: "Scale & Connect",
    items: [
      "MCP server integration",
      "Agent-to-agent workflows",
      "Advanced RAG pipeline",
      "Community plugin system",
    ],
    released: false,
  },
];

export function Roadmap() {
  const t = useTranslations("roadmap");

  return (
    <section id="roadmap" className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-16 max-w-xl text-center text-muted">
            {t("description")}
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

          {milestones.map((ms, i) => (
            <motion.div
              key={ms.version}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative mb-12 pl-12 md:w-1/2 md:pl-0 ${
                i % 2 === 0
                  ? "md:pr-12 md:text-right"
                  : "md:ml-auto md:pl-12 md:text-left"
              }`}
            >
              {/* Dot */}
              <div
                className={`absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 md:top-1 ${
                  i % 2 === 0
                    ? "md:left-auto md:right-[-6.5px]"
                    : "md:left-[-6.5px]"
                } ${
                  ms.released
                    ? "border-accent bg-accent"
                    : "border-accent bg-background"
                }`}
              />

              <span className="mb-1 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                {ms.version}
              </span>
              <span className="ml-2 text-xs text-muted">{ms.date}</span>

              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {ms.title}
              </h3>

              <ul
                className={`mt-2 space-y-1 text-sm text-muted ${
                  i % 2 === 0 ? "md:text-right" : ""
                }`}
              >
                {ms.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
