"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface Integration {
  name: string;
  category: string;
}

const integrations: Integration[] = [
  { name: "Claude", category: "LLM" },
  { name: "OpenAI", category: "LLM" },
  { name: "Gemini", category: "LLM" },
  { name: "MCP", category: "Protocol" },
  { name: "Matrix", category: "Protocol" },
  { name: "Docker", category: "Infra" },
  { name: "MySQL", category: "Infra" },
  { name: "Redis", category: "Infra" },
  { name: "Elasticsearch", category: "Infra" },
  { name: "Milvus", category: "Infra" },
  { name: "FastAPI", category: "Tool" },
  { name: "React", category: "Tool" },
  { name: "Electron", category: "Tool" },
];

const categoryColors: Record<string, string> = {
  LLM: "bg-purple-500/10 text-purple-400",
  Protocol: "bg-blue-500/10 text-blue-400",
  Infra: "bg-green-500/10 text-green-400",
  Tool: "bg-orange-500/10 text-orange-400",
};

export function Integrations() {
  const t = useTranslations("integrations");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {integrations.map((item) => (
              <div
                key={item.name}
                className="group relative flex flex-col items-center gap-2 rounded-none border border-white/10 bg-transparent p-4 transition-all hover:border-accent hover:bg-white/[0.02]"
              >
                <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <span className="text-sm font-semibold font-mono uppercase text-white transition-colors group-hover:text-glow-cyan">
                  {item.name}
                </span>
                <span
                  className={`rounded-none px-2 py-0.5 font-mono text-[10px] tracking-widest ${
                    categoryColors[item.category]
                  }`}
                >
                  [{item.category}]
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
