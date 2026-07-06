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

- [ ] 4. Experience section: case-study cards (NTT Data, Baufest/MODO, Yobel,
      Bachatours) from docs/knowledge/content.md
- [ ] 5. Skills grid + About section

## Session 3 — Blog

- [ ] 6. Blog content collection + schema; /blog index grouped by series;
      first post (kickoff of "Become a better iOS engineer")
- [ ] 7. Post page /blog/[slug]: prose styling, series banner, prev/next
- [ ] 8. Latest posts strip on home (hides when empty)

## Session 4 — Ship

- [ ] 9. SEO: meta/OG/canonical, static OG image, RSS, sitemap, robots.txt, 404
- [ ] 10. Assets & polish: optimized photo, cv.pdf, favicons, a11y pass,
      Lighthouse ≥95
- [ ] 11. Deploy: GitHub → Vercel, nahuelborromeo.dev DNS, production smoke test

## Notes

- Waiting on Nahuel: LinkedIn photo file, updated CV PDF, domain purchase,
  Vercel account, optional real metrics for experience bullets.
- (add blockers, decisions, and things to revisit here)
