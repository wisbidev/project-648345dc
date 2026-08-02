# Test Cases — About Section

Module: `landing`
Function: About section
Requirement: **LANDING-003 — About section displays narrative with stats**
Risk level: **Low** — static, non-interactive content section; no data writes, no
permissions, no user input. All four acceptance criteria are covered below.
The SRS failure/boundary table (portrait 404, stat-label overflow) is recorded
but out of scope for this happy-path pass.

---

**Scenario**: About section renders all required content on desktop
**Given**: The landing page is loaded on a desktop viewport (width > 900px) and
the About section is below the fold
**When**: The visitor scrolls the About section into view
**Then**: The section shows a portrait image in the left column and, in the
right column, a narrative paragraph plus exactly three stat cards — all visible
(LANDING-003 AC-1, behaviour 1)

**Scenario**: Each stat card shows a large numeral and a short label
**Given**: The About section is in view on desktop
**When**: The visitor reads the three stat cards
**Then**: Each card shows a large numeral (display serif, `--color-primary`,
e.g. "8+") with a short label below it (muted, e.g. "Năm kinh nghiệm"), and all
three cards are visible (LANDING-003 AC-1, behaviour 3)

**Scenario**: About layout collapses to a single column on tablet/mobile
**Given**: The viewport is ≤ 900px (e.g. 768px tablet or 375px phone)
**When**: The visitor views the About section with no interaction
**Then**: The portrait renders above the narrative paragraph and stat cards in a
single column, and there is no horizontal page scroll (LANDING-003 AC-2,
behaviour 2)

**Scenario**: Content is immediately visible under reduced motion
**Given**: The visitor has `prefers-reduced-motion: reduce` set
**When**: The About section enters the viewport
**Then**: Portrait, paragraph, and all three stat cards are immediately visible
at their final position with no translate or fade animation (LANDING-003 AC-3)

**Scenario**: Stat cards are non-interactive on hover
**Given**: The About section is in view
**When**: The mouse hovers over any stat card
**Then**: The card does not lift and its colour does not change — it remains at
its resting state (LANDING-003 AC-4)

**Scenario**: Content plays the scroll-reveal animation on entry
**Given**: The visitor has default motion settings and the About section is
below the fold
**When**: The section enters the viewport (intersection threshold reached)
**Then**: The content animates in with the scroll-reveal effect (fade +
translateY 26px → none, ~0.7s ease) and settles at its final position
(LANDING-003 behaviour 4)
