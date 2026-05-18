"use client";

/**
 * Install chooser for a template detail page.
 *
 * Three install targets exposed as side-by-side buttons. The last-used
 * target is remembered in localStorage and shown with primary styling so
 * repeat visitors see their preferred path highlighted.
 *
 * Targets:
 *  - "cloud" → {NEXT_PUBLIC_NARRANEXUS_APP_URL || agent.narra.nexus}
 *    deep-links to the cloud app's /app/templates/install page, which
 *    server-side fetches the bundle URL and runs preflight.
 *  - "local" → http://localhost:5173 — same flow, but against a NarraNexus
 *    started via `bash run.sh` on the same machine. Mixed-content navigation
 *    from HTTPS website to HTTP localhost is allowed (top-level navigation
 *    is exempt from the mixed-content block; subresource loads are not).
 *  - "download" → static .nxbundle download; user manually imports via the
 *    Settings → Import bundle wizard.
 *
 * NOT here yet:
 *  - "desktop" / DMG via narranexus:// custom URL scheme — Stage B work.
 *    Needs tauri-plugin-deep-link + scheme registration in tauri.conf.json
 *    + Rust handler + webview event listener. Footnote calls this out.
 */

import { useEffect, useState } from "react";

type Target = "cloud" | "local" | "download";

const STORAGE_KEY = "nx-install-target";

const CLOUD_APP_URL =
  process.env.NEXT_PUBLIC_NARRANEXUS_APP_URL?.replace(/\/$/, "") ||
  "https://agent.narra.nexus";
const LOCAL_APP_URL = "http://localhost:5173";

function buildAppInstallUrl(
  appBase: string,
  bundleUrl: string,
  sha256: string,
): string {
  const bundleAbsolute = bundleUrl.startsWith("http")
    ? bundleUrl
    : `${window.location.origin}${bundleUrl}`;
  const params = new URLSearchParams({ url: bundleAbsolute, sha256 });
  return `${appBase}/app/templates/install?${params.toString()}`;
}

interface Props {
  bundleUrl: string;
  sha256: string;
}

export function InstallChooser({ bundleUrl, sha256 }: Props) {
  const [preferred, setPreferred] = useState<Target | null>(null);

  // Hydrate preference from localStorage on mount (client-only to avoid
  // SSR hydration mismatch — server renders neutral state, client
  // decorates after mount). The react-hooks/set-state-in-effect rule's
  // intent is "don't mirror props as state"; reading external storage at
  // mount is a legitimate effect-driven write, so the rule is suppressed
  // for this exact case.
  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "cloud" || v === "local" || v === "download") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPreferred(v);
      }
    } catch {
      /* localStorage disabled / SSR — silently use neutral state */
    }
  }, []);

  const remember = (t: Target) => {
    setPreferred(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  };

  const handleCloudClick = () => {
    remember("cloud");
    window.location.assign(buildAppInstallUrl(CLOUD_APP_URL, bundleUrl, sha256));
  };

  const handleLocalClick = () => {
    remember("local");
    window.location.assign(buildAppInstallUrl(LOCAL_APP_URL, bundleUrl, sha256));
  };

  return (
    <div className="space-y-3 mb-10">
      <div className="flex flex-wrap gap-3">
        <TargetButton
          name="Cloud"
          subtitle="agent.narra.nexus"
          // First-time visitors get Cloud as the default primary CTA.
          primary={preferred === "cloud" || preferred === null}
          onClick={handleCloudClick}
        />
        <TargetButton
          name="Local Build"
          subtitle="build from git clone locally"
          primary={preferred === "local"}
          onClick={handleLocalClick}
        />
        <DownloadLink
          bundleUrl={bundleUrl}
          primary={preferred === "download"}
          onPick={() => remember("download")}
        />
      </div>
      <div className="font-body font-300 text-[11px] text-muted space-y-1.5">
        <p>
          <strong className="text-ink font-400">Local Build</strong> assumes a
          NarraNexus instance running at{" "}
          <code className="font-mono">localhost:5173</code> — start it first
          with <code className="font-mono">bash run.sh</code>.
        </p>
        <p>
          <strong className="text-ink font-400">Desktop App (DMG)</strong>{" "}
          one-click install is coming in a future release. For now, download
          the bundle and import via{" "}
          <code className="font-mono">Settings → Import bundle</code>.
        </p>
      </div>
    </div>
  );
}

function TargetButton({
  name,
  subtitle,
  primary,
  onClick,
}: {
  name: string;
  subtitle: string;
  primary: boolean;
  onClick: () => void;
}) {
  const cls = primary
    ? "bg-ink text-paper hover:bg-muted"
    : "border border-ink text-ink hover:bg-ink hover:text-paper";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2.5 font-body text-sm font-400 transition-colors text-left ${cls}`}
    >
      <div>Install · {name}</div>
      <div className="text-[10px] opacity-70 font-mono mt-0.5">{subtitle}</div>
    </button>
  );
}

function DownloadLink({
  bundleUrl,
  primary,
  onPick,
}: {
  bundleUrl: string;
  primary: boolean;
  onPick: () => void;
}) {
  const cls = primary
    ? "bg-ink text-paper hover:bg-muted"
    : "border border-ink text-ink hover:bg-ink hover:text-paper";
  return (
    <a
      href={bundleUrl}
      download
      onClick={onPick}
      className={`px-5 py-2.5 font-body text-sm font-400 transition-colors text-left ${cls}`}
    >
      <div>Download .nxbundle</div>
      <div className="text-[10px] opacity-70 font-mono mt-0.5">manual import</div>
    </a>
  );
}
