import type { Metadata } from "next";
import { EventApp } from "@/components/event/event-app";
import { EventGate } from "@/components/event/event-gate";

export const metadata: Metadata = {
  title: "活动 · Event",
  description:
    "NarraNexus 活动：签到、完成六个 Agent 实战任务、留下反馈。优秀作品有机会赢得奖励。",
  robots: { index: false, follow: false },
};

const eyebrow = "font-mono text-[11px] uppercase tracking-widest text-muted";

export default function EventPage() {
  return (
    <EventGate>
      <section className="max-w-[1400px] mx-auto px-6 pt-20 md:pt-24 pb-24 md:pb-32">
        <div className="max-w-3xl">
        <header className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-ink block" aria-hidden="true" />
            <span className={eyebrow}>活动 / Event</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-700 leading-[1.08] tracking-tight mb-5">
            动手玩转你的 Agent
          </h1>
          <p className="font-body font-300 text-base md:text-lg text-muted leading-relaxed">
            签到、完成六个实战任务、留下反馈。跟着任务一步步把 Agent
            用起来——从创建、协作、定时任务，到接入 IM、配合 Office
            解决真实需求。最后的开放挑战，还有奖励等你来拿。
          </p>
        </header>

          <EventApp />
        </div>
      </section>
    </EventGate>
  );
}
