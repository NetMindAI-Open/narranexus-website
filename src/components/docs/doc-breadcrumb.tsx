import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface DocBreadcrumbProps {
  slug: string[];
  locale: string;
}

function formatLabel(text: string): string {
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function DocBreadcrumb({ slug, locale }: DocBreadcrumbProps) {
  const docsHref = locale === "en" ? "/docs" : `/${locale}/docs`;

  return (
    <nav className="flex items-center gap-1 text-sm text-muted mb-4">
      <Link href={docsHref} className="hover:text-foreground transition-colors">
        Docs
      </Link>
      {slug.map((segment, i) => (
        <span key={segment} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3" />
          {i === slug.length - 1 ? (
            <span className="text-foreground">{formatLabel(segment)}</span>
          ) : (
            <span className="text-muted">{formatLabel(segment)}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
