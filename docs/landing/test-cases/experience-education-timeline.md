# Test Cases — Experience & Education Timeline

Module: `landing`
Function: Experience & education timeline
Requirement: **LANDING-005 — Timeline displays milestones in chronological order**
Risk level: **Low** — static content section; no data writes, no permissions, no
user input. The only dynamic behaviour is the CSS/JS scroll-reveal animation and
the responsive rail layout. All seven happy-path acceptance criteria (story
AC-1..AC-7) are covered below. The SRS failure/boundary table (empty date,
empty description, unknown dot variant) is recorded but out of scope for this
happy-path pass.

---

**Scenario**: Timeline section head renders on page load
**Given**: The landing page is loaded on a desktop viewport and the Experience
section is below the fold
**When**: The visitor looks at the page with no interaction
**Then**: The section with `id="experience"` shows the section head — kicker
"Kinh nghiệm & học vấn", h2 "Hành trình của tôi", and lead paragraph — above
the fold; all milestone cards are below the fold until scrolled into view
(LANDING-005 AC-1, story AC-1)

**Scenario**: Exactly four milestone cards render in newest-first chronological order
**Given**: The Experience section has scrolled into view on desktop
**When**: The visitor reads the timeline with no interaction
**Then**: Exactly four milestone cards render in newest-first chronological
order — "2022 — nay" first, then "2020 — 2022", "2018 — 2020", and "2014 —
2018" last, so the visitor can follow career progression from newest to oldest
(LANDING-005 behaviour 1, story AC-2)

**Scenario**: Each milestone card contains dot, date pill, role h3, org line, and description
**Given**: The Experience section is in view on desktop
**When**: The visitor reads any of the four milestone cards
**Then**: Each card shows a 20px dot on the rail (5px accent border + 4px soft
ring), an uppercase 12px/700 date pill (e.g. "2022 — nay"), a role/degree title
as an h3 (display font, 21px/600), an organisation line (e.g. "Startup ABC ·
Hà Nội"), and a muted description paragraph (LANDING-005 behaviour 2, story
AC-2)

**Scenario**: The vertical rail is continuous from the first to the last milestone dot
**Given**: The Experience section is rendered on desktop
**When**: The visitor inspects the timeline rail on load
**Then**: The 2px `--color-border` vertical line runs continuously from the
first milestone dot to the last with no gaps and no overflow beyond the dots
(LANDING-005 AC-3, story AC-3)

**Scenario**: Cards fade and slide in with stagger when they scroll into view
**Given**: Default motion settings and milestone cards below the fold
**When**: The cards enter the viewport and the IntersectionObserver fires at
threshold 0.15
**Then**: Each card fades in and slides up (`0.7s ease`, translateY 26px) with
stagger delay `d1..d3` applied to successive cards, each card ending at its
final position (LANDING-005 AC-2, behaviour 4; story AC-4)

**Scenario**: Dot and date-pill variants alternate, newest milestone starting with default
**Given**: The Experience section is rendered with default and teal variants
available
**When**: The visitor reads the timeline with no interaction
**Then**: The first (newest) milestone uses the default accent variant (primary
#E85D3D) for dot and date pill, the second uses the `.teal` variant (secondary
#1F5C5C), and the two variants alternate through the remaining cards
(LANDING-005 behaviour 3, story AC-5)

**Scenario**: Timeline renders without horizontal overflow at ≤ 600px
**Given**: A viewport ≤ 600px wide (e.g. 375px phone, down to 320px)
**When**: The visitor views the Experience section with no interaction
**Then**: The rail and milestone cards render without horizontal page scroll and
the card content remains readable at 320px width (LANDING-005 AC-4, story AC-6)

**Scenario**: Cards are immediately visible at final position under reduced motion
**Given**: The visitor has `prefers-reduced-motion: reduce` set
**When**: The milestone cards scroll into view
**Then**: No animation plays; all cards are immediately visible at their final
position with no translate or fade (LANDING-005 AC-5, behaviour 5; story AC-7)
