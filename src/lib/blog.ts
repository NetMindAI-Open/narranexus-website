import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const contentDir = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  readTime: number;
}

export interface BlogPostWithContent extends BlogPost {
  content: React.ReactElement;
}

export function getAllPosts(locale: string): BlogPost[] {
  const localeDir = path.join(contentDir, locale);
  const fallbackDir = path.join(contentDir, "en");
  const baseDir = fs.existsSync(localeDir) ? localeDir : fallbackDir;

  if (!fs.existsSync(baseDir)) {
    return [];
  }

  const files = fs.readdirSync(baseDir).filter((f) => f.endsWith(".mdx"));

  const posts: BlogPost[] = files.map((file) => {
    const filePath = path.join(baseDir, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(source);
    const slug = file.replace(/\.mdx$/, "");
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
      slug,
      title: (data.title as string) || slug,
      date: (data.date as string) || "",
      summary: (data.summary as string) || "",
      readTime,
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getPostBySlug(
  locale: string,
  slug: string
): Promise<BlogPostWithContent | null> {
  const localePath = path.join(contentDir, locale, `${slug}.mdx`);
  const fallbackPath = path.join(contentDir, "en", `${slug}.mdx`);

  let filePath: string;

  if (fs.existsSync(localePath)) {
    filePath = localePath;
  } else if (fs.existsSync(fallbackPath)) {
    filePath = fallbackPath;
  } else {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(source);

  const wordCount = rawContent.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const { content } = await compileMDX({
    source: rawContent,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
      parseFrontmatter: false,
    },
  });

  return {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as string) || "",
    summary: (data.summary as string) || "",
    readTime,
    content,
  };
}
