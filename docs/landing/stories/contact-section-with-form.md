# Story — Contact section with form

**Module:** `landing`
**Plan item:** 5. Contact section with form
**Implements:** LANDING-006 (SRS §4.5)
**Component:** `code/frontend/components/Contact.tsx` (`"use client"`)
**Design:** `design/design-system.md` §2.8 (contact info row + social icon), §2.9 (form field), §2.10 (form card / success state), §2.12 (scroll reveal)

## User story

As a **Visitor**, I want to see the stakeholder's contact details, social links,
and a form to send a message, so that I can get in touch.

## In scope

- Contact section with `id="contact"` on the single-page landing: section head
  (kicker, h2, lead) per design-system §2.4, then a two-column layout —
  contact info column (0.9fr) + form card column (1.1fr) on desktop,
  collapsing to one column at ≤900px.
- Contact info rows: email (real `mailto:` link), location (plain text), and
  phone (`tel:` link), each with a 44px icon tile, a bold label, a value, and
  a 1px border divider between rows (last row unbordered). Rows the
  stakeholder removes are omitted entirely.
- Social icon tiles (42px, 1.5px border, `--radius-md`): GitHub and LinkedIn,
  plus any additional social links the stakeholder adds in code. Each
  icon-only link carries an `aria-label`. Hover turns icon + border
  `--color-primary` and lifts `-3px`.
