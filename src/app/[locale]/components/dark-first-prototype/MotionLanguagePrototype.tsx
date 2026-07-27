'use client';

import { ArrowLeft, ArrowRight, Info, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './MotionLanguagePrototype.module.css';

const systems = [
  {
    key: 'A',
    name: 'Immediate + Guided',
    summary:
      'Direct feedback with restrained reveals and a quiet pointer glow.',
    tokens: '120 / 220ms · ease-out · 12px reveal travel',
    primitives: 'Color shift · border signal · section reveal · ambient glow',
    controls: 'Native controls; passive effects never capture input',
    rule: 'Reveal once, respond instantly, and keep atmospheric motion barely perceptible.',
  },
  {
    key: 'B',
    name: 'Guided',
    summary: 'A paced scroll narrative that reveals hierarchy and progress.',
    tokens: '120 / 220 / 440ms · ease-out · 24px travel · 70ms stagger',
    primitives: 'Section reveal · staggered list · reading progress',
    controls: 'Native controls plus passive page-progress indicator',
    rule: 'Animate once on entry; never hide the current task or navigation.',
  },
  {
    key: 'C',
    name: 'Tactile',
    summary: 'Pointer-responsive surfaces make the portfolio feel crafted.',
    tokens: '120 / 220ms · spring-like ease · 4px lift',
    primitives: 'Surface lift · icon nudge · ambient pointer spotlight',
    controls:
      'Native controls; pointer effects only on precise-pointer devices',
    rule: 'Reserve tactile motion for affordances; never move reading content.',
  },
] as const;

type MotionKey = (typeof systems)[number]['key'];

function normalizeMotion(value?: string): MotionKey {
  const normalized = value?.toUpperCase();
  return normalized === 'B' || normalized === 'C' ? normalized : 'A';
}

interface MotionLanguagePrototypeProps {
  children: ReactNode;
  motion?: string;
}

// Three motion systems for the accepted Violet Timeline, switchable via ?motion=.
export function MotionLanguagePrototype({
  children,
  motion,
}: MotionLanguagePrototypeProps) {
  const current = normalizeMotion(motion);
  const active = systems.find(({ key }) => key === current)!;
  const pathname = usePathname();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const cycle = useCallback(
    (direction: -1 | 1) => {
      const index = systems.findIndex(({ key }) => key === current);
      const next =
        systems[(index + direction + systems.length) % systems.length];
      const params = new URLSearchParams(window.location.search);
      params.set('variant', 'C');
      params.set('motion', next.key);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [current, pathname, router],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, [contenteditable="true"]')) return;
      if (event.key === 'ArrowLeft') cycle(-1);
      if (event.key === 'ArrowRight') cycle(1);
      if (event.key === 'Escape') setDetailsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cycle]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealTargets = Array.from(root.querySelectorAll('section, article'));
    revealTargets.forEach((target) =>
      target.removeAttribute('data-motion-visible'),
    );

    if (current === 'C') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-motion-visible', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );
    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [current]);

  useEffect(() => {
    if (current !== 'B') return;
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      rootRef.current?.style.setProperty('--scroll-progress', `${progress}%`);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, [current]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (current === 'B' || event.pointerType === 'touch') return;
    rootRef.current?.style.setProperty('--pointer-x', `${event.clientX}px`);
    rootRef.current?.style.setProperty('--pointer-y', `${event.clientY}px`);
  };

  const systemClass =
    current === 'A'
      ? styles.immediate
      : current === 'B'
        ? styles.guided
        : styles.tactile;

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${systemClass}`}
      onPointerMove={handlePointerMove}
      style={{ '--scroll-progress': '0%' } as CSSProperties}
    >
      {children}

      <aside className="fixed bottom-5 left-1/2 z-50 w-[min(92vw,42rem)] -translate-x-1/2 rounded-2xl border border-white/15 bg-[#080a0e]/95 p-2 text-white shadow-2xl shadow-black/70 backdrop-blur-xl">
        {detailsOpen && (
          <div className="mb-2 grid gap-3 rounded-xl border border-[#8da2ff]/20 bg-[#10131b] p-4 text-xs sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="font-mono text-[9px] tracking-[0.18em] text-[#8da2ff] uppercase">
                System intent
              </p>
              <p className="mt-1.5 text-white/70">{active.summary}</p>
            </div>
            <Detail label="Tokens" value={active.tokens} />
            <Detail label="Primitives" value={active.primitives} />
            <Detail label="Controls" value={active.controls} />
            <Detail label="Rule" value={active.rule} />
            <p className="border-t border-white/10 pt-3 text-[10px] leading-4 text-white/38 sm:col-span-2">
              All variants preserve focus order and native semantics.
              Reduced-motion collapses transitions to 1ms, removes travel, and
              disables the pointer spotlight.
            </p>
          </div>
        )}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => cycle(-1)}
            className="grid size-10 shrink-0 place-items-center rounded-xl text-white/60 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8da2ff]"
            aria-label="Previous motion system"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div className="min-w-0 flex-1 px-2 text-center">
            <span className="font-mono text-[9px] tracking-wider text-white/35 uppercase">
              Motion {active.key}
            </span>
            <p className="truncate text-xs font-medium">
              {active.name}{' '}
              <span className="text-white/35">— {active.summary}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDetailsOpen((open) => !open)}
            className="grid size-10 shrink-0 place-items-center rounded-xl text-white/60 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8da2ff]"
            aria-expanded={detailsOpen}
            aria-label={
              detailsOpen
                ? 'Hide motion system details'
                : 'Show motion system details'
            }
          >
            {detailsOpen ? (
              <X className="size-4" />
            ) : (
              <Info className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => cycle(1)}
            className="grid size-10 shrink-0 place-items-center rounded-xl text-white/60 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8da2ff]"
            aria-label="Next motion system"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </aside>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[9px] tracking-wider text-white/30 uppercase">
        {label}
      </p>
      <p className="mt-1 leading-5 text-white/62">{value}</p>
    </div>
  );
}
