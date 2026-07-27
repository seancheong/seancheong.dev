'use client';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleDot,
  ExternalLink,
  Menu,
  Minus,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const journeys = [
  { key: 'A', name: 'Brief → Depth' },
  { key: 'B', name: 'Guided Chapters' },
  { key: 'C', name: 'Evidence Map' },
] as const;

type JourneyKey = (typeof journeys)[number]['key'];

const outcomes = [
  'Localized filtering verified across English, Japanese, and Traditional Chinese.',
  'Responsive filter workflow observed at desktop and mobile widths.',
  'Light, dark, and system appearance controls verified in the live product.',
];

const decisions = [
  {
    label: 'Constraint',
    title: 'Discovery across language boundaries',
    body: 'Convenience-store products are difficult to compare when names, dietary context, and preferences cross languages.',
  },
  {
    label: 'Decision',
    title: 'Make filters the primary browsing model',
    body: 'The interface prioritizes locale-aware filters and preference signals over a promotional catalog layout.',
  },
  {
    label: 'Tradeoff',
    title: 'Clarity over visual abundance',
    body: 'A structured discovery flow is less expressive than a dense storefront, but makes the product easier to scan and translate.',
  },
  {
    label: 'Remaining limitation',
    title: 'The live catalog is currently empty',
    body: 'Product-detail evidence could not be verified during the hydrated audit, so this case study does not claim it.',
  },
];

function normalizeJourney(value?: string): JourneyKey {
  const normalized = value?.toUpperCase();
  return normalized === 'B' || normalized === 'C' ? normalized : 'A';
}

export function ResponsiveJourneyPrototype({ journey }: { journey?: string }) {
  const current = normalizeJourney(journey);
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const cycle = useCallback(
    (direction: -1 | 1) => {
      const index = journeys.findIndex(({ key }) => key === current);
      const next =
        journeys[(index + direction + journeys.length) % journeys.length];
      const params = new URLSearchParams(window.location.search);
      params.set('journey', next.key);
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
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cycle]);

  const active = journeys.find(({ key }) => key === current)!;

  return (
    <div className="min-h-screen bg-[#0a0c10] font-sans text-[#edf0f7] selection:bg-[#8da2ff] selection:text-black">
      <JourneyHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {current === 'A' && <BriefDepth />}
      {current === 'B' && <GuidedChapters />}
      {current === 'C' && <EvidenceMap />}
      <JourneySwitcher current={current} active={active} cycle={cycle} />
    </div>
  );
}

function JourneyHeader({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#8da2ff]/15 bg-[#0a0c10]/94 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <Link
          href="/en?variant=C&motion=A#spine-work"
          className="flex items-center gap-3 text-xs font-semibold"
        >
          <span className="grid size-8 place-items-center rounded-md bg-[#8da2ff] font-mono text-[10px] font-black text-[#0a0c10]">
            SC
          </span>
          <span className="hidden sm:inline">Sean Cheong</span>
        </Link>
        <nav
          className="hidden items-center gap-7 text-xs text-white/45 md:flex"
          aria-label="Case study"
        >
          <a href="#summary">Summary</a>
          <a href="#decisions">Decisions</a>
          <a href="#outcomes">Outcomes</a>
          <a href="#reflection">Reflection</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/en?variant=C&motion=A#spine-work"
            className="hidden rounded-md border border-white/15 px-3 py-2 text-xs text-white/60 sm:block"
          >
            Back to work
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid size-9 place-items-center rounded-md border border-white/15 text-white/70 md:hidden"
            aria-expanded={menuOpen}
            aria-label={
              menuOpen ? 'Close case study menu' : 'Open case study menu'
            }
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          className="grid border-t border-white/10 bg-[#0d1016] p-3 md:hidden"
          aria-label="Mobile case study"
        >
          {['Summary', 'Decisions', 'Outcomes', 'Reflection'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-sm text-white/65 hover:bg-white/5"
            >
              {item}
            </a>
          ))}
          <Link
            href="/en?variant=C&motion=A#spine-work"
            className="mt-2 border-t border-white/10 px-3 pt-4 text-sm text-[#8da2ff]"
          >
            Back to selected work
          </Link>
        </nav>
      )}
    </header>
  );
}

