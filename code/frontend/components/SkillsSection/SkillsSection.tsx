"use client";

import { useEffect, useRef, useState } from "react";
import {
  SkillsData,
  skillsMockData,
  skillsErrorData,
  Skill,
} from "@/lib/mock/skills-section";
import styles from "./SkillsSection.module.css";

const STAGGER_CLASSES = [
  styles.d1,
  styles.d2,
  styles.d3,
  styles.d4,
] as const;

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const staggerClass = STAGGER_CLASSES[index % 4];

  const rawProficiency = skill.proficiency ?? 0;
  const proficiency = Math.min(Math.max(rawProficiency, 0), 100);
  const isTeal = skill.variant === "teal";

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${staggerClass} ${styles.reveal} ${
        animated ? styles.in : ""
      }`}
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
      <h3 className={styles.skillName}>
        {skill.name || "\u00A0"}
      </h3>

      {/* Description */}
      <p className={styles.description}>{skill.description}</p>

      {/* Proficiency — accessible label */}
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
                  transitionDelay: prefersReducedMotion
                    ? "0ms"
                    : `${index * 80}ms`,
                }
              : { width: "0%" }
          }
        />
      </div>
    </div>
  );
}

function SkillCardSkeleton({ index }: { index: number }) {
  const staggerClass = STAGGER_CLASSES[index % 4];
  return (
    <div
      className={`${styles.card} ${staggerClass} ${styles.reveal} ${styles.in}`}
      aria-hidden="true"
    >
      <div className={styles.iconTileSkeleton} />
      <div
        className={styles.skeletonLine}
        style={{ width: "60%", height: "20px" }}
      />
      <div
        className={styles.skeletonLine}
        style={{ width: "90%", height: "14px" }}
      />
      <div
        className={styles.skeletonLine}
        style={{ width: "100%", height: "6px", marginTop: "16px" }}
      />
    </div>
  );
}

interface SkillsSectionProps {
  /** Injectable data accessor — omit to use mock data */
  loadData?: () => Promise<SkillsData>;
}

export function SkillsSection({ loadData }: SkillsSectionProps) {
  const [data, setData] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loadData) {
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
            err instanceof Error
              ? err.message
              : "Đã xảy ra lỗi khi tải kỹ năng."
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [loadData]);

  const section = data?.section ?? skillsMockData.section;

  return (
    <section id="skills" className={styles.section}>
      <div className={`container ${styles.container}`}>
        {/* Section head */}
        <div className={`${styles.sectionHead} ${styles.reveal} ${styles.in}`}>
          <span className="eyebrow">
            {loading ? "\u00A0" : section.kicker}
          </span>
          <h2 className={styles.sectionHeading}>
            {loading ? "\u00A0" : section.heading}
          </h2>
          <p className={styles.sectionLead}>
            {loading ? "\u00A0" : section.lead}
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
          <div className={styles.stateMessage} role="alert">
            <p className={styles.stateText}>
              {error || skillsErrorData.error}
            </p>
          </div>
        ) : data && data.skills.length > 0 ? (
          <div className={styles.grid}>
            {data.skills.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </div>
        ) : (
          <div className={styles.stateMessage} role="status">
            <p className={styles.stateText}>
              Không có kỹ năng nào để hiển thị.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SkillsSection;
