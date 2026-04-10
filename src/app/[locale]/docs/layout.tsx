import { getDocsSidebar } from "@/lib/docs";
import { buildSearchIndex } from "@/lib/search";
import { Sidebar } from "@/components/docs/sidebar";
import { DocSearch } from "@/components/docs/doc-search";

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const sidebar = getDocsSidebar(locale);
  const searchEntries = buildSearchIndex(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex gap-8 py-8">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <DocSearch entries={searchEntries} locale={locale} />
            <Sidebar sections={sidebar} locale={locale} />
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
