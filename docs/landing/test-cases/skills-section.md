# Test Cases — Skills Section

Module: `landing`
Function: Skills section
Requirement: **LANDING-004 — Skills section displays a responsive grid of cards**
Risk level: **Low** — static content section; no data writes, no permissions, no
user input. The only dynamic behaviour is the CSS/JS meter animation. All seven
acceptance criteria are covered below. The SRS failure/boundary table (empty
skill name, missing/out-of-range `data-w`) is recorded but out of scope for this
happy-path pass.

---

**Scenario**: Skills section renders heading and grid on page load
**Given**: The landing page is loaded on a desktop viewport (width > 900px) and
the Skills section is below the fold
**When**: The visitor looks at the page with no interaction
**Then**: The Skills section heading (eyebrow, h2, lead) is visible above the
fold area; the six skill cards sit below the fold and the meter fills are at 0%
until scrolled into view (LANDING-004 AC-1, behaviour 1)

**Scenario**: Grid is three columns wide on desktop
**Given**: A desktop viewport wider than 900px
**When**: The visitor scrolls the Skills section into view
**Then**: The six skill cards render in a grid of exactly three columns and two
rows, with the cards laid out at the section's `repeat(3, 1fr)` grid
(LANDING-004 behaviour 2)

**Scenario**: Each skill card contains icon tile, name, description, and meter
**Given**: The Skills section is in view on desktop
**When**: The visitor reads any of the six skill cards
**Then**: Each card shows a 48px icon tile (white icon on primary or secondary
background), a skill name as an h3, a one-line short description, and a
proficiency meter with a track and fill (LANDING-004 behaviour 3)

**Scenario**: Meter animates from 0 to its target value when the card scrolls into view
**Given**: Default motion settings and a card below the fold with its `data-w`
attribute set (e.g. `data-w="90"`)
**When**: The card enters the viewport and the IntersectionObserver fires at
threshold 0.15
**Then**: The meter fill animates from 0% to its `data-w` value (e.g. 90%) over
~1s with the meter easing curve, and the card reveals at its final position
(LANDING-004 AC-2, behaviour 4)

**Scenario**: Grid collapses to two columns at ≤ 900px
**Given**: The viewport is ≤ 900px (e.g. 768px tablet)
**When**: The visitor views the Skills section with no interaction
**Then**: The grid displays exactly two columns and there is no horizontal page
scroll (LANDING-004 AC-3)

**Scenario**: Grid collapses to one column at ≤ 600px
**Given**: The viewport is ≤ 600px (e.g. 375px phone)
**When**: The visitor views the Skills section with no interaction
**Then**: The grid displays a single column of stacked cards and there is no
horizontal page scroll (LANDING-004 AC-4)

**Scenario**: Card lifts with a shadow on hover
**Given**: The Skills section is in view on desktop
**When**: The mouse hovers over any skill card
**Then**: The card lifts by `translateY(-6px)`, gains the floating shadow
(`--shadow-float`), and its border becomes transparent (LANDING-004 AC-5,
behaviour 6)

**Scenario**: Keyboard focus shows a visible focus ring on a card
**Given**: The Skills section is in view
**When**: The visitor tabs until keyboard focus lands on a skill card
**Then**: A visible 3px primary-colour (`--color-primary`) focus ring appears
around the card (LANDING-004 AC-6)

**Scenario**: Meters render at their final value immediately under reduced motion
**Given**: The visitor has `prefers-reduced-motion: reduce` set
**When**: The skill cards scroll into view
**Then**: No animation plays; each meter fill is immediately at its `data-w`
percentage (e.g. 90%) and each card is instantly visible at its final position
(LANDING-004 AC-7, behaviour 5)

**Scenario**: Teal variant cards use the secondary meter fill colour
**Given**: The Skills section is in view and includes a card with the `teal`
variant (e.g. `data-w="70"`)
**When**: The visitor reads the meter fill on that card
**Then**: The meter fill is rendered in secondary colour (`--color-secondary`,
#1F5C5C) while default-variant cards use the primary colour (#E85D3D)
(LANDING-004 Data touched — Variant)
