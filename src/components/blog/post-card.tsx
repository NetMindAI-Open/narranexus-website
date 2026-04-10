"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPost }) {
  const t = useTranslations("blog");

  return (
    <article className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent/50">
      <div className="mb-2 flex items-center gap-3 text-sm text-muted">
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

      <h2 className="mb-2 text-xl font-semibold text-foreground">
        <Link href={`/blog/${post.slug}`} className="hover:text-accent">
          {post.title}
        </Link>
      </h2>

      <p className="mb-4 text-muted line-clamp-2">{post.summary}</p>

      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
      >
        {t("readMore")}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
