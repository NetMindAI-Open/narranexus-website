---
name: NarraNexus Marketing Site
description: Editorial paper-and-ink design system for an open-source agent platform.
colors:
  newsprint-paper: "#e8eaed"
  pressroom-grey: "#dde0e4"
  plate-grey: "#d2d5da"
  press-ink: "#111214"
  halftone-grey: "#60656f"
  halftone-grey-deep: "#3d4149"
  linotype-blue: "#334dff"
  hairline-rule: "#1112141a"
  hairline-rule-soft: "#1112140f"
typography:
  display:
    fontFamily: "Space Grotesk, Inter, system-ui, sans-serif"
    fontSize: "clamp(36px, 5.5vw, 64px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-1.5px"
  headline:
    fontFamily: "Space Grotesk, Inter, system-ui, sans-serif"
    fontSize: "clamp(24px, 3.5vw, 36px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.5px"
  title:
    fontFamily: "Space Grotesk, Inter, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.2px"
  body:
    fontFamily: "Inter, Barlow, -apple-system, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 300
    lineHeight: 1.8
    letterSpacing: "normal"
  body-small:
    fontFamily: "Inter, Barlow, -apple-system, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 300
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "DM Mono, JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.16em"
rounded:
  none: "0"
spacing:
  hairline: "1px"
  gutter: "24px"
  card-pad-tight: "24px"
  card-pad: "32px"
  section-y-tight: "64px"
  section-y: "80px"
  container: "1400px"
components:
  button-primary:
    backgroundColor: "{colors.press-ink}"
    textColor: "{colors.newsprint-paper}"
    rounded: "{rounded.none}"
    padding: "10px 24px"
    typography: "{typography.body-small}"
  button-primary-hover:
    backgroundColor: "{colors.halftone-grey}"
    textColor: "{colors.newsprint-paper}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.press-ink}"
    rounded: "{rounded.none}"
    padding: "10px 24px"
    typography: "{typography.body-small}"
  button-outline-hover:
    backgroundColor: "{colors.press-ink}"
    textColor: "{colors.newsprint-paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.halftone-grey}"
    rounded: "{rounded.none}"
    padding: "10px 24px"
    typography: "{typography.body-small}"
  button-ghost-hover:
    textColor: "{colors.press-ink}"
  card:
    backgroundColor: "{colors.newsprint-paper}"
    rounded: "{rounded.none}"
    padding: "32px"
  eyebrow:
    typography: "{typography.label}"
    textColor: "{colors.halftone-grey}"
  nav-link:
    textColor: "{colors.halftone-grey}"
    typography: "{typography.body-small}"
  nav-link-hover:
    textColor: "{colors.press-ink}"
  nav-link-active:
    textColor: "{colors.press-ink}"
  hr-rule:
    backgroundColor: "{colors.hairline-rule}"
    height: "1px"
---

# Design System: NarraNexus Marketing Site

## 1. Overview

**Creative North Star: "The Editorial Workshop"**

This is a publication that happens to be a website. The vocabulary is borrowed from broadsheet newspapers and technical magazines: paper and ink, hairline rules, mono micro-labels, eyebrow dashes, `gap-px` grid lines that look like letterpress kerning. Every section reads like a column; every card is a clipping. The reader is invited to scan, not to interpret a UI.

The brand voice this serves is *confident, plain, distinctive*. The visual system carries the confidence; the copy carries the plainness; together they produce something that doesn't look like another AI-startup landing page. That distance is intentional. The category reflex — gradient hero, glossy cards, Stripe-y blue-purple radials — is the *thing this rejects*. So is the consumer-app pastel cliché (Notion-cream + soft pink, lifestyle photography). NarraNexus chose editorial over either, on purpose.

Aligned with the `internal.netmind.foundation` parent brand: Space Grotesk display, Inter body, DM Mono micro-labels, a paper-and-ink palette, sharp corners globally. Sibling NetMind surfaces share these tokens.

