'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ContactSectionData,
  contactMockData,
  contactLoadingData,
  contactSuccessData,
} from '@/lib/mock/contact-section-with-form';
import styles from './Contact.module.css';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ERRORS = {
  name: 'Vui lòng nhập tên.',
  email: 'Vui lòng nhập email hợp lệ.',
  message: 'Vui lòng nhập tin nhắn.',
} as const;

// Simple email format check (no trimming — whitespace fails validation)
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// ─── Scroll-reveal hook ─────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.15) {
  const [inView, setInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold]);

  return { ref, inView, prefersReducedMotion };
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────

function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.in : ''} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Contact info row ─────────────────────────────────────────────────────────

function InfoRow({
  type,
  label,
  value,
  icon,
}: {
  type: 'email' | 'location' | 'phone';
  label: string;
  value: string;
  icon: string;
}) {
  const isLink = type === 'email' || type === 'phone';
  const href =
    type === 'email' ? `mailto:${value}` : type === 'phone' ? `tel:${value}` : undefined;

  const content = (
    <>
      <div
        className={styles.infoIconTile}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <div className={styles.infoText}>
        <span className={styles.infoLabel}>{label}</span>
        <span className={styles.infoValue}>{value}</span>
      </div>
    </>
  );

  if (!isLink || !href) {
    return (
      <div className={styles.infoRow} aria-label={`${label}: ${value}`}>
        {content}
      </div>
    );
  }

  return (
    <a
      className={`${styles.infoRow} ${styles.infoRowLink}`}
      href={href}
      aria-label={`${label}: ${value}`}
    >
      {content}
    </a>
  );
}

// ─── Social tile ─────────────────────────────────────────────────────────────

function SocialTile({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: string;
}) {
  return (
    <a
      className={styles.socialTile}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon }} />
    </a>
  );
}

// ─── Form field ──────────────────────────────────────────────────────────────

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'textarea';
  placeholder?: string;
  value: string;
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
  onFocus?: () => void;
}

