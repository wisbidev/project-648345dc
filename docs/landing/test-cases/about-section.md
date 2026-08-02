# Test Cases — About Section

Module: `landing`
Plan item: 2 of 6 (P2) — About section
Implements: SRS LANDING-003
Story: `docs/landing/stories/about-section.md`
Risk level: **Low** — static, non-interactive content section; no data writes,
no permissions, no user input. One happy-path case per SRS acceptance criterion
plus the scroll-reveal behaviour and the ≤600px stat layout from the story is
proportionate. The SRS failure/boundary cases (portrait 404/empty, stat-label
overflow) are recorded in the SRS §4.2 matrix but are out of scope for this
happy-path pass per the task instruction.

## Traceability

| Case | SRS AC | Story AC | Behaviour |
|---|---|---|---|
| TC-ABOUT-01 | LANDING-003 AC-1 | AC-1, AC-8 | §4.2 Behaviour 1, 3 |
| TC-ABOUT-02 | LANDING-003 AC-2 | AC-2 | §4.2 Behaviour 2 |
| TC-ABOUT-03 | LANDING-003 AC-2 | AC-3 | design-system §1.5 mobile |
| TC-ABOUT-04 | LANDING-003 AC-3 | AC-4 | §4.2 Behaviour 4 (reduced motion) |
| TC-ABOUT-05 | LANDING-003 AC-4 | AC-5 | §4.2 Behaviour (non-interactive stats) |
| TC-ABOUT-06 | LANDING-003 AC-1 | AC-1 | §4.2 Behaviour 4 |

---

**Scenario**: About section renders all required content on desktop
**Given**: the page loads on a desktop viewport wider than 900px and the About
section is below the fold
**When**: the visitor scrolls the About section into view
**Then**:
- The section has `id="about"` and shows the section head (eyebrow + h2)
  followed by the two-column content
- The layout is a two-column grid (`0.9fr 1.1fr`, gap `--space-18` 72px): the
  portrait image in the left column, and the narrative paragraph plus exactly
  three stat cards in the right column
- The portrait renders inside a decorative `2px dashed var(--color-primary)`
  frame with `--radius-lg` (28px)
- Portrait, paragraph, and all three stat cards are visible (LANDING-003 AC-1,
  behaviours 1)

**Scenario**: Each stat card shows a large numeral and a short label
**Given**: the About section is in view on desktop
**When**: the visitor reads the three stat cards
**Then**:
- Exactly three cards are present, each showing a large numeral in display
  typography (`--text-xl`, 30px/600) in `--color-primary` (e.g. "8+") with a
  short muted caption below it at 12.5px/500 (e.g. "Năm kinh nghiệm")
- Each card renders on `--color-surface` with a 1px `--color-border` border,
  `--radius-card` 16px, and centered text — all three visible
  (LANDING-003 AC-1, behaviour 3)

**Scenario**: About layout collapses to a single column at ≤900px
**Given**: the viewport is ≤900px wide (e.g. 768px tablet or 375px phone)
**When**: the visitor views the About section with no interaction
**Then**:
- The layout collapses to a single column (gap 44px): the portrait renders
  above the narrative paragraph and the stat cards, in reading order
- No horizontal page scroll occurs at 320px and up (LANDING-003 AC-2,
  behaviour 2)

**Scenario**: Stats remain a three-column row at ≤600px
**Given**: the viewport is ≤600px wide
**When**: the visitor views the About section with no interaction
**Then**:
- The section padding is 80px top and bottom
- The three stat cards remain in a `repeat(3, 1fr)` row and all stay on screen
  with their numerals at 24px — no horizontal scroll
  (story AC-3, design-system §1.5)

**Scenario**: About content is immediately visible under reduced motion
**Given**: the visitor has `prefers-reduced-motion: reduce` set
**When**: the About section enters the viewport
**Then**:
- The portrait, narrative paragraph, and all three stat cards are immediately
  visible at their final position
- No translate or fade animation plays (`opacity 1`, no transform)
  (LANDING-003 AC-3)

**Scenario**: Stat cards are non-interactive on hover
**Given**: the About section is in view
**When**: the mouse hovers over any stat card
**Then**:
- The card does not lift and its border/background/text colour does not change —
  it remains exactly at its resting state
- No focus ring appears; the card is not focusable (LANDING-003 AC-4,
  story AC-5)

**Scenario**: About content plays the scroll-reveal animation on entry
**Given**: the visitor has default motion settings and the About section is
below the fold
**When**: the section enters the viewport (IntersectionObserver threshold 0.15)
**Then**:
- The content animates in with the scroll-reveal effect (fade + `translateY`
  26px → none, `0.7s ease`) and settles at its final position
  (LANDING-003 behaviour 4)
