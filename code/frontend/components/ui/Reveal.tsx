'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  staggerClass?: string;
}

export default function Reveal({ children, className = '', staggerClass = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      el.classList.add('in');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${staggerClass} ${className}`}>
      {children}
    </div>
  );
}
