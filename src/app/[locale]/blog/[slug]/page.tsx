import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getPostBySlug } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const post = await getPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("title")}
      </Link>

      <div className="mb-4 flex items-center gap-3 text-sm text-muted">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>&middot;</span>
        <span>{t("minRead", { minutes: post.readTime })}</span>
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">
        {post.title}
      </h1>

      <div className="prose prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-accent prose-code:rounded prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-pre:bg-card prose-pre:border prose-pre:border-border">
        {post.content}
      </div>
    </div>
  );
}
