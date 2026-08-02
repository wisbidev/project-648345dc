# Test Cases — Footer

Module: `landing`
Plan item: 6 of 6 (P3) — Footer
Implements: SRS LANDING-007
Story: `docs/landing/stories/footer.md`
Risk level: **Low** — static presentational section; no data writes, no
permissions, no backend, and no client JS (the pill is a plain anchor whose
smooth scroll comes from root CSS). Happy-path depth (one case per SRS
acceptance criterion, plus the pinned copyright copy and reduced-motion
behaviour) is proportionate. Error/edge cases (AC-8 page already at top,
AC-9 empty name) are out of scope for this pass per the task instruction and
are covered in the failure-behaviour matrix of the SRS.

> **Copy note:** SRS §4.6 Behaviour 2 cites the earlier-draft string
> "© 2026 · Minh."; the story pins the **final Vietnamese draft** from the
> approved design ("© {currentYear} Nguyễn Minh Anh. Được thiết kế và phát
> triển bởi chính tôi.") as the binding copy, and SRS §5 names the approved
> design the source of truth for appearance. TC-FOOTER-02 asserts the binding
> copy and flags the SRS line for PM reconciliation.

## Traceability

| Case | SRS AC | Story AC | Behaviour |
|---|---|---|---|
| TC-FOOTER-01 | LANDING-007 AC-1 | AC-1 | §4.6 Behaviour 1, 4 |
| TC-FOOTER-02 | LANDING-007 AC-1 (data) | AC-2 | §4.6 Behaviour 2; Data touched: Year, Name |
| TC-FOOTER-03 | LANDING-007 AC-2 | AC-3 | §4.6 Behaviour 3 |
| TC-FOOTER-04 | LANDING-007 AC-3 | AC-4 | §4.6 Behaviour 3 (hover) |
| TC-FOOTER-05 | LANDING-007 AC-4 | AC-5 | §6 NFR accessibility |
| TC-FOOTER-06 | LANDING-007 AC-5 | AC-6 | §4.6 Behaviour 1; §6 NFR responsive |
| TC-FOOTER-07 | — | AC-7 | §6 NFR accessibility (reduced motion) |

---

**Scenario**: Footer renders at the bottom of the page
**Given**: the page is loaded and fully scrolled to the bottom
**When**: no interaction is performed
**Then**:
- The footer is the last element of the page, rendered after the Contact
  section, on a `--color-surface` background with a `1px` top border in
  `--color-border`
- The footer is a single row (`display: flex; justify-content: space-between;
  gap: 16px; flex-wrap: wrap`) inside the standard `1120px` container with
  `24px` gutters and `28px` vertical padding
- The copyright text is on the left and the back-to-top pill on the right

**Scenario**: Copyright text renders with the current year
**Given**: the page is loaded
**When**: the footer renders
**Then**:
- The copyright text shows exactly
  "© {currentYear} Nguyễn Minh Anh. Được thiết kế và phát triển bởi chính
  tôi." with `{currentYear}` replaced by `new Date().getFullYear()` (2026 in
  the current build)
- The text is rendered at 13.5px (`--text-xs`) in `--color-text-muted`

**Scenario**: Back-to-top pill scrolls smoothly to the top of the page
**Given**: the page is loaded, an element with `id="top"` exists at the top of
the document, and the page is scrolled down
**When**: the visitor clicks the back-to-top pill
**Then**:
- The page scrolls smoothly to the very top of the document
- After the scroll completes, the top of the page (the `#top` anchor) is
  visible and the footer is out of view

**Scenario**: Hovering the back-to-top pill shows the hover state
**Given**: the page is loaded and the mouse pointer is not over the pill
**When**: the mouse hovers over the back-to-top pill
**Then**:
- The pill's border and text turn `--color-primary`
- The pill lifts by `translateY(-2px)`

**Scenario**: Back-to-top pill receives a visible keyboard focus ring
**Given**: the page is loaded and the visitor is using the keyboard
**When**: the visitor presses Tab until focus lands on the back-to-top pill
**Then**:
- The pill is the only focusable element in the footer
- A visible 3px `--color-focus` outline with 3px offset is displayed around
  the pill
- Pressing Enter on the focused pill scrolls the page to the top

**Scenario**: Footer renders correctly on a narrow viewport
**Given**: the page is loaded on a viewport ≤600px wide
**When**: no interaction is performed
**Then**:
- The footer row wraps (`flex-wrap: wrap`) when the content does not fit on
  one line
- The copyright text and the back-to-top pill are both fully visible
- No horizontal page scroll occurs at 320px and up

**Scenario**: Back-to-top respects `prefers-reduced-motion`
**Given**: the visitor has `prefers-reduced-motion: reduce` set and the page is
loaded and scrolled down
**When**: the visitor clicks the back-to-top pill
**Then**:
- The page jumps to the top instantly with no smooth-scroll animation
- No JavaScript error is thrown
