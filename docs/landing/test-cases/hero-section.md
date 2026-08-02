# Test Cases — Hero Section

Module: `landing`
Plan item: 1 of 6 (P1) — Hero section
Implements: SRS LANDING-001
Story: `docs/landing/stories/hero-section.md`
Risk level: **Low** — static presentational section; no data writes, no
permissions, no backend. Happy-path depth (one case per SRS acceptance
criterion) is proportionate. Error/edge cases (AC-6..AC-9: missing avatar,
empty name, keyboard-only, missing anchor) are out of scope for this pass per
the task instruction and are covered in the failure-behaviour matrix of the
SRS.

## Traceability

| Case | SRS AC | Story AC | Behaviour |
|---|---|---|---|
| TC-HERO-01 | LANDING-001 AC-1 | AC-1 | §4.1 Behaviour 1, 2, 3, 4, 5, 6 |
| TC-HERO-02 | LANDING-001 AC-2 | AC-2 | §4.1 Behaviour 1, 2 |
| TC-HERO-03 | LANDING-001 AC-3 | AC-3 | §4.1 Behaviour 7 |
| TC-HERO-04 | LANDING-001 AC-4 | AC-4 | §4.1 Behaviour 8 |
| TC-HERO-05 | LANDING-001 AC-5 | AC-5 | §4.1 Behaviour 4 (badge pulse); §6 NFR accessibility |

---

**Scenario**: Hero renders fully on desktop without scrolling
**Given**: the page loads on a desktop viewport of 1280×720 or larger, with
`prefers-reduced-motion` unset
**When**: no interaction is performed
**Then**:
- The hero section is the first content visible and spans the full viewport width
- All of the following are visible without scrolling: the availability badge, the
  name, the one-line headline, the tagline paragraph, the avatar image, and both
  CTA buttons
- The name is rendered as an h1 in display serif at `clamp(42px, 6vw, 68px)`,
  weight 600, letter-spacing `-.02em`
- The availability badge shows a pulsing dot and the text "Sẵn sàng nhận dự án"
  in a pill with `--color-secondary-soft` background and `--color-secondary`
  text
- The avatar renders inside a decorative `2px dashed var(--color-primary)` frame
  with `--radius-lg` (28px)
- The primary CTA reads "Liên hệ"; the ghost CTA reads "Xem thêm"

**Scenario**: Hero stacks vertically on mobile without horizontal scroll
**Given**: the page loads on a viewport ≤600px wide
**When**: no interaction is performed
**Then**:
- The hero layout collapses to a single vertical column (avatar stacks with the
  text block; hero visual is capped at 420px)
- The badge, name, headline, tagline, avatar, and both CTA buttons all remain
  visible in reading order
- No horizontal page scroll occurs at 320px and up
- The h1 accent no longer uses `nowrap`

**Scenario**: "Liên hệ" scrolls smoothly to the Contact section
**Given**: the page is loaded on desktop and the `#contact` section exists
**When**: the visitor clicks the "Liên hệ" CTA button
**Then**:
- The page scrolls smoothly to the top of the Contact section (`#contact`)
- The Contact section comes into view after the scroll completes

**Scenario**: "Xem thêm" scrolls smoothly to the About section
**Given**: the page is loaded on desktop and the `#about` section exists
**When**: the visitor clicks the "Xem thêm" CTA button
**Then**:
- The page scrolls smoothly to the top of the About section (`#about`)
- The About section comes into view after the scroll completes

**Scenario**: Hero respects `prefers-reduced-motion`
**Given**: the visitor has `prefers-reduced-motion: reduce` set and the page
loads
**When**: the page loads and no interaction is performed
**Then**:
- No animation plays: the badge dot does not pulse, no scroll-reveal transform
  runs, and scrolling is not animated (scroll-behavior auto)
- All hero content (badge, name, headline, tagline, avatar, both CTAs) is
  immediately visible at its final position

## Coverage split

All five cases above are **automated**: each observable (rendered elements,
typography tokens, scroll position, computed styles under reduced motion) can be
asserted by a browser-level test (Playwright) or a component test. No case
requires manual judgment, so no manual coverage is declared.

## Scope note

This pass covers the happy path only (SRS AC-1..AC-5), per the task instruction.
Failure, boundary and permission behaviour (story AC-6..AC-9) is specified in
the SRS failure matrix and will be exercised when the implementation exists.
