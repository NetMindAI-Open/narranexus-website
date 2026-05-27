"use client";

import { sendGAEvent } from "@next/third-parties/google";
import type { TrackPayload } from "./types";

const CONSENT_KEY = "nn-consent";
const ANON_KEY = "nn-anonymous-id";
const SESSION_KEY = "nn-session-id";
const SOURCE = "portal";

function hasConsent(): boolean {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

function uuid(): string {
  return crypto.randomUUID();
}

function getOrCreate(storage: Storage, key: string): string {
  try {
    let v = storage.getItem(key);
    if (!v) {
      v = uuid();
      storage.setItem(key, v);
    }
    return v;
  } catch {
    return uuid();
  }
}

export function track(payload: TrackPayload): void {
  if (typeof window === "undefined") return;
  if (!hasConsent()) return;

  const anonymous_id = getOrCreate(window.localStorage, ANON_KEY);
  const session_id = getOrCreate(window.sessionStorage, SESSION_KEY);

  sendGAEvent("event", payload.event, {
    ...payload,
    anonymous_id,
    session_id,
    source: SOURCE,
  });
}
