# Story: About Section

Module: `landing` · Implements: SRS LANDING-003 · Status: plan

## User story

As a Visitor, I want to read the stakeholder's background through a portrait,
a narrative paragraph, and three proof-point stat cards, so that I can decide
whether they are a good fit.

## In scope

- `About.tsx` as a **Server Component** (no `"use client"`) rendering the
  About section with `id="about"`.
- Desktop layout: two columns — portrait image on the left (`0.9fr`), narrative
  paragraph plus three stat cards on the right (`1.1fr`), 72px column gap
  (`--space-18`), matching the approved design.
- Portrait image rendered inside the decorative dashed primary frame
  (`2px dashed var(--color-primary)`, radius `--radius-lg` 28px,
  `--shadow-float`).
- Narrative paragraph with clearly-marked Vietnamese placeholder copy the
  stakeholder edits in the design preview or in code.
- Three stat cards, each showing a large display numeral in primary colour and
  a short muted caption (e.g. "8+ Năm kinh nghiệm"). Stat cards are
  **non-interactive**: no hover lift, no colour change, no focus ring.
- Scroll-reveal entrance: `.reveal` → `.in` via IntersectionObserver
  (threshold 0.15, `0.7s ease`, translateY 26px), respecting
  `prefers-reduced-motion: reduce` (content immediately visible, no transform).
- Placeholder portrait image with a graceful fallback when the image is
  missing or 404s.
- Responsive behaviour per design-system §1.5: single column at ≤900px
  (portrait above narrative and stats, 44px gap); stats stay 3 columns at
  ≤600px with smaller numerals (24px); section padding `110px 0` desktop →
  `80px 0` at ≤600px.

## Out of scope

- Real personal content: the actual biography, portrait photo, and true stat
  values. This story ships clearly-marked placeholders; the stakeholder
  supplies real content later.
- Nav / Hero wiring to the `#about` anchor (links live in the Nav and Hero
  components, owned by the Hero story — they only need this story's `id` to
  exist).
- Any other section (Hero, Skills, Experience, Contact, Footer).
- Interactive stat cards, read-more toggles, or any behaviour on the stats.
- Backend, database, or any data fetching.

## UI scope

The About section on the single scrolling landing page, per the approved
design (`design/index.html`). Referenced design-system specs: §2.4 section
head (eyebrow + h2 + optional lead, scroll-reveal entrance), §2.7 stat card,
§1.5 breakpoints, §2.12 scroll reveal. States this story covers:

- default (static content at rest)
- scroll-in reveal (staggered via `d1..d3` on portrait / paragraph / stats)
- `prefers-reduced-motion` (content always visible, no animation)
- portrait image missing/404 (frame + neutral placeholder)
- stat label overflow (text wraps, card grows, no overflow)

## Acceptance criteria

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads | About section scrolls into view | Portrait, narrative paragraph, and three stat cards are all visible, revealed with the scroll-reveal animation |
| AC-2 | Viewport ≤900px | No interaction | Layout collapses to a single column: portrait above narrative and stats; no horizontal scroll |
| AC-3 | Viewport ≤600px | No interaction | Section padding is 80px; stats remain a 3-column row with smaller numerals; no horizontal scroll |
| AC-4 | `prefers-reduced-motion: reduce` is set | Section enters viewport | All content is immediately visible at its final position; no translate or fade |
| AC-5 | Stat card | Hover or keyboard focus | No lift, colour change, or focus ring — cards are non-interactive |
| AC-6 | Portrait `src` is empty or returns 404 | Section renders | Decorative dashed frame remains visible with a neutral surface-colour placeholder; no broken-image icon |
| AC-7 | Stat label text is longer than the card | Content renders | Text wraps within the card; card height expands; nothing overflows the card boundary |
| AC-8 | Section renders | No interaction | Section has `id="about"` and shows the section head (eyebrow + h2) followed by the two-column content |

## Dependencies

- Frontend scaffold in place (Next.js 15 App Router, Tailwind v3, design tokens
  from `design/design-system.md`) — architecture overview §3.
- SRS LANDING-003 (requirement this story implements).
- Approved design `design/index.html` + `design/design-system.md`.
- **Hero story (parallel):** the Nav "About" link and the hero "Xem thêm" CTA
  anchor to `#about`; this story supplies that `id`. Coordinate so the anchor
  target exists before nav-link verification runs.
- No external accounts, credentials, or data required — portrait and copy ship
  as placeholders.
