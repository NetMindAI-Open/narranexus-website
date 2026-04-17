# NarraNexus Website

Marketing website, documentation hub, and blog for [NarraNexus](https://github.com/NetMindAI-Open/NarraNexus) — an open-source connected-agent framework.

Built with **Next.js 15**, **Tailwind CSS 4**, and **next-intl** for full internationalization.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) + CSS custom properties |
| i18n | [next-intl v4](https://next-intl-docs.vercel.app/) (7 locales) |
| Content | MDX via [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Search | [FlexSearch](https://github.com/nicBarbara/flexsearch) (client-side docs search) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) (dark/light) |
| Icons | [Lucide React](https://lucide.dev/) |

## Prerequisites

- **Node.js** 20+
- **npm** 10+

## Getting Started

```bash
# Clone the repo
git clone https://github.com/NetMindAI-Open/narranexus-website.git
cd narranexus-website

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
narranexus-website/
├── content/
│   ├── blog/en/              # Blog posts (MDX)
│   └── docs/en/              # Documentation (MDX)
│       ├── getting-started/
│       ├── core-concepts/
│       ├── modules/
│       ├── guides/
│       ├── api-reference/
│       └── contributing/
├── i18n/
│   ├── request.ts            # next-intl server config
│   └── routing.ts            # Locale routing config
├── messages/                  # UI translation strings
│   ├── en.json
│   ├── zh.json
│   ├── ja.json
│   ├── ko.json
│   ├── es.json
│   ├── fr.json
│   └── de.json
├── public/
│   └── images/               # Static assets (logo, OG image, showcase)
├── src/
│   ├── app/[locale]/         # Next.js App Router pages
│   │   ├── page.tsx          # Landing page
│   │   ├── blog/             # Blog listing & detail pages
│   │   └── docs/             # Docs layout & pages
│   ├── components/
│   │   ├── landing/          # Landing page sections
│   │   ├── layout/           # Navbar, footer, language switcher
│   │   ├── docs/             # Sidebar, TOC, search, pagination
│   │   ├── blog/             # Blog post card
│   │   └── ui/               # Shared UI (copy button, scroll reveal)
│   ├── lib/                  # Utilities (MDX compiler, docs/blog loaders)
│   ├── styles/globals.css    # Tailwind base + custom properties
│   └── middleware.ts         # Locale detection & routing
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

## Adding / Editing Content

### Documentation

Docs live in `content/docs/en/` as MDX files. Each file needs frontmatter:

```mdx
---
title: Page Title
description: Short description for SEO
order: 0
---

Your markdown content here...
```

- **Sections** are folders (e.g. `getting-started/`, `modules/`).
- **Order** controls sidebar sort order within a section (lower = higher).
- Docs support GitHub Flavored Markdown, auto-linked headings, and code highlighting.

### Blog Posts

Blog posts live in `content/blog/en/` as MDX files:

```mdx
---
title: "Post Title"
date: "2026-01-15"
author: "Author Name"
excerpt: "Short summary"
tags: ["release", "update"]
---

Post content...
```

### Showcase Images

Place screenshots or GIFs in `public/images/showcase/`. Reference them in `src/components/landing/demo-showcase.tsx`.

## Internationalization (i18n)

The site supports 7 locales: **English** (default), **Chinese**, **Japanese**, **Korean**, **Spanish**, **French**, **German**.

- **UI strings**: Edit JSON files in `messages/` (e.g. `messages/zh.json`).
- **Locale routing**: English is the default and has no URL prefix. Other locales use a prefix (e.g. `/zh/docs/...`).
- **Docs/blog content**: Currently English only. To add translations, create parallel folder structures (e.g. `content/docs/zh/`).

### Adding a New Locale

1. Add the locale code to the `locales` array in `i18n/routing.ts`
2. Create a new translation file in `messages/` (e.g. `messages/pt.json`)
3. The locale will be automatically available in the language switcher

## Theming

The site uses a dark theme by default with a light mode toggle. Theme colors are defined as CSS custom properties in `src/styles/globals.css`:

- `--color-accent` — primary accent color (cyan)
- `--color-foreground` / `--color-background` — text and background
- `--color-muted` — secondary text

To modify the color scheme, edit the CSS custom properties in `globals.css`.

## Landing Page Sections

The landing page is assembled in `src/app/[locale]/page.tsx` with these sections (in order):

1. **Hero** — Particle network background, headline, CTA buttons
2. **Quick Start** — OS-tabbed install instructions (Linux CLI / macOS DMG)
3. **Features** — 6-card grid of key capabilities
4. **Architecture** — System architecture overview
5. **Demo Showcase** — Tabbed screenshot/GIF gallery
6. **Testimonials** — Community section with GitHub star CTA
7. **Roadmap** — Development timeline
8. **Team** — Built-by credits

To reorder, add, or remove sections, edit `page.tsx`.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js — no extra config needed
4. Set up your custom domain if desired

### Other Platforms

```bash
npm run build
npm run start
```

The build output is in `.next/`. Any platform that supports Node.js can serve it.

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-change`
3. Make your changes
4. Run `npm run build` to verify the build passes
5. Commit and push
6. Open a pull request

## License

This website is part of the [NarraNexus](https://github.com/NetMindAI-Open/NarraNexus) project. See the main repo for license details.
