import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/docs");

export interface SearchEntry {
  title: string;
  slug: string;
  content: string;
  section: string;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/`[^`]*`/g, "") // inline code
    .replace(/#{1,6}\s+/g, "") // headings
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/\*([^*]+)\*/g, "$1") // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/[-*+]\s+/g, "") // list markers
    .replace(/>\s+/g, "") // blockquotes
    .replace(/---/g, "") // horizontal rules
    .replace(/\n{2,}/g, " ") // multiple newlines
    .replace(/\n/g, " ") // single newlines
    .trim();
}

export function buildSearchIndex(locale: string): SearchEntry[] {
  const localeDir = path.join(contentDir, locale);
  const fallbackDir = path.join(contentDir, "en");
  const baseDir = fs.existsSync(localeDir) ? localeDir : fallbackDir;

  if (!fs.existsSync(baseDir)) {
    return [];
  }

  const entries: SearchEntry[] = [];
  const sections = fs.readdirSync(baseDir, { withFileTypes: true });

  for (const section of sections) {
    if (!section.isDirectory()) continue;

    const sectionPath = path.join(baseDir, section.name);
    const files = fs.readdirSync(sectionPath).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const filePath = path.join(sectionPath, file);
      const source = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(source);
      const slug = `${section.name}/${file.replace(/\.mdx$/, "")}`;

      const stripped = stripMarkdown(content);
      const preview = stripped.slice(0, 500);

      entries.push({
        title: (data.title as string) || file.replace(/\.mdx$/, ""),
        slug,
        content: preview,
        section: section.name,
      });
    }
  }

  return entries;
}
