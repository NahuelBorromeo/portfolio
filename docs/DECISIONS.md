# Design decisions

Settled during the design session on 2026-07-05. Do not re-litigate; append new
decisions below with the same format.

## 1. Greenfield personal portfolio, in English
Site language is English because the audience is international recruiters.
Conversation/docs with Nahuel can be in Spanish; site content never.

## 2. Domain: nahuelborromeo.dev
Buy the domain (~$12/year, the only running cost). `.dev` signals developer,
forces HTTPS. Rejected: free `*.github.io`/`*.vercel.app` subdomains (less
professional), `.com` (less developer-native), short variants like `nahuel.dev`
(likely taken, less recognizable).

## 3. Hosting: Vercel free tier
Auto-deploy on push, per-branch previews, free SSL on custom domain. Rejected:
Netlify (equivalent, no differentiator), GitHub Pages (needs Actions setup for
Astro). Budget constraint: $0/month hosting.

## 4. Audience: international recruiters (remote-first US/Europe)
They skim in <60 seconds. Layout leads with impact; technical depth lives in
case-study bullets and the blog for hiring managers who dig.

## 5. Positioning: "iOS Engineer" — not "fintech iOS Engineer"
Nahuel doesn't want to be locked to fintech. Banking experience is presented as
evidence of production rigor, not as the identity.

## 6. Framework: Astro
Static HTML output (Lighthouse ~100), JSX-like syntax he already reads, and
content collections make future sections/posts markdown files. Rejected:
Next.js (app framework for a 2-page site), vanilla HTML (no content model for
the blog), Ignite/Swift (immature ecosystem; recruiters never see source).
Nahuel allowed any tech (React, Vue, Three.js) — we deliberately keep Phase 1
zero-framework for performance and simplicity.

## 7. Styling: Tailwind CSS v4 + CSS custom properties for theme tokens
Fast iteration, consistent tokens, industry standard. Rejected: pure CSS (more
manual responsive/consistency work).

## 8. Blog: single section with series (not two tabs)
One "Blog" where posts carry an optional `series` field; "Become a better iOS
engineer" is the first series (his study-roadmap notes). Rejected: separate
"Become a better iOS" tab (two places to maintain; series scale better).

## 9. Blog posts in English
Consistent with site and audience; doubles as written-English practice.
Rejected: Spanish (recruiters can't evaluate it), mixed (inconsistent feel).

## 10. Aesthetic: Apple-like refined minimalism
Large typography, whitespace, subtle motion, dark/light mode. For an iOS
engineer the site itself is a design credential. System font stack (SF Pro on
Apple devices, zero webfont bytes). Rejected: terminal-dark (generic),
editorial-only (too plain for the goal), 3D/creative (slow, distracts).

## 11. Accent color: iOS blue
`#0071e3` (light) / `#0A84FF` (dark) on a neutral palette. Reinforces iOS
identity wordlessly. Rejected: orange, mint, purple.

## 12. Hero image: real photo, same as LinkedIn
Recruiter flow is portfolio ↔ LinkedIn; the same face confirms identity
instantly. Rejected: memoji (breaks continuity), typography-only (less human).

## 13. NTT Data client stays anonymous
NDA-safe: "a large-scale banking application". MODO / BBVA Argentina (Baufest)
can be named — it was on the public CV.

## 14. Cut from scope
No contact form (mailto + LinkedIn; forms need backend/anti-spam), no CMS
(markdown in repo), no i18n/Spanish version, no 3D/heavy animation, no
comments/newsletter. All confirmed by Nahuel.

## 15. Extensibility is a requirement
Nahuel explicitly wants adding a new section/tab to be trivial. Pattern: new
page (or content collection) + one nav entry, documented in
`docs/user/writing-content.md`. Phase 2 "Projects" section will follow it.

## 16. CV corrections captured
The PDF CV is outdated on two points: SwiftUI is now a working professional
skill, and Phase 2 of the NTT Data investments module has shipped.
`docs/knowledge/content.md` is the copy source of truth, not the PDF.

## 17. Theme behavior
Follow `prefers-color-scheme` by default; manual toggle overrides and persists
in `localStorage`; inline head script prevents flash of wrong theme.
