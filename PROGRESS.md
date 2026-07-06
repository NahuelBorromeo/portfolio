# Implementation progress

Check off steps as they complete; add notes under each session. New sessions:
read this file first, pick up at the first unchecked step.

## Session 1 — Foundation

- [x] 1. Scaffold: Astro 5 + TypeScript strict + Tailwind v4, git init, GitHub
      repo, .gitignore, README stub — *local git only; GitHub remote pending
      (needs Nahuel's account, do together with step 11)*
- [x] 2. Design system: theme tokens (light/dark custom properties), BaseLayout
      with no-flash theme script, Nav (sticky + ThemeToggle), Footer
- [x] 3. Hero: photo (placeholder until Nahuel provides the LinkedIn photo),
      name, title, one-liner, CTAs (Email, LinkedIn, GitHub, Download CV) —
      *interim: outdated CV PDF copied to public/cv.pdf so the link works;
      replace with updated PDF*

## Session 2 — Home content

- [x] 4. Experience section: case-study cards (NTT Data, Baufest/MODO, Yobel,
      Bachatours) from docs/knowledge/content.md
- [x] 5. Skills grid + About section

## Session 3 — Blog

- [x] 6. Blog content collection + schema; /blog index grouped by series;
      first post (kickoff of "Become a better iOS engineer")
- [x] 7. Post page /blog/[slug]: prose styling, series banner, prev/next —
      *added @tailwindcss/typography; dates formatted in UTC to avoid
      off-by-one in UTC-5*
- [x] 8. Latest posts strip on home (hides when empty)

## Session 4 — Ship

- [x] 9. SEO: meta/OG/canonical, static OG image, RSS, sitemap, robots.txt, 404
- [x] 10. Assets & polish: favicon, mobile nav fix, a11y basics (landmarks,
      focus rings, reduced-motion, alt text) — *pending: real photo, updated
      cv.pdf, Lighthouse run against production after deploy*
- [ ] 11. Deploy: GitHub → Vercel, nahuelborromeo.dev DNS, production smoke
      test — **blocked on Nahuel:** GitHub repo access, Vercel account, domain
      purchase

## Notes

- Waiting on Nahuel: LinkedIn photo file, updated CV PDF, domain purchase,
  Vercel account, optional real metrics for experience bullets.
- (add blockers, decisions, and things to revisit here)
