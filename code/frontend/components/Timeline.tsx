import Reveal from '@/components/ui/Reveal';
import TimelineItem from '@/components/TimelineItem';
import { timelineMockData } from '@/lib/mock/experience-education-timeline';

const STAGGER_CLASSES = ['d1', 'd2', 'd3', 'd4'] as const;

export default function Timeline() {
  const { milestones } = timelineMockData;

  return (
    <section
      id="experience"
      style={{
        paddingTop: 'var(--space-28)',
        paddingBottom: 'var(--space-28)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div className="container">
        {/* Section head */}
        <Reveal>
          <span className="eyebrow">Kinh nghiệm &amp; học vấn</span>
        </Reveal>
        <Reveal staggerClass="d1">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 4vw, 42px)',
              fontWeight: 600,
              lineHeight: '1.15',
              letterSpacing: '-0.01em',
              color: 'var(--color-text)',
              marginTop: 'var(--space-3)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Hành trình của tôi
          </h2>
        </Reveal>
        <Reveal staggerClass="d2">
          <p
            style={{
              fontSize: '17px',
              lineHeight: '1.6',
              color: 'var(--color-text-muted)',
              maxWidth: '560px',
              marginBottom: 'var(--space-12)',
            }}
          >
            Từ những ngày đầu trên giảng đường đến vai trò hiện tại — mỗi bước
            đều là bài học quý giá giúp tôi trở thành kỹ sư tốt hơn mỗi ngày.
          </p>
        </Reveal>

        {/* Timeline rail */}
        {milestones.length > 0 ? (
          <div
            style={{
              maxWidth: '760px',
              position: 'relative',
              paddingLeft: '10px',
            }}
          >
            {/* Vertical rail line — continuous from first to last dot */}
            <div
              className="timeline-rail"
              style={{
                left: '9px',
                top: '10px',
                bottom: '10px',
              }}
              aria-hidden="true"
            />

            {/* Milestone cards with scroll-reveal */}
            <div>
              {milestones.map((milestone, index) => {
                const stagger = STAGGER_CLASSES[index] ?? '';
                return (
                  <Reveal key={milestone.id} staggerClass={stagger}>
                    <TimelineItem milestone={milestone} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        ) : (
          /* Empty state */
          <div
            style={{
              maxWidth: '760px',
              padding: 'var(--space-12) var(--space-6)',
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              fontSize: '15px',
            }}
          >
            Hiện tại chưa có dữ liệu kinh nghiệm. Vui lòng quay lại sau.
          </div>
        )}
      </div>
    </section>
  );
}
