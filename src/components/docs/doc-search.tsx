"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import type { SearchEntry } from "@/lib/search";

interface DocSearchProps {
  entries: SearchEntry[];
  locale: string;
}

export function DocSearch({ entries, locale }: DocSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const indexRef = useRef<import("flexsearch").Index | null>(null);

  useEffect(() => {
    async function initIndex() {
      const FlexSearch = (await import("flexsearch")).default;
      const index = new FlexSearch.Index({
        tokenize: "forward",
        resolution: 9,
      });
      entries.forEach((entry, i) => {
        index.add(i, `${entry.title} ${entry.content}`);
      });
      indexRef.current = index;
    }
    initIndex();
  }, [entries]);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      if (!value.trim() || !indexRef.current) {
        setResults([]);
        setOpen(false);
        return;
      }
      const ids = indexRef.current.search(value, { limit: 8 });
      const matched = (ids as number[]).map((id) => entries[id]);
      setResults(matched);
      setOpen(matched.length > 0);
    },
    [entries]
  );

  const navigateTo = (slug: string) => {
    const href =
      locale === "en" ? `/docs/${slug}` : `/${locale}/docs/${slug}`;
    router.push(href);
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  const clear = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search docs..."
          className="w-full rounded-lg bg-card border border-border pl-9 pr-8 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
        />
        {query && (
          <button
            onClick={clear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg bg-card border border-border shadow-xl overflow-hidden">
          {results.map((entry) => (
            <button
              key={entry.slug}
              onClick={() => navigateTo(entry.slug)}
              className="w-full text-left px-4 py-3 hover:bg-background/50 transition-colors border-b border-border last:border-0"
            >
              <div className="text-sm font-medium text-foreground">
                {entry.title}
              </div>
              <div className="text-xs text-muted mt-0.5 line-clamp-1">
                {entry.content.slice(0, 100)}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
