/**
 * Mock data contract for the Skills section.
 * Shape mirrors the API response the backend must satisfy.
 * Swap this file for real API integration.
 */

export interface Skill {
  id: string;
  name: string;
  description: string;
  proficiency: number; // 0-100, data-w value
  variant: "default" | "teal";
  icon: string; // inline SVG path data
}

export interface SkillsData {
  section: {
    kicker: string;
    heading: string;
    lead: string;
  };
  skills: Skill[];
}

// Mock data — placeholder copy, replace with real content
export const skillsMockData: SkillsData = {
  section: {
    kicker: "Kỹ năng",
    heading: "Những điều tôi làm tốt",
    lead:
      "Tôi kết hợp tư duy thiết kế với khả năng kỹ thuật để tạo ra những sản phẩm số có ý nghĩa và trải nghiệm người dùng tuyệt vời.",
  },
  skills: [
    {
      id: "product-design",
      name: "Thiết kế sản phẩm",
      description: "Tạo trải nghiệm người dùng từ ý tưởng đến sản phẩm hoàn chỉnh.",
      proficiency: 90,
      variant: "default",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    },
    {
      id: "web-development",
      name: "Phát triển web",
      description: "Xây dựng giao diện hiện đại, hiệu năng cao bằng React và Next.js.",
      proficiency: 85,
      variant: "default",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    },
    {
      id: "user-research",
      name: "Nghiên cứu người dùng",
      description: "Phân tích hành vi và nhu cầu người dùng để định hướng sản phẩm.",
      proficiency: 80,
      variant: "default",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    },
    {
      id: "prototyping",
      name: "Prototyping",
      description: "Chuyển đổi ý tưởng thành bản mẫu tương tác nhanh chóng.",
      proficiency: 88,
      variant: "default",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    },
    {
      id: "content-writing",
      name: "Viết nội dung",
      description: "Biên soạn nội dung rõ ràng, thuyết phục phù hợp từng ngữ cảnh.",
      proficiency: 70,
      variant: "default",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    },
    {
      id: "project-management",
      name: "Quản lý dự án",
      description: "Điều phối đội ngũ và tiến độ để bàn giao sản phẩm đúng hạn.",
      proficiency: 75,
      variant: "default",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
    },
  ],
};

// Loading skeleton state
export const skillsLoadingData: SkillsData = {
  section: {
    kicker: "",
    heading: "",
    lead: "",
  },
  skills: Array.from({ length: 6 }).map((_, i) => ({
    id: `skeleton-${i}`,
    name: "",
    description: "",
    proficiency: 0,
    variant: "default" as const,
    icon: "",
  })),
};

// Error state
export interface SkillsErrorData {
  error: string;
}

export const skillsErrorData: SkillsErrorData = {
  error: "Không thể tải danh sách kỹ năng. Vui lòng thử lại sau.",
};
