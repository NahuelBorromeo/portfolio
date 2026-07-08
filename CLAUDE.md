# nahuelborromeo.com — personal portfolio

Personal portfolio of Nahuel Borromeo, iOS Engineer (Lima, Perú). Static site in
**English**, Apple-like refined design, aimed at international recruiters. Home
page sells the profile in under a minute; a blog hosts the "Become a better iOS
engineer" series. Talk to Nahuel in Spanish; write all site content in English.

## Key documents

- `ROADMAP.md` — full spec: vision, design direction, layout, phases. Phase 1 is
  the numbered implementation order.
- `PROGRESS.md` — implementation tracker. **Read this first in a new session.**
- `docs/DECISIONS.md` — settled decisions with rationale. Don't re-litigate.
- `docs/ARCHITECTURE.md` — file structure, blog schema, theming, guardrails.
- `docs/knowledge/content.md` — **single source of truth for all site copy**
  (kept in sync with the CV since 2026-07; if they ever differ, ask Nahuel).
- `docs/user/` — Nahuel's own guides for running the site and adding content.

## Stack

Astro 5 (static output, TypeScript strict) + Tailwind CSS v4 + vanilla JS theme
toggle. Hosted on Vercel, domain nahuelborromeo.com. No React/Vue islands, no
CMS, no backend.

## Design priorities

1. Recruiter reads the pitch in <60s — clarity over cleverness.
2. Apple-like polish: system font stack, neutral palette + iOS blue accent,
   dark/light themes, subtle motion only.
3. Performance: Lighthouse ≥95 everywhere; no webfonts; minimal JS.
4. Extensibility: adding a post or a whole section must be trivial (markdown
   content collections + nav array).

## Conventions

- Copy comes from `docs/knowledge/content.md` — never invent facts about
  Nahuel's experience; ask him if something is missing.
- NTT Data's client is Interbank — named publicly (Nahuel put it in his own
  CV, 2026-07). MODO / BBVA Argentina can also be named.
- Components in `src/components/`, one responsibility each; theme via CSS
  custom properties, never hardcoded colors in components.
- Accessible by default: semantic landmarks, alt text, visible focus,
  `prefers-reduced-motion` respected.

## Implementation order

Follow `ROADMAP.md` Phase 1 steps 1–11 in order. After each step: run
`npm run build` (must pass), commit, and update `PROGRESS.md` (check off the
step, note anything relevant). If something is ambiguous, make a sensible
decision, record it in `docs/DECISIONS.md`, keep moving.

### Session batches

| Session | Steps | Scope |
|---|---|---|
| 1 | 1–3 | Scaffold, design system foundation, Hero |
| 2 | 4–5 | Experience, Skills + About |
| 3 | 6–8 | Blog: collection, index, post page, home strip |
| 4 | 9–11 | SEO/RSS/OG, assets & polish, deploy |

Each batch fits a fresh session with full context. Don't attempt all steps in
one session.

### Parallelism

This project is small; subagents are optional. Within session 2, steps 4 and 5
are independent components and can be built by parallel subagents. Within step
9, RSS/sitemap/OG/404 are independent sub-tasks.

### Blockers needing Nahuel (ask when reached, don't stall other steps)

- Photo file (same as LinkedIn) — needed for step 3 (use a placeholder until).
- Updated CV PDF — needed for step 10.
- Domain purchase + Vercel account — needed for step 11.
- Optional: real metrics (user counts, etc.) to strengthen experience bullets.

## Context management

Claude's effectiveness degrades as context grows. The main process is an
orchestrator — it delegates, tracks progress, and synthesizes.

The main process should NOT:
- Read large files directly — delegate to subagents
- Write large modules directly — delegate to subagents
- Debug complex issues inline — spawn a subagent to investigate
- Re-read files it already wrote unless debugging

The main process SHOULD:
- Track which steps are complete
- Review subagent results briefly
- Make cross-step decisions (refactoring, shared patterns)
- Manage commits

Subagent delegation pattern: for each step, spawn a subagent with only the
context it needs — the relevant docs section, the components it depends on, and
a clear description of what to build and where.

Commits are context reset points. After each step, commit. If context gets
heavy mid-session, start a new session — pick up from the last commit and
PROGRESS.md.

## Code quality

- Before writing a new utility, search the codebase for existing
  implementations. Reuse over rewrite.
- After every 3-4 steps, pause and review: extract patterns only when there are
  3+ concrete usages, never preemptively.
- Run `npm run build` and `npx astro check` after every step; fix issues
  immediately.
- Keep components short and single-purpose.
- No dead code, no commented-out code, no TODOs without a matching entry in
  `docs/DECISIONS.md`.
- After sessions 3 and 4, run /simplify on the changed code and fix findings
  before continuing.

## Documentation rules

When implementing or modifying a user-facing feature, you MUST update the
corresponding docs in `docs/user/`:
- New content type or frontmatter field → update `docs/user/writing-content.md`
- Changed dev/deploy workflow → update `docs/user/getting-started.md`
Docs are part of the definition of done. A feature without updated docs is not
complete.

<!-- Implementation prompt:
You are implementing nahuelborromeo.com, Nahuel Borromeo's portfolio. Read
CLAUDE.md first, then PROGRESS.md, then ROADMAP.md Phase 1. Start with the
first unchecked step in PROGRESS.md.
-->
