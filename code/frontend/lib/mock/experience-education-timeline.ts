// TimelineMilestone type — mirrors what the API will return
export interface TimelineMilestone {
  id: string;
  date?: string | null;
  role: string;
  organization?: string | null;
  description?: string | null;
  dotVariant?: 'default' | 'teal';
}

// Mock API response shape for the experience timeline
export interface TimelineData {
  milestones: TimelineMilestone[];
}

export const timelineMockData: TimelineData = {
  milestones: [
    {
      id: '1',
      date: '2022 — nay',
      role: 'Senior Software Engineer',
      organization: 'Startup ABC · Hà Nội',
      description:
        'Thiết kế và phát triển các tính năng chính của nền tảng, dẫn dắt team 4 kỹ sư, tối ưu hiệu suất hệ thống tăng 40%.',
      dotVariant: 'default',
    },
    {
      id: '2',
      date: '2020 — 2022',
      role: 'Software Engineer',
      organization: 'Công ty XYZ · TP. HCM',
      description:
        'Phát triển API RESTful và giao diện người dùng cho ứng dụng thương mại điện tử với hơn 50.000 người dùng hoạt động.',
      dotVariant: 'teal',
    },
    {
      id: '3',
      date: '2018 — 2020',
      role: 'Fresher Developer',
      organization: 'Agency 123 · Hà Nội',
      description:
        'Tham gia phát triển các website cho khách hàng, học hỏi quy trình sản xuất phần mềm chuyên nghiệp.',
      dotVariant: 'default',
    },
    {
      id: '4',
      date: '2014 — 2018',
      role: 'Cử nhân Công nghệ Thông tin',
      organization: 'Đại học Quốc gia · Hà Nội',
      description:
        'Tốt nghiệp loại Giỏi, chuyên ngành Kỹ thuật Phần mềm. Đồ án tốt nghiệp đạt điểm A.',
      dotVariant: 'teal',
    },
  ],
};

export const timelineLoadingData: TimelineData = {
  milestones: [],
};
