'use client';

import { type ReactNode, useEffect, useRef } from 'react';

export function TimelineProgress({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const draw = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const value = preference.matches
        ? 1
        : Math.max(
            0,
            Math.min(1, (innerHeight * 0.6 - bounds.top) / bounds.height),
          );
      element.style.setProperty('--career-progress', String(value));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      preference.removeEventListener('change', schedule);
    };
  }, []);
  return (
    <div ref={root} className="home-timeline-track">
      <div className="home-timeline-rail" aria-hidden="true">
        <span />
      </div>
      {children}
    </div>
  );
}
