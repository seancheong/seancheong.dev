'use client';

import { type ComponentPropsWithoutRef, useEffect, useRef } from 'react';

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
