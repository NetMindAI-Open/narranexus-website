"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            System Architecture
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-muted">
            A modular pipeline from user interface to persistent storage.
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
                  className="flex w-40 flex-col items-center rounded-lg border border-border bg-card p-4 text-center"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {step.label}
                  </span>
                  <span className="mt-1 text-xs text-muted">{step.sub}</span>
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
                className={`cursor-default rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  hoveredModule === mod
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-card text-muted"
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
