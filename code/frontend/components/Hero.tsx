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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (!target) {
        e.preventDefault();
        return;
      }
      if (!prefersReducedMotion) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (state === 'loading') {
    return (
      <section
        aria-label="Giới thiệu"
        className="hero-section"
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--color-bg)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container hero-grid">
          {/* Text skeleton */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div
              style={{
                height: '28px',
                width: '200px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-border)',
                animation: prefersReducedMotion ? 'none' : 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            <div
              style={{
                height: 'clamp(42px, 6vw, 68px)',
                width: '80%',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-border)',
              }}
            />
            <div
              style={{
                height: '24px',
                width: '60%',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-border)',
              }}
            />
            <div
              style={{
                height: '18px',
                width: '90%',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-border)',
              }}
            />
            <div
              style={{
                height: '48px',
                width: '160px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-border)',
              }}
            />
          </div>
          {/* Avatar skeleton */}
          <div className="hero-avatar-col">
            <div
              style={{
                width: '340px',
                height: '340px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-border)',
                border: '2px dashed var(--color-primary)',
                padding: 'var(--space-2)',
                maxWidth: '100%',
              }}
            />
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
        className="hero-section"
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--color-bg)',
          display: 'flex',
          alignItems: 'center',
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
      className="hero-section"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container hero-grid" style={{ width: '100%' }}>
        {/* ── Text column ─────────────────────────────────────────── */}
        <div
          className={`reveal${isInView && !prefersReducedMotion ? ' in' : ''}`}
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
            style={{ color: 'var(--color-text)' }}
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
              onClick={(e) => handleCtaClick(e, data.ctaPrimaryHref)}
              className="btn btn-primary"
            >
              {data.ctaPrimaryLabel}
            </a>
            <a
              href={data.ctaSecondaryHref}
              onClick={(e) => handleCtaClick(e, data.ctaSecondaryHref)}
              className="btn btn-ghost"
            >
              {data.ctaSecondaryLabel}
            </a>
          </div>
        </div>

        {/* ── Avatar column ────────────────────────────────────────── */}
        <div className="hero-avatar-col">
          <div className="avatar-frame">
            {showAvatar ? (
              <img
                src={data.avatarSrc}
                alt={data.avatarAlt}
                onError={() => setAvatarError(true)}
                style={{
                  width: '340px',
                  height: '340px',
                  objectFit: 'cover',
                  borderRadius: 'calc(var(--radius-lg) - var(--space-2))',
                  display: 'block',
                  maxWidth: '100%',
                }}
              />
            ) : (
              /* Graceful fallback: frame stays, no broken-image icon */
              <div
                style={{
                  width: '340px',
                  height: '340px',
                  borderRadius: 'calc(var(--radius-lg) - var(--space-2))',
                  backgroundColor: 'var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxWidth: '100%',
                }}
                aria-hidden="true"
              >
                <span
                  style={{
                    fontSize: '80px',
                    color: 'var(--color-text-muted)',
                    userSelect: 'none',
                    lineHeight: 1,
                  }}
                >
                  {/* Generic person silhouette */}
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
