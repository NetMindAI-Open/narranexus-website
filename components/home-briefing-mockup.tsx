/**
 * HomeBriefingMockup — stylized rendition of agent.narra.nexus's
 * /app/chat surface, mid-flight on the Financial Morning Briefing
 * template. Real NM tokens (carbon = #E8704A orange, silicon = #3D7EC4
 * blue) and the warm dark palette (#1A1612 paper-inverted), the
 * RingAvatar pattern (circle with colored stroke ring), the team
 * filter pill grammar (leading colored dot), and the bracket empty-
 * state motif. Looped 18-second state cycle so the runtime visibly
 * progresses through its 6 pipeline steps and resets — manyfold-grade
 * aliveness via pure CSS keyframes, no JS state.
 */

/* ── Real NM palette, warm dark ───────────────────────────────── */

const T = {
  bg: "#1A1612",                          // nm-paper, dark inverted
  bg2: "#221c16",                         // nm-paper-warm, dark
  bg3: "#2a2620",                         // nm-ink, used as own-bubble & raised
  bgAi: "#1b2230",                        // silicon-soft, dark form
  ruleAi: "#2d3e5e",                      // silicon-hair, dark form
  rule: "rgba(240, 235, 220, 0.08)",      // hairline in dark
  ruleStrong: "rgba(240, 235, 220, 0.18)", // border-subtle in dark
  ink: "#f0ebdc",                         // text-primary (warm cream)
  ink70: "rgba(240, 235, 220, 0.7)",      // text-secondary
  ink50: "rgba(240, 235, 220, 0.45)",     // text-tertiary
  ink30: "rgba(240, 235, 220, 0.28)",     // text-quaternary
  carbon: "#E8704A",                      // species: human (warm orange)
  silicon: "#3D7EC4",                     // species: AI (deep blue)
  siliconBright: "#5da1eb",               // silicon, dark-mode lifted
  ok: "#7ab877",                          // green-400 ish
  warn: "#d9ad53",                        // yellow-400 ish
} as const;

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

const stepLabels = [
  "Initialization",
  "Context bind",
  "Plan",
  "Execute agent loop",
  "Synthesize",
  "Reply",
];

/* ── Animation timing ─────────────────────────────────────────────
 * Total cycle: 18s. Each of 6 steps gets 1s of "running" time
 * (0 to 6s). Then a 9s "all-done" hold (6 to 15s). Then a 3s
 * reset/idle phase (15 to 18s) where the panel shows the bracket
 * empty state. Animation-delay shifts everything in lockstep.
 *
 * Per-step keyframes are emitted programmatically below; they all
 * share the same 18s cycle but each step's "running" window starts
 * at a different point.
 */

const CYCLE_S = 15;
const STEP_DUR_S = 1.2;
const ACTIVE_END_S = STEP_DUR_S * stepLabels.length; // 7.2s
const HOLD_END_S = 12; // hold all-done from 7.2s to 12s
const RESET_END_S = CYCLE_S; // reset/idle from 12s to 15s

const pct = (s: number) => (s / CYCLE_S) * 100;

/* Build keyframe CSS for the 6 step rows.
 * Each row has three icon layers (queued / running / done) and a
 * status label that swaps text. Animation toggles opacity of the
 * three icons so the row appears to transition through its life.
 */
function buildStepKeyframes() {
  let css = "";
  stepLabels.forEach((_, i) => {
    const runStart = pct(i * STEP_DUR_S);
    const runEnd = pct((i + 1) * STEP_DUR_S);
    const holdEnd = pct(HOLD_END_S);
    const resetEnd = pct(RESET_END_S);
    // queued visible: from resetEnd (cycle start) to this step's runStart
    css += `
@keyframes mockup-step-${i}-q {
  0%, ${runStart}% { opacity: 1 }
  ${runStart + 0.01}%, ${holdEnd}% { opacity: 0 }
  ${holdEnd + 0.01}%, ${resetEnd}% { opacity: 1 }
}
@keyframes mockup-step-${i}-r {
  0%, ${runStart}% { opacity: 0 }
  ${runStart + 0.01}%, ${runEnd}% { opacity: 1 }
  ${runEnd + 0.01}%, ${resetEnd}% { opacity: 0 }
}
@keyframes mockup-step-${i}-d {
  0%, ${runEnd}% { opacity: 0 }
  ${runEnd + 0.01}%, ${holdEnd}% { opacity: 1 }
  ${holdEnd + 0.01}%, ${resetEnd}% { opacity: 0 }
}`;
  });
  return css;
}

