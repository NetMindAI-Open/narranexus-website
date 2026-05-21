"use client";

import { useState } from "react";
import Link from "next/link";

type Outcome = "issued" | "waitlisted" | "already_registered" | "error";

interface InviteResponse {
  success: boolean;
  status?: string;
  message?: string;
  error?: string;
}

const eyebrow =
  "font-mono text-[11px] uppercase tracking-widest text-muted";

export default function InvitePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    setOutcome(null);
    setMessage("");

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data: InviteResponse = await res.json();

      if (!data.success) {
        setOutcome("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (data.status === "waitlisted") setOutcome("waitlisted");
      else if (data.status === "already_registered")
        setOutcome("already_registered");
      else setOutcome("issued");
      setMessage(data.message || "");
    } catch {
      setOutcome("error");
      setMessage("Could not reach the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const succeeded =
    outcome === "issued" ||
    outcome === "waitlisted" ||
    outcome === "already_registered";

  return (
    <section className="max-w-[1400px] mx-auto px-6 pt-20 md:pt-24 pb-20 md:pb-28">
      <div className="max-w-xl">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
          <span className={eyebrow}>Request Access</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-700 leading-[1.08] tracking-tight mb-5">
          Get an invite code
        </h1>

        <p className="font-body font-300 text-base md:text-lg text-muted leading-relaxed mb-8">
          The NarraNexus cloud version is invite-only while we scale up.
          Drop your email below and we&rsquo;ll send you a one-time invite
          code. Use it to create your account at{" "}
          <a
            href="https://dev-agent.narra.nexus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline underline-offset-2 hover:text-muted transition-colors"
          >
            dev-agent.narra.nexus
          </a>
          .
        </p>

        {!succeeded && (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
              className="flex-1 px-4 py-2.5 border border-rule bg-paper font-body text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink transition-colors disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="px-6 py-2.5 bg-ink text-paper font-body text-sm font-400 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending…" : "Request invite"}
            </button>
          </form>
        )}

        {outcome === "error" && (
          <p className="mt-4 font-body font-300 text-sm text-muted">
            {message}
          </p>
        )}

        {succeeded && (
          <div className="border border-rule bg-paper-2/30 p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-ink block" aria-hidden="true" />
              <span className={eyebrow}>
                {outcome === "waitlisted"
                  ? "You’re on the waitlist"
                  : outcome === "already_registered"
                    ? "Already registered"
                    : "Check your inbox"}
              </span>
            </div>
            <p className="font-body font-300 text-sm text-muted leading-relaxed">
              {message}
            </p>
            {outcome === "issued" && (
              <p className="mt-3 font-body font-300 text-xs text-muted leading-relaxed">
                Don&rsquo;t see it within a few minutes? Check your spam or
                promotions folder &mdash; the code email can land there.
              </p>
            )}
            {outcome === "already_registered" && (
              <a
                href="https://dev-agent.narra.nexus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-mono text-xs text-ink underline underline-offset-2 hover:text-muted transition-colors"
              >
                Go to sign in &rarr;
              </a>
            )}
          </div>
        )}

        <p className="mt-8 font-body font-300 text-xs text-muted">
          Prefer to run it yourself? The desktop app and local setup need no
          invite code &mdash;{" "}
          <Link
            href="/docs/getting-started/quick-start"
            className="underline underline-offset-2 hover:text-ink transition-colors"
          >
            see the quick start
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
