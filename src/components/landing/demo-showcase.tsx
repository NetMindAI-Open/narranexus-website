"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const tabs = [
  { id: "agent", labelKey: "tabInterface" as const, src: "/images/showcase/agent-interface.png" },
  { id: "setup", labelKey: "tabSetup" as const, src: "/images/showcase/quick-setup.png" },
  { id: "demo", labelKey: "tabDemo" as const, src: "/images/showcase/feature-demo.gif" },
];

export function DemoShowcase() {
  const [active, setActive] = useState(tabs[0].id);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const t = useTranslations("demoShowcase");

  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <h2 className="mb-4 text-center font-mono text-3xl font-bold uppercase tracking-[0.2em] text-white md:text-4xl text-glow-cyan">
            <span className="text-accent">{">"}</span> {t("title")}
            <span className="ml-2 animate-pulse text-accent">_</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center font-mono text-muted tracking-wide">
            {t("description")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          {/* Tabs */}
          <div className="mb-6 flex justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`rounded-none border border-hud px-4 py-2 font-mono text-sm tracking-wide transition-colors ${
                  active === tab.id
                    ? "bg-accent/10 text-glow-cyan border-accent text-accent"
                    : "bg-transparent text-muted hover:bg-white/[0.02] hover:text-white"
                }`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          {/* Image / Placeholder */}
          <div className="group relative aspect-video overflow-hidden rounded-none border-hud border bg-transparent p-1 transition-colors hover:border-accent">
            <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-accent opacity-50 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent opacity-50 transition-opacity group-hover:opacity-100" />
            {imgError[current.id] ? (
              <div className="flex h-full w-full items-center justify-center text-muted">
                <span className="text-sm">{t("placeholder")}</span>
              </div>
            ) : (
              <Image
                key={current.id}
                src={current.src}
                alt={t(current.labelKey)}
                fill
                className="object-contain"
                unoptimized={current.src.endsWith(".gif")}
                onError={() =>
                  setImgError((prev) => ({ ...prev, [current.id]: true }))
                }
              />
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
