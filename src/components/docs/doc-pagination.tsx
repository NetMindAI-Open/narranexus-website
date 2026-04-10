import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationItem {
  title: string;
  slug: string;
}

interface DocPaginationProps {
  prev: PaginationItem | null;
  next: PaginationItem | null;
  locale: string;
}

export function DocPagination({ prev, next, locale }: DocPaginationProps) {
  const makeHref = (slug: string) =>
    locale === "en" ? `/docs/${slug}` : `/${locale}/docs/${slug}`;

  return (
    <div className="flex items-center justify-between border-t border-border pt-6 mt-12">
      {prev ? (
        <Link
          href={makeHref(prev.slug)}
          className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={makeHref(next.slug)}
          className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
        >
          {next.title}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
