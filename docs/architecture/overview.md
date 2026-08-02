# Architecture Overview — Giới thiệu bản thân

**Project:** Giới thiệu bản thân (personal introduction landing page)
**Shape:** `static` — frontend only, no backend, no database
**Last updated:** 2026-05-27

---

## 1. Tech Stack

| Layer | Technology | Version / Notes |
|---|---|---|
| Framework | Next.js | 15, App Router, TypeScript |
| Styling | Tailwind CSS | v3 |
| Linting | ESLint | v8, extends `next/core-web-vitals` + `next/typescript` |
| Container | Docker | `docker compose up` boots the frontend |
| CI | GitHub Actions | `.github/workflows/ci.yml` |

**No backend, no database.** The contact form submits via `mailto:`. This is intentional: the SRS explicitly opts out of both.

---

## 2. Project Shape Decision

| Shape | Reason |
|---|---|
| `static` | The landing page is pure content. The contact form is a `mailto:` link. There is no data to persist, no user accounts, and no API calls. |

Adding a Go backend or PostgreSQL would be dead weight on every CI run and every future story.

---

## 3. Folder Structure

```
project-648345dc/
├── docs/
│   ├── landing/
│   │   └── SRS.md                      # Requirements (PM)
│   └── architecture/
│       └── overview.md                 # This file (TL)
├── design/
│   ├── index.html                      # Approved mockup (source of truth)
│   └── design-system.md               # Design tokens + component specs
├── code/
│   └── frontend/                       # Next.js 15 App Router (static export)
│       ├── app/
│       │   ├── layout.tsx             # Root layout, fonts, globals
│       │   ├── page.tsx               # Landing page (Server Component)
│       │   ├── globals.css             # All tokens, base styles, utilities
│       │   └── [section]/
│       │       └── page.tsx           # Each section as a Server Component
│       ├── components/
│       │   ├── Nav.tsx                # "use client" — fixed nav, hamburger
│       │   ├── Hero.tsx               # "use client" — scroll-reveal, CTAs
│       │   ├── About.tsx              # Server Component
│       │   ├── Skills.tsx             # "use client" — meter animation
│       │   ├── Timeline.tsx           # Server Component
│       │   ├── Contact.tsx            # "use client" — mailto form + validation
│       │   ├── Footer.tsx             # Server Component
│       │   └── ui/                    # Shared primitives (Button, SectionHead…)
│       ├── public/
│       │   └── favicon.ico
│       ├── package.json
│       ├── package-lock.json
│       ├── next.config.js
│       ├── tsconfig.json
│       ├── tailwind.config.ts
│       ├── postcss.config.js
│       ├── .eslintrc.json
│       ├── .env.example
│       ├── .gitignore
│       └── Dockerfile
├── docker-compose.yml
├── .env.example
├── .gitignore
└── .github/
    └── workflows/
        └── ci.yml
```

---

## 4. Key Design Decisions

### 4.1 Static Export

`next.config.js` uses `output: 'export'` so the build produces a fully static `out/` directory deployable to any CDN or static host. No server-side rendering at runtime.

**Rejected alternative: SSR + API routes** — adds a running Node.js server and complicates deployment for no benefit. The SRS explicitly requires no backend.

### 4.2 Server / Client Component Boundary

Next.js App Router treats every component as a **Server Component** by default. A component becomes a Client Component only when its file begins with `"use client"`.

The following components **must** be Client Components (they use browser APIs, event handlers, or `useState`/`useEffect`):

| Component | Reason |
|---|---|
| `Nav` | `scroll` event listener, `aria-expanded` state, hamburger toggle |
| `Hero` | `IntersectionObserver` for scroll-reveal, smooth scroll CTAs |
| `Skills` | `IntersectionObserver` for meter animation |
| `Contact` | Form state, `mailto:` construction, validation |

All other components are Server Components. A missing `"use client"` on any of the above fails `next build` with "Event handlers cannot be passed to Client Component props" — and the error names `page.tsx`, not the component at fault.

### 4.3 Tailwind v3 with Design Tokens

Tailwind is configured with the exact color, spacing, and typography tokens from `design/design-system.md`. No arbitrary values in component classes. Tokens that are not in Tailwind's default scale (e.g. `--color-primary-soft`) are added as custom utilities in `globals.css`.

### 4.4 Contact Form — mailto:

Form validation is client-side only. On valid submit, `Contact` constructs a `mailto:` link with prefilled subject and body, then `window.open()` it. No data is ever sent to a server.

**Rejected alternative: Formspree / Netlify Forms** — adds a third-party dependency and account requirement. The SRS does not request server-side form handling.

### 4.5 No Backend Scaffold

No `code/backend/` directory exists. The `docker-compose.yml` has no `backend` or `db` service. If a future story requires a backend (e.g. a real contact-email API), a `stateless` or `fullstack` shape will be assessed at that time.

---

## 5. Naming Conventions

| Convention | Rule | Example |
|---|---|---|
| Component files | PascalCase | `Hero.tsx`, `Skills.tsx` |
| Server Component exports | `export default function ComponentName()` | `export default function Hero() {…}` |
| Client Component files | Begin with `"use client"` on line 1 | `"use client"\nexport default function Nav() {…}` |
| CSS custom properties | `--kebab-case` from design tokens | `--color-primary`, `--space-6` |
| Section IDs | `kebab-case`, matching SRS IDs | `#about`, `#skills`, `#contact` |
| Image `alt` | Descriptive, Vietnamese | `alt="Minh., chủ sở hữu trang này"` |

---

## 6. Environment Variables

### Root `.env.example`

No secrets. Compose-level variables shared by all services.

```env
# --- Frontend ---
# The public URL the frontend is accessible at (used in Next.js metadata)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Frontend `.env.example`

```env
# --- Contact form recipient ---
# The email address the mailto: form sends to
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com

# --- Public site URL ---
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

All `NEXT_PUBLIC_*` variables are baked at build time. They cannot be changed without a rebuild.

---

## 7. How to Run

### Prerequisites

- Docker + Docker Compose installed
- Node.js 20 (for local development without Docker)

### With Docker (full stack)

```bash
cp .env.example .env
docker compose up --build
# Frontend → http://localhost:3000
```

### Local development (no Docker)

```bash
cd code/frontend
cp .env.example .env.local
npm install
npm run dev
# → http://localhost:3000
```

### Run tests and lint

```bash
cd code/frontend
npm run lint     # ESLint
npm run build    # Next.js production build
npm test         # Playwright tests (if present)
```

---

## 8. CI Pipeline

`.github/workflows/ci.yml` runs on every PR and push to `main`. Jobs:

| Job | What it does |
|---|---|
| `frontend` | `npm ci` → `npm run lint` → `npm run build` → `npm test` |
| `compose` | `docker compose config -q` (validates compose file) |

Failure on any job blocks merge.

---

## 9. Rejected Alternatives and Tradeoffs

| Decision | Rejected alternative | Tradeoff |
|---|---|---|
| `static` shape | `stateless` with a Go backend | Backend adds ~2 GB Docker image, a migration step, and a running process for a page that has no server-side logic |
| `mailto:` form | Formspree / third-party form API | Third-party adds an account, a dependency, and a rate limit; `mailto:` is free and requires zero infrastructure |
| Tailwind v3 | Plain CSS or CSS-in-JS | Tailwind v3 is the established default; CSS-in-JS adds runtime overhead; plain CSS requires more manual naming |
| No `code/backend/` | Scaffolding a Go skeleton "just in case" | Skeleton is CI debt: every run builds a binary that never runs, and every future agent reads past it wondering if it's used |
