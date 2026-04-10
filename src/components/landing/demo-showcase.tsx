"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const tabs = [
  { id: "agent", label: "Agent Interface", src: "/images/showcase/agent-interface.png" },
  { id: "setup", label: "Quick Setup", src: "/images/showcase/quick-setup.png" },
  { id: "demo", label: "Feature Demo", src: "/images/showcase/feature-demo.png" },
];

export function DemoShowcase() {
  const [active, setActive] = useState(tabs[0].id);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            See It in Action
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted">
            Explore the NarraNexus interface and capabilities.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          {/* Tabs */}
          <div className="mb-6 flex justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  active === tab.id
                    ? "bg-accent text-white"
                    : "bg-card text-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Image / Placeholder */}
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-card">
            {imgError[current.id] ? (
              <div className="flex h-full w-full items-center justify-center text-muted">
                <span className="text-sm">Screenshot coming soon</span>
              </div>
            ) : (
              <Image
                key={current.id}
                src={current.src}
                alt={current.label}
                fill
                className="object-cover"
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
