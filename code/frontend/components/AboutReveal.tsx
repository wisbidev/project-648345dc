'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface AboutRevealProps {
  children: ReactNode
  className?: string
}

/**
 * Wraps children in a div that receives `.in` via IntersectionObserver
 * when it enters the viewport (threshold 0.15).
 * Respects prefers-reduced-motion.
 */
export default function AboutReveal({ children, className = '' }: AboutRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion: show immediately
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      el.classList.add('in')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('in')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
