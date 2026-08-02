/**
 * Mock data contract for the About section.
 * Shape mirrors the API response the backend must satisfy.
 * Swap this file to connect to real data.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AboutStat {
  numeral: string   // e.g. "8+"
  label: string     // e.g. "Năm kinh nghiệm"
}

export interface AboutData {
  eyebrow: string       // e.g. "Về tôi"
  heading: string       // e.g. "Giới thiệu bản thân"
  portrait: string      // image URL — empty string → placeholder
  portraitAlt: string   // alt text for portrait
  narrative: string    // biography paragraph (Vietnamese)
  stats: AboutStat[]    // exactly 3 items
}

// ─── Mock values ────────────────────────────────────────────────────────────

export const aboutMockData: AboutData = {
  eyebrow: 'Về tôi',
  heading: 'Giới thiệu bản thân',
  portrait: '',                        // empty → placeholder rendered
  portraitAlt: 'Ảnh chân dung',
  narrative:
    'Xin chào! Tôi là một lập trình viên đam mê công nghệ, luôn tìm kiếm những ' +
    'giải pháp sáng tạo cho các vấn đề phức tạp. Với hơn 8 năm kinh nghiệm trong ' +
    'lĩnh vực phát triển phần mềm, tôi đã có cơ hội làm việc với nhiều dự án từ ' +
    'nhỏ đến lớn, từ startup đến doanh nghiệp lớn. Tôi tin rằng công nghệ tốt nhất ' +
    'là công nghệ đơn giản, hiệu quả và phục vụ con người.',
  stats: [
    { numeral: '8+', label: 'Năm kinh nghiệm' },
    { numeral: '40+', label: 'Dự án hoàn thành' },
    { numeral: '12+', label: 'Giải thưởng' },
  ],
}

// ─── Loading / error shapes ──────────────────────────────────────────────────

export const aboutLoadingData: null = null
