"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "narranexus_event_unlocked";
const PASSWORD = "narranexus";

export function EventGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ unlocked: boolean; ready: boolean }>({
    unlocked: false,
    ready: false,
  });
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let unlocked = false;
    try {
      unlocked = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // sessionStorage unavailable — stay locked
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read unlock flag from sessionStorage on mount
    setState({ unlocked, ready: true });
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore storage failures — unlock for this render anyway
      }
      setError(false);
      setState({ unlocked: true, ready: true });
    } else {
      setError(true);
    }
  }

  // Avoid a flash of the password form for already-unlocked visitors.
  if (!state.ready) return null;

  if (state.unlocked) return <>{children}</>;

  return (
    <section className="max-w-[1400px] mx-auto px-6 pt-24 md:pt-32 pb-28 md:pb-40">
      <div className="max-w-sm mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            活动 / Event
          </span>
          <span className="w-8 h-px bg-ink block" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-700 tracking-tight mb-3">
          输入活动密码
        </h1>
        <p className="font-body font-300 text-muted mb-8">
          这个页面仅对活动参与者开放，请输入密码进入。
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(false);
            }}
            placeholder="活动密码"
            autoFocus
            className="w-full text-center border border-rule bg-paper px-3 py-2.5 font-body text-ink placeholder:text-muted/60 focus:border-ink focus-visible:outline-none"
          />
          {error && (
            <p className="font-body text-sm text-carbon mt-3">
              密码不对，再试一次
            </p>
          )}
          <button
            type="submit"
            className="mt-5 w-full bg-ink text-paper px-6 py-3 font-mono text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            进入活动 →
          </button>
        </form>
      </div>
    </section>
  );
}