/* Pre-generated CycleCount keyframes. Each named array gets one set
 * of opacity-fade keyframes per index. Built at module load so we
 * never inject `<style>` tags inside spans (which breaks parent
 * sizing in some browsers). */
const COUNT_VALUES = {
  doneCount: [0, 1, 2, 3, 4, 5, 6],
  runCount: [1, 1, 1, 1, 1, 1, 0],
} as const;

function buildCountKeyframes(name: string, values: readonly number[]) {
  const stepFrac = pct(STEP_DUR_S);
  const holdFrac = pct(HOLD_END_S);
  return values
    .map((_, i) => {
      const isLast = i === values.length - 1;
      // Non-last digits: visible during their step's "running" window.
      // Last digit: visible during the HOLD phase (all steps done) so
      // the stat doesn't go blank for 4-5 seconds while we wait for
      // the IDLE/reset phase.
      const start = i * stepFrac;
      const end = isLast ? holdFrac : (i + 1) * stepFrac;
      return `
@keyframes mockup-${name}-${i} {
  0%, ${start}% { opacity: 0 }
  ${start + 0.01}%, ${end}% { opacity: 1 }
  ${end + 0.01}%, 100% { opacity: 0 }
}`;
    })
    .join("");
}

const KEYFRAMES = `
/* Escape the global "* { border-radius: 0 !important }" rule that
 * the marketing site enforces on itself. Inside the mockup we want
 * the real product's softly-rounded cards, pills, and circular
 * avatars to render as designed. Higher specificity (.ds-mockup *)
 * beats the global universal selector. */
.ds-mockup, .ds-mockup * { border-radius: revert !important; }
.ds-mockup .rounded-full { border-radius: 9999px !important; }

@keyframes mockup-progress {
  0% { width: 0% }
  ${pct(ACTIVE_END_S)}% { width: 100% }
  ${pct(HOLD_END_S)}% { width: 100% }
  ${pct(HOLD_END_S) + 1}%, 100% { width: 0% }
}
@keyframes mockup-active-fade {
  0%, ${pct(HOLD_END_S)}% { opacity: 1 }
  ${pct(HOLD_END_S) + 0.5}%, 100% { opacity: 0 }
}
@keyframes mockup-idle-fade {
  0%, ${pct(HOLD_END_S)}% { opacity: 0 }
  ${pct(HOLD_END_S) + 0.5}%, 100% { opacity: 1 }
}
@keyframes mockup-stat-run {
  0% { opacity: 0 }
  0.1%, ${pct(ACTIVE_END_S)}% { opacity: 1 }
  ${pct(ACTIVE_END_S) + 0.01}%, 100% { opacity: 0 }
}
@keyframes mockup-stat-done {
  0% { content: "0" }
  ${pct(STEP_DUR_S)}% { content: "1" }
}
@keyframes mockup-spin {
  to { transform: rotate(360deg) }
}
${buildStepKeyframes()}
${buildCountKeyframes("doneCount", COUNT_VALUES.doneCount)}
${buildCountKeyframes("runCount", COUNT_VALUES.runCount)}
`;