function BriefDepth() {
  return (
    <main className="mx-auto max-w-[1440px] border-x border-[#8da2ff]/15">
      <section
        id="summary"
        className="grid min-h-[640px] border-b border-[#8da2ff]/15 xl:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-14">
          <div>
            <Eyebrow>Case study 001 · Personal project ownership</Eyebrow>
            <h1 className="mt-9 max-w-4xl text-[clamp(3.5rem,7vw,7rem)] leading-[0.9] tracking-[-0.065em] text-white">
              Takonbini
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/50">
              A multilingual discovery product for finding Japanese
              convenience-store products by preference, dietary context, and
              curiosity.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-3 text-xs">
            <SummaryPill label="Role" value="Product · Design · Engineering" />
            <SummaryPill label="Status" value="Shipped product" />
            <SummaryPill label="Read" value="~90 sec summary" />
          </div>
        </div>
        <ProductVisual />
      </section>

      <section className="grid border-b border-[#8da2ff]/15 lg:grid-cols-[0.34fr_0.66fr]">
        <aside className="border-b border-[#8da2ff]/15 p-6 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:border-r lg:border-b-0 lg:p-10">
          <Eyebrow>The 90-second brief</Eyebrow>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/42">
            A complete answer first. Continue only if the decisions are relevant
            to what you are evaluating.
          </p>
          <nav className="mt-8 hidden grid-cols-1 gap-2 font-mono text-[10px] text-white/35 uppercase lg:grid">
            <a href="#decisions">01 · Decision narrative</a>
            <a href="#outcomes">02 · Verified outcomes</a>
            <a href="#reflection">03 · Reflection</a>
          </nav>
        </aside>
        <div>
          <section
            id="decisions"
            className="border-b border-[#8da2ff]/15 p-6 py-16 sm:p-10 lg:p-14 lg:py-24"
          >
            <SectionTitle
              index="01"
              title="The decision, without the victory lap"
            />
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {decisions.map((decision) => (
                <DecisionCard key={decision.label} {...decision} />
              ))}
            </div>
          </section>
          <section
            id="outcomes"
            className="border-b border-[#8da2ff]/15 p-6 py-16 sm:p-10 lg:p-14 lg:py-24"
          >
            <SectionTitle index="02" title="What can be verified" />
            <OutcomeList />
          </section>
          <section
            id="reflection"
            className="p-6 py-16 sm:p-10 lg:p-14 lg:py-24"
          >
            <SectionTitle index="03" title="What I would change next" />
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/52">
              The next useful step is not more interface polish. It is restoring
              a representative catalog, validating product-detail behavior, and
              measuring whether the filtering model helps people reach a
              relevant item faster.
            </p>
            <NextStep />
          </section>
        </div>
      </section>
    </main>
  );
}

function GuidedChapters() {
  return (
    <main>
      <section
        id="summary"
        className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1440px] place-items-center border-x border-b border-[#8da2ff]/15 px-6 py-20 text-center"
      >
        <div className="max-w-4xl">
          <Eyebrow>Guided case study · 4 chapters</Eyebrow>
          <h1 className="mt-8 text-[clamp(4rem,10vw,9rem)] leading-[0.84] tracking-[-0.075em] text-white">
            Takonbini
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/50">
            Follow the product from discovery problem to decision, verified
            behavior, and remaining limitation.
          </p>
          <a
            href="#decisions"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#8da2ff] px-5 py-3 text-xs font-semibold text-[#0a0c10]"
          >
            Begin the story <ChevronDown className="size-4" />
          </a>
        </div>
      </section>
      <Chapter
        id="decisions"
        number="01"
        label="The problem"
        title="Discovery breaks when the catalog speaks a different language."
      >
        <p>
          Takonbini began with a narrow product question: how could someone
          browse Japanese convenience-store products without already knowing the
          exact Japanese name?
        </p>
        <ProductVisual compact />
      </Chapter>
      <Chapter
        id="outcomes"
        number="02"
        label="The choice"
        title="Filters became the product, not a utility beside it."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {decisions.slice(0, 3).map((decision) => (
            <DecisionCard key={decision.label} {...decision} />
          ))}
        </div>
      </Chapter>
      <Chapter
        id="reflection"
        number="03"
        label="The evidence"
        title="Three behaviors verified; one boundary left explicit."
      >
        <OutcomeList />
        <NextStep />
      </Chapter>
    </main>
  );
}

