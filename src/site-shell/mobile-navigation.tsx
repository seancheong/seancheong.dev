'use client';

import { type ReactNode, useRef } from 'react';

export function MobileNavigation({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const close = (returnFocus = false) => {
    if (!disclosure.current) return;
    disclosure.current.open = false;
    if (returnFocus)
      disclosure.current
        .querySelector('summary')
        ?.focus({ preventScroll: true });
  };

  return (
    <details
      ref={disclosure}
      className="site-mobile-navigation"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && disclosure.current?.open) {
          event.preventDefault();
          close(true);
        }
      }}
    >
      <summary role="button">
        {label}
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div
        className="site-mobile-links"
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest('a'))
            close(true);
        }}
      >
        {children}
      </div>
    </details>
  );
}
