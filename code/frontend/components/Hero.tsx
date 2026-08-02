'use client';

import React, { useEffect, useRef, useState } from 'react';
import { heroMockData, heroLoadingData, type HeroData } from '@/lib/mock/hero-section';

/** Possible UI states for the hero section. */
type HeroState = 'loading' | 'loaded' | 'error';

/**
 * Hero section — full-width opening of the landing page.
 *
 * Implements SRS LANDING-001.
 * States: default reveal, in-view, reduced-motion.
 * Accessibility: keyboard-navigable CTAs with visible focus ring.
 */
export default function HeroSection() {
  const [state, setState] = useState<HeroState>('loading');
  const [data, setData] = useState<HeroData>(heroLoadingData);
  const [isInView, setIsInView] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Simulate loading from API — replace with real fetch by swapping lib/mock/hero-section.ts
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(heroMockData);
      setState('loaded');
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-reveal via IntersectionObserver
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Fail silently if target anchor does not exist yet (AC-9)
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (!target) {
        e.preventDefault();
      }
      // Smooth scroll only if prefers-reduced-motion is not set
      if (!prefersReducedMotion) {
        e.preventDefault();
        target?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (state === 'loading') {
    return (
      <section
        aria-label="Giới thiệu"
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--color-bg)',
          padding: 'var(--space-28) 0',
        }}
      >
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 'var(--space-16)', alignItems: 'center' }}>
          {/* Text skeleton */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ height: '28px', width: '200px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-border)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <div style={{ height: 'clamp(42px, 6vw, 68px)', width: '80%', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-border)' }} />
            <div style={{ height: '24px', width: '60%', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-border)' }} />
            <div style={{ height: '18px', width: '90%', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-border)' }} />
            <div style={{ height: '48px', width: '160px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-border)' }} />
          </div>
          {/* Avatar skeleton */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '340px', height: '340px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-border)', border: '2px dashed var(--color-primary)', padding: 'var(--space-2)' }} />
          </div>
        </div>
      </section>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (state === 'error') {
    return (
      <section
        aria-label="Giới thiệu"
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--color-bg)',
          padding: 'var(--space-28) 0',
        }}
      >
        <div className="container" style={{ textAlign: 'center', paddingTop: 'var(--space-28)' }}>
          <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-lg)' }}>
            Không thể tải nội dung. Vui lòng làm mới trang.
          </p>
        </div>
      </section>
    );
  }

  // ── Loaded state ──────────────────────────────────────────────────────────
  const showAvatar = data.avatarSrc && !avatarError;

  return (
    <section
      ref={sectionRef}
      aria-label="Giới thiệu"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        padding: 'var(--space-28) 0',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr .85fr',
          gap: 'var(--space-16)',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* ── Text column ─────────────────────────────────────────── */}
        <div
          className={`hero-text-col ${isInView && !prefersReducedMotion ? 'in' : ''} reveal`}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
        >
          {/* Availability badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              backgroundColor: 'var(--color-secondary-soft)',
              color: 'var(--color-secondary)',
              borderRadius: 'var(--radius-full)',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              width: 'fit-content',
            }}
            aria-label="Trạng thái: Sẵn sàng nhận dự án"
          >
            <span
              className={prefersReducedMotion ? '' : 'pulse-dot'}
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-secondary)',
                flexShrink: 0,
              }}
            />
            {data.badgeLabel}
          </div>

          {/* Name h1 */}
          <h1
            className="hero-h1"
            style={{ color: 'var(--color-text)', whiteSpace: 'pre-line' }}
          >
            {data.name}
          </h1>

          {/* Headline */}
          <p
            style={{
              fontSize: 'clamp(21px, 2.5vw, 28px)',
              fontWeight: 600,
              color: 'var(--color-text)',
              lineHeight: 1.2,
              fontFamily: 'var(--font-display)',
            }}
          >
            {data.headline}
          </p>

          {/* Tagline */}
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              maxWidth: '520px',
            }}
          >
            {data.tagline}
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
            <a
              href={data.ctaPrimaryHref}
              className="btn btn-primary"
              onClick={(e) => handleCtaClick(e, data.ctaPrimaryHref)}
              aria-label={`Liên hệ — cuộn đến phần Liên hệ`}
            >
              {data.ctaPrimaryLabel}
            </a>
            <a
              href={data.ctaSecondaryHref}
              className="btn btn-ghost"
              onClick={(e) => handleCtaClick(e, data.ctaSecondaryHref)}
              aria-label={`Xem thêm — cuộn đến phần Giới thiệu`}
            >
              {data.ctaSecondaryLabel}
            </a>
          </div>
        </div>

        {/* ── Avatar column ──────────────────────────────────────── */}
        <div
          className={`hero-avatar-col ${isInView && !prefersReducedMotion ? 'in' : ''} reveal d2`}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className="avatar-frame"
            style={{ boxShadow: 'var(--shadow-float)' }}
          >
            {showAvatar ? (
              <img
                src={data.avatarSrc}
                alt={data.avatarAlt}
                onError={() => setAvatarError(true)}
                style={{
                  width: '100%',
                  maxWidth: '340px',
                  height: 'auto',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  borderRadius: 'calc(var(--radius-lg) - var(--space-2))',
                  display: 'block',
                  backgroundColor: 'var(--color-bg)',
                }}
              />
            ) : (
              // AC-6: empty/404 avatar — dashed frame stays, neutral placeholder
              <div
                aria-label="Ảnh đại diện không khả dụng"
                style={{
                  width: '340px',
                  height: '340px',
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: 'calc(var(--radius-lg) - var(--space-2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Responsive overrides (inline to avoid touching globals.css) */}
      <style>{`
        @media (max-width: 900px) {
          .hero-text-col,
          .hero-avatar-col {
            grid-column: 1 / -1 !important;
          }
          .hero-avatar-col {
            order: -1;
          }
          .hero-avatar-col > div,
          .hero-avatar-col .avatar-frame {
            max-width: 420px !important;
          }
        }
        @media (max-width: 600px) {
          .hero-text-col,
          .hero-avatar-col {
            grid-column: 1 / -1 !important;
            text-align: center;
          }
          .hero-text-col > div[style*="badge"] {
            margin: 0 auto;
          }
          .hero-text-col > div[style*="flex-wrap"] {
            justify-content: center;
          }
          .hero-h1 {
            white-space: normal !important;
          }
          .hero-avatar-col {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