/* ── Tiny inline icons ───────────────────────────────────────────── */

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const IconCheck = ({ s = "w-3 h-3" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true"><path d="M5 12l4 4L19 7" /></svg>
);
const IconSpinner = ({ s = "w-3 h-3" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true" style={{ animation: "mockup-spin 1.2s linear infinite" }}>
    <path d="M12 3a9 9 0 110 18 9 9 0 010-18z" strokeOpacity="0.2" />
    <path d="M21 12a9 9 0 00-9-9" />
  </svg>
);
const IconCircle = ({ s = "w-3 h-3" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true"><circle cx="12" cy="12" r="6.5" /></svg>
);
const IconFile = ({ s = "w-4 h-4" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true">
    <path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V7l-5-4z" />
    <path d="M14 3v4h5" />
  </svg>
);
const IconSparkle = ({ s = "w-3 h-3" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true"><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" /></svg>
);
const IconPaperclip = ({ s = "w-4 h-4" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true"><path d="M14 8l-6 6a3 3 0 104 4l8-8a5 5 0 00-7-7L4 12a7 7 0 0010 10" /></svg>
);
const IconMic = ({ s = "w-4 h-4" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true">
    <rect x="9" y="3" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0014 0M12 18v3" />
  </svg>
);
const IconSend = ({ s = "w-4 h-4" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" /></svg>
);
const IconCloud = ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true"><path d="M7 18a5 5 0 010-10 6 6 0 0111-1 4 4 0 011 8H7z" /></svg>
);
const IconGrid = ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);
const IconSliders = ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true">
    <path d="M4 6h6M14 6h6M4 12h2M10 12h10M4 18h12M20 18h0" />
    <circle cx="12" cy="6" r="2" /><circle cx="8" cy="12" r="2" /><circle cx="18" cy="18" r="2" />
  </svg>
);
const IconTrash = ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>
);
const IconLogout = ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true"><path d="M16 17l5-5-5-5M21 12H9M9 21H4V3h5" /></svg>
);
const IconActivity = ({ s = "w-3.5 h-3.5" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true"><path d="M3 12h4l2-7 4 14 2-7h6" /></svg>
);
const IconBookOpen = ({ s = "w-3 h-3" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true">
    <path d="M2 5a2 2 0 012-2h6v18H4a2 2 0 01-2-2V5zM22 5a2 2 0 00-2-2h-6v18h6a2 2 0 002-2V5z" />
  </svg>
);
const IconPlay = ({ s = "w-3 h-3" }: { s?: string }) => (
  <svg {...svg} className={s} aria-hidden="true"><path d="M6 4l14 8-14 8V4z" /></svg>
);

/* ── RingAvatar (NM signature) ────────────────────────────────── */

function RingAvatar({
  species,
  label,
  size = "md",
  pulse = false,
}: {
  species: "carbon" | "silicon" | "muted";
  label: string;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}) {
  const color = species === "carbon" ? T.carbon : species === "silicon" ? T.silicon : T.ink50;
  const dim =
    size === "sm" ? { w: 24, t: 9 } : size === "lg" ? { w: 36, t: 11 } : { w: 30, t: 10 };
  return (
    <span
      className={`rounded-full inline-flex items-center justify-center font-mono shrink-0 ${pulse ? "animate-pulse" : ""}`}
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

/* ── Mark / wordmark (mini logo for the rail) ─────────────────── */

function NarraNexusMark() {
  return (
    <span className="inline-flex items-center gap-1.5">
      {/* Pixel-ish brand mark — a stylized N tile in carbon orange,
          stand-in for the real /logo-dark-mode.svg without dragging
          the real asset into the marketing site. */}
      <span
        className="rounded-[3px] inline-flex items-center justify-center font-mono font-bold"
        style={{
          width: 22,
          height: 22,
          background: T.carbon,
          color: T.bg,
          fontSize: 13,
          letterSpacing: "-0.05em",
        }}
      >
        N
      </span>
      <span
        className="font-mono"
        style={{
          color: T.ink,
          fontSize: 12,
          letterSpacing: "0.04em",
        }}
      >
        narra nexus
      </span>
    </span>
  );
}

/* ── The mockup ──────────────────────────────────────────────────── */

export function HomeBriefingMockup() {
  return (
    <div
      className="ds-mockup w-full overflow-hidden border font-body relative"
      style={{
        background: T.bg,
        borderColor: T.ruleStrong,
        color: T.ink,
        borderRadius: 8,
      }}
    >
      {/* keyframe stylesheet, scoped via uniquely-named animations */}
      <style>{KEYFRAMES}</style>

      {/* Logo header bar (no traffic lights — per user feedback) */}
      <div
        className="flex items-center px-4 h-10 border-b"
        style={{ background: T.bg2, borderColor: T.rule }}
      >
        <NarraNexusMark />
        <span
          className="ml-auto font-mono tabular-nums"
          style={{ color: T.ink50, fontSize: 10, letterSpacing: "0.08em" }}
        >
          agent.narra.nexus
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
            <RingAvatar species="carbon" label="NE" size="md" />
            <div className="flex-1 min-w-0">
              <div
                className="font-mono uppercase truncate"
                style={{ color: T.ink, fontSize: 11, letterSpacing: "0.12em" }}
              >
                NEW USER TEST2
              </div>
              <div
                className="flex items-center gap-1 mt-0.5 font-mono uppercase"
                style={{ color: T.ink50, fontSize: 9, letterSpacing: "0.14em" }}
              >
                <span
                  className="inline-block rounded-full"
                  style={{ width: 6, height: 6, background: T.ok }}
                  aria-hidden="true"
                />
                ONLINE
              </div>
            </div>
          </div>

          {/* Teams section */}
          <div className="px-4 pt-3 pb-2 border-b" style={{ borderColor: T.rule }}>
            <div
              className="font-mono uppercase mb-2"
              style={{ color: T.ink50, fontSize: 10, letterSpacing: "0.16em" }}
            >
              [ teams · 1 ]
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span
                className="px-2 py-1 font-mono uppercase"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  background: T.bg3,
                  color: T.ink70,
                  borderRadius: 4,
                }}
              >
                All (7)
              </span>
              <span
                className="inline-flex items-center gap-1 px-2 py-1 font-mono uppercase"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  background: `${T.silicon}26`,
                  color: T.ink,
                  border: `1px solid ${T.silicon}55`,
                  borderRadius: 4,
                }}
              >
                <span
                  className="inline-block rounded-full"
                  style={{ width: 5, height: 5, background: T.silicon }}
                  aria-hidden="true"
                />
                Fin Brief (6)
              </span>
            </div>
          </div>

          {/* Agents section */}
          <div className="px-4 pt-3 pb-2">
            <div
              className="font-mono uppercase mb-2"
              style={{ color: T.ink50, fontSize: 10, letterSpacing: "0.16em" }}
            >
              [ agents · 6 ]
            </div>
          </div>
          <div className="flex-1 overflow-hidden px-2 space-y-0.5">
            {/* Selected agent: Briefing Maestro — bigger card */}
            <div
              className="border px-2.5 py-2.5 flex items-start gap-2.5"
              style={{
                background: `${T.silicon}1a`,
                borderColor: `${T.silicon}66`,
                borderRadius: 6,
              }}
            >
              <RingAvatar species="silicon" label="BM" size="md" />
              <div className="min-w-0 flex-1">
                <div
                  className="truncate"
                  style={{ color: T.ink, fontSize: 12, lineHeight: 1.25 }}
                >
                  Briefing Maestro
                </div>
                <div
                  className="flex items-center gap-1 mt-1 font-mono uppercase"
                  style={{ color: T.ink50, fontSize: 9, letterSpacing: "0.14em" }}
                >
                  <span
                    className="inline-block rounded-full"
                    style={{ width: 5, height: 5, background: T.warn }}
                    aria-hidden="true"
                  />
                  Active
                </div>
              </div>
            </div>

            {otherAgents.map((a) => (
              <div
                key={a.initials}
                className="px-2.5 py-2 flex items-center gap-2.5"
                style={{ borderRadius: 6 }}
              >
                <RingAvatar species="silicon" label={a.initials} size="sm" />
                <div className="min-w-0">
                  <div
                    className="truncate"
                    style={{ color: T.ink70, fontSize: 11.5 }}
                  >
                    {a.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="px-3 py-2 border-t space-y-0.5" style={{ borderColor: T.rule }}>
            <NavItem icon={<IconCloud />} label="Cloud" />
            <NavItem icon={<IconGrid />} label="Dashboard" />
            <NavItem icon={<IconSliders />} label="Settings" />
          </div>
          <div className="px-3 py-2 border-t space-y-0.5" style={{ borderColor: T.rule }}>
            <NavItem icon={<IconTrash />} label="Clear history" />
            <NavItem icon={<IconLogout />} label="Logout" />
          </div>

          {/* Footer */}
          <div
            className="px-3 py-2 border-t flex items-center gap-2 font-mono"
            style={{ borderColor: T.rule, color: T.ink30, fontSize: 9, letterSpacing: "0.08em" }}
          >
            <span>Powered by NetMind.AI</span>
            <span className="ml-auto">v1.7.8</span>
          </div>
        </aside>

        {/* ─────── CENTER CHAT ─────── */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Interaction header */}
          <div
            className="px-5 py-3 border-b flex items-center gap-2"
            style={{ borderColor: T.rule }}
          >
            <span
              className="inline-block rounded-full"
              style={{ width: 6, height: 6, background: T.ok }}
              aria-hidden="true"
            />
            <span
              className="font-mono uppercase"
              style={{ color: T.ink70, fontSize: 10, letterSpacing: "0.18em" }}
            >
              Interaction
            </span>
            <span
              className="font-mono"
              style={{ color: T.ink50, fontSize: 11, letterSpacing: "0.06em" }}
            >
              agent_e2ace957a084
            </span>
            <span className="ml-auto flex items-center gap-1 font-mono uppercase"
              style={{ color: T.ink50, fontSize: 9, letterSpacing: "0.18em" }}>
              <span className="inline-block rounded-full" style={{ width: 5, height: 5, background: T.ok }} aria-hidden="true" />
              Ready
            </span>
          </div>

          {/* Message thread */}
          <div className="flex-1 px-5 md:px-6 py-5 space-y-5 overflow-hidden">
            {/* User message — own bubble grammar (gray, 3px right edge) */}
            <div className="flex gap-3 flex-row-reverse">
              <RingAvatar species="carbon" label="NE" size="sm" />
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
                    Run today&rsquo;s briefing now.
                  </div>
                </div>
                <div
                  className="font-mono mt-1 text-right tabular-nums"
                  style={{ color: T.ink30, fontSize: 9, letterSpacing: "0.05em" }}
                >
                  11:25
                </div>
              </div>
            </div>

            {/* Assistant — silicon bubble grammar (tinted, 3px left edge) */}
            <div className="flex gap-3">
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
                    Coordinating five analysts. Holdings Watcher is up. Drafting the deep-read now.
                  </div>
                  <div
                    className="mt-3 pt-2.5 border-t flex items-center gap-1.5 font-mono uppercase"
                    style={{ borderColor: T.ruleAi, color: T.ink50, fontSize: 9, letterSpacing: "0.16em" }}
                  >
                    <IconSparkle s="w-2.5 h-2.5" />
                    View reasoning &amp; tools
                  </div>
                </div>

                {/* Artifact card */}
                <div
                  className="mt-2 inline-flex items-center gap-2.5 px-2.5 py-2"
                  style={{
                    background: T.bgAi,
                    border: `1px solid ${T.ruleAi}`,
                    borderRadius: 6,
                  }}
                >
                  <span
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 28,
                      height: 28,
                      background: T.bg3,
                      color: T.ink70,
                      borderRadius: 4,
                    }}
                  >
                    <IconFile />
                  </span>
                  <div className="min-w-0">
                    <div style={{ color: T.ink, fontSize: 11 }}>
                      briefing_2026-05-27.html
                    </div>
                    <div
                      className="font-mono uppercase"
                      style={{ color: T.ink30, fontSize: 8, letterSpacing: "0.16em" }}
                    >
                      Artifact · 8.2 KB · HTML
                    </div>
                  </div>
                </div>

                <div
                  className="font-mono mt-1 tabular-nums"
                  style={{ color: T.ink30, fontSize: 9, letterSpacing: "0.05em" }}
                >
                  11:26
                </div>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div
            className="px-5 py-3 border-t flex items-center gap-2"
            style={{ borderColor: T.rule }}
          >
            <span style={{ color: T.ink30 }}><IconPaperclip /></span>
            <span style={{ color: T.ink30 }}><IconMic /></span>
            <div
              className="flex-1 px-3 py-2"
              style={{
                background: T.bg2,
                border: `1px solid ${T.rule}`,
                color: T.ink30,
                fontSize: 12,
                borderRadius: 6,
              }}
            >
              Type your message…
            </div>
            <span
              className="flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                background: T.bg3,
                color: T.ink70,
                borderRadius: 6,
              }}
              aria-hidden="true"
            >
              <IconSend />
            </span>
          </div>
        </main>

        {/* ─────── RIGHT RAIL ─────── */}
        <aside
          className="hidden lg:flex w-[280px] shrink-0 flex-col border-l"
          style={{ borderColor: T.rule }}
        >
          {/* Top tabs (RUNTIME · CONFIG · INBOX) */}
          <div
            className="px-4 h-11 flex items-center gap-4 border-b"
            style={{ borderColor: T.rule }}
          >
            <TopTab active label="Runtime" icon={<IconActivity s="w-3 h-3" />} />
            <TopTab label="Config" icon={<IconSliders s="w-3 h-3" />} />
            <TopTab label="Inbox" icon={<IconBookOpen s="w-3 h-3" />} />
            <span className="ml-auto font-mono" style={{ color: T.warn, fontSize: 10, letterSpacing: "0.06em" }}>
              94.7k
            </span>
          </div>

          {/* Sub-tabs (EXECUTION · NARRATIVE) */}
          <div
            className="px-4 h-10 flex items-center gap-5 border-b"
            style={{ borderColor: T.rule }}
          >
            <SubTabAnimated active label="Execution" icon={<IconPlay s="w-2.5 h-2.5" />} />
            <SubTab label="Narrative" count="3" countColor={T.ink50} icon={<IconBookOpen s="w-2.5 h-2.5" />} />
          </div>

          {/* CONTENT — two layers fading between active and idle states */}
          <div className="flex-1 relative overflow-hidden">
            {/* Active state: stat strip + progress + steps (visible during cycle 0-83%) */}
            <div
              className="absolute inset-0 flex flex-col"
              style={{ animation: `mockup-active-fade ${CYCLE_S}s linear infinite` }}
            >
              {/* Stat strip */}
              <div className="grid grid-cols-3 border-b" style={{ borderColor: T.rule }}>
                <StatCell label="Done" color={T.ok}>
                  <span className="tabular-nums" style={{ color: T.ok, fontSize: 18 }}>
                    <CycleCount kind="doneCount" />
                  </span>
                </StatCell>
                <StatCell label="Run" color={T.warn} sep>
                  <span className="tabular-nums" style={{ color: T.warn, fontSize: 18 }}>
                    <CycleCount kind="runCount" />
                  </span>
                </StatCell>
                <StatCell label="Total" color={T.ink70}>
                  <span className="tabular-nums" style={{ color: T.ink70, fontSize: 18 }}>6</span>
                </StatCell>
              </div>

              {/* Progress bar */}
              <div className="relative h-[3px]" style={{ background: T.bg3 }}>
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    background: T.warn,
                    animation: `mockup-progress ${CYCLE_S}s linear infinite`,
                  }}
                />
              </div>

              {/* Step list */}
              <div className="flex-1 overflow-hidden p-3 space-y-1">
                {stepLabels.map((label, i) => (
                  <StepRow key={label} index={i} label={label} />
                ))}
              </div>
            </div>

            {/* Idle state: bracket empty state (visible during cycle 83-100%) */}
            <div
              className="absolute inset-0 flex items-center justify-center px-4"
              style={{
                animation: `mockup-idle-fade ${CYCLE_S}s linear infinite`,
                opacity: 0,
              }}
            >
              <div className="text-center">
                <div
                  className="font-mono uppercase"
                  style={{ color: T.ink50, fontSize: 11, letterSpacing: "0.2em" }}
                >
                  <span style={{ color: T.ink30 }}>[</span>
                  &nbsp;&nbsp;No active execution&nbsp;&nbsp;
                  <span style={{ color: T.ink30 }}>]</span>
                </div>
                <div
                  className="mt-3"
                  style={{ color: T.ink30, fontSize: 11, lineHeight: 1.5, maxWidth: 200, margin: "12px auto 0" }}
                >
                  Execution steps will appear here when the agent processes your request
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────────────────── */

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex items-center gap-2 px-2 py-1.5"
      style={{ color: T.ink70, fontSize: 11, borderRadius: 4 }}
    >
      <span style={{ color: T.ink50 }}>{icon}</span>
      <span className="font-mono uppercase" style={{ letterSpacing: "0.12em", fontSize: 10 }}>
        {label}
      </span>
    </div>
  );
}

function TopTab({
  active,
  label,
  icon,
}: {
  active?: boolean;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-1.5 py-3 -mb-px"
      style={{
        borderBottom: `2px solid ${active ? T.ink : "transparent"}`,
        color: active ? T.ink : T.ink50,
      }}
    >
      {icon}
      <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.16em" }}>
        {label}
      </span>
    </div>
  );
}

function SubTab({
  active,
  label,
  count,
  countColor,
  icon,
}: {
  active?: boolean;
  label: string;
  count: string;
  countColor: string;
  icon: React.ReactNode;
}) {
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
      <span className="font-mono tabular-nums" style={{ color: countColor, fontSize: 10 }}>
        · {count}
      </span>
    </div>
  );
}

