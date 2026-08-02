/**
 * Mock data for the Hero section.
 * Shape matches the API contract the backend must satisfy.
 * Swap this file for a real API call without touching any component.
 */

export interface HeroData {
  /** Display name — placeholder "Tên của bạn" until stakeholder edits. */
  name: string;
  /** One-line headline, max ~80 chars. */
  headline: string;
  /** Short tagline paragraph. */
  tagline: string;
  /** Avatar image URL — empty string or 404 triggers placeholder state. */
  avatarSrc: string;
  /** Avatar alt text for accessibility. */
  avatarAlt: string;
  /** Availability badge label. */
  badgeLabel: string;
  /** Primary CTA label. */
  ctaPrimaryLabel: string;
  /** Primary CTA anchor target. */
  ctaPrimaryHref: string;
  /** Secondary CTA label. */
  ctaSecondaryLabel: string;
  /** Secondary CTA anchor target. */
  ctaSecondaryHref: string;
}

/** Loading state — all fields empty. */
export const heroLoadingData: HeroData = {
  name: '',
  headline: '',
  tagline: '',
  avatarSrc: '',
  avatarAlt: '',
  badgeLabel: '',
  ctaPrimaryLabel: '',
  ctaPrimaryHref: '',
  ctaSecondaryLabel: '',
  ctaSecondaryHref: '',
};

/** Error state — API failure shape. */
export interface HeroError {
  code: string;
  message: string;
}

/** Default mock data — all placeholder copy for stakeholder to replace. */
export const heroMockData: HeroData = {
  name: 'Tên của bạn',
  headline: 'Kỹ sư phần mềm & người xây dựng sản phẩm',
  tagline:
    'Tôi thiết kế và phát triển những sản phẩm số mà người dùng yêu thích — từ ý tưởng đến sản phẩm hoàn chỉnh.',
  avatarSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face',
  avatarAlt: 'Ảnh đại diện của Tên của bạn',
  badgeLabel: 'Sẵn sàng nhận dự án',
  ctaPrimaryLabel: 'Liên hệ',
  ctaPrimaryHref: '#contact',
  ctaSecondaryLabel: 'Xem thêm',
  ctaSecondaryHref: '#about',
};
