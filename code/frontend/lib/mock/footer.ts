/**
 * Footer mock data — shapes the contract the backend must satisfy.
 * Swap this file for a real API call; components import from here only.
 */

export interface FooterData {
  copyrightText: string;
  backToTopLabel: string;
}

export const footerMockData: FooterData = {
  copyrightText: "© 2026 Nguyễn Minh Anh. Được thiết kế và phát triển bởi chính tôi.",
  backToTopLabel: "Lên đầu trang",
};
