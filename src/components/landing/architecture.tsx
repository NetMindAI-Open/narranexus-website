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

        {/* Schematic Container */}
        <ScrollReveal>
          <div className="group relative mx-auto mt-12 max-w-[90rem] w-full rounded-none border border-hud bg-black/40 p-8 shadow-[0_0_50px_rgba(0,163,255,0.05)] backdrop-blur-sm md:p-12 lg:p-16">
            
            {/* Grid overlay with fade out */}
            <div className="pointer-events-none absolute inset-0 bg-grid-cyan opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

            {/* Corner brackets */}
            <div className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-accent opacity-50" />
            <div className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-accent opacity-50" />
            <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-accent opacity-50" />
            <div className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-accent opacity-50" />

            <div className="relative z-10 flex flex-col items-center lg:flex-row lg:items-center lg:justify-between w-full">
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className={`flex flex-col lg:flex-row items-center justify-center ${i === pipelineSteps.length - 1 ? 'shrink-0' : 'flex-1 lg:w-full'}`}>
                  {/* Node */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                    className="relative flex w-44 shrink-0 flex-col items-center justify-center rounded-none border border-white/10 bg-black/80 px-4 py-8 text-center border-hud transition-all hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_20px_rgba(0,163,255,0.3)] z-10"
                  >
                    <span className="mb-2 font-mono text-sm font-bold uppercase tracking-widest text-white transition-colors text-glow-cyan">
                      {step.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{step.sub}</span>
                  </motion.div>

                  {/* Connector */}
                  {i < pipelineSteps.length - 1 && (
                    <div className="relative flex h-10 w-px items-center justify-center bg-border lg:h-px lg:w-full lg:flex-1 mx-2">
                      <div className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-accent opacity-75" />
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Downward connector to modules */}
            <div className="relative z-10 my-10 flex flex-col items-center justify-center">
              <div className="h-16 w-px bg-gradient-to-b from-accent/50 to-transparent" />
              <div className="mt-4 flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-accent text-glow-cyan">
                <div className="h-px w-8 bg-accent/30" />
                [ Module Subsystem ]
                <div className="h-px w-8 bg-accent/30" />
              </div>
            </div>

            {/* Module tags */}
            <div className="relative z-10 flex flex-wrap justify-center gap-4 px-4 mt-8">
              {modules.map((mod, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  key={mod}
                  onMouseEnter={() => setHoveredModule(mod)}
                  onMouseLeave={() => setHoveredModule(null)}
                  className={`cursor-default relative overflow-hidden rounded-none border px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                    hoveredModule === mod
                      ? "border-accent bg-accent/20 text-white shadow-[0_0_15px_rgba(0,163,255,0.4)] text-glow-cyan"
                      : "border-white/10 bg-black/60 text-muted hover:border-accent/50 hover:text-white"
                  }`}
                >
                  {mod}
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
