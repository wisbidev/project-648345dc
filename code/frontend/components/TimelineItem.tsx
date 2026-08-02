import type { TimelineMilestone } from '@/lib/mock/experience-education-timeline';

interface TimelineItemProps {
  milestone: TimelineMilestone;
}

export default function TimelineItem({ milestone }: TimelineItemProps) {
  const { date, role, organization, description, dotVariant = 'default' } = milestone;

  const dotClass = dotVariant === 'teal' ? 'timeline-dot teal' : 'timeline-dot';
  const pillClass = dotVariant === 'teal' ? 'date-pill teal' : 'date-pill';

  return (
    <div className="flex gap-6 items-start relative">
      {/* Dot column — pinned to rail */}
      <div className="flex flex-col items-center flex-shrink-0 pt-3">
        <div className={dotClass} aria-hidden="true" />
      </div>

      {/* Card content */}
      <div className="pb-10 flex-1 min-w-0">
        {date && (
          <span className={pillClass} aria-label={`Thời gian: ${date}`}>
            {date}
          </span>
        )}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '21px',
            fontWeight: 600,
            lineHeight: '1.2',
            marginTop: 'var(--space-2)',
            marginBottom: 'var(--space-1)',
            color: 'var(--color-text)',
          }}
        >
          {role}
        </h3>
        {organization && (
          <p
            style={{
              fontSize: '15px',
              fontWeight: 400,
              color: 'var(--color-text-muted)',
              marginTop: 'var(--space-1)',
              marginBottom: 0,
            }}
          >
            {organization}
          </p>
        )}
        {description && (
          <p
            style={{
              fontSize: '15px',
              fontWeight: 400,
              lineHeight: '1.6',
              color: 'var(--color-text-muted)',
              marginTop: 'var(--space-3)',
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export type { TimelineMilestone };