**Key Characteristics:**
- Paper-and-ink palette: warm-tinted cool neutrals + one electric blue, used sparingly
- Editorial typography: Space Grotesk display, Inter body, DM Mono labels
- Sharp corners globally; `border-radius: 0 !important` is a project-wide rule
- Hairline rules and layered neutrals provide all depth; no shadows exist
- Mono uppercase micro-labels (eyebrows, tags, dates) carry rhythm
- A 72-pixel grid texture sits at 4% opacity behind every page

## 2. Colors: The Newsroom Palette

A small, decisive palette. Cool tinted neutrals running paper → ink, with one electric blue held strictly in reserve. The system never asks color to do the work of typography or composition.

### Primary
- **Press Ink** (`#111214`): primary text, primary button fill, the negative half of every diagram. Used wherever a confident, terminal punctuation mark is needed.

### Secondary
- **Linotype Blue** (`#334dff`): an electric blue held in reserve for technical emphasis — architecture-layer tints, data visualization. Never lifestyle, never decorative, never a gradient. Appears far more often at `/8` – `/30` alpha than at full strength.

### Neutral
- **Newsprint Paper** (`#e8eaed`): the primary canvas. A warm-cool grey paper, never `#ffffff`. Every page sits on this.
- **Pressroom Grey** (`#dde0e4`): one tonal step deeper. Layered surfaces — nested panels, code blocks, callout backgrounds — when separation is needed without a border.
- **Plate Grey** (`#d2d5da`): two tonal steps deeper. The rare third layer.
- **Halftone Grey** (`#60656f`): all secondary text, all mono labels, all muted UI. The voice of secondary information.
- **Halftone Grey Deep** (`#3d4149`): when secondary text needs more weight than `Halftone Grey` provides. Used very sparingly.
- **Hairline Rule** (`#1112141a` / `rgba(17,18,20,0.10)`): the 1px divider color. Section breaks, card-gap fills, table dividers. The most-drawn line in the system.
- **Hairline Rule Soft** (`#1112140f` / `rgba(17,18,20,0.06)`): the same line at lower contrast for sub-dividers inside dense layouts.

### Named Rules

**The Ink-or-Blue Rule.** Emphasis is binary. `Press Ink` is for confidence and finality. `Linotype Blue` is for technical specificity. Never both in the same composition.

**The One-Tenth Blue Rule.** `Linotype Blue` may carry no more than ~10% of a screen at full strength. Larger surface uses appear only as `/8` – `/30` alpha washes (e.g. architecture-layer tinting) so the blue stays punctuation, not fill.

**The No-True-White Rule.** `#ffffff` is forbidden. The paper is always slightly warm-cool grey. Equivalent for ink: `#000000` is forbidden; the ink is `#111214`.

## 3. Typography

**Display Font:** Space Grotesk (with Inter as fallback)
**Body Font:** Inter (with Barlow as secondary fallback, then system sans)
**Label / Mono Font:** DM Mono (with JetBrains Mono fallback)

**Character.** A modern grotesque (Space Grotesk) does the headlines — geometric but humanist, confident without being severe. Inter handles every paragraph and UI label that isn't shouting. DM Mono is the editorial micro-voice: eyebrows, step numbers, date stamps, all uppercase, all generously tracked. The pairing reads as a technical magazine, not a startup landing page.

### Hierarchy

- **Display** (Space Grotesk 700, `clamp(36px, 5.5vw, 64px)`, line-height 1.08, tracking -1.5px): hero headline only. One per page.
- **Headline** (Space Grotesk 700, `clamp(24px, 3.5vw, 36px)`, line-height 1.15, tracking -0.5px): section `<h2>`. Carried by the `sectionHeading` token in `app/page.tsx`.
- **Title** (Space Grotesk 700, 20px, line-height 1.3): card and component headings.
- **Body** (Inter 300, 15px, line-height 1.8, max width ~65–75ch / `max-w-2xl`–`max-w-3xl`): all paragraphs. Light weight + open leading is the editorial signal.
- **Body Small** (Inter 300, 14px, line-height ~1.65, color `Halftone Grey`): supporting copy inside cards and FAQ answers.
- **Label** (DM Mono 400, 10–11px, tracking 0.16em via `tracking-widest`, uppercase, color `Halftone Grey`): every eyebrow, every micro-tag, every date stamp. The most-repeated motif in the system.

