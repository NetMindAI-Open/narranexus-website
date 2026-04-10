import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Architecture } from "@/components/landing/architecture";
import { DemoShowcase } from "@/components/landing/demo-showcase";
import { QuickStart } from "@/components/landing/quick-start";
import { Integrations } from "@/components/landing/integrations";
import { Testimonials } from "@/components/landing/testimonials";
import { Roadmap } from "@/components/landing/roadmap";
import { Team } from "@/components/landing/team";
import { CTA } from "@/components/landing/cta";

export const metadata: Metadata = {
  title: "NarraNexus - Multi-Agent Framework | Intelligence Through Connection",
  description:
    "Build interconnected agent systems where intelligence emerges through collaboration. Persistent memory, social identity, narrative structure, and multi-LLM support.",
  openGraph: {
    title: "NarraNexus - Multi-Agent Framework",
    description:
      "Build interconnected agent systems where intelligence emerges through collaboration.",
    url: "https://narranexus.dev",
    siteName: "NarraNexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NarraNexus - Multi-Agent Framework",
    description:
      "Build interconnected agent systems where intelligence emerges through collaboration.",
  },
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Features />
      <Architecture />
      <DemoShowcase />
      <QuickStart />
      <Integrations />
      <Testimonials />
      <Roadmap />
      <Team />
      <CTA />
    </>
  );
}
