/**
 * HomeBriefingMockup — high-fidelity HTML rendition of the
 * NarraNexus cloud app (dev-agent.narra.nexus/app/chat), built to match
 * the real product surface section-for-section. Looped 20-second
 * cinematic: user types a prompt, sends it, the runtime pipeline
 * progresses through six steps, the agent replies, then everything
 * resets. Pure CSS keyframes, no JS state.
 */

/* ── Animation timing ────────────────────────────────────────────
 *
 *   0–4s   (0–20%)    IDLE     empty input, bracket empty-state
 *   4–7s   (20–35%)   TYPING   "give today's briefing" reveals
 *   7–8s   (35–40%)   PAUSE    full typed text held in input
 *   8s     (40%)      SEND     input clears, user bubble appears,
 *                              runtime switches from idle → active
 *   8–15s  (40–75%)   PROCESS  6 pipeline steps run sequentially
 *  15s     (75%)      REPLY    agent bubble appears
 *  15–18s  (75–90%)   HOLD     full conversation visible
 *  18–20s  (90–100%)  RESET    fade back to idle
 */

const CYCLE_S = 20;
const PHASE = {
  IDLE_END: 20,      // %
  TYPING_END: 35,
  PAUSE_END: 40,     // SEND moment
  PROCESS_END: 75,   // REPLY moment
  HOLD_END: 90,
} as const;

const stepLabels = [
  { num: "00", title: "Initialization", icon: null, detail: "✓ Agent=Briefing Maestro, Event=evt_7fcaf419e0" },
  { num: "01", title: "Narrative Selection", icon: "book", detail: "Selected 1 narratives" },
  { num: "02", title: "Module Loading", icon: "puzzle", detail: "Loaded 11 instances → agent_loop" },
  { num: "03", title: "Agent Loop Complete", icon: null, detail: "✓ Complete: 44 responses, 72 chars output" },
  { num: "04", title: "Persist Results", icon: null, detail: "✓ Round=1, Event=evt_7fcaf419e0, Narratives=1" },
  { num: "05", title: "Post-processing (background)", icon: null, detail: "✓ Module hooks dispatched to background" },
];

interface Agent {
  initials: string;
  name: string;
}

const otherAgents: Agent[] = [
  { initials: "GM", name: "Global Markets" },
  { initials: "MP", name: "Macro Policy" },
  { initials: "HW", name: "Holdings Watcher" },
  { initials: "ID", name: "Industry Desk" },
  { initials: "SS", name: "Sentiment Scout" },
];

/* ── Real NM dark palette ───────────────────────────────────── */

const T = {
  bg: "#1A1612",
  bg2: "#221c16",
  bg3: "#2a2620",
  bgAi: "#1b2230",
  bgInput: "#15110e",
  ruleAi: "#2d3e5e",
  rule: "rgba(240, 235, 220, 0.08)",
  ruleStrong: "rgba(240, 235, 220, 0.18)",
  ink: "#f0ebdc",
  ink70: "rgba(240, 235, 220, 0.7)",
  ink50: "rgba(240, 235, 220, 0.45)",
  ink30: "rgba(240, 235, 220, 0.28)",
  carbon: "#E8704A",
  silicon: "#3D7EC4",
  ok: "#7ab877",
  warn: "#d9ad53",
  focus: "#E8704A33",
} as const;

/* ── Keyframe generation ─────────────────────────────────────── */

function buildStepKeyframes() {
  const stepFrac = (PHASE.PROCESS_END - PHASE.PAUSE_END) / stepLabels.length;
  let css = "";
  stepLabels.forEach((_, i) => {
    const runStart = PHASE.PAUSE_END + i * stepFrac;
    const runEnd = PHASE.PAUSE_END + (i + 1) * stepFrac;
    css += `
@keyframes mockup-step-${i}-q {
  0%, ${runStart}% { opacity: 1 }
  ${runStart + 0.01}%, ${PHASE.HOLD_END}% { opacity: 0 }
  ${PHASE.HOLD_END + 0.01}%, 100% { opacity: 1 }
}
@keyframes mockup-step-${i}-r {
  0%, ${runStart}% { opacity: 0 }
  ${runStart + 0.01}%, ${runEnd}% { opacity: 1 }
  ${runEnd + 0.01}%, 100% { opacity: 0 }
}
@keyframes mockup-step-${i}-d {
  0%, ${runEnd}% { opacity: 0 }
  ${runEnd + 0.01}%, ${PHASE.HOLD_END}% { opacity: 1 }
  ${PHASE.HOLD_END + 0.01}%, 100% { opacity: 0 }
}`;
  });
  return css;
}

