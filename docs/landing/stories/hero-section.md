# Story: Hero Section

Module: `landing` — plan item 1 of 6 (P1)
Implements: SRS LANDING-001

## User story

As a Visitor, I want to see a full-width hero presenting the person's name, a
one-line headline, a short tagline, an avatar, and two calls to action, so that
I immediately understand who this page is about and what I can do next.

## In scope

- The hero section only, as the first content visible on page load, full
  viewport width, two columns on desktop (`1.15fr / .85fr`).
- Availability badge: pulsing dot + "Sẵn sàng nhận dự án", pill with
  `--color-secondary-soft` background and `--color-secondary` text (design
  system §2.3). Non-interactive; pulse stops under `prefers-reduced-motion`.
- Name rendered as an h1 in display serif at `clamp(42px, 6vw, 68px)`, weight
  600, letter-spacing `-.02em`. Placeholder text "Tên của bạn" until the
  stakeholder edits it.
- One-line headline (max ~80 chars) and short tagline paragraph, both
  clearly-marked placeholder copy the stakeholder edits in the design preview
  or in code.
- Avatar image inside a decorative `2px dashed var(--color-primary)` frame
  (`--radius-lg` 28px). If the `src` is empty or 404, the frame stays and a
  neutral `--color-bg` placeholder area renders — no broken-image icon.
- Two CTA buttons per design system §2.1:
  - Primary "Liên hệ" (`btn-primary`, `--color-primary` bg) — smooth scrolls
    to the Contact section (`#contact`).
  - Ghost "Xem thêm" (`btn-ghost`, transparent bg, 1.5px border) — smooth
    scrolls to the About section (`#about`).
- Responsive: at ≤900px the layout collapses to one column and the hero visual
  is capped at 420px; at ≤600px section padding becomes 80px and the h1 accent
  no longer uses `nowrap`. No horizontal scroll at 320px and up.
- Scroll-reveal entrance (`.reveal` → `.in`, `0.7s ease`, translateY 26px) via
  IntersectionObserver; under `prefers-reduced-motion` all hero content is
  immediately visible with no transform or smooth-scroll behaviour.
- `Hero.tsx` is a Client Component (file begins with `"use client"`) — it uses
  IntersectionObserver and scroll event handlers (architecture §4.2).
- Keyboard: both CTA buttons are reachable by Tab in order (Liên hệ, then Xem
  thêm) and each shows a visible `3px solid var(--color-focus)` outline with
  3px offset.

## Out of scope

- The fixed navigation bar (SRS LANDING-002). The hero does not include nav
  behaviour. Note: the approved design includes a nav bar but no plan item
  currently covers it — surfaced here for visibility, not built in this story.
- All other sections (About, Skills, Experience, Contact, Footer) — separate
  plan items.
- Real content: every string is a clearly-marked placeholder for the
  stakeholder to replace; no copywriting decisions are made here.
- Backend, database, analytics, third-party scripts, or any API — static shape
  (architecture §2).
- Anything below the first viewport fold of the page.

## UI scope

One screen: the Hero section of the single-page landing, exactly as in the
approved design (preview:
http://localhost:8080/design/648345dc-a99c-43d4-8d86-b262dbb91170). States that
must exist: default, in-view reveal, and reduced-motion. The badge has no
hover/focus (non-interactive); the CTAs follow the button states in design
system §2.1 (default, hover lift `-2px`, focus ring).

## Acceptance criteria

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads on desktop (1280×720 and up) | No interaction | Badge, name, headline, tagline, avatar, and both CTA buttons are all visible without scrolling |
| AC-2 | Page loads on mobile (≤600px) | No interaction | Hero stacks vertically; all elements visible; no horizontal scroll |
| AC-3 | Visitor clicks "Liên hệ" | Click | Page scrolls smoothly to the Contact section (`#contact`) |
| AC-4 | Visitor clicks "Xem thêm" | Click | Page scrolls smoothly to the About section (`#about`) |
| AC-5 | `prefers-reduced-motion: reduce` is set | Page loads | No animation plays: badge pulse stops, no reveal transform, no smooth scroll; all content immediately visible |
| AC-6 | Avatar `src` is empty or returns 404 | Page loads | Dashed frame remains visible with a neutral `--color-bg` placeholder; no broken-image icon |
| AC-7 | Name placeholder is unedited | Page loads | h1 renders "Tên của bạn" |
| AC-8 | Keyboard only | Tab through the hero | Both CTAs are reachable in order (Liên hệ, then Xem thêm); each shows a visible 3px primary-colour focus ring |
| AC-9 | Target section anchor missing (About/Contact not yet built) | CTA clicked | No JS error; browser handles the missing anchor without breaking the page |

## Dependencies

- `#about` and `#contact` section ids are created by later plan items (About,
  Contact). Until they land, the CTA scroll targets may not exist — the scroll
  handler must fail silently (AC-9), not throw.
- Design tokens, typography, and button/badge specs from
  `design/design-system.md` (already approved).
- No external assets or accounts: placeholder avatar image and copy are
  inline/self-hosted in the component.
