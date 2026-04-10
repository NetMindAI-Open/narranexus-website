import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const posts = getAllPosts(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
        {t("title")}
      </h1>
      <p className="text-lg text-muted mb-12">{t("description")}</p>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet. Check back soon!</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