function buildCountKeyframes() {
  // DONE counter values across the cycle. Each digit i represents
  // "i steps done." Visibility windows:
  //   0 done: 0% → end of step 0 (PAUSE_END + stepFrac)
  //   i done (1..5): end of step (i-1) → end of step i
  //   6 done (all): PROCESS_END → HOLD_END
  const stepFrac = (PHASE.PROCESS_END - PHASE.PAUSE_END) / stepLabels.length;
  const doneValues = [0, 1, 2, 3, 4, 5, 6];
  const last = doneValues.length - 1;
  let css = "";
  doneValues.forEach((_, i) => {
    let start: number;
    let end: number;
    if (i === 0) {
      start = 0;
      end = PHASE.PAUSE_END + stepFrac;
    } else if (i === last) {
      start = PHASE.PROCESS_END;
      end = PHASE.HOLD_END;
    } else {
      start = PHASE.PAUSE_END + i * stepFrac;
      end = PHASE.PAUSE_END + (i + 1) * stepFrac;
    }
    css += `
@keyframes mockup-doneCount-${i} {
  0%, ${start}% { opacity: 0 }
  ${start + 0.01}%, ${end}% { opacity: 1 }
  ${end + 0.01}%, 100% { opacity: 0 }
}`;
  });
  // RUN count: 0 during idle/hold, 1 during processing
  css += `
@keyframes mockup-runCount-0 {
  0%, ${PHASE.PAUSE_END}% { opacity: 1 }
  ${PHASE.PAUSE_END + 0.01}%, ${PHASE.PROCESS_END}% { opacity: 0 }
  ${PHASE.PROCESS_END + 0.01}%, 100% { opacity: 1 }
}
@keyframes mockup-runCount-1 {
  0%, ${PHASE.PAUSE_END}% { opacity: 0 }
  ${PHASE.PAUSE_END + 0.01}%, ${PHASE.PROCESS_END}% { opacity: 1 }
  ${PHASE.PROCESS_END + 0.01}%, 100% { opacity: 0 }
}`;
  return css;
}

