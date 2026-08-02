# Design System — Giới thiệu bản thân

> Source of truth: the approved `index.html` (preview: http://localhost:8080/design/648345dc-a99c-43d4-8d86-b262dbb91170).
> Every value below is extracted from it. Changing a value here without
> changing the approved design is a defect.

Last updated: 2026-05-27

## 1. Foundations

### 1.1 Color

Semantic tokens. Name by job, never by hue.

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#FAF6F0` | Page background; skill-card and form-input background; mobile menu |
| `--color-surface` | `#FFFFFF` | Cards, form-card, stat, footer, social tiles, skill section band |
| `--color-border` | `#E7DFD4` | Default 1px borders, dividers, meter track, timeline rail |
| `--color-text` | `#1F2430` | Body text, headings, brand, nav link hover/active, `strong` |
| `--color-text-muted` | `#6E7480` | Secondary text: nav links, leads, captions, metadata |
| `--color-primary` | `#E85D3D` | Primary button bg, eyebrow/kicker, stat numerals, meter fill, nav underline, focus ring, selection bg, brand accent, h1 accent |
| `--color-primary-hover` | `#C94A2E` | Primary button hover bg |
| `--color-primary-text` | `#FFFFFF` | Text and icons on `--color-primary` |
| `--color-primary-soft` | `#FBE9E2` | h1 accent highlight underline, date pill bg, timeline dot ring, input focus ring |
| `--color-secondary` | `#1F5C5C` | Hero badge text, alt skill meter fill, alt timeline dot/date, success iconography |
| `--color-secondary-soft` | `#E3EFEC` | Hero badge bg, alt dot ring, alt date pill bg, success icon bg |
| `--color-danger` | `#C0392B` | Field error text, invalid field border |
| `--color-focus` | `#E85D3D` | `:focus-visible` ring (3px outline) |

Note: the saved design summary in memory lists an older palette (`#4F46E5`, `#F59E0B`, `#F8FAFC`, `#0F172A`); the approved HTML uses the palette above. The HTML is the source of truth.

#### Contrast audit

Measured WCAG 2.1 contrast for every text-on-background pair actually used. Body text target ≥ 4.5:1, large text (≥ 24px, or ≥ 18.66px bold) ≥ 3:1, UI component boundaries ≥ 3:1.

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--color-text` `#1F2430` | `--color-bg` `#FAF6F0` | 14.4:1 | AA |
| `--color-text` `#1F2430` | `--color-surface` `#FFFFFF` | 15.5:1 | AA |
| `--color-text-muted` `#6E7480` | `--color-bg` `#FAF6F0` | 4.36:1 | FAIL (body) / AA Large |
| `--color-text-muted` `#6E7480` | `--color-surface` `#FFFFFF` | 4.69:1 | AA |
| `--color-primary-text` `#FFFFFF` | `--color-primary` `#E85D3D` | 3.46:1 | FAIL (button label) / AA Large, UI |
| `--color-primary-text` `#FFFFFF` | `--color-primary-hover` `#C94A2E` | 4.66:1 | AA |
| `--color-primary` `#E85D3D` | `--color-bg` `#FAF6F0` | 3.22:1 | FAIL (eyebrow) / AA Large |
| `--color-primary` `#E85D3D` | `--color-surface` `#FFFFFF` | 3.46:1 | FAIL (normal) / AA Large (stat numerals) |
| `--color-primary` `#E85D3D` | `--color-primary-soft` `#FBE9E2` | 2.94:1 | FAIL (date pill) |
| `--color-secondary` `#1F5C5C` | `--color-secondary-soft` `#E3EFEC` | 6.49:1 | AA |
| `--color-secondary` `#1F5C5C` | `--color-bg` `#FAF6F0` | 7.11:1 | AA |
| `--color-primary-text` `#FFFFFF` | `--color-secondary` `#1F5C5C` | 7.65:1 | AA |
| `--color-danger` `#C0392B` | `--color-bg` `#FAF6F0` | 5.05:1 | AA |
| `--color-danger` `#C0392B` | `--color-surface` `#FFFFFF` | 5.44:1 | AA |

Failing pairs are recorded in §4 Known deviations; they ship as approved.

### 1.2 Spacing

Base unit: `4px`. The approved mockup uses a fine-grained scale; the core grid values are the 4px multiples below, and the off-grid values actually used are listed in §4 Known deviations (they ship as approved).

| Token | Value | Used for |
|---|---|---|
| `--space-1` | `4px` | Timeline dot ring spread, small gaps |
| `--space-2` | `8px` | Badge/eyebrow gap, dot size, avatar ring |
| `--space-3` | `12px` | Social tile gap, mobile menu padding (12px 24px), nav-cta, radius-sm contexts |
| `--space-4` | `16px` | Input padding (13px 16px), badge padding (8px 16px), container gutter (0 24px → `--space-6`) |
| `--space-6` | `24px` | Container gutter, hero h1 → p gap, mobile menu padding, card internal gaps |
| `--space-8` | `32px` | Nav link gap, form-card padding (36px ≈ `--space-9`) |
| `--space-12` | `48px` | Section-inner vertical rhythm, skill-icon size, hero CTA margin-top (38px ≈ `--space-10`) |
| `--space-16` | `64px` | Hero/about/contact column gap |
| `--space-18` | `72px` | Nav height, hero-inner padding, about column gap |
| `--space-28` | `110px` | Section vertical padding (desktop) |

Container: `max-width: 1120px`, `margin: 0 auto`, padding `0 24px`. Section padding `110px 0` desktop → `80px 0` at ≤600px.

### 1.3 Typography

Font families (loaded via system/webfont fallback stacks, no external request in the mockup):

- Body: `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- Display (headings, numerals): `"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, "Times New Roman", serif`
- Mono: none used

| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `--text-3xl` | `clamp(42px, 6vw, 68px)` | `1.06` | 600 | Hero h1, letter-spacing `-.02em` |
| `--text-2xl` | `clamp(30px, 4vw, 42px)` | `1.15` | 600 | Section h2, letter-spacing `-.01em` |
| `--text-xl` | `21–24px` | `1.2–1.3` | 600 | Card h3, timeline h3 (21px), form-card h3 (24px), brand (21px/1) |
| `--text-lg` | `17–18px` | `1.6` | 400 | Hero paragraph (18px), section lead (17px) |
| `--text-base` | `16px` | `1.6` | 400 | Body, about copy (16.5px) |
| `--text-sm` | `14–15px` | `1.5–1.6` | 400–600 | Nav links (14.5/500), skill p (14), timeline p (15), inputs (15/1.5), form text |
| `--text-xs` | `12–13.5px` | `1.4–1.6` | 500–700 | Labels (13/600), stat label (12.5/500), error (12.5/500), footer (13.5), date pill (12/700, uppercase) |
| `--text-eyebrow` | `12.5px` | `1` | 700 | Kicker/eyebrow, uppercase, letter-spacing `.14em` |

Heading levels are used in order (h1 hero → h2 section → h3 card) and never skipped for visual sizing. Display font carries the brand voice; sans carries UI.

### 1.4 Radius, border, shadow, motion

| Token | Value | Used for |
|---|---|---|
| `--radius-sm` | `6px` | Meter bar, focus outline corner |
| `--radius-md` | `12px` | Menu button, social tile, back-to-top |
| `--radius-input` | `14px` | Inputs, textarea, icon tiles (skill-icon, c-ico) |
| `--radius-card` | `16–22px` | Stat (16), cards/skill/form-card/portrait (22) |
| `--radius-lg` | `28px` | Portrait dashed frame |
| `--radius-full` | `999px` | Buttons, badges, date pills, timeline dots |
| `--border-width` | `1px` | Card borders, section separators, footer |
| `--border-width-strong` | `1.5px` | Ghost button, inputs, menu button, social tiles |
| `--border-accent` | `2px dashed var(--color-primary)` | Portrait decorative frame |
| `--shadow-rest` | `none` | Resting cards, stats, skill cards (border only) |
| `--shadow-float` | `0 24px 60px -28px rgba(31,36,48,.30)` | Portrait, form-card, mobile menu, skill hover |
| `--shadow-button` | `0 10px 24px -10px rgba(232,93,61,.55)` | Primary button |
| `--shadow-nav` | `0 10px 30px -22px rgba(31,36,48,.35)` | Nav when scrolled |
| `--duration-fast` | `0.18s ease` | Buttons, links, inputs, social tiles |
| `--duration-base` | `0.22–0.25s ease` | Nav underline, nav scroll state |
| `--duration-slow` | `0.7s ease` | Scroll reveal |
| `--duration-meter` | `1s cubic-bezier(.22,.61,.36,1)` | Skill meter fill |
| `--duration-pop` | `0.45s cubic-bezier(.34,1.56,.64,1)` | Success card entrance |
| `--easing` | `ease` (default), spring pop per above | All transitions |

Motion respects `prefers-reduced-motion: reduce`: all animation/transition removed, scroll-behavior auto, reveal forced visible — state changes remain, movement is removed. Decorative loops: badge dot `pulse 2s infinite`, spinner `spin 0.7s linear infinite`.

### 1.5 Layout and breakpoints

Container: `1120px` max, `24px` gutters. Breakpoints are implemented as max-width media queries over the single-column-per-section stack:

| Name | Query | Behavior |
|---|---|---|
| `mobile` | `max-width: 600px` | Section padding `80px`; skills 1 column; stats stay 3 columns with smaller numerals (24px); form-card padding `26px 20px`; hero h1 accent no longer `nowrap` |
| `tablet` | `max-width: 900px` | Nav links + nav CTA hidden, menu button appears; hero/about/contact collapse to 1 column (`gap 44px`); skills 2 columns; hero visual capped `420px` |

Column grids (desktop): hero `1.15fr .85fr`, about `0.9fr 1.1fr`, skills `repeat(3, 1fr)`, stats `repeat(3, 1fr)`, contact `0.9fr 1.1fr`. Timeline is a single rail `max-width 760px`.

Z-index scale (only these values are allowed):

| Layer | Value |
|---|---|
| Base / sections | `0` (auto) |
| Mobile menu | `49` |
| Fixed nav | `50` |

Focus is rendered with `outline: 3px solid var(--color-focus)` + `outline-offset: 3px` (radius 6px), no z-index involvement.

## 2. Components

### 2.1 Button

**Purpose** — primary and secondary calls to action across the page; also the CTA in nav, hero, mobile menu, and form submit.

**Anatomy** — `[icon?] [label] [trailing icon?]`, `display: inline-flex`, `gap: 10px`, pill shape.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| `btn-primary` | `--color-primary` bg, `--color-primary-text` text, `--shadow-button` | The one main action per section (hero CTA, form submit) |
| `btn-ghost` | Transparent bg, `--color-text`, `1.5px --color-border` | Secondary action beside a primary |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | 48px | `14px 26px` | `--text-sm` (15px/600) |
| `nav-cta` | 40px | `10px 20px` | `--text-xs` (14px/600) |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Pill, flat fill | `--color-primary` / transparent |
| Hover | Primary: `--color-primary-hover` bg; Ghost: border → `--color-text`; both lift `translateY(-2px)` | `--duration-fast` |
| Focus (keyboard) | 3px `--color-focus` outline, offset 3px | `--color-focus` |
| Active / pressed | No distinct style defined — hover styles persist (deviation, §4) | — |
| Disabled | Not styled in mockup — implement `opacity: .5`, `cursor: not-allowed`, `aria-disabled` (deviation, §4) | — |
| Loading | Spinner (16px ring, `spin .7s linear infinite`) defined in CSS; unused in final draft (deviation, §4) | `--color-primary-text` |
| Error | n/a — buttons do not error | — |
| Empty | n/a — label is always present | — |

**Accessibility** — real `<button>` or `<a role="button">`; icon buttons carry `aria-label`; hit target ≥ 44×44px (nav-cta is 40px tall — accepted as inline link affordance inside a 72px nav row).

### 2.2 Navigation

**Purpose** — fixed header linking About / Skills / Experience / Contact, with brand mark and a primary CTA; collapses to a slide-down menu under 900px.

**Anatomy** — `[brand "Minh."] [nav links] [nav-cta] [menu button]` → mobile: `[brand] [menu button]`.

**Variants** — desktop bar vs. mobile menu (`.mobile-menu`, `z-index 49`, below the bar).

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Blurred translucent bar (`rgba(250,246,240,.82)` + `backdrop-filter: blur(12px)`), transparent bottom border | `--color-bg` |
| Scrolled | Bottom border + `--shadow-nav` appear (JS adds `.scrolled`) | `--color-border`, `--shadow-nav` |
| Link hover / active | Link color → `--color-text`, 2px accent underline scales in from left | `--color-primary` |
| Menu button hover | Border + focus ring | `--color-border` → `--color-focus` |
| Mobile menu open | `.open` sets `display: block`, links are full-width rows with dividers | `--color-border` |
| Focus (keyboard) | 3px accent outline on any focusable link/button | `--color-focus` |

**Accessibility** — `aria-expanded` toggles on the menu button, `Escape` closes the menu, links close it on click. Brand is an `em` accent inside the wordmark.

### 2.3 Hero badge

**Purpose** — "Available for freelance work" availability indicator above the hero headline.

**Anatomy** — `[pulse dot] [label]`, pill, `--color-secondary-soft` bg, `--color-secondary` text.

**States** — static (non-interactive): dot pulses `2s` at 100% → 35% opacity. No hover/focus (no focusable element). Under `prefers-reduced-motion` the pulse stops.

### 2.4 Section head

**Purpose** — consistent header for every content section: eyebrow, title, lead.

**Anatomy** — `[kicker/eyebrow] [h2] [lead paragraph]`. Eyebrow is a 26×2px accent rule + uppercase text; optional `.kicker` variant without the rule (skills/experience/contact in final draft).

**States** — static; only the scroll-reveal entrance (`0.7s ease`, translateY 26px → none). No hover/focus.

### 2.5 Skill card with meter

**Purpose** — one skill per card: icon tile, name, one-line description, animated proficiency meter.

**Anatomy** — `[icon tile 48px, --radius-input, white icon] [h3] [p] [label row] [meter track + fill]`.

**Variants** — default (accent meter) and `.teal` (secondary meter fill).

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | `--color-bg` card, 1px `--color-border`, `--radius-card` (22px) | `--color-bg`, `--color-border` |
| Hover | Lift `translateY(-6px)`, `--shadow-float`, border → transparent | `--shadow-float`, `--duration-fast` |
| In view (scroll) | Meter fill animates 0 → `data-w`% over `1s` spring ease; card reveals | `--duration-meter` |
| Focus (keyboard) | 3px accent outline on focusable content (links inside, if any) | `--color-focus` |
| Disabled / loading / error / empty | n/a — static cards | — |

**Accessibility** — meter fill is decorative; the numeric value is conveyed in `data-w` for assistive tech in implementation.

### 2.6 Timeline item

**Purpose** — one milestone (role or education) on the experience rail.

**Anatomy** — `[dot] [date pill] [role h3] [org line] [description p]`; rail is a 2px vertical `--color-border` line with 20px dots at `left: 0`.

**Variants** — default (accent dot + accent date pill) and `.teal` (secondary dot + pill).

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Dot ring: 20px circle, 5px `--color-accent`/`--color-secondary` border + 4px soft ring; date pill uppercase 12px/700 | `--color-primary(-soft)`, `--color-secondary(-soft)` |
| Hover | No hover style on the card itself; focus applies to any link/button inside | — |
| Focus (keyboard) | 3px accent outline | `--color-focus` |
| Expanded | Earlier placeholder draft used `Read more ▾/▴` toggle with `aria-expanded`; final draft's entries are static (deviation §4) | — |
| Disabled / loading / error / empty | n/a | — |

### 2.7 Stat card

**Purpose** — numeric proof points in the About section (years, products, awards).

**Anatomy** — `[numeral b] [caption span]`, centered, `--color-surface` bg, 1px border, `--radius-card` (16px), padding `18px 14px`.

**States** — static; numeral is `--text-xl` (30px/600 display) in `--color-primary` (3.46:1 — passes AA Large, deviation §4), caption 12.5px/500 `--color-text-muted`. No hover/focus (non-interactive).

### 2.8 Contact info row + social icon

**Purpose** — reachability details (email, location, phone) and social profile links.

**Anatomy (row)** — `[icon tile 44px, --radius-input, white icon] [b label] [value]`, divider `1px --color-border` between rows (last row unbordered).

**Anatomy (social icon)** — 42px square tile, `1.5px --color-border`, `--radius-md`, inline SVG (stroke 1.8–2, round caps).

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Border-only tile, muted icon | `--color-border`, `--color-text-muted` |
| Hover | Icon + border → `--color-primary`, lift `translateY(-3px)` | `--color-primary`, `--duration-fast` |
| Focus (keyboard) | 3px accent outline | `--color-focus` |
| Disabled / loading / error / empty | n/a | — |

**Accessibility** — every icon-only link carries `aria-label` (GitHub, LinkedIn, Email, etc.); email rows are real `mailto:` links.

### 2.9 Form field

**Purpose** — labeled input/textarea inside the contact form with inline validation.

**Anatomy** — `[label (+ *) ] [input/textarea] [error message]`, stacked, 18px field gap.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | `--color-bg` fill, `1.5px --color-border`, `--radius-input` (14px), padding `13px 16px`, 15px/1.5 text | `--color-bg`, `--color-border` |
| Hover | No distinct style defined (deviation, §4) | — |
| Focus (keyboard) | Border → `--color-primary`, 4px `--color-primary-soft` ring, `outline: none` with replacement ring | `--color-primary`, `--color-primary-soft` |
| Invalid | Border → `--color-danger`, inline error message revealed (12.5px/500) | `--color-danger` |
| Validating | Error clears on `input` (live re-validation) | — |
| Disabled | Not styled in mockup — implement `opacity: .5` + `aria-disabled` (deviation, §4) | — |
| Loading | n/a — no async fetch; form is mailto | — |
| Error | `--color-danger` border + message, e.g. "Vui lòng nhập email hợp lệ." | `--color-danger` |
| Empty | Placeholder guides format (e.g. `ban@example.com`); required marker `*` on labels | — |

**Accessibility** — label tied to control via `for`/`id`; `novalidate` on form, JS validation with focus moved to first invalid field; error message shown inline, not via `aria-live` (recorded, §4).

### 2.10 Form card / success state

**Purpose** — the contact form container; after a valid submit it shows a confirmation instead of the fields.

**Anatomy** — `[h3] [intro p] [fields + submit]`; on success the card swaps to `[✓ icon tile 72px, --color-secondary-soft/--color-secondary] [h3] [p]`.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | `--color-surface` card, `--shadow-float`, padding 36px | `--color-surface`, `--shadow-float` |
| Submitting | No in-flight state in final draft — mailto fires immediately (deviation, §4) | — |
| Success | `.show` swaps in success card with `--duration-pop` spring entrance; auto-hides after 8s | `--duration-pop` |
| Error | Blocked by field-level validation; no card-level error | `--color-danger` |
| Hover / focus | n/a at card level; children handle their own | — |

### 2.11 Footer + back-to-top

**Purpose** — copyright line and a return-to-top control.

**Anatomy** — `[© year · name] [back-to-top pill ↑]`, surface bg, top border, padding 28px.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | 13.5px muted text; pill with `--color-bg` fill + 1px border | `--color-text-muted`, `--color-border` |
| Hover | Pill border + text → `--color-primary`, lift `translateY(-2px)` | `--color-primary`, `--duration-fast` |
| Focus (keyboard) | 3px accent outline | `--color-focus` |
| Disabled / loading / error / empty | n/a | — |

### 2.12 Scroll reveal

**Purpose** — entrance animation for sections/cards as they enter the viewport.

**Anatomy** — `.reveal` (opacity 0, translateY 26px, `0.7s ease`) → `.in` (opacity 1, none). Stagger via `d1..d4` delay classes.

**States** — hidden → visible on intersection (threshold 0.15). Under `prefers-reduced-motion` content is always visible (`opacity 1`, no transform). No hover/focus.

## 3. Content and formatting

- Voice and tone: warm, friendly-professional, first person; the site copy is Vietnamese (final draft), headings short and concrete.
- Language: Vietnamese UI copy; English for the brand mark "Minh." and section anchors in the earlier placeholder draft.
- Dates: year ranges with em dash, e.g. `2022 — nay` (Vietnamese "nay" = present); date pills uppercase with `0.08em` tracking.
- Numbers: plain Arabic numerals with `+` suffix for counts (`8+`, `40+`).
- Capitalization: eyebrow/kicker uppercase with letter-spacing; headings and buttons sentence case; labels sentence case.
- Empty-state pattern: n/a — no lists or feeds exist on the page.
- Error-message pattern: short imperative Vietnamese sentence per field, e.g. "Vui lòng nhập tên của bạn.", "Vui lòng nhập email hợp lệ.", min 10 chars for the message.

## 4. Known deviations

| Where | Deviation | Why it stands | Follow-up |
|---|---|---|---|
| Saved `index.html` | Contains the earlier English placeholder draft (second `#experience`, second `#contact`, second footer/script, `[bracketed]` copy, emoji timeline dots 💼🎓🌟) stacked under the final Vietnamese draft; the file's single `<style>` block is the consistent source of truth used above | Build artifact of iterating in the preview; the final draft is what was approved | UI story must ship only the final Vietnamese draft; strip duplicate markup and dead JS |
| Contrast: `#FFFFFF` on `#E85D3D` (button label) | 3.46:1 — fails AA for 15px/600 text | Approved as-is | Revisit with `--color-primary-hover` on hover (4.66:1) or darken primary in a later pass |
| Contrast: `#E85D3D` on `#FAF6F0` (eyebrow) | 3.22:1 — fails AA for 12.5px bold | Approved as-is | Consider `--color-primary-hover` for small accent text |
| Contrast: `#6E7480` on `#FAF6F0` (muted on bg) | 4.36:1 — fails AA body threshold | Approved as-is; passes on `--color-surface` | Use surface backgrounds for body-secondary text where possible |
| Contrast: `#E85D3D` on `#FBE9E2` (date pill) | 2.94:1 — fails | Approved as-is | Darken pill text to `--color-primary-hover` |
| Spacing | Values outside the 4px grid: 6, 7, 10, 13, 14, 15, 18, 20, 22, 26, 28, 30, 34, 36, 38, 44, 52, 110px | Fine-grained rhythm chosen in the mockup | Keep as approved; do not snap to grid without a design change |
| Button `active`/`disabled`/`loading` | No active or disabled styling in mockup; spinner CSS exists but the final draft submits instantly (no in-flight state) | Form is a mailto with no server round-trip | Implement disabled/loading per §2.1 when the form grows |
| Form hover state | Inputs/textarea have no hover style | Approved as-is | Optional polish only |
| Error a11y | Inline error messages are not announced via `aria-live` | Approved as-is | Add `role="alert"`/`aria-live` in implementation |
| Hero background | Decorative radial gradients (`rgba(232,93,61,.14)`, `rgba(31,92,92,.12)`) — anti-pattern "gradient as decoration" | Very low alpha; supports depth without competing with copy | Keep |
| Focus | `.field input:focus` sets `outline: none` but replaces it with an accent border + 4px soft ring | Visible replacement ring present | Keep |

## 5. Change log

| Date | Change | Design PR |
|---|---|---|
| 2026-05-27 | Initial design system extracted from approved `index.html` | docs/design-system |