### Named Rules

**The Eyebrow Rule.** Every full-width section opens with a horizontal hairline `w-8 h-px bg-ink` followed by a mono uppercase eyebrow (`font-mono text-[11px] uppercase tracking-widest text-muted`). The dash + label is the section's seal — non-negotiable.

**The 300-Weight Body Rule.** Body copy is Inter 300. Inter 400 looks too heavy against Space Grotesk 700; Inter 500 looks like Material Design. The weight gap between body (300) and headline (700) is what gives the page its editorial quiet.

**The Mono-for-Micro Rule.** Anything that wants to whisper goes into DM Mono uppercase — never smaller sans, never italic, never a brighter color. Italics are forbidden by default; mono is the system's italic.

## 4. Elevation

The system is completely flat. There are no `box-shadow` values defined and none in use. Depth, where needed, comes from three sources:

1. **Hairline rules.** 1px lines in `Hairline Rule` color separate sections, divide cards, and break content rows.
2. **Layered neutrals.** `Newsprint Paper` → `Pressroom Grey` → `Plate Grey` provides three legible surface levels without ever calling on a shadow.
3. **The gap-px trick.** Card grids set `gap-px` over a `bg-rule` parent background; each card uses `bg-paper`. The negative space between cards IS the divider — letterpress-style.

A 72-pixel grid texture (drawn in `body::before`) sits at 4% opacity behind everything, reinforcing the editorial-page-grid feel without ever being explicit.

### Named Rules

**The Flat-By-Default Rule.** Surfaces do not lift. Hover does not raise. Focus does not glow softly. Where lift would be the reflex, change a color, change a weight, or add a hairline rule. Box-shadows are prohibited.

**The Gap-Is-The-Rule Rule.** When dividing cards in a grid, use `gap-px` over a `bg-rule` parent. Never put borders on the cards themselves; the negative space does the work.

## 5. Components

### Buttons

- **Shape:** Sharp rectangles (`border-radius: 0`, globally enforced). No exceptions.
- **Padding:** `px-6 py-2.5` (24px × 10px) for surface buttons; `px-4 py-1.5` for header-condensed.
- **Primary** (`button-primary`): `Press Ink` fill, `Newsprint Paper` text, Inter 400 14px. Hover: fill shifts to `Halftone Grey` (the muted color, not a lighter ink) — counterintuitive but correct, it reads as *press* rather than *wash*.
- **Outline** (`button-outline`): transparent fill, `Press Ink` 1px border, `Press Ink` text. Hover: fills with `Press Ink`, text inverts to `Newsprint Paper`. The system's most-used secondary action.
- **Ghost** (`button-ghost`): transparent fill, `Hairline Rule` 1px border, `Halftone Grey` text. Hover: border darkens to `Press Ink`, text darkens to `Press Ink`. Reserved for tertiary actions (GitHub link, etc.).
- **No icons inside buttons by default.** Where an arrow is needed, use the literal `&rarr;` glyph with `group-hover:translate-x-0.5`.

### Cards / Containers

- **Corner Style:** Sharp (`border-radius: 0`).
- **Background:** `Newsprint Paper` (`bg-paper`) inside a `gap-px bg-rule` grid container (see Elevation rule). No individual card borders.
- **Shadow Strategy:** None. Cards do not lift.
- **Internal Padding:** `p-6 md:p-8` (24px → 32px). Roomy but not luxurious.
- **Content order:** optional icon (24px stroke, `Press Ink`) → optional mono eyebrow → title (Space Grotesk 700, 18–20px) → body (Inter 300, 14–15px, `Halftone Grey`) → optional mono micro-tag at the bottom, separated by a `border-t border-rule` rule.

### Eyebrow (Signature Component)

