"use client";

/**
 * Install chooser for a template detail page.
 *
 * Single primary "Install in NarraNexus ▾" button opens a dropdown with
 * four install paths, plus a sibling Download button (always visible
 * since downloads work no matter what).
 *
 * Targets:
 *  - "cloud":    {NEXT_PUBLIC_NARRANEXUS_APP_URL || agent.narra.nexus}
 *                /app/templates/install?url=...&sha256=... — HTTPS deep
 *                link to the cloud app; the cloud backend does the URL
 *                fetch and preflight.
 *  - "local":    http://localhost:5173 — same path against a NarraNexus
 *                started via `bash run.sh` on the same machine.
 *  - "desktop":  narranexus://install?... — OS-level custom scheme
 *                handled by the DMG app via tauri-plugin-deep-link.
 *                After click we run a fallback probe: if the page is
 *                still focused 2s later, the OS didn't switch focus to
 *                the app → likely DMG isn't installed → show inline
 *                fallback message with download link.
 *  - "download": static .nxbundle download; user manually imports via
 *                Settings → Import bundle.
 *
 * Last-used target persists in localStorage. The matching menu item is
 * marked with a small "last used" badge so repeat visitors can confirm.
 */

import { useEffect, useRef, useState } from "react";

type Target = "cloud" | "local" | "desktop" | "download";

const STORAGE_KEY = "nx-install-target";
const APP_OPEN_PROBE_MS = 2000;

const CLOUD_APP_URL =
  process.env.NEXT_PUBLIC_NARRANEXUS_APP_URL?.replace(/\/$/, "") ||
  "https://agent.narra.nexus";
const LOCAL_APP_URL = "http://localhost:5173";

function buildHttpInstallUrl(
  appBase: string,
  bundleAbsolute: string,
  sha256: string,
): string {
  const params = new URLSearchParams({ url: bundleAbsolute, sha256 });
  return `${appBase}/app/templates/install?${params.toString()}`;
}

function buildDeepLinkUrl(bundleAbsolute: string, sha256: string): string {
  const params = new URLSearchParams({ url: bundleAbsolute, sha256 });
  return `narranexus://install?${params.toString()}`;
}

function absoluteBundleUrl(bundleUrl: string): string {
  return bundleUrl.startsWith("http")
    ? bundleUrl
    : `${window.location.origin}${bundleUrl}`;
}

interface Props {
  bundleUrl: string;
  sha256: string;
}

