"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const pipelineSteps = [
  { label: "Frontend", sub: "React / Electron" },
  { label: "FastAPI", sub: "REST Gateway" },
  { label: "Agent Runtime", sub: "Core Engine" },
  { label: "Modules", sub: "9 Capabilities" },
  { label: "Database", sub: "MySQL / Milvus" },
];

const modules = [
  "Memory",
  "Awareness",
  "Chat",
  "Social Network",
  "Jobs",
  "RAG",
  "Skills",
  "Matrix",
  "Events",
];

export function Architecture() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const t = useTranslations("architecture");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h2 className="mb-4 text-center font-mono text-3xl font-bold uppercase tracking-[0.2em] text-white md:text-4xl text-glow-cyan">
            <span className="text-accent">{">"}</span> {t("title")}
            <span className="ml-2 animate-pulse text-accent">_</span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center font-mono text-muted tracking-wide">
            {t("description")}
          </p>
        </ScrollReveal>

        {/* Pipeline */}
        <ScrollReveal>
          <div className="mb-16 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-0">
            {pipelineSteps.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="group relative flex w-40 flex-col items-center rounded-none border border-white/10 bg-transparent p-4 text-center border-hud transition-all hover:bg-white/[0.02] hover:border-accent"
                >
                  <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="text-sm font-semibold font-mono uppercase text-white transition-colors group-hover:text-glow-cyan">
                    {step.label}
                  </span>
                  <span className="mt-1 text-xs font-mono text-muted group-hover:text-white/80 transition-colors">{step.sub}</span>
                </motion.div>
                {i < pipelineSteps.length - 1 && (
                  <div className="hidden h-px w-8 bg-border md:block" />
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Module tags */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3">
            {modules.map((mod) => (
              <span
                key={mod}
                onMouseEnter={() => setHoveredModule(mod)}
                onMouseLeave={() => setHoveredModule(null)}
                className={`cursor-default rounded-none border px-4 py-1.5 font-mono text-sm tracking-wide transition-colors ${
                  hoveredModule === mod
                    ? "border-accent bg-accent/10 text-glow-cyan text-accent"
                    : "border-hud bg-transparent text-muted hover:bg-white/[0.02] hover:text-white"
                }`}
              >
                {mod}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
