# nahuelborromeo.com — Roadmap

## Vision

A personal portfolio that convinces an international recruiter in under one minute
that Nahuel Borromeo is an iOS Engineer who ships production apps — with banking
experience as the proof, not the label. Entirely in English.

**Audience:** international recruiters at remote-first companies (US/Europe). They
skim; the site must deliver its message fast and let deeper readers (technical
hiring managers) find substance in the case studies and blog.

**Positioning:** iOS Engineer. Fintech/banking experience is presented as evidence
of production rigor, not as a niche he is locked into.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Astro 5, fully static output |
| Styling | Tailwind CSS v4, CSS custom properties for theme tokens |
| Content | Astro content collections (markdown) |
| Interactivity | Vanilla JS only (theme toggle). No React/Vue islands in Phase 1 |
| Fonts | System font stack (SF Pro on Apple devices, zero webfont payload) |
| Hosting | Vercel (free tier), auto-deploy from GitHub |
| Domain | nahuelborromeo.com (~$12/year — the only running cost) |

## Design direction

Apple-like refined minimalism:

- Large, confident typography; generous whitespace; tight tracking on headlines.
- Neutral palette (white/near-black/grays) with a single accent: **iOS blue**
  (`#0071e3` light mode, `#0A84FF` dark mode).
- Dark/light mode: follows `prefers-color-scheme` by default, manual toggle
  persisted in `localStorage`, no flash-of-wrong-theme (inline head script).
- Subtle micro-interactions only (hover states, gentle fade/slide on scroll).
  No heavy animation, no 3D.
- The site itself is a design credential: an iOS engineer whose site feels like
  Apple made it.

## Site structure

```
/                  Home (single page, sections below)
/blog              Post index, grouped/filterable by series
/blog/[slug]       Individual post
/rss.xml           RSS feed
/sitemap-index.xml Sitemap (auto)
/404               Not found page
/cv.pdf            Downloadable CV (static asset)
```

### Home layout

```
┌──────────────────────────────────────────────┐
│ Nav: [NB]      About Experience Blog  [◐]    │  sticky, blurred bg
├──────────────────────────────────────────────┤
│  HERO                                        │
│  [photo]  Nahuel Borromeo                    │
│           iOS Engineer                       │
│           One-liner (production banking      │
│           apps, Swift/UIKit/SwiftUI)         │
│           [Email] [LinkedIn] [GitHub] [CV ↓] │
├──────────────────────────────────────────────┤
│  EXPERIENCE — case-study cards               │
│  NTT Data · Baufest/MODO · earlier roles     │
│  (impact bullets, not task lists)            │
├──────────────────────────────────────────────┤
│  SKILLS — grouped: iOS / Architecture /      │
│  Tools / Web                                 │
├──────────────────────────────────────────────┤
│  ABOUT — short, human, 2-3 sentences         │
├──────────────────────────────────────────────┤
│  LATEST POSTS — 3 most recent, link to /blog │
├──────────────────────────────────────────────┤
│  FOOTER — email, LinkedIn, GitHub, RSS, ©    │
└──────────────────────────────────────────────┘
```

Nav links scroll smoothly to home sections; Blog navigates to `/blog`.
Adding a new top-level section = new page + one nav entry (see
`docs/user/writing-content.md`).

## Blog

- Single blog, posts written in **English**.
- Posts can belong to a **series**; first series: **"Become a better iOS engineer"**
  (notes from Nahuel's personal study roadmap).
- `/blog` groups posts by series with an "All posts" view; each post page shows a
  series banner with prev/next navigation within the series.
- `draft: true` posts are excluded from builds.
- RSS feed and sitemap included from day one.

## UX behaviors

- Theme: auto (system) → manual toggle cycles light/dark, persisted; the inline
  script in `<head>` applies the theme class before first paint.
- Smooth scroll for in-page anchors; respects `prefers-reduced-motion`.
- All interactive elements keyboard-accessible with visible focus rings.
- Lighthouse targets: ≥95 in all four categories; performance 100 is realistic
  for a static site with system fonts.
- Experience entries follow the case-study formula: context (1 line) → what he
  built → impact. Client of NTT Data stays anonymous ("a large-scale banking app")
  per NDA; MODO/BBVA Argentina can be named.

## Phase 1 — MVP (numbered implementation order)

1. **Scaffold** — `npm create astro@latest` (TypeScript strict), add Tailwind v4,
   git init + GitHub repo, `.gitignore`, README stub.
2. **Design system foundation** — theme tokens (colors light/dark, type scale,
   spacing) as CSS custom properties; `BaseLayout.astro` (head, meta, theme
   script); Nav with theme toggle; Footer.
3. **Hero section** — photo, name, title, one-liner, CTA row (Email, LinkedIn,
   GitHub, Download CV). Copy from `docs/knowledge/content.md`.
4. **Experience section** — case-study cards for NTT Data, Baufest/MODO, Yobel,
   Bachatours freelance. Copy from `docs/knowledge/content.md`.
5. **Skills + About sections** — grouped skills grid; short about paragraph.
6. **Blog collection** — content collection + zod schema (`title, description,
   pubDate, series?, tags?, draft?`); `/blog` index grouped by series; write the
   first real post (kickoff of "Become a better iOS engineer").
7. **Post page** — `/blog/[slug]` with prose styling (Tailwind typography),
   series banner, prev/next within series.
8. **Latest posts on home** — 3 most recent non-draft posts.
9. **SEO & feeds** — per-page title/description, Open Graph + Twitter meta,
   static OG image, canonical URLs, RSS, sitemap, robots.txt, 404 page.
10. **Assets & polish** — LinkedIn photo (optimized), `cv.pdf`, favicon set;
    accessibility pass (contrast, focus, landmarks, alt text); Lighthouse ≥95.
11. **Deploy** — push to GitHub, connect Vercel, configure `nahuelborromeo.com`,
    smoke-test production (both themes, mobile, RSS, CV download).

## Phase 2 — when material exists

- **Projects section** — new `projects` content collection + `/projects` page for
  public GitHub repos and App Store apps. The nav and content-collection pattern
  from Phase 1 make this additive.
- Additional blog series beyond the iOS roadmap.
- Vercel Analytics (free tier) if traffic insight becomes interesting.
- Automated OG images per blog post.

## Future exploration (not planned)

- Case-study deep-dive pages per role.
- Talks/appearances section.

## Non-goals

- No contact form (mailto + LinkedIn convert fine; forms need backend/anti-spam).
- No CMS (markdown in the repo is the CMS).
- No Spanish/i18n version (audience is international; English only).
- No 3D/heavy animation (distracts from content, hurts performance).
- No comments or newsletter on the blog.

## Content update policy

The CV facts on the site supersede the PDF CV where they differ. Current truth:
Nahuel is proficient in **SwiftUI** (not "learning"), and **Phase 2 of the
investments module at NTT Data has shipped**. See `docs/knowledge/content.md`.
