# Story: Skills Section

Module: `landing` — plan item 3 of 6 (P2)
Implements: SRS LANDING-004

## User story

As a Visitor, I want to see the stakeholder's skills in a responsive grid of
cards, each with an icon, a name, a short description, and an animated
proficiency meter, so that I can quickly assess their expertise.

## In scope

- The Skills section only (`<section id="skills">`), the third section of the
  single scrolling page, rendered exactly as in the approved design (preview:
  http://localhost:8080/design/648345dc-a99c-43d4-8d86-b262dbb91170).
- Section band: `--color-surface` background with 1px `--color-border` top and
  bottom borders (design/index.html `.skills`).
- Section head (design system §2.4, `.kicker` variant — no accent rule):
  kicker "Kỹ năng", h2 "Những điều tôi làm tốt", lead paragraph. All copy is
  clearly-marked placeholder text the stakeholder edits in the design preview
  or in code.
- Responsive grid (`repeat(3, 1fr)`, gap 22px) inside the 1120px container
  with 24px gutters:
  - Desktop: 3 columns.
  - ≤900px: 2 columns.
  - ≤600px: 1 column; section padding becomes 80px; no horizontal page scroll
    at 320px and up.
- Six skill cards, one per approved-design skill (Thiết kế sản phẩm, Phát
  triển web, Nghiên cứu người dùng, Prototyping, Viết nội dung, Quản lý dự
  án), each with:
  - 48px icon tile (`--radius-input` 14px) with a white 22px inline SVG icon
    on a colored background (design system §2.5).
  - Skill name as h3 (display font, 18px/1.3, weight 600, max ~50 chars).
  - One-line description (14px, `--color-text-muted`, max ~1 line wrap).
  - Proficiency meter: 6px track in `--color-border` (radius 6px) with a fill
    bar that animates from 0 to the card's `data-w` percentage.
- Meter animation (design/index.html JS + `--duration-meter`): when a card
  scrolls into view (IntersectionObserver, threshold 0.15) the fill
  transitions width 0 → `data-w`% over 1s `cubic-bezier(.22,.61,.36,1)`.
  `data-w` values per approved design: 90, 85, 80, 88, 70, 75.
- Variants (design system §2.5): default fill is `--color-primary`; a `.teal`
  class switches the fill to `--color-secondary`. All six cards in the approved
  mockup ship as default; the variant is supported so future cards can opt in.
- Card states:
  - Default: `--color-bg` background, 1px `--color-border`, `--radius-card`
    (22px), padding 30px 28px.
  - Hover: lift `translateY(-6px)`, `--shadow-float`, border → transparent.
  - Scroll reveal: `.reveal` → `.in` entrance (0.7s ease, translateY 26px)
    with stagger delay classes `d1..d4`, per design system §2.12.
  - Focus (keyboard): any focusable content inside a card shows the 3px
    `--color-focus` outline with 3px offset.
- Reduced motion: under `prefers-reduced-motion: reduce` no animation plays —
  cards are immediately visible and meters render at their final `data-w`
  value with no transition.
- Accessibility: the meter fill is decorative; the numeric value is conveyed
  to assistive technology (e.g. via the `data-w` value exposed through a
  visually-hidden label or `aria-valuenow` on a role="progressbar" element),
  not only as a visual width.
- `Skills.tsx` is a Client Component (file begins with `"use client"`) — it
  uses IntersectionObserver for the meter animation (architecture §4.2). The
  section id `skills` must exist so the nav anchor (LANDING-002) resolves.

## Out of scope

- All other sections (Nav, Hero, About, Experience, Contact, Footer) —
  separate plan items; the Skills section neither builds nor depends on them.
- The fixed navigation bar (SRS LANDING-002) and its mobile menu.
- Real content / copywriting: every string is a placeholder the stakeholder
  replaces; no skill names, descriptions, or proficiency values are chosen
  here beyond the approved-design defaults above.
- The timeline, contact form, and footer behaviours (LANDING-005/006/007).
- Backend, database, analytics, third-party scripts, or any API — static shape
  (architecture §2).
## UI scope

One screen: the Skills section of the single-page landing, per the approved
design. States that must exist: default, hover (lift + shadow), in-view reveal
with meter animation, reduced-motion (meters at final value, no animation), and
keyboard focus on focusable card content.

Implementation note: in the approved mockup the CSS rules use the selector
`.skill` (design/index.html lines 160–175) while the markup and the animation
JS use `.skill-card`. Implement the component as `.skill-card` per design
system §2.5 and the mockup markup/JS; do not rely on the `.skill` CSS selector
— it is a naming mismatch in the mockup, not a spec.

## Acceptance criteria

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads | No interaction | Skills section heading (kicker, h2, lead) and all six skill cards render in a 3-column grid |
| AC-2 | Cards scroll into view | IntersectionObserver fires (threshold 0.15) | Each card's meter fill animates from 0 to its `data-w`% over ~1s |
| AC-3 | Viewport ≤900px | No interaction | Grid displays 2 columns |
| AC-4 | Viewport ≤600px | No interaction | Grid displays 1 column; no horizontal scroll |
| AC-5 | Mouse hovers over a card | Hover | Card lifts `translateY(-6px)` and gains `--shadow-float`; border becomes transparent |
| AC-6 | Keyboard focus lands on a card | Tab | Focusable content shows the 3px `--color-focus` outline with 3px offset |
| AC-7 | `prefers-reduced-motion: reduce` is set | Cards scroll into view | No animation; cards and meters are immediately visible at final values |
| AC-8 | `data-w` is missing or invalid on a card | Page loads / scrolls into view | Meter fill stays at 0%; no animation error, no console exception |
| AC-9 | `data-w` > 100 on a card | Scrolls into view | Meter fill is capped at 100%; no visual overflow |
| AC-10 | Screen reader announces a card | Card focused/read | Skill name, description, and proficiency percentage (from `data-w`) are all conveyed |
| AC-11 | Skill name is empty | Page loads | h3 renders empty; card layout and meter remain intact |
| AC-12 | A card is marked `.teal` | Scrolls into view | Meter fill is `--color-secondary` instead of `--color-primary` |

## Dependencies

- Design tokens, typography, and the skill-card spec from
  `design/design-system.md` (already approved); the approved
  `design/index.html` is the source of truth for the six skills and their
  `data-w` values.
- `#skills` section id resolves for the nav anchor (LANDING-002, built under
  the Hero/Nav work) — this story creates it.
- No external assets or accounts: icons are inline SVGs, copy is placeholder,
  and no images or third-party resources are required.