- Contact form card (`--color-surface`, `--shadow-float`, padding 36px
  desktop / 26px 20px at ≤600px) containing:
  - Name (text input), Email (email input), Message (textarea); each with a
    label bound via `for`/`id` and a `*` required marker; placeholders such as
    `ban@example.com`.
  - A primary submit button ("Gửi tin nhắn" or the stakeholder's own label)
    sized per design-system §2.1 default.
- Client-side validation on submit (`novalidate` on the form, JS validation):
  - Name must not be empty → error "Vui lòng nhập tên."
  - Email must match a valid email format → error "Vui lòng nhập email hợp lệ."
  - Message must not be empty → error "Vui lòng nhập tin nhắn."
  - On error: the first invalid field receives focus and its border turns
    `--color-danger`; an inline error message appears below the field in
    `--color-danger` (12.5px/500). Only the first invalid field's error shows;
    others stay at default.
  - Errors clear on the next `input` event on that field.
- On a fully valid submit: construct a `mailto:` link to
  `NEXT_PUBLIC_CONTACT_EMAIL` with a prefilled subject and a body built from
  the three field values, and open it via `window.open()`. No data leaves the
  browser except through the visitor's own mail client.
- After submit: the form card swaps to the success state (§2.10) — a 72px
  `--color-secondary-soft`/`--color-secondary` check icon tile, an h3, and the
  message "Cảm ơn bạn! Tin nhắn đã được gửi." — entering with the
  `--duration-pop` spring (0.45s `cubic-bezier(.34,1.56,.64,1)`). The card
  auto-hides after 8 seconds and the form is restored. Clicking anywhere on
  the card hides it early (form is still restored only when the 8s timer
  fires).
- Accessibility: every focusable element (inputs, textarea, submit, info
  links, social links) shows the 3px `--color-focus` outline at
  `:focus-visible`; labels are explicitly associated with inputs.
- `prefers-reduced-motion: reduce`: no spring/pop/reveal animation — the
  success card fades in immediately and scroll-reveal content is immediately
  visible.
- Scroll-reveal entrance for the section content per §2.12 (threshold 0.15,
  `d1..d4` stagger).

## Out of scope

- Any server-side or third-party form handling (Formspree, Netlify Forms, API
  routes) — the form is `mailto:` only, per architecture overview §4.4.
- Persisting or storing submitted data — nothing is stored anywhere.
- Authentication, user accounts, or spam protection.
- The other sections of the page (Nav, Hero, About, Skills, Timeline, Footer)
  — they are separate stories. The hero "Liên hệ" CTA and nav Contact link
  target `#contact`; this story only provides the section that id lands on.
- Styling or behavior changes to any section other than Contact.

## UI scope

One screen: the Contact section of the single-page landing (mid-page, below
the Experience timeline). States that must exist:

| State | Trigger | Behaviour |
|---|---|---|
| Default | Page loads / section scrolls into view | Heading, info rows, social tiles, and form fields all visible with reveal animation |
| Field error | Submit with invalid/empty field(s) | First invalid field focused, `--color-danger` border + inline message; others unchanged |
| Success | Valid submit | Success card pops in; auto-hides after 8s, then form restores |
| Reduced motion | `prefers-reduced-motion: reduce` | No reveal/pop animation; success card appears immediately |
| Focus (keyboard) | Tab through section | 3px `--color-focus` outline on every interactive element |
| Hover | Pointer over social tile / info link / submit | Per §2.8 / §2.1 states (lift, primary color, hover bg) |

## Acceptance criteria

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Page loads | Contact section in view | Heading, email/location/phone rows, GitHub + LinkedIn social tiles, and the three-field form are all visible |
| AC-2 | Name field is empty | Submit clicked | Name border turns `--color-danger`; "Vui lòng nhập tên." appears below it; Name receives focus |
| AC-3 | Email field has an invalid format (e.g. `abc@`) | Submit clicked | Email border turns `--color-danger`; "Vui lòng nhập email hợp lệ." appears; Email receives focus |
| AC-4 | Message field is empty | Submit clicked | Message border turns `--color-danger`; "Vui lòng nhập tin nhắn." appears; Message receives focus |
| AC-5 | All three fields empty | Submit clicked | Only Name shows an error and receives focus; Email and Message stay at default |
| AC-6 | A field was invalid, then corrected | Next `input` event on that field | The error clears immediately and the border returns to default |
| AC-7 | Email is `user@ example.com` (whitespace) | Submit clicked | Validation fails with "Vui lòng nhập email hợp lệ." (value is not trimmed before validating) |
| AC-8 | All three fields valid | Submit clicked | A `mailto:` link to `NEXT_PUBLIC_CONTACT_EMAIL` opens with subject and body prefilled from the field values; success card appears with the pop animation |
| AC-9 | Success card is visible | 8 seconds pass | Card hides and the form fields are restored |
| AC-10 | Success card is visible | User clicks anywhere on it | Card hides immediately; form restores only when the 8s timer fires |
| AC-11 | Viewport ≤900px | No interaction | Layout is a single column; no horizontal scroll |
| AC-12 | Viewport ≤600px | No interaction | Form card padding is 26px 20px; everything still fits without horizontal scroll |
| AC-13 | `prefers-reduced-motion: reduce` is set | Valid submit | Success card appears immediately, no spring animation |
| AC-14 | Tab key used in the form | Tab through fields | Each input, the textarea, and the submit button receives a visible 3px `--color-focus` outline; submit is last |
| AC-15 | Email row in the info column | Click | Opens a `mailto:` link with the recipient address prefilled |
| AC-16 | A social tile (GitHub/LinkedIn) | Click | Opens the profile URL in a new tab |
| AC-17 | `NEXT_PUBLIC_CONTACT_EMAIL` is unset or empty | Valid submit | Form still validates and shows the success state; the `mailto:` recipient falls back to a sensible placeholder rather than throwing |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Contact info row removed | Stakeholder deletes a row's data | Row is omitted; layout leaves no empty space |
| No mail client installed | Valid submit | Browser default behaviour; no error surfaced to the visitor |
| Stakeholder adds a social link | New URL in code | Renders as an additional 42px tile with `aria-label`; must be a valid href |
| Email field pasted with surrounding whitespace | ` user@example.com ` | Not trimmed before validation; fails with "hợp lệ" message per AC-7 |

## Dependencies

- Approved design (`design/index.html`) and `design/design-system.md` — the
  source of truth for tokens, states, and copy. **Done.**
- `NEXT_PUBLIC_CONTACT_EMAIL` must exist in `code/frontend/.env.example`
  (already declared per architecture overview §6) — the stakeholder sets the
  real recipient address later; the placeholder value is fine for the build.
- No other landing story blocks this one: the section is self-contained and
  only needs its `id="contact"` for the Nav/Hero anchors (LANDING-001/002)
  to land on it. Those stories may land before or after.
- No external accounts or credentials required.

## Implementation notes (for Dev)

- `Contact.tsx` must start with `"use client"` (browser APIs, form state,
  `mailto:` construction) — architecture overview §4.2.
- Build with the approved design tokens via Tailwind; no arbitrary values
  (architecture §4.3).
- Subject/body for `mailto:`: encode with `encodeURIComponent`; subject is a
  short fixed line (e.g. "Liên hệ từ trang giới thiệu"), body contains the
  Name, Email, and Message fields, one per line.
- Email input uses `type="email"` but the form carries `novalidate` — all
  validation is the component's own JS so the error UX is consistent.