const KEYFRAMES = `
/* Escape the marketing site's global border-radius: 0 rule inside
 * the mockup so the real product's softly-rounded surfaces render. */
.ds-mockup, .ds-mockup * { border-radius: revert !important; }
.ds-mockup .rounded-full { border-radius: 9999px !important; }

@keyframes mockup-spin { to { transform: rotate(360deg) } }

/* Runtime layer cross-fade: idle bracket vs active stats+steps */
@keyframes mockup-active-fade {
  0%, ${PHASE.PAUSE_END}% { opacity: 0 }
  ${PHASE.PAUSE_END + 0.5}%, ${PHASE.HOLD_END}% { opacity: 1 }
  ${PHASE.HOLD_END + 0.5}%, 100% { opacity: 0 }
}
@keyframes mockup-idle-fade {
  0%, ${PHASE.PAUSE_END - 0.5}% { opacity: 1 }
  ${PHASE.PAUSE_END}%, ${PHASE.HOLD_END}% { opacity: 0 }
  ${PHASE.HOLD_END + 0.5}%, 100% { opacity: 1 }
}

/* Progress bar fills during processing, holds, resets */
@keyframes mockup-progress {
  0%, ${PHASE.PAUSE_END}% { width: 0% }
  ${PHASE.PROCESS_END}% { width: 100% }
  ${PHASE.HOLD_END}% { width: 100% }
  ${PHASE.HOLD_END + 0.01}%, 100% { width: 0% }
}

/* User input typewriter: width 0 → 21ch (chars in "give today's briefing") */
@keyframes mockup-type {
  0%, ${PHASE.IDLE_END}% { width: 0 }
  ${PHASE.TYPING_END}%, ${PHASE.PAUSE_END - 0.5}% { width: 21ch }
  ${PHASE.PAUSE_END}%, 100% { width: 0 }
}
/* Input placeholder visible until typing starts */
@keyframes mockup-placeholder {
  0%, ${PHASE.IDLE_END - 0.5}% { opacity: 1 }
  ${PHASE.IDLE_END}%, ${PHASE.PAUSE_END}% { opacity: 0 }
  ${PHASE.PAUSE_END + 0.5}%, 100% { opacity: 1 }
}
/* Caret blink: visible during typing & pause */
@keyframes mockup-caret {
  0%, ${PHASE.IDLE_END}% { opacity: 0 }
  ${PHASE.IDLE_END + 0.01}%, ${PHASE.PAUSE_END}% { opacity: 1 }
  ${PHASE.PAUSE_END + 0.01}%, 100% { opacity: 0 }
}
@keyframes mockup-caret-blink {
  50% { opacity: 0 }
}

/* User bubble (chat thread): appears at SEND, hides at RESET */
@keyframes mockup-user-bubble {
  0%, ${PHASE.PAUSE_END - 0.5}% { opacity: 0; transform: translateY(8px) }
  ${PHASE.PAUSE_END}%, ${PHASE.HOLD_END}% { opacity: 1; transform: translateY(0) }
  ${PHASE.HOLD_END + 0.5}%, 100% { opacity: 0; transform: translateY(8px) }
}

/* Agent bubble: appears at REPLY (PROCESS_END), holds, hides at RESET */
@keyframes mockup-agent-bubble {
  0%, ${PHASE.PROCESS_END - 0.5}% { opacity: 0; transform: translateY(8px) }
  ${PHASE.PROCESS_END}%, ${PHASE.HOLD_END}% { opacity: 1; transform: translateY(0) }
  ${PHASE.HOLD_END + 0.5}%, 100% { opacity: 0; transform: translateY(8px) }
}

${buildStepKeyframes()}
${buildCountKeyframes()}
`;