function StatCell({
  label,
  color,
  sep,
  children,
}: {
  label: string;
  color: string;
  sep?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="px-3 py-2.5"
      style={{ borderRight: sep ? `1px solid ${T.rule}` : "none" }}
    >
      <div
        className="font-mono uppercase"
        style={{ color: T.ink50, fontSize: 9, letterSpacing: "0.18em" }}
      >
        {label}
      </div>
      <div style={{ color }}>{children}</div>
    </div>
  );
}

/* CycleCount — shows different numbers at different cycle phases.
 * Uses pre-generated module-level keyframes (named "mockup-{kind}-{i}").
 * All children stack via inline-grid (gridArea: 1/1) so the largest
 * value sizes the container.
 */
function CycleCount({ kind }: { kind: keyof typeof COUNT_VALUES }) {
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
      {/* hidden placeholder that gives the inline-block its layout width */}
      <span style={{ visibility: "hidden" }}>6</span>
    </span>
  );
}

/* Animated variant of SubTab that shows the running EXECUTION
 * count (uses the same doneCount cycle so visuals stay in sync
 * with the stat strip). */
function SubTabAnimated({
  active,
  label,
  icon,
}: {
  active?: boolean;
  label: string;
  icon: React.ReactNode;
}) {
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
      <span
        className="font-mono tabular-nums"
        style={{ color: T.warn, fontSize: 10, whiteSpace: "nowrap" }}
      >
        · <CycleCount kind="doneCount" />/6
      </span>
    </div>
  );
}

