"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/analytics/track";

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const qs = searchParams?.toString();
    const page_path = qs ? `${pathname}?${qs}` : pathname;
    track({
      event: "portal_page_view",
      page_path,
      page_title: document.title,
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  return null;
}
