# Architecture

Static site. No backend, no database, no client framework. Astro renders
everything to HTML at build time; the only client JS is the theme toggle.

## System diagram

```
 markdown content          Astro build (Vercel)            visitor
┌──────────────────┐      ┌─────────────────────┐      ┌─────────────┐
│ src/content/blog │──┐   │ pages + components   │      │ static HTML │
│   *.md (posts)   │  ├──▶│ → HTML/CSS + tiny JS │─────▶│ + CSS       │
│ docs/knowledge/  │  │   │ → rss.xml, sitemap   │ CDN  │ + theme JS  │
│   content.md ★   │──┘   └─────────────────────┘      └─────────────┘
└──────────────────┘
★ copy source: hardcoded into components at build time, not read dynamically
```

Deploy flow: push to `main` on GitHub → Vercel builds `astro build` → CDN.
Branch pushes get preview URLs.

## File structure (target)

```
/
├── astro.config.mjs         # site: https://nahuelborromeo.com, sitemap, rss
├── src/
│   ├── content.config.ts    # blog collection schema (zod)
│   ├── content/
│   │   └── blog/            # one .md per post
│   ├── layouts/
│   │   ├── BaseLayout.astro # <head>, meta/OG, theme script, Nav, Footer
│   │   └── PostLayout.astro # prose styling, series banner, prev/next
│   ├── components/
│   │   ├── Nav.astro        # sticky, blurred; ThemeToggle inside
│   │   ├── ThemeToggle.astro
│   │   ├── Hero.astro
│   │   ├── ExperienceCard.astro
│   │   ├── SkillsGrid.astro
│   │   ├── PostCard.astro
│   │   └── Footer.astro
│   ├── pages/
│   │   ├── index.astro      # Hero, Experience, Skills, About, LatestPosts
│   │   ├── blog/
│   │   │   ├── index.astro  # grouped by series + all posts
│   │   │   └── [slug].astro
│   │   ├── rss.xml.js
│   │   └── 404.astro
│   ├── styles/global.css    # Tailwind + theme tokens (custom properties)
│   └── assets/              # photo, processed images
├── public/
│   ├── cv.pdf
│   ├── og-default.png
│   └── favicon.svg (+ pngs)
└── docs/                    # design docs (this folder)
```

## Blog data model

```ts
// src/content.config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),        // used for meta + post cards
    pubDate: z.coerce.date(),
    series: z.string().optional(),  // e.g. "Become a better iOS engineer"
    order: z.number().optional(),   // position within the series
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

Behavior rules:
- `draft: true` → excluded everywhere (index, series, RSS, sitemap).
- Series prev/next: sort by `order` if present, else by `pubDate`.
- `/blog` shows series as titled groups, then undated "All posts" list.
- Phase 2 `projects` collection follows the same pattern.

## Theming

- Tokens as CSS custom properties on `:root` / `.dark` in `global.css`
  (bg, surface, text, text-secondary, accent, border).
- Palette: light bg `#ffffff`, text `#1d1d1f`, secondary `#6e6e73`, accent
  `#0071e3`; dark bg `#000000`, surface `#1c1c1e`, text `#f5f5f7`, accent
  `#0A84FF`.
- Inline script in `<head>` (before CSS paint): read `localStorage.theme`,
  fall back to `matchMedia("(prefers-color-scheme: dark)")`, set `.dark` on
  `<html>`. Toggle writes `localStorage` and flips the class.
- Font stack: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI",
  Roboto, Helvetica, Arial, sans-serif`.

## Key scenarios

- **First visit, dark-mode Mac:** head script sets `.dark` pre-paint → no flash.
- **Adding a post:** drop `src/content/blog/my-post.md` with frontmatter → push
  → live. No code changes.
- **Adding a section/tab:** new page in `src/pages/` (or new collection) + one
  entry in the Nav links array. Documented in `docs/user/writing-content.md`.
- **Empty blog at launch:** ship with at least the series-kickoff post so the
  section never looks abandoned; LatestPosts hides itself if no posts.
- **404:** styled page with links back to home and blog.

## Performance & a11y guardrails

- No webfonts, no client framework, images via `astro:assets` (AVIF/WebP,
  explicit dimensions), Lighthouse ≥95 all categories.
- Honor `prefers-reduced-motion` for scroll/entrance animations.
- Semantic landmarks (`header/main/section/footer`), visible focus rings,
  contrast AA in both themes.