function EvidenceMap() {
  return (
    <main
      id="summary"
      className="mx-auto grid max-w-[1440px] border-x border-[#8da2ff]/15 xl:grid-cols-[0.42fr_0.58fr]"
    >
      <aside className="border-b border-[#8da2ff]/15 p-6 sm:p-10 xl:sticky xl:top-16 xl:h-[calc(100vh-4rem)] xl:border-r xl:border-b-0 xl:p-12">
        <Eyebrow>Evidence map · Case study 001</Eyebrow>
        <h1 className="mt-7 text-6xl tracking-[-0.06em] text-white sm:text-7xl">
          Takonbini
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-white/48">
          Choose the evidence you need. The whole case can be scanned without
          following a prescribed narrative.
        </p>
        <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
          <Metric value="03" label="Verified outcomes" />
          <Metric value="01" label="Open limitation" />
          <Metric value="03" label="Locales observed" />
          <Metric value="90s" label="Complete summary" />
        </div>
        <a
          href="https://takonbini.com"
          className="mt-7 inline-flex items-center gap-2 text-xs text-[#8da2ff]"
        >
          Open live product <ExternalLink className="size-3.5" />
        </a>
      </aside>
      <div>
        <MapSection id="decisions" label="Decision narrative">
          <div className="grid gap-3 sm:grid-cols-2">
            {decisions.map((decision) => (
              <DecisionCard key={decision.label} {...decision} />
            ))}
          </div>
        </MapSection>
        <MapSection id="outcomes" label="Verified outcomes">
          <OutcomeList />
        </MapSection>
        <MapSection id="reflection" label="Evidence boundary">
          <div className="rounded-xl border border-amber-200/15 bg-amber-200/[0.03] p-6">
            <Minus className="size-5 text-amber-200/70" />
            <h2 className="mt-8 text-2xl text-white">
              Product-detail claims are withheld.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
              The production catalog returned zero products during the hydrated
              baseline. The case study names that limit instead of converting
              planned behavior into evidence.
            </p>
          </div>
          <NextStep />
        </MapSection>
      </div>
    </main>
  );
}

