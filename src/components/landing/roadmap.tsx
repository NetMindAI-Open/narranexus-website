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
          <h2 className="mb-4 text-center font-mono text-3xl font-bold uppercase tracking-[0.2em] text-white md:text-4xl text-glow-cyan">
            <span className="text-accent">{">"}</span> {t("title")}
            <span className="ml-2 animate-pulse text-accent">_</span>
          </h2>
          <p className="mx-auto mb-16 max-w-xl text-center font-mono text-muted tracking-wide">
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
                className={`absolute left-2.5 top-1 h-3 w-3 rounded-none border-2 md:top-1 ${
                  i % 2 === 0
                    ? "md:left-auto md:right-[-6.5px]"
                    : "md:left-[-6.5px]"
                } ${
                  ms.released
                    ? "border-accent bg-accent shadow-[0_0_10px_rgba(0,163,255,0.8)]"
                    : "border-accent bg-background"
                }`}
              />

              <span className="mb-1 inline-block rounded-none border border-accent/30 bg-accent/10 px-3 py-0.5 font-mono text-xs font-semibold text-accent text-glow-cyan">
                [{ms.version}]
              </span>
              <span className="ml-2 font-mono text-xs text-muted">{ms.date}</span>

              <h3 className="mt-2 font-mono text-lg font-semibold uppercase text-white transition-colors hover:text-glow-cyan">
                {ms.title}
              </h3>

              <ul
                className={`mt-2 space-y-1 font-mono text-sm text-muted ${
                  i % 2 === 0 ? "md:text-right" : ""
                }`}
              >
                {ms.items.map((item) => (
                  <li key={item} className="transition-colors hover:text-white/80">
                    <span className="text-accent/50 mr-2">-</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
