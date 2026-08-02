/**
 * Mock data contract for the Contact section.
 * Shape mirrors the API response the backend must satisfy.
 * Swap this file for real API integration — components only import from here.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ContactInfoRow {
  /** 'email' | 'location' | 'phone' */
  type: 'email' | 'location' | 'phone';
  /** Human-readable label, e.g. "Email" */
  label: string;
  /** The value — email is a mailto: address, phone is tel:, location is plain text */
  value: string;
  /** Icon as inline SVG markup (stroke-based, 22×22 viewBox) */
  icon: string;
}

export interface SocialLink {
  /** Display name, used as aria-label */
  label: string;
  /** Profile URL (https://github.com/…, https://linkedin.com/in/…) */
  href: string;
  /** Icon as inline SVG markup */
  icon: string;
}

export interface FormConfig {
  /** Label for the submit button */
  submitLabel: string;
  /** Fixed mailto subject line */
  subject: string;
  /** Placeholder for name field */
  namePlaceholder: string;
  /** Placeholder for email field */
  emailPlaceholder: string;
  /** Placeholder for message textarea */
  messagePlaceholder: string;
}

export interface ContactSectionData {
  /** Section header kicker/eyebrow */
  kicker: string;
  /** Section h2 heading */
  heading: string;
  /** Lead paragraph below the heading */
  lead: string;
  /** Contact info rows (email, location, phone) */
  contactInfo: ContactInfoRow[];
  /** Social profile links */
  socialLinks: SocialLink[];
  /** Form configuration copy */
  form: FormConfig;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const ICON_EMAIL = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>`;

const ICON_LOCATION = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

const ICON_PHONE = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

const ICON_GITHUB = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;

const ICON_LINKEDIN = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;

const ICON_CHECK = `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

// ─── Mock data ────────────────────────────────────────────────────────────────

/** Default mock data — placeholder copy for stakeholder to replace. */
export const contactMockData: ContactSectionData = {
  kicker: 'Liên hệ',
  heading: 'Kết nối với tôi',
  lead:
    'Bạn có câu hỏi hoặc muốn hợp tác? Điền vào form bên dưới hoặc liên hệ trực tiếp — tôi sẽ phản hồi sớm nhất có thể.',
  contactInfo: [
    {
      type: 'email',
      label: 'Email',
      value: 'minh@example.com',
      icon: ICON_EMAIL,
    },
    {
      type: 'location',
      label: 'Địa chỉ',
      value: 'TP. Hồ Chí Minh, Việt Nam',
      icon: ICON_LOCATION,
    },
    {
      type: 'phone',
      label: 'Điện thoại',
      value: '+84 90 123 4567',
      icon: ICON_PHONE,
    },
  ],
  socialLinks: [
    {
      label: 'GitHub',
      href: 'https://github.com/',
      icon: ICON_GITHUB,
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/',
      icon: ICON_LINKEDIN,
    },
  ],
  form: {
    submitLabel: 'Gửi tin nhắn',
    subject: 'Liên hệ từ trang giới thiệu',
    namePlaceholder: 'Họ và tên',
    emailPlaceholder: 'ban@example.com',
    messagePlaceholder: 'Viết tin nhắn của bạn…',
  },
};

// ─── Loading / error shapes ──────────────────────────────────────────────────

export const contactLoadingData: ContactSectionData = {
  kicker: '',
  heading: '',
  lead: '',
  contactInfo: [],
  socialLinks: [],
  form: {
    submitLabel: '',
    subject: '',
    namePlaceholder: '',
    emailPlaceholder: '',
    messagePlaceholder: '',
  },
};

/** Success state data — returned after valid form submission. */
export interface ContactSuccessData {
  /** Success heading */
  heading: string;
  /** Confirmation message */
  message: string;
  /** Check icon SVG */
  icon: string;
}

export const contactSuccessData: ContactSuccessData = {
  heading: 'Tin nhắn đã được gửi!',
  message: 'Cảm ơn bạn! Tin nhắn đã được gửi.',
  icon: ICON_CHECK,
};
