import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/docs");

export interface SidebarItem {
  title: string;
  slug: string;
  order: number;
}

export interface SidebarSection {
  title: string;
  slug: string;
  items: SidebarItem[];
}

const sectionConfig: Record<string, number> = {
  "getting-started": 0,
  "core-concepts": 1,
  modules: 2,
  guides: 3,
  "api-reference": 4,
  contributing: 5,
};

function formatSectionTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getDocsSidebar(locale: string): SidebarSection[] {
  const localeDir = path.join(contentDir, locale);
  const fallbackDir = path.join(contentDir, "en");
  const baseDir = fs.existsSync(localeDir) ? localeDir : fallbackDir;

  if (!fs.existsSync(baseDir)) {
    return [];
  }

  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  const sections: SidebarSection[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (!(entry.name in sectionConfig)) continue;

    const sectionPath = path.join(baseDir, entry.name);
    const files = fs.readdirSync(sectionPath).filter((f) => f.endsWith(".mdx"));

    const items: SidebarItem[] = files.map((file) => {
      const filePath = path.join(sectionPath, file);
      const source = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(source);
      const slug = `${entry.name}/${file.replace(/\.mdx$/, "")}`;

      return {
        title: (data.title as string) || file.replace(/\.mdx$/, ""),
        slug,
        order: (data.order as number) ?? 999,
      };
    });

    items.sort((a, b) => a.order - b.order);

    sections.push({
      title: formatSectionTitle(entry.name),
      slug: entry.name,
      items,
    });
  }

  sections.sort(
    (a, b) => (sectionConfig[a.slug] ?? 999) - (sectionConfig[b.slug] ?? 999)
  );

  return sections;
}

export function getAdjacentDocs(
  sidebar: SidebarSection[],
  currentSlug: string
): { prev: SidebarItem | null; next: SidebarItem | null } {
  const allItems = sidebar.flatMap((section) => section.items);
  const currentIndex = allItems.findIndex((item) => item.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? allItems[currentIndex - 1] : null,
    next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null,
  };
}
