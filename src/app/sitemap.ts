import { MetadataRoute } from "next";
import { routing } from "../../i18n/routing";
import { getAllPosts } from "@/lib/blog";

const baseUrl = "https://narranexus.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;

    // Home page
    entries.push({
      url: `${baseUrl}${prefix || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });

    // Blog index
    entries.push({
      url: `${baseUrl}${prefix}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Individual blog posts
    const posts = getAllPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}${prefix}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
