import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("hero");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <span className="text-sm uppercase tracking-widest text-accent">
        {t("label")}
      </span>
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="text-muted">{t("description")}</p>
    </main>
  );
}
