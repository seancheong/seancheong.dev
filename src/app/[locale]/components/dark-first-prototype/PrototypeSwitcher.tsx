'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { type PrototypeVariant, prototypeVariants } from './prototype-content';

interface PrototypeSwitcherProps {
  current: PrototypeVariant;
}

export function PrototypeSwitcher({ current }: PrototypeSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const cycle = useCallback(
    (direction: -1 | 1) => {
      const currentIndex = prototypeVariants.findIndex(
        ({ key }) => key === current,
      );
      const nextIndex =
        (currentIndex + direction + prototypeVariants.length) %
        prototypeVariants.length;
      const params = new URLSearchParams(window.location.search);
      params.set('variant', prototypeVariants[nextIndex].key);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [current, pathname, router],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditing =
        target?.matches('input, textarea, [contenteditable="true"]') ?? false;

      if (isEditing) return;

      if (event.key === 'ArrowLeft') cycle(-1);
      if (event.key === 'ArrowRight') cycle(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cycle]);

  if (process.env.NODE_ENV === 'production') return null;

  const active = prototypeVariants.find(({ key }) => key === current)!;

  return (
    <aside
      aria-label="Prototype variant switcher"
      className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-black/90 p-1.5 font-mono text-xs text-white shadow-2xl shadow-black/60 backdrop-blur"
    >
      <button
        type="button"
        onClick={() => cycle(-1)}
        className="grid size-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Previous visual direction"
      >
        <ArrowLeft className="size-4" />
      </button>
      <div className="min-w-44 px-3 text-center">
        <span className="text-white/45">Prototype </span>
        <span>{active.key}</span>
        <span className="text-white/45"> — </span>
        <span>{active.name}</span>
      </div>
      <button
        type="button"
        onClick={() => cycle(1)}
        className="grid size-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Next visual direction"
      >
        <ArrowRight className="size-4" />
      </button>
    </aside>
  );
}