function Chapter({
  id,
  number,
  label,
  title,
  children,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto grid min-h-[760px] max-w-[1440px] border-x border-b border-[#8da2ff]/15 lg:grid-cols-[0.32fr_0.68fr]"
    >
      <div className="border-b border-[#8da2ff]/15 p-6 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:border-r lg:border-b-0 lg:p-12">
        <span className="font-mono text-5xl text-[#8da2ff]">{number}</span>
        <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-white/30 uppercase">
          {label}
        </p>
      </div>
      <div className="p-6 py-16 sm:p-10 lg:p-14 lg:py-24">
        <h2 className="max-w-3xl text-4xl leading-tight tracking-[-0.04em] text-white sm:text-6xl">
          {title}
        </h2>
        <div className="mt-12 space-y-6 text-base leading-8 text-white/50">
          {children}
        </div>
      </div>
    </section>
  );
}

function ProductVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div
      role="img"
      aria-label="Prototype schematic of Takonbini's observed empty catalog state"
      className={`relative flex overflow-hidden border-[#8da2ff]/15 bg-[#111724] p-5 sm:p-8 ${compact ? 'mt-10 min-h-80 rounded-xl border' : 'min-h-[420px] border-t xl:border-t-0 xl:border-l'}`}
    >
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(141,162,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(141,162,255,.08)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      <div className="relative m-auto w-full max-w-xl overflow-hidden rounded-xl border border-white/12 bg-[#f3f0e8] text-[#171820] shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <span className="text-sm font-bold tracking-tight">TAKONBINI</span>
          <div className="flex gap-2">
            <span className="rounded-full border border-black/15 px-3 py-1 text-[9px]">
              EN
            </span>
            <span className="rounded-full border border-black/15 px-3 py-1 text-[9px]">
              Appearance
            </span>
          </div>
        </div>
        <div className="grid min-h-64 sm:grid-cols-[0.34fr_0.66fr]">
          <div className="border-b border-black/10 p-4 sm:border-r sm:border-b-0">
            <p className="font-mono text-[8px] tracking-widest text-black/45 uppercase">
              Find by preference
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-1">
              {['Category', 'Dietary needs', 'Flavor', 'Brand'].map(
                (filter) => (
                  <span
                    key={filter}
                    className="rounded-md border border-black/10 bg-white/45 px-3 py-2 text-[9px] text-black/60"
                  >
                    {filter}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="grid place-items-center p-8 text-center">
            <div>
              <span className="mx-auto grid size-10 place-items-center rounded-full border border-black/10 bg-white/50 text-lg">
                0
              </span>
              <p className="mt-4 text-sm font-semibold">
                No products available
              </p>
              <p className="mt-2 max-w-xs text-[10px] leading-4 text-black/45">
                The hydrated audit observed the controls and empty state, but no
                product-detail evidence.
              </p>
            </div>
          </div>
        </div>
      </div>
      <span className="absolute right-5 bottom-5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 font-mono text-[9px] text-white/50 backdrop-blur">
        Prototype schematic · observed empty state
      </span>
    </div>
  );
}

function OutcomeList() {
  return (
    <div className="mt-9 grid gap-3">
      {outcomes.map((outcome, index) => (
        <div
          key={outcome}
          className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-5"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#8da2ff]/10 font-mono text-[10px] text-[#8da2ff]">
            0{index + 1}
          </span>
          <p className="text-sm leading-6 text-white/58">{outcome}</p>
          <Check className="ml-auto size-4 shrink-0 text-[#8da2ff]" />
        </div>
      ))}
    </div>
  );
}

function DecisionCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <article className="bg-[#0d1016] p-5 sm:p-6">
      <p className="font-mono text-[9px] tracking-[0.16em] text-[#8da2ff] uppercase">
        {label}
      </p>
      <h3 className="mt-5 text-lg leading-6 text-white">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-white/42">{body}</p>
    </article>
  );
}

function NextStep() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
      <p className="max-w-md text-xs leading-5 text-white/35">
        Next: restore representative catalog data, then verify product-detail
        and assistive-technology behavior.
      </p>
      <Link
        href="/en?variant=C&motion=A#spine-projects"
        className="flex items-center gap-2 text-xs text-white"
      >
        More selected work <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}

function MapSection({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-b border-[#8da2ff]/15 p-6 py-16 last:border-b-0 sm:p-10 lg:p-14 lg:py-24"
    >
      <Eyebrow>{label}</Eyebrow>
      <div className="mt-9">{children}</div>
    </section>
  );
}

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <div>
      <Eyebrow>{index} / Case-study depth</Eyebrow>
      <h2 className="mt-4 text-3xl tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-[#8da2ff] uppercase">
      <CircleDot className="size-3" />
      {children}
    </p>
  );
}

function SummaryPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.02] px-4 py-3">
      <span className="font-mono text-[9px] text-white/25 uppercase">
        {label}
      </span>
      <span className="ml-3 text-white/65">{value}</span>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#0d1016] p-4">
      <span className="font-mono text-2xl text-[#8da2ff]">{value}</span>
      <p className="mt-2 text-[10px] text-white/30">{label}</p>
    </div>
  );
}

function JourneySwitcher({
  current,
  active,
  cycle,
}: {
  current: JourneyKey;
  active: (typeof journeys)[number];
  cycle: (direction: -1 | 1) => void;
}) {
  return (
    <aside
      aria-label="Responsive journey prototype switcher"
      className="fixed bottom-5 left-1/2 z-50 flex w-[min(92vw,34rem)] -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-black/92 p-1.5 text-white shadow-2xl shadow-black/70 backdrop-blur-xl"
    >
      <button
        type="button"
        onClick={() => cycle(-1)}
        className="grid size-9 shrink-0 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
        aria-label="Previous journey"
      >
        <ArrowLeft className="size-4" />
      </button>
      <div className="min-w-0 flex-1 text-center">
        <span className="font-mono text-[9px] text-white/35">
          JOURNEY {current}
        </span>
        <p className="truncate text-xs">{active.name}</p>
      </div>
      <button
        type="button"
        onClick={() => cycle(1)}
        className="grid size-9 shrink-0 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
        aria-label="Next journey"
      >
        <ArrowRight className="size-4" />
      </button>
    </aside>
  );
}
