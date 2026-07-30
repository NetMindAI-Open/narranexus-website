// Browser-local persistence for the /event page. Identity is a self-reported
// nickname + contact plus a client-generated participant_id; progress (checked
// in, which tasks were submitted, feedback sent) is tracked per-device only,
// because RLS is insert-only and the page cannot read back server state.

export interface Participant {
  id: string;
  nickname: string;
  contact: string;
}

const KEYS = {
  participant: "narranexus_event_participant",
  checkedIn: "narranexus_event_checked_in",
  tasksDone: "narranexus_event_tasks_done",
  feedbackDone: "narranexus_event_feedback_done",
} as const;

function read(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage may be unavailable (private mode / quota) — fail silently
  }
}

export function newParticipantId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function loadParticipant(): Participant | null {
  const raw = read(KEYS.participant);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Participant>;
    if (parsed && parsed.id && parsed.nickname) {
      return {
        id: parsed.id,
        nickname: parsed.nickname,
        contact: parsed.contact ?? "",
      };
    }
  } catch {
    // corrupt value — treat as no participant
  }
  return null;
}

export function saveParticipant(participant: Participant) {
  write(KEYS.participant, JSON.stringify(participant));
}

export function loadCheckedIn(): boolean {
  return read(KEYS.checkedIn) === "1";
}

export function setCheckedIn() {
  write(KEYS.checkedIn, "1");
}

export function loadTasksDone(): number[] {
  const raw = read(KEYS.tasksDone);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((n): n is number => typeof n === "number");
    }
  } catch {
    // ignore
  }
  return [];
}

export function addTaskDone(taskNumber: number) {
  const done = new Set(loadTasksDone());
  done.add(taskNumber);
  write(KEYS.tasksDone, JSON.stringify([...done]));
}

export function loadFeedbackDone(): boolean {
  return read(KEYS.feedbackDone) === "1";
}

export function setFeedbackDone() {
  write(KEYS.feedbackDone, "1");
}
