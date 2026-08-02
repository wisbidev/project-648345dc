# Story: Experience & Education Timeline

Module: `landing` · Implements: SRS LANDING-005 · Status: plan

## User story

As a Visitor, I want to see the stakeholder's work history and education as a
single vertical timeline, so that I can follow their career progression at a
glance.

## In scope

- `Timeline.tsx` as a **Server Component** (no `"use client"`) rendering the
  Experience section with `id="experience"`, replacing the
  `TODO(LANDING-005)` placeholder in `app/page.tsx`.
- Section head per design-system §2.4: kicker "Kinh nghiệm & học vấn", h2
  "Hành trình của tôi", lead paragraph — with scroll-reveal entrance.
- A single-column vertical rail, `max-width: 760px`, centered, with a
  continuous 2px `--color-border` line running from the first to the last
  milestone dot (rail + dot styles already exist in `globals.css`:
  `.timeline-rail`, `.timeline-dot`, `.date-pill` and their `.teal` variants).
- Milestone cards driven by a static data array of placeholder entries,
  matching the approved final Vietnamese draft in `design/index.html`
  (lines 339–381), ordered **newest first**: 2022 — nay, 2020 — 2022,
  2018 — 2020, 2014 — 2018. Each card shows:
  - a dot on the rail (20px circle, 5px accent border + 4px soft ring)
  - a date pill (uppercase 12px/700, e.g. "2022 — nay")
  - a role/degree title (h3, display font 21px/600)
  - an organisation line (e.g. "Startup ABC · Hà Nội")
  - an optional description paragraph (15px, muted)
- Dot and date-pill **variants alternate** between default (primary accent)
  and `.teal` (secondary) per SRS behaviour 3, starting with default on the
  first (newest) milestone.
- Scroll-reveal animation: `.reveal` → `.in` via IntersectionObserver
  (threshold 0.15, `0.7s ease`, translateY 26px) with stagger delays
  `d1..d3` on successive cards, respecting `prefers-reduced-motion: reduce`
  (all cards immediately visible at final position, no animation).
- The card list renders each milestone in a flex row: dot column pinned to the
  rail on the left, card content to the right — no horizontal overflow at any
  breakpoint (works at 320px and up).
- Empty-field resilience per SRS failure table: missing date hides the pill,
  missing description omits the paragraph, unknown dot variant falls back to
  default.

## Out of scope

- Real personal content: actual job history, companies, degrees, and dates.
  This story ships the approved placeholder entries (clearly-marked as
  editable); the stakeholder supplies real content later.
- The older English placeholder draft of the timeline (emoji dots, "Read
  more ▾" toggle, `[bracketed]` copy) that still exists lower in
  `design/index.html` — it is a build artifact and must **not** ship
  (design-system §3 known deviation).
- Expandable/read-more milestone entries, filtering, tabs, or any
  interactivity on the cards — final draft entries are static.
- Any other section (Nav, Hero, About, Skills, Contact, Footer) and the page
  anchor wiring to `#experience` (the Nav "Experience" link lives in the Nav
  component — it only needs this story's `id` to exist).
- Backend, database, or any data fetching — the milestone array is static.

## UI scope

The Experience section on the single scrolling landing page, per the approved
final Vietnamese draft in `design/index.html` (lines 339–381). Referenced
design-system specs: §2.4 section head, §2.6 timeline item (dot + date pill +
role h3 + org line + description; static entries), §1.5 breakpoints and the
760px rail, §2.12 scroll reveal. States this story covers:

- default (static content at rest)
- scroll-in reveal (cards fade/slide in with stagger `d1..d3`)
- `prefers-reduced-motion` (all cards immediately visible)
- empty date (pill hidden, dot + card render)
- empty description (paragraph omitted)
- unknown dot variant (falls back to default)

**Component boundary note:** per architecture §4.2 and the recorded
`stack.component_boundary` fact, `Timeline.tsx` stays a Server Component.
The scroll-reveal IntersectionObserver behaviour is delegated to a small
client-side primitive (a `Reveal`/observer wrapper in `components/ui/`) that
this Server Component renders around each card — a Server Component can render
a Client Component child, so the animation works while the section itself
remains server-rendered. If another section (Hero/Skills) already introduced a
shared reveal primitive, reuse it; otherwise introduce it here.

## Acceptance criteria

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads | No scroll | Timeline section shows the section head (kicker, h2, lead) with `id="experience"`; all milestone cards are below the fold |
| AC-2 | Page loads | Timeline renders | Exactly four milestone cards render in newest-first order (2022 — nay first), each with a dot, date pill, role h3, org line, and description |
| AC-3 | Timeline rail | On load | The vertical rail line is continuous from the first to the last milestone dot (no gaps, no overflow beyond the dots) |
| AC-4 | Cards scroll into view | IntersectionObserver fires (threshold 0.15) | Each card fades and slides in (`0.7s ease`, translateY 26px) with stagger delay `d1..d3` on successive cards |
| AC-5 | Timeline renders | No interaction | Dot and date-pill variants alternate: first (newest) milestone is default accent, second is `.teal` secondary, and so on |
| AC-6 | Viewport ≤600px | No interaction | Rail and cards render without horizontal overflow; content stays readable at 320px width |
| AC-7 | `prefers-reduced-motion: reduce` is set | Cards scroll into view | All cards are immediately visible at their final position; no translate or fade |
| AC-8 | A milestone has no date | Card renders | Date pill is hidden; dot and card render with role and org line |
| AC-9 | A milestone has no description | Card renders | Description paragraph is omitted; card renders with h3 and org line only |
| AC-10 | A milestone's dot variant is unknown/missing | Card renders | Dot falls back to the default (primary accent) variant |

## Dependencies

- Frontend scaffold in place (Next.js 15 App Router, Tailwind v3, design tokens
  from `design/design-system.md`) — architecture overview §3; `page.tsx` TODO
  and `globals.css` timeline styles (`.timeline-rail`, `.timeline-dot`,
  `.date-pill`, `.teal` variants) already exist.
- SRS LANDING-005 (requirement this story implements).
- Approved design `design/index.html` (final Vietnamese draft, lines 339–381)
  + `design/design-system.md` §2.6, §2.12; design-system §3 known deviation
  (strip the duplicate English placeholder draft and dead JS).
- **Nav story (parallel):** the Nav "Experience" link anchors to `#experience`;
  this story supplies that `id`. Coordinate so the anchor target exists before
  nav-link verification runs.
- **Skills story (parallel):** whichever lands first establishes the shared
  reveal primitive / scroll-observer pattern; coordinate on reusing it.
- No external accounts, credentials, or data required — milestones ship as
  placeholders.
