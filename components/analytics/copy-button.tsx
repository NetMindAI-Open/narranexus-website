"use client";

import { useState } from "react";
import { track } from "@/lib/analytics/track";

interface Props {
  text: string;
  utm_location: string;
  repoUrl?: string;
  className?: string;
}

const DEFAULT_REPO = "https://github.com/NetMindAI-Open/NarraNexus";

export function CopyButton({
  text,
  utm_location,
  repoUrl = DEFAULT_REPO,
  className,
}: Props) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // clipboard may be unavailable (insecure context) — still fire the event
    }
    track({
      event: "copy_git_clone_command",
      repo_url: repoUrl,
      utm_location,
    });
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={
        className ??
        "border border-rule bg-paper-2/30 p-3 flex items-start gap-3"
      }
    >
      <code className="font-mono text-xs text-ink whitespace-pre-wrap break-all leading-relaxed flex-1">
        {text}
      </code>
      <button
        type="button"
        onClick={onClick}
        aria-label={copied ? "Copied" : "Copy command"}
        className="font-mono text-[10px] uppercase tracking-wider text-muted hover:text-ink transition-colors shrink-0"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
