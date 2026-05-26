"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "nn-consent";
const CHANGE_EVENT = "nn-consent-change";

type ConsentChoice = "granted" | "denied";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function readChoice(): ConsentChoice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function pushUpdate(choice: ConsentChoice) {
  const layer = (window.dataLayer = window.dataLayer ?? []);
  const payload =
    choice === "granted"
      ? {
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
          analytics_storage: "granted",
        }
      : {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "denied",
        };
  layer.push(["consent", "update", payload]);
}

export function ConsentBanner() {
  const choice = useSyncExternalStore(
    subscribe,
    readChoice,
    () => null,
  );

  if (choice === "granted" || choice === "denied") return null;

  const choose = (next: ConsentChoice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    pushUpdate(next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <div
      data-overlay
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-paper-2/95 backdrop-blur supports-[backdrop-filter]:bg-paper-2/85"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 text-sm text-ink sm:flex-row sm:items-center sm:justify-between">
        <p className="leading-relaxed text-muted-2">
          We use Google Analytics to understand how visitors use NarraNexus.
          Nothing personal is sold — just aggregate pageview data so we can
          improve the site.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="border border-rule px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-2 transition hover:border-ink hover:text-ink"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper transition hover:bg-transparent hover:text-ink"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
