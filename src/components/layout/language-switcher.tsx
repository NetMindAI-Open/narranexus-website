"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const locales = ["en", "zh", "ja", "ko", "es", "fr", "de"] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("language");
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    // Strip current locale prefix from pathname
    let path = pathname;
    for (const l of locales) {
      if (l === "en") continue;
      if (path.startsWith(`/${l}/`)) {
        path = path.slice(l.length + 1);
        break;
      }
      if (path === `/${l}`) {
        path = "/";
        break;
      }
    }

    // Add new locale prefix (en uses no prefix)
    const newPath = newLocale === "en" ? path : `/${newLocale}${path}`;
    router.push(newPath);
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border hover:bg-card text-sm"
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span>{t(locale as "en" | "zh" | "ja" | "ko" | "es" | "fr" | "de")}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-lg border border-border bg-background shadow-lg py-1 z-50">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-card ${
                l === locale ? "text-accent font-medium" : "text-foreground"
              }`}
            >
              {t(l)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
