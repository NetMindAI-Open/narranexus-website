import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const contentDir = path.join(process.cwd(), "content/docs");

export interface DocFrontmatter {
  title: string;
  description: string;
  order: number;
}

export async function getDocBySlug(locale: string, slug: string[]) {
  const slugPath = slug.join("/");

  // Try locale-specific file first, then fall back to English
  const localePath = path.join(contentDir, locale, `${slugPath}.mdx`);
  const fallbackPath = path.join(contentDir, "en", `${slugPath}.mdx`);

  let filePath: string;
  let isFallback = false;

  if (fs.existsSync(localePath)) {
    filePath = localePath;
  } else if (fs.existsSync(fallbackPath)) {
    filePath = fallbackPath;
    isFallback = locale !== "en";
  } else {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(source);

  const { content } = await compileMDX<DocFrontmatter>({
    source: rawContent,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
      parseFrontmatter: false,
    },
  });

  return {
    frontmatter: data as DocFrontmatter,
    content,
    isFallback,
  };
}

export function extractHeadings(
  content: string
): { level: number; text: string; id: string }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ level, text, id });
  }

  return headings;
}
