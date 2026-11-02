'use client';

import { useEffect, useRef } from 'react';

export function PointerSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const eligible = matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    let frame = 0;
    let x = 0;
    let y = 0;
    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.removeAttribute('data-active');
    };
    const move = (event: PointerEvent) => {
      if (!eligible.matches || event.pointerType !== 'mouse') {
        hide();
        return;
      }
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        element.style.setProperty('--spotlight-x', `${x}px`);
        element.style.setProperty('--spotlight-y', `${y}px`);
        element.setAttribute('data-active', '');
        frame = 0;
      });
    };
    const sync = () => {
      hide();
      window.removeEventListener('pointermove', move);
      if (eligible.matches)
        window.addEventListener('pointermove', move, { passive: true });
    };
    sync();
    eligible.addEventListener('change', sync);
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    document.addEventListener('keydown', hide);
    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      eligible.removeEventListener('change', sync);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      document.removeEventListener('keydown', hide);
    };
  }, []);
  return <div ref={ref} className="portfolio-spotlight" aria-hidden="true" />;
}
