# Test Cases — Contact Section with Form

Module: `landing`
Function: Contact section with form
Requirement: **LANDING-006 — Contact section renders a validated mailto form**
Risk level: **Low–Medium** — static section with no data writes or permissions,
but the form is the only interactive data-entry point on the page, so its
validation and mailto behaviour carry the risk for this item. All ten acceptance
criteria are covered below. The three validation-error criteria (AC-2–AC-4) are
included because they are explicit acceptance criteria in the SRS, not
speculative edge cases. The remaining SRS failure/boundary entries (multi-field
error ordering, whitespace email, error-clear-on-input, empty contact info, no
mail client, early success-card dismiss) are recorded in the SRS but out of
scope for this happy-path pass.

Verification note: this is a static frontend with no automated e2e harness (CI
runs lint + build only), so every scenario below is verified manually against
the running page (delivery flow step 10) in a desktop and a ≤600px viewport.

---

**Scenario**: Contact section renders all required elements on page load
**Given**: The landing page is loaded on a desktop viewport (width > 600px) and
the visitor scrolls to the Contact section
**When**: The visitor views the section with no interaction
**Then**: The section shows a heading, the contact info column (email, location,
and phone rows), the social icon tiles (GitHub, LinkedIn), and the form with
Name, Email, and Message fields — all visible at once (LANDING-006 AC-1,
behaviour 1)

**Scenario**: Contact info rows display email, location, and phone with icon tiles
**Given**: The Contact section is in view on desktop
**When**: The visitor reads the contact info column
**Then**: Three info rows are shown in order — email (a `mailto:` link to the
stakeholder's contact email), location (plain text), and phone (a `tel:` link)
— each with an icon tile and a divider between rows (LANDING-006 behaviour 2)

**Scenario**: Clicking the email row opens the mail client with the recipient pre-filled
**Given**: The Contact section is in view
**When**: The visitor clicks the email info row
**Then**: The browser opens a `mailto:` link addressed to the stakeholder's
contact email (LANDING-006 AC-10)

**Scenario**: Social icon tiles render GitHub and LinkedIn with accessible labels
**Given**: The Contact section is in view
**When**: The visitor reads the social icon row
**Then**: GitHub and LinkedIn icon tiles are visible; each is an anchor with a
valid `href` and an `aria-label` naming the site (LANDING-006 behaviour 3;
SRS §6 accessibility)

**Scenario**: Form shows Name, Email, and Message fields with labels and required markers
**Given**: The Contact section is in view
**When**: The visitor inspects the form
**Then**: Three fields render in order — Name (text input), Email (email input),
Message (textarea) — each with a visible label explicitly associated with its
input (`htmlFor`/`id`) and a required marker (LANDING-006 behaviour 4;
SRS §6 accessibility)

**Scenario**: Contact layout is two columns on desktop
**Given**: A desktop viewport wider than 600px and the Contact section is in view
**When**: The visitor views the section with no interaction
**Then**: The contact info column and the form render side by side in a
two-column layout (LANDING-006 behaviour 1)

**Scenario**: Contact layout collapses to a single column at ≤ 600px
**Given**: The viewport is ≤ 600px (e.g. 375px phone) and the Contact section is
in view
**When**: The visitor views the section with no interaction
**Then**: The layout is a single column (contact info above the form) with no
horizontal page scroll (LANDING-006 AC-7)

**Scenario**: Valid form submission opens a mailto link with prefilled subject and body
**Given**: The Contact section is in view and the visitor has entered a valid
Name ("Nguyễn Văn A"), a valid Email ("a@example.com"), and a Message ("Xin
chào, tôi muốn trao đổi.") into the three fields
**When**: The visitor clicks the submit button
**Then**: The browser opens the mail client with a `mailto:` link to the
stakeholder's contact email whose subject and body contain the entered name,
email, and message; the form is replaced by a success card that appears with a
spring animation (LANDING-006 AC-5, behaviours 6–7)

**Scenario**: Success card shows the confirmation message and auto-hides after 8 seconds
**Given**: A valid submit has just happened and the success card is visible
**When**: The visitor waits without interacting
**Then**: The card displays the confirmation message "Cảm ơn bạn! Tin nhắn đã
được gửi." and auto-hides after 8 seconds, restoring the form (LANDING-006
AC-6, behaviour 8; Data touched — Success message)

**Scenario**: Success card appears without spring animation under reduced motion
**Given**: The visitor has `prefers-reduced-motion: reduce` set and all three
fields are valid
**When**: The visitor submits the form
**Then**: The success card fades in immediately with no spring animation
(LANDING-006 AC-8)

**Scenario**: Tab order moves through the form with visible focus rings
**Given**: The Contact section is in view
**When**: The visitor tabs through the section
**Then**: Focus moves Name → Email → Message → submit button (submit button
last), and every focusable element shows a visible focus ring (LANDING-006
AC-9; SRS §6 accessibility)

**Scenario**: Empty name shows the required-name error on submit
**Given**: The form is in view, the Name field is empty, and Email
("a@example.com") and Message are valid
**When**: The visitor clicks the submit button
**Then**: The Name field's border turns danger colour (#C0392B), the error
"Vui lòng nhập tên." appears below the field, and the Name field receives
focus; no mailto link opens (LANDING-006 AC-2)

**Scenario**: Invalid email format shows the invalid-email error on submit
**Given**: The form is in view, Name ("Nguyễn Văn A") and Message are valid,
and Email is "abc" (no @/domain)
**When**: The visitor clicks the submit button
**Then**: The Email field's border turns danger colour, the error "Vui lòng
nhập email hợp lệ." appears below it, and the Email field receives focus; no
mailto link opens (LANDING-006 AC-3)

**Scenario**: Empty message shows the required-message error on submit
**Given**: The form is in view, Name and Email are valid, and the Message
textarea is empty
**When**: The visitor clicks the submit button
**Then**: The Message field's border turns danger colour, the error "Vui lòng
nhập tin nhắn." appears below it, and the Message field receives focus; no
mailto link opens (LANDING-006 AC-4)

---

## Coverage traceability

| SRS criterion | Scenario |
|---|---|
| AC-1 (all elements visible) | Contact section renders all required elements on page load |
| AC-2 (empty name error) | Empty name shows the required-name error on submit |
| AC-3 (invalid email error) | Invalid email format shows the invalid-email error on submit |
| AC-4 (empty message error) | Empty message shows the required-message error on submit |
| AC-5 (valid submit → mailto + success card) | Valid form submission opens a mailto link with prefilled subject and body |
| AC-6 (success card auto-hides after 8s) | Success card shows the confirmation message and auto-hides after 8 seconds |
| AC-7 (single column at ≤600px) | Contact layout collapses to a single column at ≤ 600px |
| AC-8 (reduced motion) | Success card appears without spring animation under reduced motion |
| AC-9 (tab order / focus ring) | Tab order moves through the form with visible focus rings |
| AC-10 (email row opens mailto) | Clicking the email row opens the mail client with the recipient pre-filled |
