import { notFound } from "next/navigation";
import { getDocBySlug, extractHeadings } from "@/lib/mdx";
import { getDocsSidebar, getAdjacentDocs } from "@/lib/docs";
import { DocBreadcrumb } from "@/components/docs/doc-breadcrumb";
import { DocPagination } from "@/components/docs/doc-pagination";
import { TableOfContents } from "@/components/docs/toc";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default async function DocPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  const doc = await getDocBySlug(locale, slug);

  if (!doc) {
    notFound();
  }

  // Get raw content for heading extraction
  const contentDir = path.join(process.cwd(), "content/docs");
  const slugPath = slug.join("/");
  const localePath = path.join(contentDir, locale, `${slugPath}.mdx`);
  const fallbackPath = path.join(contentDir, "en", `${slugPath}.mdx`);
  const filePath = fs.existsSync(localePath) ? localePath : fallbackPath;
  const rawSource = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent } = matter(rawSource);
  const headings = extractHeadings(rawContent);

  // Get sidebar for pagination
  const sidebar = getDocsSidebar(locale);
  const currentSlug = slug.join("/");
  const { prev, next } = getAdjacentDocs(sidebar, currentSlug);

  return (
    <div className="flex gap-8">
      {/* Doc content */}
      <article className="min-w-0 flex-1">
        <DocBreadcrumb slug={slug} locale={locale} />

        {doc.isFallback && (
          <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
            This page has not yet been translated. You are viewing the English
            version.
          </div>
        )}

        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          {doc.frontmatter.title}
        </h1>
        {doc.frontmatter.description && (
          <p className="text-lg text-muted mb-8">
            {doc.frontmatter.description}
          </p>
        )}

        <div className="prose prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-accent prose-code:rounded prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-pre:bg-card prose-pre:border prose-pre:border-border">
          {doc.content}
        </div>

        <DocPagination prev={prev} next={next} locale={locale} />
      </article>

      {/* Table of contents */}
      <aside className="hidden xl:block w-56 shrink-0">
        <div className="sticky top-24">
          <TableOfContents headings={headings} />
        </div>
      </aside>
    </div>
  );
}
