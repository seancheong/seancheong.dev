'use client';

import { MotionConfig } from 'motion/react';
import { type ComponentPropsWithoutRef, useEffect, useRef } from 'react';

/** Apply the same reduced-motion policy to retained Motion consumers. */
export function MotionPolicy({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Content stays visible until (and after) this optional one-time enhancement. */
export function Reveal({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let consumed = false;
    const stop = () => {
      consumed = true;
      observer.disconnect();
      element.removeAttribute('data-revealing');
    };
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      if (
        consumed ||
        reduced.matches ||
        element.contains(document.activeElement)
      )
        return;
      consumed = true;
      element.setAttribute('data-revealing', '');
    });
    const bounds = element.getBoundingClientRect();
    // Already-visible content never plays an entrance on hydration.
    if (reduced.matches || (bounds.top < innerHeight && bounds.bottom > 0)) {
      consumed = true;
    } else {
      observer.observe(element);
    }
    const onPreference = () => {
      if (reduced.matches) stop();
    };
    reduced.addEventListener('change', onPreference);
    element.addEventListener('focusin', stop);
    element.addEventListener('animationend', stop);
    return () => {
      stop();
      reduced.removeEventListener('change', onPreference);
      element.removeEventListener('focusin', stop);
      element.removeEventListener('animationend', stop);
    };
  }, []);
  return (
    <div
      {...props}
      ref={ref}
      className={['portfolio-reveal', className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}

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
