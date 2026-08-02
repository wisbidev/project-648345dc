# Story: Footer

Module: `landing` — plan item 6 of 6 (P3)
Implements: SRS LANDING-007

## User story

As a Visitor, I want to see a footer with the copyright year, the stakeholder's
name, and a back-to-top pill, so that I know the page is complete and can
return to the top in one click.

## In scope

- The footer as the last element of the single-page landing, after the Contact
  section, rendered by `Footer.tsx` as a **Server Component** (architecture
  §4.2 — no `"use client"`, no JS). Smooth scrolling is handled by the root
  `scroll-behavior: smooth` already present in `globals.css` (line 76); the
  back-to-top pill is a plain anchor, so no event handler is needed.
- Layout: one row — copyright on the left, back-to-top pill on the right —
  `display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap`
  (approved design `.foot-inner`, design HTML line 244), inside the standard
  `1120px` container with `24px` gutters.
- Footer chrome: `--color-surface` background, `1px` top border
  `--color-border`, padding `28px 0` (design HTML line 243; design system
  §2.11).
- Copyright text (left): **"© {currentYear} Nguyễn Minh Anh. Được thiết kế và
  phát triển bởi chính tôi."** — 13.5px `--text-xs`, `--color-text-muted`.
  The year is rendered at build time via `new Date().getFullYear()` (SRS
  default: current year, 2026). This is the **final Vietnamese draft** from the
  approved design (design HTML lines 807–815) and is the binding copy.
  > Note: SRS §4.6.2 cites the earlier-draft string "© 2026 · Minh."; per
  > design-system §1 and §4 the approved HTML is the source of truth and the
  > story ships only the final Vietnamese draft. The SRS line is superseded by
  > this story and should be reconciled by PM.
- Back-to-top pill (right): `<a class="back-to-top" href="#top">` containing
  the text **"Lên đầu trang"** and an up-arrow inline SVG (24×24, stroke
  `currentColor`, stroke-width 2, round caps, path `M12 19V5M5 12l7-7 7 7` —
  design HTML lines 810–813). Reuses the existing `.back-to-top` styles in
  `globals.css` (lines 495–517): `--color-bg` fill, `1px --color-border`,
  `--radius-full`, muted 13.5px text; hover → text and border turn
  `--color-primary` and the pill lifts `translateY(-2px)`.
- Keyboard focus: the pill is the only focusable element in the footer; it
  receives the global 3px `--color-focus` outline with 3px offset.
- A document-top anchor: an element with `id="top"` must exist at the top of
  the page (on the page wrapper / topmost element) so the pill always has a
  target. If the page is already at the top, clicking it is a no-op (SRS
  failure table).
- Reduced motion: under `prefers-reduced-motion: reduce` the root
  `scroll-behavior` is already `auto` (globals.css line 81), so clicking the
  pill jumps instantly with no animation.
- Responsive: at ≤600px the row wraps (`flex-wrap: wrap`), text keeps its
  size, and there is no horizontal scroll (SRS AC-5).

## Out of scope

- All other sections (Nav, Hero, About, Skills, Experience, Contact) —
  separate plan items.
- Any JavaScript or client logic in the footer: the pill is an anchor whose
  smooth scroll comes from CSS, keeping `Footer.tsx` a Server Component.
- The English placeholder draft footer (design HTML lines 513–518) and any
  dead JS from the design file — must **not** be shipped (design-system §4).
- Real content decisions: the copy is pinned from the approved design;
  the stakeholder edits it directly in the preview or in code.
- Backend, database, analytics, third-party scripts — static shape
  (architecture §2).

## UI scope

One screen: the footer of the single-page landing, exactly as in the approved
design's final Vietnamese draft (preview:
http://localhost:8080/design/648345dc-a99c-43d4-8d86-b262dbb91170). States
that must exist per SRS §5: default, hover, focus. The footer has no
scroll-reveal animation and no active/pressed variant.

## Acceptance criteria

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads | No interaction | Footer is visible at the bottom of the page: copyright row on the left, back-to-top pill on the right, on `--color-surface` with a top border |
| AC-2 | Copyright text renders | Page loads | Shows "© {currentYear} Nguyễn Minh Anh. Được thiết kế và phát triển bởi chính tôi." with the year filled in |
| AC-3 | Back-to-top pill is clicked | Click | Page scrolls smoothly to the top of the document |
| AC-4 | Mouse hovers over back-to-top | Hover | Border and text turn `--color-primary`; pill lifts `translateY(-2px)` |
| AC-5 | Keyboard focus lands on back-to-top | Tab | 3px `--color-focus` outline is visible; the pill is the only focusable element in the footer |
| AC-6 | Viewport ≤600px | No interaction | Footer row wraps if needed; all content visible; no horizontal scroll |
| AC-7 | `prefers-reduced-motion: reduce` is set | Back-to-top clicked | Page jumps to the top instantly; no smooth-scroll animation |
| AC-8 | Page is already at the top | Back-to-top clicked | No action; no scroll event fired; no JS error |
| AC-9 | Stakeholder clears the name portion of the copyright copy | Page loads | No orphan separator or trailing punctuation remains; the year alone renders |

## Dependencies

- Root `scroll-behavior: smooth` and the reduced-motion `auto` reset already
  exist in `globals.css` (lines 76, 81) — verify they are still present when
  this story lands; do not duplicate them.
- `.back-to-top` pill styles already exist in `globals.css` (lines 495–517) —
  reuse them; do not redefine.
- An element with `id="top"` at the top of the document (page wrapper or
  topmost element) — this story adds it if no other story has claimed it.
- Design tokens and contrast from `design/design-system.md` §1 (approved):
  footer muted text on `--color-surface` is 4.69:1, passes AA.
- No external assets, services, or accounts.
