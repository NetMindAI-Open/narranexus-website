import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";

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
    </>
  );
}
