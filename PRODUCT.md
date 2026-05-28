# Product

## Register

brand

## Users

The primary visitor is a **mainstream, non-technical person** who has heard about NarraNexus and wants to try it the way they'd try a consumer app. They scan, they don't read. They want to know within one scroll whether this is for them and whether they can get going in a minute.

A secondary audience exists — **technical builders** (devs, AI engineers, founders evaluating an OSS framework). They are served by `/docs`, `/blog`, `/templates`, and GitHub. The homepage should not optimize for them at the cost of clarity for the primary audience.

The user's job-to-be-done on the homepage:

1. Understand in one glance what NarraNexus actually is.
2. See, concretely, what it would be used for.
3. Click into "try it" with confidence that it'll be quick.

## Product Purpose

NarraNexus is an open-source, ready-to-run team of agents — agents that already remember, collaborate, and use tools. The product is not a framework you wire up; it is a working team you import and start talking to.

The marketing site exists to convert curious visitors into active users. Success is measured in clicks into the cloud app, downloads of the macOS build, and invite requests — not page views or scroll depth. Every section earns its place by advancing someone toward trying the product. Sections that explain internals belong in `/docs`, not on the homepage.

## Brand Personality

**Confident, approachable, editorial.**

The visual identity is intentionally not a generic AI-startup look — it borrows from technical magazines and newspapers: paper-and-ink palette, Space Grotesk display, Inter body, DM Mono micro-labels, sharp edges, hairline rules, gap-px grid lines. That identity stays. It is the distinguishing surface and is aligned with the `internal.netmind.foundation` parent brand.

What softens for the mainstream audience is **the voice**, not the visuals. Copy is plain-spoken, concrete, and free of internal jargon. Where the previous site said "narrative-driven agent architectures," the new site says "remembers what you told it last Tuesday."

Three-word personality: **confident, plain, distinctive**.

## Anti-references

Explicitly reject:

- **Generic AI-startup SaaS aesthetic.** Gradient heroes, glossy cards with subtle shadows, Stripe-y radial backgrounds, hero metric templates, blue-purple gradient text. The category reflex. Every AI tool launched in 2025–2026 looks like this.
- **Consumer-app pastel cliché.** Notion-cream + soft pink, friendly-but-bland rounded cards, lifestyle photography, smiling stock illustrations. The easy answer to "make it approachable" — and the wrong one.

Also avoid (carry-over discipline):

- Dev-tool framework marketing (dense code snippets above the fold, "for builders by builders" copy). The product is not a framework.
- AI sci-fi (dark mode + neon + glassmorphism). Wrong tone for "a warm friend" use cases.

## Design Principles

1. **Activation over architecture.** Every homepage section advances someone toward trying the product. Internals — modules, pipelines, layered stacks — live in `/docs`. The homepage is for conversion.
2. **Concrete over abstract.** "Daily morning briefings" beats "narrative memory engine." Show what the product does in the visitor's life, before naming what's under the hood.
3. **Editorial discipline, plain-spoken voice.** The visual identity stays sharp, confident, magazine-like. The copy gets warmer and simpler. Never mistake softer language for a softer brand.
4. **One idea per screen.** Three concise messages beat a wall of features. If a section needs nested sub-headings to make its point, it's too much.
5. **Confidence without hype.** No breathless adjectives, no superlatives, no "revolutionary" / "next-generation" / "AI-powered." The work speaks for itself. Mono uppercase eyebrows over exclamation points.

## Accessibility & Inclusion

WCAG 2.1 AA as the baseline:

- Color contrast meets AA on both `text-ink` on `paper` (primary) and `text-muted` on `paper` (secondary).
- Semantic HTML — `<section>`, `<h2>`, `<dl>` / `<dt>` / `<dd>` for FAQ, `<ol>` for timeline.
- Keyboard navigation works everywhere. Focus-visible ring is already wired in `globals.css`.
- `prefers-reduced-motion` already respected globally; keep any new animation behind that gate.
- No information conveyed by color alone.

Standard care, not a strategic focus area — but never an afterthought.