function StepRow({ index, label }: { index: number; label: string }) {
  return (
    <div
      className="relative flex items-center gap-2 px-2 py-1.5"
      style={{ fontSize: 11 }}
    >
      {/* Three icons stacked, only one visible at a time per cycle */}
      <span className="relative inline-flex items-center justify-center" style={{ width: 14, height: 14 }}>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            color: T.ink50,
            animation: `mockup-step-${index}-q ${CYCLE_S}s linear infinite`,
          }}
        >
          <IconCircle s="w-3 h-3" />
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            color: T.warn,
            opacity: 0,
            animation: `mockup-step-${index}-r ${CYCLE_S}s linear infinite`,
          }}
        >
          <IconSpinner s="w-3 h-3" />
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            color: T.ok,
            opacity: 0,
            animation: `mockup-step-${index}-d ${CYCLE_S}s linear infinite`,
          }}
        >
          <IconCheck s="w-3 h-3" />
        </span>
      </span>
      <span
        className="truncate flex-1"
        style={{ color: T.ink70 }}
      >
        {label}
      </span>
      {/* Status label slot — same three-overlay treatment */}
      <span className="relative inline-block font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.14em", minWidth: 50, textAlign: "right" }}>
        <span
          className="absolute inset-0 text-right"
          style={{
            color: T.ink50,
            animation: `mockup-step-${index}-q ${CYCLE_S}s linear infinite`,
          }}
        >
          Queued
        </span>
        <span
          className="absolute inset-0 text-right"
          style={{
            color: T.warn,
            opacity: 0,
            animation: `mockup-step-${index}-r ${CYCLE_S}s linear infinite`,
          }}
        >
          Running
        </span>
        <span
          className="absolute inset-0 text-right"
          style={{
            color: T.ok,
            opacity: 0,
            animation: `mockup-step-${index}-d ${CYCLE_S}s linear infinite`,
          }}
        >
          Done
        </span>
        <span style={{ opacity: 0 }}>Running</span>
      </span>
    </div>
  );
}
