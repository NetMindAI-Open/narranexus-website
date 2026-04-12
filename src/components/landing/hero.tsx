"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { ParticleNetwork } from "./particle-network";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Central HUD Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,163,255,0.15)_0%,transparent_60%)] pointer-events-none" />

      {/* Particle background */}
      <ParticleNetwork />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <div className="mb-4 flex items-center justify-center gap-4 text-accent/80 text-sm font-medium tracking-[0.2em] font-mono">
          <span className="opacity-50">[</span>
          <span>{t("label")}</span>
          <span className="opacity-50">]</span>
        </div>

        <h1 className="mb-6 font-mono text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl text-glow-cyan">
          <span className="text-accent">{">"}</span> {t("title")}
          <span className="ml-2 animate-pulse text-accent">_</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted font-mono tracking-wide">
          {t("description")}
        </p>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row font-mono">
          <Link
            href="/docs/getting-started/quick-start"
            className="group flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-8 py-3 text-white transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-glow-cyan"
          >
            <span>{t("cta")}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-accent" />
          </Link>

          <a
            href="https://github.com/johnsonice/narranexus-website"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-8 py-3 text-white/80 transition-all duration-300 hover:border-white/50 hover:text-white"
          >
            <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span>{t("github")}</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
