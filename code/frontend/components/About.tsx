/**
 * About section — Server Component
 * LANDING-003: Photo + narrative paragraph + three stat cards.
 * id="about" anchors the nav link and hero CTA.
 */
import AboutReveal from './AboutReveal'
import { aboutMockData } from '@/lib/mock/about-section'

// ─── Portrait with graceful fallback ────────────────────────────────────────

function Portrait({ src, alt }: { src: string; alt: string }) {
  // Decorative dashed primary frame: 2px dashed primary, radius-lg, shadow-float
  return (
    <div className="avatar-frame" style={{ boxShadow: 'var(--shadow-float)' }}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{
            borderRadius: 'calc(var(--radius-lg) - 4px)',
            display: 'block',
          }}
        />
      ) : (
        // Placeholder: surface colour, no broken-image icon
        <div
          aria-hidden="true"
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'calc(var(--radius-lg) - 4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
            style={{ opacity: 0.25 }}
          >
            <circle cx="32" cy="24" r="12" fill="var(--color-text-muted)" />
            <ellipse cx="32" cy="58" rx="20" ry="14" fill="var(--color-text-muted)" />
          </svg>
        </div>
      )}
    </div>
  )
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ numeral, label }: { numeral: string; label: string }) {
  // Non-interactive: no hover lift, no colour change, no focus ring
  return (
    <div
      className="card"
      style={{
        padding: '18px 14px',
        textAlign: 'center',
        borderRadius: 'var(--radius-card)',
      }}
    >
      {/* Large numeral in primary colour */}
      <div
        className="font-display"
        style={{
          fontSize: '30px',
          lineHeight: 1.15,
          fontWeight: 600,
          color: 'var(--color-primary)',
          marginBottom: 'var(--space-1)',
        }}
      >
        {numeral}
      </div>
      {/* Muted caption */}
      <span
        style={{
          fontSize: '12.5px',
          fontWeight: 500,
          color: 'var(--color-text-muted)',
          lineHeight: 1.4,
          wordBreak: 'break-word',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Section head ─────────────────────────────────────────────────────────────

function SectionHead({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <div className="section-head" style={{ marginBottom: 'var(--space-12)' }}>
      <span className="eyebrow">{eyebrow}</span>
      <h2
        className="font-display"
        style={{
          fontSize: 'clamp(30px, 4vw, 42px)',
          lineHeight: 1.15,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'var(--color-text)',
          margin: 0,
        }}
      >
        {heading}
      </h2>
    </div>
  )
}

// ─── Main About section ───────────────────────────────────────────────────────

export default function About() {
  const { eyebrow, heading, portrait, portraitAlt, narrative, stats } = aboutMockData

  return (
    <section
      id="about"
      className="section-padding about-grid"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="container">
        {/* Section head — staggered reveal */}
        <AboutReveal className="d1">
          <SectionHead eyebrow={eyebrow} heading={heading} />
        </AboutReveal>

        {/* Two-column layout: portrait (0.9fr) + narrative+stats (1.1fr) */}
        <div className="about-columns">
          {/* Left column: portrait */}
          <AboutReveal className="d2">
            <div style={{ maxWidth: '480px' }}>
              <Portrait src={portrait} alt={portraitAlt} />
            </div>
          </AboutReveal>

          {/* Right column: narrative + stats */}
          <div>
            {/* Narrative paragraph */}
            <AboutReveal className="d3" style={{ marginBottom: 'var(--space-12)' }}>
              <p
                style={{
                  fontSize: '16.5px',
                  lineHeight: 1.65,
                  color: 'var(--color-text)',
                  margin: 0,
                }}
              >
                {narrative}
              </p>
            </AboutReveal>

            {/* Three stat cards — stay 3 columns at mobile */}
            <AboutReveal className="d4">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'var(--space-6)',
                }}
              >
                {stats.map((stat, i) => (
                  <StatCard key={i} numeral={stat.numeral} label={stat.label} />
                ))}
              </div>
            </AboutReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
