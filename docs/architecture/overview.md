# Architecture Overview — Landing Page

**Project**: Giới thiệu bản thân  
**Shape**: `static` — frontend only, no backend, no database  
**Last updated**: 2026-05-27

---

## 1. Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Frontend framework | Next.js | 15.x | App Router, TypeScript |
| Language | TypeScript | 5.x | Strict mode enabled |
| Styling | Tailwind CSS | 3.x | Custom design tokens from `design/design-system.md` |
| Linting | ESLint | 9.x | `next/core-web-vitals` + `next/typescript` |
| Container | Docker | — | Multi-stage build for production |
| CI/CD | GitHub Actions | — | Lint, build, compose validation |

**Rejected alternatives**

| Alternative | Reason for rejection |
|---|---|
| Vite / plain React | Next.js provides SSR/SSG for performance, file-based routing, and image optimization — all beneficial for a landing page. |
| CSS Modules or plain CSS | Tailwind's utility-first approach aligns with the design system's token-based approach and enables faster iteration on the design system. |
| Server-side backend (Go/Node) | Project shape is `static` — no backend, no database. The contact form uses `mailto:` client-side submission per SRS LANDING-006. |

---

## 2. Folder Structure

```
project-648345dc/
├── .env.example              # Root env vars (NEXT_PUBLIC_* for frontend)
├── .gitignore
├── docker-compose.yml        # Frontend service only (static shape)
├── .github/
│   └── workflows/
│       └── ci.yml            # Lint + build + compose validation
├── docs/
│   └── architecture/
│       └── overview.md        # This document
├── design/
│   ├── index.html            # Approved mockup (source of truth)
│   └── design-system.md      # Design tokens and component specs
└── code/
    └── frontend/             # Next.js application
        ├── .env.example
        ├── .eslintrc.json
        ├── .gitignore
        ├── Dockerfile        # Multi-stage build
        ├── next.config.js
        ├── package.json
        ├── package-lock.json
        ├── postcss.config.js
        ├── tailwind.config.ts
        ├── tsconfig.json
        └── app/
            ├── layout.tsx    # Root layout (Server Component)
            ├── page.tsx      # Home page (Server Component)
            └── globals.css   # Design tokens + base styles
```

---

## 3. Key Design Decisions

### 3.1 Static Shape — No Backend

The SRS explicitly states this is a **static landing page** with no backend or database. The contact form submits via `mailto:` link (LANDING-006), not a server endpoint. No Go backend, no PostgreSQL, no migrations.

### 3.2 Server / Client Component Boundary

In Next.js 15 App Router, **every component is a Server Component by default**. The following require `"use client"` directive:

- Any component using event handlers (`onClick`, `onSubmit`, `onChange`)
- Any component using `useState`, `useEffect`, `useRef`
- Any component passing a function to a child

The page skeleton (`app/page.tsx`) stays a Server Component that only composes children. Individual section components (`Hero`, `About`, `Skills`, etc.) will be Client Components where interaction is needed.

### 3.3 Design Token Alignment

All CSS custom properties and Tailwind config values are derived from `design/design-system.md`. The primary tokens are:

```css
--color-bg: #FAF6F0
--color-surface: #FFFFFF
--color-text: #1F2430
--color-text-muted: #6E7480
--color-primary: #E85D3D
--color-primary-hover: #C94A2E
--color-primary-soft: #FBE9E2
--color-secondary: #1F5C5C
--color-secondary-soft: #E3EFEC
--color-border: #E7DFD4
--color-danger: #C0392B
```

### 3.4 Motion and Accessibility

- Scroll-reveal animations use IntersectionObserver with 0.15 threshold
- `prefers-reduced-motion: reduce` disables all animations/transitions
- All interactive elements have visible 3px focus ring (`--color-focus: #E85D3D`)
- Form validation is client-side with inline error messages
- `aria-expanded` toggles on hamburger menu button

### 3.5 Contact Form Behavior

Per LANDING-006, the contact form:
1. Validates client-side (name required, email format, message required)
2. On valid submit: constructs `mailto:` link with prefilled subject/body
3. Shows success card (spring animation) that auto-hides after 8 seconds
4. No backend required — pure client-side behavior

---

## 4. Naming Conventions

| Convention | Pattern | Example |
|---|---|---|
| Component files | `PascalCase.tsx` | `Hero.tsx`, `ContactForm.tsx` |
| CSS files | `kebab-case.module.css` or inline Tailwind | `globals.css` |
| Page routes | `page.tsx` | `app/page.tsx` |
| Layout files | `layout.tsx` | `app/layout.tsx` |
| Server components | No directive (default) | `app/page.tsx` |
| Client components | `"use client"` as first line | Components with interactivity |
| Tailwind classes | kebab-case | `text-primary`, `bg-surface` |
| CSS custom properties | `--kebab-case` | `--color-primary`, `--shadow-float` |

---

## 5. Environment Variables

### Root `.env.example`

```env
# Frontend (Next.js public vars — exposed to browser)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=hello@example.com
```

### Frontend `.env.example`

```env
# Next.js public vars (exposed to browser)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=hello@example.com
```

**Note**: For static deployment, `NEXT_PUBLIC_*` vars are baked at build time. For local Docker Compose, the frontend reads from the root `.env` file via compose.

---

## 6. Running the Project

### Local Development

```bash
# Start frontend only (static shape — no backend, no DB)
cd code/frontend
npm install
npm run dev

# Or with Docker Compose from root
docker compose up
```

### Production Build

```bash
cd code/frontend
npm run build
npm start
```

### Docker Commands

```bash
# Validate compose file
docker compose config -q

# Build and run the stack
docker compose up --build

# Stop the stack
docker compose down
```

---

## 7. CI Pipeline

The CI workflow (`.github/workflows/ci.yml`) runs on every PR and push to `main`:

| Job | Steps | Failures block merge |
|---|---|---|
| `frontend` | `npm ci` → `npm run lint` → `npm run build` → `npm test --if-present` | Yes |
| `compose` | `docker compose config -q` | Yes |

---

## 8. Dependencies

### Production (Frontend)

| Package | Version | Purpose |
|---|---|---|
| `next` | ^15.0.0 | React framework |
| `react` | ^19.0.0 | UI library |
| `react-dom` | ^19.0.0 | React DOM |
| `tailwindcss` | ^3.4.0 | Utility CSS |
| `postcss` | ^8.4.0 | CSS processing |
| `autoprefixer` | ^10.4.0 | CSS vendor prefixes |

### Development (Frontend)

| Package | Version | Purpose |
|---|---|---|
| `typescript` | ^5.0.0 | Type safety |
| `@types/react` | ^19.0.0 | React type definitions |
| `@types/node` | ^22.0.0 | Node type definitions |
| `eslint` | ^9.0.0 | Linting |
| `eslint-config-next` | ^15.0.0 | Next.js ESLint config |

---

## 9. Verification Checklist

- [ ] `docs/architecture/overview.md` covers stack, folder structure, conventions, env vars, and how to run
- [ ] Key decisions are recorded with their rejected alternatives and tradeoffs
- [ ] Frontend skeleton lints and builds without errors
- [ ] `docker compose config -q` passes and `docker compose up` boots the frontend
- [ ] Frontend has `.env.example` listing every `NEXT_PUBLIC_*` var with comments
- [ ] CI runs lint, build, and compose validation on every pull request
- [ ] Conventions saved with `remember` so later agents inherit them