export function InstallChooser({ bundleUrl, sha256 }: Props) {
  const [preferred, setPreferred] = useState<Target | null>(null);
  const [open, setOpen] = useState(false);
  const [desktopFallback, setDesktopFallback] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Hydrate preference from localStorage on mount. Server renders neutral,
  // client decorates after. The set-state-in-effect rule's intent is
  // "don't mirror props"; reading external storage is a legitimate use.
  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "cloud" || v === "local" || v === "desktop" || v === "download") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPreferred(v);
      }
    } catch {
      /* localStorage unavailable — leave neutral */
    }
  }, []);

  // Close dropdown on outside click / ESC.
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const remember = (t: Target) => {
    setPreferred(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  };

  const handlePick = (t: Target) => {
    setOpen(false);
    setDesktopFallback(false);
    remember(t);
    const bundleAbs = absoluteBundleUrl(bundleUrl);

    if (t === "cloud" || t === "local") {
      const base = t === "cloud" ? CLOUD_APP_URL : LOCAL_APP_URL;
      const url = buildHttpInstallUrl(base, bundleAbs, sha256);
      // Open in a new tab so:
      //  - the website stays put (visitor can come back to pick another
      //    template / try a different target without re-navigating)
      //  - the dropdown's open / preferred state isn't restored from
      //    bfcache in a half-applied form when the user hits Back
      //  - the new tab gets a fresh app session (logged-in cookie/JWT
      //    carries over from same-origin localStorage on the cloud /
      //    local NarraNexus origin)
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    if (t === "desktop") {
      // Fallback probe: if the OS opens the DMG app, the page goes hidden
      // (visibilitychange) and/or loses focus. If neither happens within
      // APP_OPEN_PROBE_MS, the URL scheme was unhandled — most likely
      // the user doesn't have the DMG installed.
      let appOpened = false;
      const visHandler = () => {
        if (document.visibilityState === "hidden") appOpened = true;
      };
      const blurHandler = () => {
        appOpened = true;
      };
      document.addEventListener("visibilitychange", visHandler);
      window.addEventListener("blur", blurHandler);

      window.setTimeout(() => {
        document.removeEventListener("visibilitychange", visHandler);
        window.removeEventListener("blur", blurHandler);
        if (!appOpened && document.visibilityState === "visible") {
          setDesktopFallback(true);
        }
      }, APP_OPEN_PROBE_MS);

      // narranexus:// is handled by the OS, not the browser navigator —
      // window.location.assign here doesn't actually navigate the tab
      // away (the browser can't render a custom scheme), so the current
      // page stays put. Using window.open here instead would leave a
      // blank tab around in some browsers; assign is the cleaner UX.
      window.location.assign(buildDeepLinkUrl(bundleAbs, sha256));
      return;
    }
    // download: <a download> on the menu item handles the actual fetch;
    // we just track the choice (handlePick is also called from the link's
    // onClick, before the browser triggers the download).
  };

  const menuItems: Array<{
    key: Target;
    name: string;
    subtitle: string;
  }> = [
    { key: "cloud", name: "Cloud", subtitle: "agent.narra.nexus" },
    { key: "local", name: "Local Build", subtitle: "build from git clone locally" },
    { key: "desktop", name: "Desktop App", subtitle: "NarraNexus DMG" },
    { key: "download", name: "Download .nxbundle", subtitle: "manual import" },
  ];

  return (
    <div className="mb-10 space-y-3">
      <div ref={wrapRef} className="relative inline-block">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="px-5 py-2.5 bg-ink text-paper font-body text-sm font-400 hover:bg-muted transition-colors inline-flex items-center gap-2"
        >
          Install in NarraNexus
          <span aria-hidden="true" className="text-xs">
            {open ? "▴" : "▾"}
          </span>
        </button>

        {open && (
          <ul
            role="menu"
            className="absolute top-full left-0 mt-1 border border-rule bg-paper shadow-lg w-80 z-20 divide-y divide-rule"
          >
            {menuItems.map((item) => {
              const isPreferred = preferred === item.key;
              const commonClass =
                "w-full px-4 py-3 text-left hover:bg-paper-2/40 transition-colors flex items-start justify-between gap-3";
              const body = (
                <>
                  <div>
                    <div className="font-body text-sm text-ink">{item.name}</div>
                    <div className="font-mono text-[10px] text-muted mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                  {isPreferred && (
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted border border-rule px-1.5 py-0.5 shrink-0 mt-0.5">
                      last used
                    </span>
                  )}
                </>
              );
              if (item.key === "download") {
                return (
                  <li key={item.key} role="menuitem">
                    <a
                      href={bundleUrl}
                      download
                      onClick={() => handlePick("download")}
                      className={commonClass}
                    >
                      {body}
                    </a>
                  </li>
                );
              }
              return (
                <li key={item.key} role="menuitem">
                  <button
                    type="button"
                    onClick={() => handlePick(item.key)}
                    className={commonClass}
                  >
                    {body}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {desktopFallback && (
        <div className="border border-[var(--color-amber-500,#d97706)] bg-[var(--color-amber-500,#d97706)]/10 px-4 py-3">
          <p className="font-body font-300 text-sm text-ink">
            Looks like NarraNexus Desktop didn&rsquo;t open. The DMG may not
            be installed yet.{" "}
            <a
              href="https://github.com/NetMindAI-Open/NarraNexus/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-muted transition-colors"
            >
              Download the latest DMG &rarr;
            </a>
            , or pick <strong className="font-400">Cloud</strong> /{" "}
            <strong className="font-400">Local Build</strong> /{" "}
            <strong className="font-400">Download</strong> from the menu
            instead.
          </p>
        </div>
      )}

      <div className="font-body font-300 text-[11px] text-muted space-y-1.5">
        <p>
          <strong className="text-ink font-400">Local Build</strong> assumes a
          NarraNexus instance running at{" "}
          <code className="font-mono">localhost:5173</code> — start it first
          with <code className="font-mono">bash run.sh</code>.
        </p>
        <p>
          <strong className="text-ink font-400">Desktop App</strong> requires
          the NarraNexus DMG installed to{" "}
          <code className="font-mono">/Applications/</code> (and opened at
          least once so macOS registers the{" "}
          <code className="font-mono">narranexus://</code> handler).
        </p>
      </div>
    </div>
  );
}
