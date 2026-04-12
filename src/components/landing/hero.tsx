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
        <span className="mb-4 inline-block text-sm uppercase tracking-widest text-accent">
          {t("label")}
        </span>

        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {t("title")}
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted">
          {t("description")}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/docs/getting-started/quick-start"
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:brightness-110"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="https://github.com/NetMindAI-Open/NarraNexus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            <Github className="h-4 w-4" />
            {t("github")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
