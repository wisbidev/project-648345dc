"use client";

import { useEffect, useRef, useState } from "react";
import {
  SkillsData,
  skillsMockData,
  skillsLoadingData,
  skillsErrorData,
  Skill,
} from "@/lib/mock/skills-section";
import styles from "./SkillsSection.module.css";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // IntersectionObserver: fire when 15% of the card is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) {
              // Skip animation — set final value immediately
              setAnimated(true);
            } else {
              setAnimated(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Stagger delay classes: d1–d4 cycle through 6 cards
  const staggerClass = styles[`d${(index % 4) + 1}`] ?? styles.d1;

  const rawProficiency = skill.proficiency ?? 0;
  const proficiency = Math.min(Math.max(rawProficiency, 0), 100);

  const isTeal = skill.variant === "teal";

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${staggerClass} reveal in`}
      role="article"
      aria-label={skill.name}
    >
      {/* Icon tile */}
      <div
        className={`${styles.iconTile} ${isTeal ? styles.iconTileTeal : ""}`}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: skill.icon }}
      />

      {/* Skill name */}
      <h3 className={styles.skillName}>{skill.name || "\u00A0"}</h3>

      {/* Description */}
      <p className={styles.description}>{skill.description}</p>

      {/* Proficiency label — accessible */}
      <div className={styles.meterLabel}>
        <span className="sr-only">
          {skill.name}: {proficiency}% thành thạo
        </span>
        <span
          role="progressbar"
          aria-valuenow={proficiency}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name} — ${proficiency}%`}
          className="sr-only"
        />
      </div>

      {/* Meter track */}
      <div className={styles.meterTrack}>
        <div
          className={`${styles.meterFill} ${isTeal ? styles.meterFillTeal : ""} ${
            animated ? styles.animated : ""
          }`}
          style={
            animated
              ? {
                  width: `${proficiency}%`,
                  transitionDelay: prefersReducedMotion ? "0ms" : `${index * 80}ms`,
                }
              : { width: "0%" }
          }
        />
      </div>
    </div>
  );
}

interface SkillCardSkeletonProps {
  index: number;
}

function SkillCardSkeleton({ index }: SkillCardSkeletonProps) {
  const staggerClass = styles[`d${(index % 4) + 1}`] ?? styles.d1;
  return (
    <div className={`${styles.card} ${staggerClass} reveal in`} aria-hidden="true">
      <div className={styles.iconTileSkeleton} />
      <div className={styles.skeletonLine} style={{ width: "60%", height: "20px" }} />
      <div className={styles.skeletonLine} style={{ width: "90%", height: "14px" }} />
      <div className={styles.skeletonLine} style={{ width: "100%", height: "6px", marginTop: "16px" }} />
    </div>
  );
}

interface SkillsSectionProps {
  /** Pass a data-access function that returns SkillsData or throws */
  loadData?: () => Promise<SkillsData>;
}

export function SkillsSection({ loadData }: SkillsSectionProps) {
  const [data, setData] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loadData) {
      // Use mock data immediately
      setData(skillsMockData);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    loadData()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải kỹ năng."
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [loadData]);

  const staggerDelay = (i: number) => {
    const delays = [0, 100, 200, 300];
    return delays[i % delays.length];
  };

  return (
    <section id="skills" className={styles.section}>
      <div className={`container ${styles.container}`}>
        {/* Section head */}
        <div className={`${styles.sectionHead} reveal in`}>
          <span className="eyebrow">
            {loading ? "\u00A0" : (data?.section.kicker ?? skillsMockData.section.kicker)}
          </span>
          <h2 className={styles.sectionHeading}>
            {loading ? "\u00A0" : (data?.section.heading ?? skillsMockData.section.heading)}
          </h2>
          <p className={styles.sectionLead}>
            {loading ? "\u00A0" : (data?.section.lead ?? skillsMockData.section.lead)}
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkillCardSkeleton key={`skeleton-${i}`} index={i} />
            ))}
          </div>
        ) : error ? (
          <div className={styles.errorState} role="alert">
            <p className={styles.errorText}>
              {error || skillsErrorData.error}
            </p>
          </div>
        ) : data ? (
          <div className={styles.grid}>
            {data.skills.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState} role="status">
            <p className={styles.emptyText}>Không có kỹ năng nào để hiển thị.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SkillsSection;
