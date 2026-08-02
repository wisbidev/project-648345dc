# SRS — Landing Page

Module: `landing`
Last updated: 2026-05-27
Design: [View the approved design](http://localhost:8080/design/648345dc-a99c-43d4-8d86-b262dbb91170)
Design system: `design/design-system.md`

## 1. Purpose

A single-page personal introduction landing page ("Giới thiệu bản thân") that
presents who the stakeholder is, their background, skills, experience, and how
to reach them. It is the stakeholder's primary digital presence. All content
starts as clearly-marked placeholder text editable directly in the design
preview. Static frontend only — no backend, no database, no build pipeline
beyond Next.js. If this page is not built, there is no public-facing identity
for the stakeholder.

## 2. Actors

| Actor | Who they are | What they may do in this module |
|---|---|---|
| Visitor | Anyone who arrives at the page | Browse all sections, use social links, submit the contact form |
| Stakeholder | The person the page represents | Edit all placeholder copy directly in the design preview or in code |

## 3. Scope

**In scope** — the six functions specified in the plan:

- Hero section
- About section
- Skills section
- Experience & education timeline
- Contact section with form
- Footer

**Out of scope**

- Authentication and user accounts — belongs to an `auth` module, which is not planned.
- Backend or database — this is a static site; the contact form submits via `mailto:`.
- Multi-page navigation or sub-routes.

## 4. Functional Requirements

All ids are permanent. Requirement ids never change even if the requirement is
withdrawn.

### 4.1 Hero Section

**Requirement LANDING-001 — Hero renders with all required elements**

*As a* Visitor, *I want to* see the full-width hero with my name, headline,
tagline, avatar, and two CTA buttons, *so that* I understand who this page is
about and what I can do next.

Behaviour:

1. The hero section occupies the full viewport width and is the first content
   visible on page load.
2. The hero displays: availability badge, name (display font, large), one-line
   headline, tagline paragraph, avatar image with decorative dashed frame, and
   two CTA buttons ("Liên hệ" and "Xem thêm").
3. The name uses display serif typography at `clamp(42px, 6vw, 68px)`.
4. The availability badge shows a pulsing dot and "Sẵn sàng nhận dự án" text
   in a secondary-colour pill.
5. The avatar image renders inside a decorative dashed primary-colour frame.
6. Both CTA buttons are visible without scrolling on a typical desktop viewport
   (1280×720 and above).
7. The "Liên hệ" button scrolls to the Contact section.
8. The "Xem thêm" button scrolls to the About section.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads on desktop | No interaction | Hero is fully visible: badge, name, headline, tagline, avatar, two CTAs |
| AC-2 | Page loads on mobile (≤600px) | No interaction | Hero stacks vertically and all elements remain visible without horizontal scroll |
| AC-3 | Visitor clicks "Liên hệ" | Click | Page scrolls smoothly to the Contact section |
| AC-4 | Visitor clicks "Xem thêm" | Click | Page scrolls smoothly to the About section |
| AC-5 | Visitor has `prefers-reduced-motion` set | Page loads | No animation plays; all hero content is immediately visible |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Avatar image missing | `src` is empty or returns 404 | Decorative frame remains visible; placeholder is a neutral surface-color area |
| Name is empty | Stakeholder has not edited the placeholder | The h1 renders with the placeholder text "Tên của bạn" |
| Visitor uses keyboard only | Tab through hero | Focus order: badge → h1 → paragraph → avatar → CTA1 → CTA2; each receives a visible 3px primary-colour focus ring |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| Name | text | yes | Placeholder; stakeholder edits in design preview |
| Headline | text | yes | One line, max ~80 characters |
| Tagline | text | yes | One short paragraph |
| Avatar | image URL | yes | Renders at a defined aspect ratio; decorative frame added by CSS |
| Availability label | text | yes | Fixed: "Sẵn sàng nhận dự án" or stakeholder's own text |

---

**Requirement LANDING-002 — Nav bar scrolls with the page and collapses on mobile**

*As a* Visitor, *I want to* see the nav bar at the top, navigate to any section,
and have it work on mobile, *so that* I can always reach any part of the page.

Behaviour:

1. The nav bar is fixed to the top of the viewport.
2. It shows: brand mark ("Minh."), links (About, Skills, Experience, Contact),
   and a "Liên hệ ngay" CTA button.
3. At viewport ≤900px the links and CTA are hidden and replaced by a hamburger
   menu button.
4. Opening the hamburger menu reveals a full-width drop-down with all nav links
   and the CTA; it closes when a link is clicked or when Escape is pressed.
5. The nav bar has a translucent blurred background and gains a bottom border
   and shadow once the page is scrolled (`.scrolled` class added by JS).

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads | No scroll | Nav bar is visible, transparent/blurred, no border |
| AC-2 | Page scrolls | Scrolled past 10px | Nav bar gains `--shadow-nav` and a `--color-border` bottom border |
| AC-3 | Viewport is ≤900px | No interaction | Links and CTA are hidden; hamburger button is visible |
| AC-4 | Hamburger is clicked | Click | Mobile menu slides down, `aria-expanded` is true |
| AC-5 | A nav link is clicked | Click | Page scrolls to target section and menu closes |
| AC-6 | Escape key is pressed | Menu is open | Menu closes and focus returns to the hamburger button |
| AC-7 | Tab key is used | In mobile menu | Each link receives a visible focus ring; no focus is trapped outside the menu |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Section anchor missing | Target `id` not found | Browser handles scroll to non-existent anchor; no JS error |
| `aria-expanded` missing | Screen reader reads menu button | Value defaults to `false`; state is incorrect until JS sets it — must be implemented |

---

### 4.2 About Section

**Requirement LANDING-003 — About section displays narrative with stats**

*As a* Visitor, *I want to* read the stakeholder's background and see proof
points, *so that* I can decide if they are a good fit.

Behaviour:

1. The About section displays a portrait image (left column) and a narrative
   paragraph plus three stat cards (right column) on desktop.
2. On mobile (≤900px) the layout collapses to a single column: portrait above
   narrative and stats.
3. The three stat cards each show a large numeral and a short label (e.g.
   "8+ Năm kinh nghiệm").
4. All content in this section scrolls into view with the scroll-reveal
   animation.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads | About section scrolls into view | Portrait, paragraph, and three stat cards are all visible |
| AC-2 | Viewport ≤900px | No interaction | Portrait renders above the paragraph and stats in a single column |
| AC-3 | Visitor has `prefers-reduced-motion` set | Section enters viewport | All content is immediately visible; no translate or fade animation |
| AC-4 | Stat card | Hover | No hover lift or colour change (stat cards are non-interactive) |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Portrait image missing | `src` returns 404 or empty | Portrait container renders the decorative frame with a neutral surface placeholder |
| Stat label overflows | Label text is longer than card width | Text wraps within the card; card height expands; no overflow of card boundary |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| Portrait | image URL | yes | Stakeholder provides or uses placeholder |
| Narrative paragraph | text | yes | Stakeholder edits in design preview; wraps naturally |
| Stat numeral | number | yes | Integer or number with suffix; rendered as large display text |
| Stat label | text | yes | Short, max ~30 characters |

---

### 4.3 Skills Section

**Requirement LANDING-004 — Skills section displays a responsive grid of cards**

*As a* Visitor, *I want to* see the stakeholder's skills in a clear grid with
proficiency indicators, *so that* I can quickly assess their expertise.

Behaviour:

1. The Skills section shows a heading (eyebrow, h2, lead) followed by a
   responsive grid of skill cards.
2. The grid is three columns wide on desktop, two columns at ≤900px, and one
   column at ≤600px.
3. Each skill card contains: an icon tile, skill name (h3), a short
   description, and an animated proficiency meter.
4. The meter fill animates from 0 to its target percentage when the card
   scrolls into view (threshold 0.15).
5. Under `prefers-reduced-motion` the meter fill starts at its final value
   immediately.
6. Each card lifts (`translateY(-6px)`) and gains a shadow on hover.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads | No scroll | Skills section heading is visible; cards are below the fold |
| AC-2 | Cards scroll into view | IntersectionObserver fires | Each card's meter animates from 0 to `data-w`% over ~1s |
| AC-3 | Viewport ≤900px | No interaction | Grid displays 2 columns |
| AC-4 | Viewport ≤600px | No interaction | Grid displays 1 column; no horizontal scroll |
| AC-5 | Mouse hovers over a card | Hover | Card lifts `-6px` with shadow |
| AC-6 | Keyboard focus lands on a card | Tab | 3px primary-colour focus ring is visible |
| AC-7 | `prefers-reduced-motion: reduce` is set | Cards scroll into view | No animation; meters are at their final value immediately |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Skill name is empty | No text provided | h3 renders as empty; card remains functional |
| Proficiency value missing | `data-w` absent or invalid | Meter fill defaults to 0%; no animation error |
| Proficiency out of range | `data-w` > 100 | Meter fill capped at 100%; no visual overflow |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| Skill name | text | yes | Max ~50 characters |
| Skill description | text | yes | One line |
| Skill icon | SVG or image URL | yes | 48px tile with white icon on primary/secondary background |
| Proficiency | integer 0–100 | yes | Stored in `data-w` attribute; displayed as meter fill width |
| Variant | "default" or "teal" | no | Switches meter fill colour between primary and secondary |

---

### 4.4 Experience & Education Timeline

**Requirement LANDING-005 — Timeline displays milestones in chronological order**

*As a* Visitor, *I want to* see the stakeholder's work history and education
as a vertical timeline, *so that* I can follow their career progression.

Behaviour:

1. The Timeline section shows a heading followed by a single-column vertical
   rail (max-width 760px) of milestone cards.
2. Each milestone card contains: a dot on the rail, a date pill, a role or
   degree title (h3), an organisation or institution line, and a description
   paragraph.
3. Dots alternate between primary (accent) and secondary (teal) colour variants.
4. All cards scroll into view with the scroll-reveal animation.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads | No scroll | Timeline heading is visible; all cards are below the fold |
| AC-2 | Cards scroll into view | IntersectionObserver fires | Each card fades and slides in with stagger delay |
| AC-3 | Timeline rail | On load | Vertical rail line is continuous from first to last milestone dot |
| AC-4 | Viewport ≤600px | No interaction | Timeline rail and cards render correctly without horizontal overflow |
| AC-5 | `prefers-reduced-motion: reduce` is set | Cards scroll into view | All cards are immediately visible at final position |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Milestone date is empty | No date provided | Date pill is hidden; dot and card render without it |
| Milestone description is empty | No description provided | Paragraph is omitted; card renders with h3 and org line only |
| Milestone dot variant unknown | Value not "default" or "teal" | Defaults to primary (accent) dot |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| Milestone date | text | yes | Format: "2022 — nay" or "2020 — 2022"; uppercase 12px pill |
| Role / degree | text | yes | Short, max ~60 characters |
| Organisation / institution | text | yes | Short, max ~60 characters |
| Description | text | no | One paragraph; omit if not provided |
| Dot variant | "default" or "teal" | no | Defaults to "default" |

---

### 4.5 Contact Section with Form

**Requirement LANDING-006 — Contact section renders a validated mailto form**

*As a* Visitor, *I want to* see the stakeholder's contact details, social
links, and a form to send a message, *so that* I can get in touch.

Behaviour:

1. The Contact section shows a heading, a two-column layout (contact info +
   form) on desktop, collapsing to single column on mobile.
2. Contact info rows display: email (mailto link), location, and phone (tel
   link), each with an icon tile and a divider.
3. Social icon tiles display: GitHub, LinkedIn, and any additional social
   links the stakeholder adds.
4. The form contains three fields: Name (text), Email (email), Message
   (textarea), each with a required marker and a label.
5. Client-side validation runs on submit:
   - Name must not be empty.
   - Email must be a valid format.
   - Message must not be empty.
6. On a validation error, the first invalid field receives focus and an
   inline error message appears below it in danger colour.
7. On a valid submit, the browser opens a `mailto:` link with prefilled subject
   and body constructed from the three field values.
8. After submit (mail client opens) the form is replaced by a success card
   with a confirmation message; the card auto-hides after 8 seconds.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads | No interaction | Contact heading, info rows, social icons, and form are all visible |
| AC-2 | Name field is empty and form is submitted | Submit | Field border turns danger colour; error "Vui lòng nhập tên." appears; field receives focus |
| AC-3 | Email field has invalid format and form is submitted | Submit | Field border turns danger colour; error "Vui lòng nhập email hợp lệ." appears; field receives focus |
| AC-4 | Message field is empty and form is submitted | Submit | Field border turns danger colour; error "Vui lòng nhập tin nhắn." appears; field receives focus |
| AC-5 | All three fields are valid | Submit | `mailto:` link opens with prefilled subject and body; success card appears with spring animation |
| AC-6 | Success card | Appears | It auto-hides after 8 seconds and the form is restored |
| AC-7 | Viewport ≤600px | No interaction | Layout is single column; no horizontal scroll |
| AC-8 | `prefers-reduced-motion: reduce` is set | Success card appears | No spring animation; card fades in immediately |
| AC-9 | Tab key is used in form | Tab through fields | Each focusable element receives a visible focus ring; submit button last |
| AC-10 | Email is clicked in info row | Click | Opens `mailto:` with pre-filled recipient address |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Validation error on multiple fields | All fields empty on submit | First field receives focus; only its error is shown; others remain at default |
| User corrects and re-submits | Field was invalid, now valid | Error clears immediately on next `input` event |
| Email field pasted with whitespace | `user@ example.com` | Field value is not trimmed before validation; validation fails with "hợp lệ" message |
| Contact info is empty | Stakeholder removes a row | Row is omitted; no empty space in layout |
| No mail client installed | Submit is clicked | Browser default behaviour; no error shown to user |
| Success card dismissed early | User clicks anywhere in the card | Card hides immediately; form is not restored until the 8s timer fires |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| Name | text | yes | Extracted from field value; prefilled into mailto body |
| Email | email | yes | Used as `From:` in mailto; not stored |
| Message | text | yes | Extracted from textarea value; prefilled into mailto body |
| Contact email | email | yes | Stakeholder's email; used as mailto `to:` address |
| Social URLs | URL | no | Stakeholder adds via code; each must be a valid href |
| Success message | text | yes | Default: "Cảm ơn bạn! Tin nhắn đã được gửi." |

---

### 4.6 Footer

**Requirement LANDING-007 — Footer displays copyright and back-to-top control**

*As a* Visitor, *I want to* see a footer with the year, stakeholder name, and a
back-to-top link, *so that* I know the page is complete and can return to the
top easily.

Behaviour:

1. The footer is a single row: copyright text on the left, back-to-top pill on
   the right.
2. The copyright text shows "© 2026 · Minh." (name is the stakeholder's name).
3. The back-to-top pill contains an up-arrow character and the text "Lên đầu
   trang"; clicking it smoothly scrolls the page to the top.
4. The footer renders on the surface background with a top border.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads | No scroll | Footer is visible at the bottom of the page |
| AC-2 | Back-to-top pill is clicked | Click | Page scrolls smoothly to the top of the document |
| AC-3 | Mouse hovers over back-to-top | Hover | Border and text turn primary colour; pill lifts `-2px` |
| AC-4 | Keyboard focus lands on back-to-top | Tab | 3px primary focus ring is visible |
| AC-5 | Viewport ≤600px | No interaction | Footer layout is unchanged; text wraps if needed |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Stakeholder name is empty | No name set | Footer shows "© 2026" without the name separator |
| Page is already at top | Back-to-top clicked | No action; no scroll event fired |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| Year | number | yes | Defaults to current year (2026) |
| Name | text | yes | Stakeholder's name; defaults to "Minh." |

---

## 5. Screens

The approved HTML is the source of truth for appearance. All six functions are
contained in a single scrolling page.

| Screen | Section in the design | Functions it serves | States that must exist |
|---|---|---|---|
| Single-page landing | Nav (fixed) | LANDING-002 | default, scrolled |
| | Hero | LANDING-001 | default; reduced-motion |
| | About | LANDING-003 | default; reduced-motion |
| | Skills | LANDING-004 | default; hover; in-view animation; reduced-motion |
| | Experience | LANDING-005 | default; reduced-motion |
| | Contact | LANDING-006 | default; field-error; success; reduced-motion |
| | Footer | LANDING-007 | default; hover; focus |

## 6. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | First Contentful Paint < 1.5s on a typical 4G connection |
| Accessibility | Keyboard reachable; visible focus ring on all interactive elements; `aria-label` on icon-only links; form labels explicitly associated with inputs; contrast ≥ 3:1 for all text (see design-system §1.2 contrast audit for pass/fail details) |
| Responsive | Works at 320px and up; no horizontal page scroll at any breakpoint |
| Localisation | All UI copy is in Vietnamese; date format is Vietnamese ("2022 — nay"); email validation uses the RFC 5322 pattern |
| Motion | All animations honour `prefers-reduced-motion: reduce`; no motion plays unless the user has not opted out |
| Privacy | No personal data is stored on any server; contact form uses `mailto:` only |

## 7. Dependencies and Assumptions

- **Depends on:** None — static frontend with no external services.
- **Assumption:** The stakeholder's browser supports `mailto:` links. If they
  require server-side form handling, a new backend story must be planned.
- **Assumption:** The avatar and portrait images are hosted externally or placed
  in `public/`. If image hosting is needed, that is out of scope and must be
  added as a new story.
- **Assumption:** The page is deployed to a CDN or static host supporting
  Next.js static export. If server-side rendering is required, the shape
  changes and a `stateless` plan must replace the current `static` plan.

## 8. Traceability

Every plan item appears exactly once; every requirement id traces to a test
case file.

| Plan item | Requirement ids | Test cases |
|---|---|---|
| Hero section | LANDING-001, LANDING-002 | `docs/landing/test-cases/hero.md` |
| About section | LANDING-003 | `docs/landing/test-cases/about.md` |
| Skills section | LANDING-004 | `docs/landing/test-cases/skills.md` |
| Experience & education timeline | LANDING-005 | `docs/landing/test-cases/experience.md` |
| Contact section with form | LANDING-006 | `docs/landing/test-cases/contact.md` |
| Footer | LANDING-007 | `docs/landing/test-cases/footer.md` |