The opening seal of every section: a horizontal dash + uppercase mono label.

```
<span class="w-8 h-px bg-ink"/>
<span class="font-mono text-[11px] uppercase tracking-widest text-muted">SECTION LABEL</span>
```

Mandatory at the top of every full-width section. The dash is non-negotiable.

### Horizontal Rules

`<hr class="border-rule max-w-[1400px] mx-auto" />` between every full-width section. Hairline, content-width, never inside cards.

### Navigation

- **Style:** Inter 400 14px (`text-sm font-400`), `Halftone Grey` default, `Press Ink` on hover and active.
- **Active state:** color shift only — no background, no underline, no marker.
- **Mobile:** A drawer with `transition-[max-height] duration-300 ease-out` (the only animation on a layout property, justified by being a discrete open/close). Each link has a `border-b border-rule` divider, keeping the editorial-page-grid on mobile.

### Timeline (Roadmap)

A vertical line in `Hairline Rule` color, with **2.5×2.5px square dots** (never circles — sharp corners globally), each labeled by mono date stamp, version, and Space Grotesk title. Shipped milestones use solid `Press Ink` dots; future use outline-only on `Newsprint Paper`.

## 6. Do's and Don'ts

### Do
- **Do** open every section with the dash-and-eyebrow opener (1px dash + mono uppercase label in `Halftone Grey`).
- **Do** divide cards with `gap-px` over a `bg-rule` parent. The negative space is the divider.
- **Do** keep body copy at Inter 300, 15px, line-height 1.8. The editorial signal lives in the weight + leading.
- **Do** confine `Linotype Blue` to technical-emphasis surfaces (architecture diagrams, data viz). At full strength it stays under 10% of a screen.
- **Do** use mono uppercase labels (DM Mono, `tracking-widest`) for every micro-voice: eyebrows, step numbers, date stamps, tags.
- **Do** prefer hairline rules and tonal layering for depth.
- **Do** match what the PDF asked for: concise three-block layouts where the format earns its place. The 3-card pattern is a tool, not a default.

### Don't
- **Don't use generic AI-startup SaaS aesthetic.** No gradient heroes, no glossy cards with subtle shadows, no Stripe-y radial backgrounds, no hero-metric templates, no blue-purple gradient text. The category reflex. (PRODUCT.md anti-reference.)
- **Don't use consumer-app pastel cliché.** No Notion-cream + soft pink, no friendly-but-bland rounded cards, no lifestyle photography, no smiling stock illustrations. The easy answer to "approachable" and the wrong one. (PRODUCT.md anti-reference.)
- **Don't use dev-tool framework marketing.** No dense code snippets above the fold, no "for builders by builders" copy. The product is not a framework. (PRODUCT.md anti-reference.)
- **Don't use AI sci-fi.** No dark mode + neon + glassmorphism. Wrong tone for "a warm friend" use cases. (PRODUCT.md anti-reference.)
- **Don't use `#ffffff` or `#000000`.** Paper is always `#e8eaed`. Ink is always `#111214`.
- **Don't use `border-radius`.** Globally banned via `* { border-radius: 0 !important }`. If a corner needs softening, the answer is more whitespace, not more radius.
- **Don't use box-shadows.** The Flat-By-Default Rule. Use hairline rules or layered neutrals.
- **Don't use side-stripe borders.** No `border-left: 4px solid` accents on cards or alerts. Use a full hairline border, a tonal background, a leading number, or nothing.
- **Don't use gradient text.** `background-clip: text` on a gradient is forbidden. Solid color; emphasis via weight or size.
- **Don't use em dashes.** Use commas, colons, semicolons, periods, or parentheses. Also banned: `--` as a substitute.
- **Don't add icons just to fill space.** 24px stroke icons are allowed in cards where they advance scanability (per PDF: "小白看图也能明白"). Decorative icons are not.
- **Don't add Layout / Motion / Responsive top-level sections to this file.** Fold that content into Overview (philosophy) or Components (per-component behavior).