function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  required = false,
  onChange,
  onFocus,
}: FormFieldProps) {
  const isTextarea = type === 'textarea';
  const Tag = isTextarea ? 'textarea' : 'input';

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required} aria-hidden="true">*</span>}
      </label>
      <Tag
        id={id}
        name={id}
        type={isTextarea ? undefined : (type as 'text' | 'email')}
        placeholder={placeholder}
        value={value}
        required={required}
        autoComplete={type === 'email' ? 'email' : type === 'text' ? 'name' : undefined}
        className={`${isTextarea ? styles.textarea : styles.input} ${error ? styles.invalid : ''}`}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        rows={isTextarea ? 5 : undefined}
      />
      {error && (
        <span id={`${id}-error`} className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

// ─── Success card ─────────────────────────────────────────────────────────────

interface SuccessCardProps {
  prefersReducedMotion: boolean;
  onDismiss: () => void;
}

function SuccessCard({ prefersReducedMotion, onDismiss }: SuccessCardProps) {
  return (
    <div
      className={`${styles.successCard} ${!prefersReducedMotion ? styles.animate : ''}`}
      onClick={onDismiss}
      role="status"
      aria-live="polite"
      aria-label={contactSuccessData.heading}
    >
      <div className={styles.successIconTile} aria-hidden="true">
        <span dangerouslySetInnerHTML={{ __html: contactSuccessData.icon }} />
      </div>
      <h3 className={styles.successHeading}>{contactSuccessData.heading}</h3>
      <p className={styles.successMessage}>{contactSuccessData.message}</p>
    </div>
  );
}

// ─── Loading skeleton ────────────────────────────────────────────────────────

function ContactSkeleton() {
  return (
    <section id="contact" className={styles.section} aria-label="Liên hệ">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <div
            style={{
              height: '22px',
              width: '80px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-border)',
              margin: '0 auto var(--space-3)',
            }}
          />
          <div
            style={{
              height: '42px',
              width: '280px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-border)',
              margin: '0 auto var(--space-3)',
            }}
          />
          <div
            style={{
              height: '17px',
              width: '420px',
              maxWidth: '100%',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-border)',
              margin: '0 auto',
            }}
          />
        </div>
        <div className={styles.columns}>
          {/* Info skeleton */}
          <div>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-4) 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-input)',
                    backgroundColor: 'var(--color-border)',
                    flexShrink: 0,
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
                  <div
                    style={{
                      height: '12px',
                      width: '60px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--color-border)',
                    }}
                  />
                  <div
                    style={{
                      height: '15px',
                      width: '140px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--color-border)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Form skeleton */}
          <div className={styles.formCard}>
            <div
              style={{
                height: '21px',
                width: '160px',
                borderRadius: '6px',
                backgroundColor: 'var(--color-border)',
                marginBottom: 'var(--space-2)',
              }}
            />
            <div
              style={{
                height: '15px',
                width: '240px',
                borderRadius: '6px',
                backgroundColor: 'var(--color-border)',
                marginBottom: 'var(--space-6)',
              }}
            />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  height: i === 2 ? '140px' : '60px',
                  borderRadius: 'var(--radius-input)',
                  backgroundColor: 'var(--color-border)',
                  marginBottom: '18px',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContactSection() {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [data, setData] = useState<ContactSectionData>(contactLoadingData);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Simulate loading from API — replace by swapping lib/mock/contact-section-with-form.ts
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(contactMockData);
      setState('loaded');
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Clear field error on input
  function clearError(field: keyof FieldErrors) {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  // Validate the form; returns the first invalid field ref + field name
  function validateForm(): { field: 'name' | 'email' | 'message'; ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement> } | null {
    if (!name.trim()) {
      return { field: 'name', ref: nameRef };
    }
    if (!email.trim() || !isValidEmail(email)) {
      return { field: 'email', ref: emailRef };
    }
    if (!message.trim()) {
      return { field: 'message', ref: messageRef };
    }
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const firstError = validateForm();
    if (firstError) {
      setErrors({ [firstError.field]: ERRORS[firstError.field] });
      firstError.ref.current?.focus();
      return;
    }

    // All valid — build mailto link
    const recipient = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'minh@example.com';
    const subject = encodeURIComponent(data.form.subject);
    const body = encodeURIComponent(
      `Họ và tên: ${name}\nEmail: ${email}\n\nTin nhắn:\n${message}`
    );
    const mailtoHref = `mailto:${recipient}?subject=${subject}&body=${body}`;
    window.open(mailtoHref, '_self');

    // Show success card
    setShowSuccess(true);

    // Auto-hide after 8 seconds
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowSuccess(false);
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    }, 8000);
  }

  function handleSuccessDismiss() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowSuccess(false);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (state === 'loading') {
    return <ContactSkeleton />;
  }

  // ── Loaded / success ──────────────────────────────────────────────────────
  return (
    <section id="contact" className={styles.section} aria-label="Liên hệ">
      <div className="container">
        {/* Section head */}
        <div className={styles.sectionHead}>
          <Reveal className={styles.d1}>
            <span className="eyebrow">{data.kicker}</span>
          </Reveal>
          <Reveal className={styles.d2}>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(30px, 4vw, 42px)',
                lineHeight: 1.15,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: 'var(--color-text)',
                margin: 'var(--space-2) 0 var(--space-4)',
              }}
            >
              {data.heading}
            </h2>
          </Reveal>
          <Reveal className={styles.d3}>
            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                maxWidth: '540px',
                margin: '0 auto',
              }}
            >
              {data.lead}
            </p>
          </Reveal>
        </div>

        {/* Two-column layout */}
        <Reveal className={styles.d4}>
          <div className={styles.columns}>
            {/* ── Contact info column ───────────────────────────────── */}
            <div className={styles.infoColumn}>
              {/* Info rows */}
              <div className={styles.infoRows} role="list" aria-label="Thông tin liên hệ">
                {data.contactInfo.map((row) => (
                  <div key={row.type} role="listitem">
                    <InfoRow
                      type={row.type}
                      label={row.label}
                      value={row.value}
                      icon={row.icon}
                    />
                  </div>
                ))}
              </div>

              {/* Social links */}
              {data.socialLinks.length > 0 && (
                <div className={styles.socialLinks} aria-label="Mạng xã hội">
                  {data.socialLinks.map((link) => (
                    <SocialTile
                      key={link.label}
                      label={link.label}
                      href={link.href}
                      icon={link.icon}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── Form card ─────────────────────────────────────────── */}
            <div className={styles.formCard}>
              {showSuccess ? (
                <SuccessCard
                  prefersReducedMotion={prefersReducedMotion}
                  onDismiss={handleSuccessDismiss}
                />
              ) : (
                <>
                  <h3 className={styles.formCardH3}>Gửi tin nhắn cho tôi</h3>
                  <p className={styles.formIntro}>
                    Điền thông tin bên dưới và nhấn gửi — tôi sẽ phản hồi sớm nhất có thể.
                  </p>
                  <form
                    className={styles.formFields}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Form liên hệ"
                  >
                    <FormField
                      id="name"
                      label="Họ và tên"
                      type="text"
                      placeholder={data.form.namePlaceholder}
                      value={name}
                      error={errors.name}
                      required
                      onChange={setName}
                      onFocus={() => clearError('name')}
                    />
                    <FormField
                      id="email"
                      label="Email"
                      type="email"
                      placeholder={data.form.emailPlaceholder}
                      value={email}
                      error={errors.email}
                      required
                      onChange={setEmail}
                      onFocus={() => clearError('email')}
                    />
                    <FormField
                      id="message"
                      label="Tin nhắn"
                      type="textarea"
                      placeholder={data.form.messagePlaceholder}
                      value={message}
                      error={errors.message}
                      required
                      onChange={setMessage}
                      onFocus={() => clearError('message')}
                    />
                    <button type="submit" className={styles.submitBtn}>
                      {data.form.submitLabel}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