/* ── Inline icons (lucide-style strokes) ────────────────────── */

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const I = {
  check: ({ s = "w-3 h-3" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true"><path d="M5 12l4 4L19 7" /></svg>
  ),
  checkCircle: ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg>
  ),
  circle: ({ s = "w-3 h-3" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true"><circle cx="12" cy="12" r="7" /></svg>
  ),
  loader: ({ s = "w-3 h-3" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true" style={{ animation: "mockup-spin 1s linear infinite" }}>
      <path d="M21 12a9 9 0 11-9-9" />
    </svg>
  ),
  zap: ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
  ),
  layers: ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5M3 17l9 5 9-5" />
    </svg>
  ),
  activity: ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true"><path d="M3 12h4l2-7 4 14 2-7h6" /></svg>
  ),
  sliders: ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true">
      <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
      <circle cx="16" cy="6" r="1.5" /><circle cx="10" cy="12" r="1.5" /><circle cx="18" cy="18" r="1.5" />
    </svg>
  ),
  inbox: ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true">
      <path d="M3 13l3-9h12l3 9v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
      <path d="M3 13h5l1 2h6l1-2h5" />
    </svg>
  ),
  list: ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true">
      <path d="M8 6h13M8 12h13M8 18h13M3 6l1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17" />
    </svg>
  ),
  puzzle: ({ s = "w-3 h-3" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true">
      <path d="M11 3a2 2 0 014 0v2h3a1 1 0 011 1v3h2a2 2 0 010 4h-2v3a1 1 0 01-1 1h-3v2a2 2 0 01-4 0v-2H8a1 1 0 01-1-1v-3H5a2 2 0 010-4h2V6a1 1 0 011-1h3V3z" />
    </svg>
  ),
  play: ({ s = "w-2.5 h-2.5" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true"><path d="M6 4l14 8-14 8V4z" /></svg>
  ),
  book: ({ s = "w-2.5 h-2.5" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true"><path d="M3 5a2 2 0 012-2h6v18H5a2 2 0 01-2-2V5zM21 5a2 2 0 00-2-2h-6v18h6a2 2 0 002-2V5z" /></svg>
  ),
  chevR: ({ s = "w-3 h-3" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
  ),
  file: ({ s = "w-4 h-4" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true">
      <path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V7l-5-4z" />
      <path d="M14 3v4h5" />
    </svg>
  ),
  spark: ({ s = "w-2.5 h-2.5" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true">
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" />
    </svg>
  ),
  send: ({ s = "w-4 h-4" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" /></svg>
  ),
  paperclip: ({ s = "w-4 h-4" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true"><path d="M14 8l-6 6a3 3 0 104 4l8-8a5 5 0 00-7-7L4 12a7 7 0 0010 10" /></svg>
  ),
  mic: ({ s = "w-4 h-4" }: { s?: string }) => (
    <svg {...svg} className={s} aria-hidden="true">
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" />
    </svg>
  ),
};

/* ── RingAvatar ────────────────────────────────────────────── */

function RingAvatar({
  species,
  label,
  size = "md",
}: {
  species: "carbon" | "silicon";
  label: string;
  size?: "sm" | "md";
}) {
  const color = species === "carbon" ? T.carbon : T.silicon;
  const dim = size === "sm" ? { w: 24, t: 9 } : { w: 30, t: 10 };
  return (
    <span
      className="rounded-full inline-flex items-center justify-center font-mono shrink-0"
      style={{
        width: dim.w,
        height: dim.w,
        border: `2px solid ${color}`,
        color,
        fontSize: dim.t,
        letterSpacing: "0.05em",
      }}
    >
      {label}
    </span>
  );
}

/* ── The mockup ──────────────────────────────────────────────── */

export function HomeBriefingMockup() {
  return (
    <div
      className="ds-mockup w-full overflow-hidden border font-body relative"
      style={{ background: T.bg, borderColor: T.ruleStrong, color: T.ink, borderRadius: 8 }}
    >
      <style>{KEYFRAMES}</style>

      {/* Logo header bar */}
      <div
        className="flex items-center px-4 h-10 border-b"
        style={{ background: T.bg2, borderColor: T.rule }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/narranexus-logo-dark.svg"
          alt="NarraNexus"
          style={{ height: 18, width: "auto" }}
        />
        <span
          className="ml-auto font-mono tabular-nums"
          style={{ color: T.ink50, fontSize: 10, letterSpacing: "0.08em" }}
        >
          dev-agent.narra.nexus
        </span>
      </div>

      {/* 3-column body */}
      <div className="flex h-[520px] md:h-[600px]">
        {/* ─────── LEFT RAIL ─────── */}
        <aside
          className="hidden sm:flex w-[200px] md:w-[228px] shrink-0 flex-col border-r"
          style={{ borderColor: T.rule }}
        >
          {/* User row */}
          <div className="px-4 py-3 border-b flex items-center gap-2.5" style={{ borderColor: T.rule }}>
            <RingAvatar species="carbon" label="ME" size="md" />
            <div className="flex-1 min-w-0">
              <div
                className="font-mono uppercase truncate"
                style={{ color: T.ink, fontSize: 11, letterSpacing: "0.12em" }}
              >
                USER
              </div>
              <div
                className="flex items-center gap-1 mt-0.5 font-mono uppercase"
                style={{ color: T.ink50, fontSize: 9, letterSpacing: "0.14em" }}
              >
                <span className="inline-block rounded-full" style={{ width: 6, height: 6, background: T.ok }} aria-hidden="true" />
                ONLINE
              </div>
            </div>
          </div>

          {/* Teams */}
          <div className="px-4 pt-3 pb-2 border-b" style={{ borderColor: T.rule }}>
            <div className="font-mono uppercase mb-2" style={{ color: T.ink50, fontSize: 10, letterSpacing: "0.16em" }}>
              [ teams · 1 ]
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span
                className="px-2 py-1 font-mono uppercase"
                style={{ fontSize: 9, letterSpacing: "0.12em", background: T.bg3, color: T.ink70, borderRadius: 4 }}
              >
                All (7)
              </span>
              <span
                className="inline-flex items-center gap-1 px-2 py-1 font-mono uppercase"
                style={{ fontSize: 9, letterSpacing: "0.12em", background: `${T.silicon}26`, color: T.ink, border: `1px solid ${T.silicon}55`, borderRadius: 4 }}
              >
                <span className="inline-block rounded-full" style={{ width: 5, height: 5, background: T.silicon }} aria-hidden="true" />
                Fin Brief (6)
              </span>
            </div>
          </div>

          {/* Agents */}
          <div className="px-4 pt-3 pb-2">
            <div className="font-mono uppercase mb-2" style={{ color: T.ink50, fontSize: 10, letterSpacing: "0.16em" }}>
              [ agents · 6 ]
            </div>
          </div>
          <div className="flex-1 overflow-hidden px-2 space-y-0.5">
            {/* Selected: Briefing Maestro */}
            <div
              className="border px-2.5 py-2.5 flex items-start gap-2.5"
              style={{ background: `${T.silicon}1a`, borderColor: `${T.silicon}66`, borderRadius: 6 }}
            >
              <RingAvatar species="silicon" label="BM" size="md" />
              <div className="min-w-0 flex-1">
                <div className="truncate" style={{ color: T.ink, fontSize: 12, lineHeight: 1.25 }}>
                  Briefing Maestro
                </div>
                <div
                  className="flex items-center gap-1 mt-1 font-mono uppercase"
                  style={{ color: T.ink50, fontSize: 9, letterSpacing: "0.14em" }}
                >
                  <span className="inline-block rounded-full" style={{ width: 5, height: 5, background: T.warn }} aria-hidden="true" />
                  Active
                </div>
              </div>
            </div>

            {otherAgents.map((a) => (
              <div key={a.initials} className="px-2.5 py-2 flex items-center gap-2.5" style={{ borderRadius: 6 }}>
                <RingAvatar species="silicon" label={a.initials} size="sm" />
                <div className="min-w-0">
                  <div className="truncate" style={{ color: T.ink70, fontSize: 11.5 }}>
                    {a.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-3 py-2 border-t flex items-center gap-2 font-mono"
            style={{ borderColor: T.rule, color: T.ink30, fontSize: 9, letterSpacing: "0.08em" }}>
            <span>Powered by NetMind.AI</span>
            <span className="ml-auto">v1.7.8</span>
          </div>
        </aside>

        {/* ─────── CENTER CHAT ─────── */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Interaction header */}
          <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: T.rule }}>
            <span className="inline-block rounded-full" style={{ width: 6, height: 6, background: T.ok }} aria-hidden="true" />
            <span className="font-mono uppercase" style={{ color: T.ink70, fontSize: 10, letterSpacing: "0.18em" }}>
              Interaction
            </span>
            <span className="font-mono" style={{ color: T.ink50, fontSize: 11 }}>
              agent_e2ace957a084
            </span>
            <span className="ml-auto flex items-center gap-1 font-mono uppercase" style={{ color: T.ink50, fontSize: 9, letterSpacing: "0.18em" }}>
              <span className="inline-block rounded-full" style={{ width: 5, height: 5, background: T.ok }} aria-hidden="true" />
              Ready
            </span>
          </div>

          {/* Message thread */}
          <div className="flex-1 px-5 md:px-6 py-5 space-y-5 overflow-hidden">
            {/* User bubble — animates in at SEND */}
            <div
              className="flex gap-3 flex-row-reverse"
              style={{
                opacity: 0,
                animation: `mockup-user-bubble ${CYCLE_S}s ease-out infinite`,
              }}
            >
              <RingAvatar species="carbon" label="ME" size="sm" />
              <div className="max-w-[78%]">
                <div
                  className="px-3.5 py-2.5"
                  style={{
                    background: T.bg3,
                    border: `1px solid ${T.rule}`,
                    borderRight: `3px solid ${T.ink30}`,
                    borderRadius: 6,
                  }}
                >
                  <div style={{ color: T.ink, fontSize: 13, lineHeight: 1.5 }}>
                    give today&rsquo;s briefing
                  </div>
                </div>
                <div className="font-mono mt-1 text-right tabular-nums" style={{ color: T.ink30, fontSize: 9 }}>
                  11:25
                </div>
              </div>
            </div>

            {/* Agent bubble — animates in at REPLY */}
            <div
              className="flex gap-3"
              style={{
                opacity: 0,
                animation: `mockup-agent-bubble ${CYCLE_S}s ease-out infinite`,
              }}
            >
              <RingAvatar species="silicon" label="BM" size="sm" />
              <div className="max-w-[85%]">
                <div
                  className="px-3.5 py-3"
                  style={{
                    background: T.bgAi,
                    border: `1px solid ${T.ruleAi}`,
                    borderLeft: `3px solid ${T.silicon}`,
                    borderRadius: 6,
                  }}
                >
                  <div style={{ color: T.ink, fontSize: 13, lineHeight: 1.55 }}>
                    Briefing ready. Five analysts agreed on a macro-driven open. Deep-read below.
                  </div>
                  <div
                    className="mt-3 pt-2.5 border-t flex items-center gap-1.5 font-mono uppercase"
                    style={{ borderColor: T.ruleAi, color: T.ink50, fontSize: 9, letterSpacing: "0.16em" }}
                  >
                    <I.spark />
                    View reasoning &amp; tools
                  </div>
                </div>
                <div
                  className="mt-2 inline-flex items-center gap-2.5 px-2.5 py-2"
                  style={{ background: T.bgAi, border: `1px solid ${T.ruleAi}`, borderRadius: 6 }}
                >
                  <span className="flex items-center justify-center shrink-0"
                    style={{ width: 28, height: 28, background: T.bg3, color: T.ink70, borderRadius: 4 }}>
                    <I.file />
                  </span>
                  <div className="min-w-0">
                    <div style={{ color: T.ink, fontSize: 11 }}>briefing_2026-05-28.html</div>
                    <div className="font-mono uppercase" style={{ color: T.ink30, fontSize: 8, letterSpacing: "0.14em" }}>
                      Artifact · 8.2 KB · HTML
                    </div>
                  </div>
                </div>
                <div className="font-mono mt-1 tabular-nums" style={{ color: T.ink30, fontSize: 9 }}>
                  11:26
                </div>
              </div>
            </div>
          </div>

          {/* Input bar with typewriter animation */}
          <div className="px-5 py-3 border-t flex items-center gap-2" style={{ borderColor: T.rule }}>
            <span style={{ color: T.ink30 }}><I.paperclip /></span>
            <span style={{ color: T.ink30 }}><I.mic /></span>
            <div
              className="flex-1 px-3 py-2 relative overflow-hidden"
              style={{ background: T.bgInput, border: `1px solid ${T.rule}`, borderRadius: 6, minHeight: 34 }}
            >
              {/* Placeholder, fades out when typing starts */}
              <span
                style={{
                  color: T.ink30,
                  fontSize: 12,
                  animation: `mockup-placeholder ${CYCLE_S}s linear infinite`,
                }}
              >
                Type your message…
              </span>
              {/* Typed text — typewriter reveal */}
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 12,
                  transform: "translateY(-50%)",
                  color: T.ink,
                  fontSize: 12,
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  display: "inline-block",
                  width: 0,
                  animation: `mockup-type ${CYCLE_S}s steps(21, end) infinite`,
                }}
              >
                give today&rsquo;s briefing
              </span>
              {/* Blinking caret during typing/pause */}
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 8,
                  transform: "translateY(-50%)",
                  width: 1,
                  height: 14,
                  background: T.ink70,
                  opacity: 0,
                  animation: `mockup-caret ${CYCLE_S}s linear infinite, mockup-caret-blink 0.8s steps(2) infinite`,
                }}
                aria-hidden="true"
              />
            </div>
            <span
              className="flex items-center justify-center"
              style={{ width: 32, height: 32, background: T.silicon, color: T.ink, borderRadius: 6 }}
              aria-hidden="true"
            >
              <I.send />
            </span>
          </div>
        </main>

        {/* ─────── RIGHT RAIL ─────── */}
        <aside
          className="hidden lg:flex w-[300px] shrink-0 flex-col border-l"
          style={{ borderColor: T.rule }}
        >
          {/* Top tabs (5) + sparkline */}
          <div className="px-4 h-11 flex items-center gap-4 border-b" style={{ borderColor: T.rule }}>
            <TopTab active label="Runtime" icon={<I.activity s="w-3 h-3" />} />
            <TopTab label="Config" icon={<I.sliders s="w-3 h-3" />} />
            <TopTab label="Inbox" icon={<I.inbox s="w-3 h-3" />} />
            <TopTab label="Jobs" icon={<I.list s="w-3 h-3" />} />
            <TopTab label="Skill" icon={<I.puzzle />} />
            <span className="ml-auto" style={{ color: T.warn }}>
              <I.activity s="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Sub-tabs */}
          <div className="px-4 h-10 flex items-center gap-5 border-b" style={{ borderColor: T.rule }}>
            <SubTabAnimated active label="Execution" icon={<I.play />} />
            <SubTab label="Narrative" count="3" countColor={T.ink50} icon={<I.book />} />
          </div>

          {/* Content layer: active runtime fades in over idle bracket */}
          <div className="flex-1 relative overflow-hidden">
            {/* IDLE — bracket empty state */}
            <div
              className="absolute inset-0 flex items-center justify-center px-4"
              style={{
                opacity: 1,
                animation: `mockup-idle-fade ${CYCLE_S}s linear infinite`,
              }}
            >
              <div className="text-center">
                <div className="font-mono uppercase" style={{ color: T.ink50, fontSize: 11, letterSpacing: "0.2em" }}>
                  <span style={{ color: T.ink30 }}>[</span>
                  &nbsp;&nbsp;No active execution&nbsp;&nbsp;
                  <span style={{ color: T.ink30 }}>]</span>
                </div>
                <div className="mt-3" style={{ color: T.ink30, fontSize: 11, lineHeight: 1.5, maxWidth: 200, margin: "12px auto 0" }}>
                  Execution steps will appear here when the agent processes your request
                </div>
              </div>
            </div>

            {/* ACTIVE — stats + progress + steps */}
            <div
              className="absolute inset-0 flex flex-col"
              style={{
                opacity: 0,
                animation: `mockup-active-fade ${CYCLE_S}s linear infinite`,
              }}
            >
              {/* Stats with icons + subtext */}
              <div className="grid grid-cols-3 border-b" style={{ borderColor: T.rule }}>
                <StatCell icon={<I.checkCircle />} label="Completed" color={T.ok} subtext="of 6 steps">
                  <CycleCount kind="doneCount" />
                </StatCell>
                <StatCell icon={<I.zap />} label="Running" color={T.warn} subtext="Idle" sep>
                  <CycleCount kind="runCount" />
                </StatCell>
                <StatCell icon={<I.layers />} label="Total" color={T.ink70} subtext="Pipeline">
                  6
                </StatCell>
              </div>

              {/* Progress bar */}
              <div className="relative h-[3px]" style={{ background: T.bg3 }}>
                <div
                  className="absolute inset-y-0 left-0"
                  style={{ background: T.ok, animation: `mockup-progress ${CYCLE_S}s linear infinite` }}
                />
              </div>

              {/* Step list */}
              <div className="flex-1 overflow-hidden p-3">
                <div className="relative">
                  {/* Vertical timeline line behind all rows */}
                  <span
                    className="absolute"
                    style={{
                      left: 11,
                      top: 14,
                      bottom: 14,
                      width: 1,
                      background: T.rule,
                    }}
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    {stepLabels.map((step, i) => (
                      <StepRow key={step.num} index={i} step={step} focused={i === 4} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ── Helper components ─────────────────────────────────────── */

function TopTab({ active, label, icon }: { active?: boolean; label: string; icon: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-1.5 py-3 -mb-px"
      style={{
        borderBottom: `2px solid ${active ? T.ink : "transparent"}`,
        color: active ? T.ink : T.ink50,
      }}
    >
      {icon}
      <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
        {label}
      </span>
    </div>
  );
}

function SubTab({ active, label, count, countColor, icon }: { active?: boolean; label: string; count: string; countColor: string; icon: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-1.5 py-2.5 -mb-px"
      style={{
        borderBottom: `2px solid ${active ? T.ink : "transparent"}`,
        color: active ? T.ink : T.ink50,
      }}
    >
      {icon}
      <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.16em" }}>
        {label}
      </span>
      <span className="font-mono tabular-nums" style={{ color: countColor, fontSize: 10, whiteSpace: "nowrap" }}>
        · {count}
      </span>
    </div>
  );
}

function SubTabAnimated({ active, label, icon }: { active?: boolean; label: string; icon: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-1.5 py-2.5 -mb-px"
      style={{
        borderBottom: `2px solid ${active ? T.ink : "transparent"}`,
        color: active ? T.ink : T.ink50,
      }}
    >
      {icon}
      <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.16em" }}>
        {label}
      </span>
      <span className="font-mono tabular-nums" style={{ color: T.warn, fontSize: 10, whiteSpace: "nowrap" }}>
        · <CycleCount kind="doneCount" />/6
      </span>
    </div>
  );
}

function StatCell({
  icon,
  label,
  color,
  subtext,
  sep,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  subtext: string;
  sep?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="px-3 py-2.5" style={{ borderRight: sep ? `1px solid ${T.rule}` : "none" }}>
      <div className="flex items-center gap-1" style={{ color: T.ink50, fontSize: 9, letterSpacing: "0.16em" }}>
        <span style={{ color }}>{icon}</span>
        <span className="font-mono uppercase">{label}</span>
      </div>
      <div className="font-mono tabular-nums mt-1" style={{ color, fontSize: 22, lineHeight: 1 }}>
        {children}
      </div>
      <div className="font-mono mt-1" style={{ color: T.ink30, fontSize: 9 }}>
        {subtext}
      </div>
    </div>
  );
}

/* ── CycleCount with pre-built keyframes ──────────────────── */

type CountKind = "doneCount" | "runCount";
const COUNT_VALUES: Record<CountKind, readonly number[]> = {
  doneCount: [0, 1, 2, 3, 4, 5, 6],
  runCount: [0, 1],
};

function CycleCount({ kind }: { kind: CountKind }) {
  const values = COUNT_VALUES[kind];
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        verticalAlign: "baseline",
        lineHeight: "1em",
      }}
    >
      {values.map((v, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: i === 0 ? 1 : 0,
            animation: `mockup-${kind}-${i} ${CYCLE_S}s linear infinite`,
          }}
        >
          {v}
        </span>
      ))}
      <span style={{ visibility: "hidden" }}>{Math.max(...values)}</span>
    </span>
  );
}

/* ── StepRow ──────────────────────────────────────────────── */

function StepRow({
  index,
  step,
  focused,
}: {
  index: number;
  step: typeof stepLabels[number];
  focused?: boolean;
}) {
  const stepEmoji = step.icon === "book" ? "📚 " : step.icon === "puzzle" ? "🧩 " : "";
  return (
    <div
      className="relative flex items-start gap-2.5 py-1.5 pr-2"
      style={{
        paddingLeft: 28,
        background: focused ? `${T.silicon}10` : "transparent",
        border: focused ? `1px solid ${T.silicon}55` : "1px solid transparent",
        borderRadius: 6,
      }}
    >
      {/* Status icon with timeline punch-through */}
      <span
        className="absolute left-2 top-2 flex items-center justify-center"
        style={{
          width: 18,
          height: 18,
          background: T.bg,
          borderRadius: 9999,
        }}
        aria-hidden="true"
      >
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            color: T.ink50,
            animation: `mockup-step-${index}-q ${CYCLE_S}s linear infinite`,
          }}
        >
          <I.circle s="w-3 h-3" />
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            color: T.warn,
            opacity: 0,
            animation: `mockup-step-${index}-r ${CYCLE_S}s linear infinite`,
          }}
        >
          <I.loader s="w-3 h-3" />
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            color: T.ok,
            opacity: 0,
            animation: `mockup-step-${index}-d ${CYCLE_S}s linear infinite`,
          }}
        >
          <I.check s="w-3 h-3" />
        </span>
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5" style={{ fontSize: 11 }}>
          <span className="font-mono" style={{ color: T.ink50, fontSize: 10 }}>
            {step.num}
          </span>
          <span style={{ color: T.ink, fontSize: 11.5 }}>
            {stepEmoji}{step.title}
          </span>
        </div>
        {/* Detail line — only visible when done */}
        <div
          className="font-mono mt-0.5"
          style={{
            color: T.ink50,
            fontSize: 9.5,
            opacity: 0,
            animation: `mockup-step-${index}-d ${CYCLE_S}s linear infinite`,
            letterSpacing: "0.02em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {step.detail}
        </div>
      </div>

      <span className="shrink-0 mt-0.5" style={{ color: T.ink30 }}>
        <I.chevR />
      </span>
    </div>
  );
}
