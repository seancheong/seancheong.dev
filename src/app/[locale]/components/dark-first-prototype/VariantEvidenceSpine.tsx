import { ArrowRight, ArrowUpRight, Check, Menu, Minus } from 'lucide-react';
import Image from 'next/image';

import { prototypeContent as content } from './prototype-content';

export function VariantEvidenceSpine() {
  return (
    <div className="min-h-screen bg-[#0a0c10] font-sans text-[#edf0f7] selection:bg-[#8da2ff] selection:text-black">
      <header className="fixed top-0 left-0 z-20 flex h-16 w-full items-center justify-between border-b border-[#8da2ff]/15 bg-[#0a0c10]/92 px-5 backdrop-blur-xl lg:hidden">
        <span className="font-mono text-xs font-semibold">SC / PORTFOLIO</span>
        <button
          type="button"
          aria-label="Open navigation"
          className="grid size-9 place-items-center rounded-full border border-white/15"
        >
          <Menu className="size-4" />
        </button>
      </header>

      <div className="lg:grid lg:grid-cols-[minmax(330px,34vw)_1fr]">
        <aside className="flex min-h-screen flex-col justify-between border-r border-[#8da2ff]/15 bg-[#0d1016] px-6 pt-28 pb-24 lg:sticky lg:top-0 lg:h-screen lg:px-10 lg:pt-10">
          <div>
            <div className="hidden items-center justify-between lg:flex">
              <a href="#spine-top" className="font-mono text-xs font-semibold">
                SC / PORTFOLIO
              </a>
              <span className="size-2 rounded-full bg-[#83f2b4] shadow-[0_0_18px_#83f2b4]" />
            </div>
            <p className="mt-16 font-mono text-[10px] tracking-[0.18em] text-[#8da2ff] uppercase lg:mt-24">
              Senior frontend engineer · Tokyo
            </p>
            <h1 className="mt-6 max-w-xl text-[clamp(2.8rem,5.6vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.055em] text-white">
              Evidence over adjectives.
            </h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-[#edf0f7]/55">
              {content.positioning} {content.supporting}
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
              {content.credibility.map((item) => (
                <div key={item.label} className="bg-[#0d1016] p-4">
                  <span className="font-mono text-xl text-white">
                    {item.value}
                  </span>
                  <span className="mt-1 block text-[10px] leading-4 text-white/35">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href="#spine-work"
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#8da2ff] px-4 py-3 text-xs font-semibold text-[#0a0c10]"
              >
                Explore work <ArrowRight className="size-3.5" />
              </a>
              <a
                href="#spine-contact"
                className="flex flex-1 items-center justify-center rounded-md border border-white/15 px-4 py-3 text-xs text-white/65"
              >
                Let&apos;s talk
              </a>
            </div>
          </div>
        </aside>

        <main id="spine-top" className="min-w-0">
          <nav
            className="sticky top-0 z-10 hidden h-16 items-center justify-between border-b border-[#8da2ff]/15 bg-[#0a0c10]/90 px-8 backdrop-blur-xl lg:flex"
            aria-label="Primary"
          >
            <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
              Evidence stream / 2026
            </span>
            <div className="flex items-center gap-7 text-xs text-white/45">
              {content.nav.map((item) => (
                <a key={item} href={`#spine-${item.toLowerCase()}`}>
                  {item}
                </a>
              ))}
            </div>
          </nav>

          <section
            id="spine-experience"
            className="border-b border-[#8da2ff]/15 px-5 py-20 lg:px-8 lg:py-28"
          >
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-[#8da2ff] uppercase">
                  01 / Leadership evidence
                </p>
                <h2 className="mt-4 text-3xl tracking-tight text-white sm:text-4xl">
                  Engineering leadership in practice
                </h2>
              </div>
              <span className="hidden font-mono text-[10px] text-white/25 sm:block">
                4 ROLES · 2 COUNTRIES
              </span>
            </div>
            <div className="relative border-l border-[#8da2ff]/30 pl-6">
              {content.experience.map((item, index) => (
                <article
                  key={item.company}
                  className="relative grid gap-5 border-t border-white/10 py-7 first:border-t-0 sm:grid-cols-[0.25fr_0.75fr]"
                >
                  <span className="absolute top-8 -left-[1.72rem] size-2 rounded-full border-2 border-[#0a0c10] bg-[#8da2ff]" />
                  <p className="font-mono text-[10px] tracking-wider text-white/30">
                    {item.years}
                  </p>
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-medium text-white">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-xs text-[#8da2ff]">
                          {item.company}
                        </p>
                      </div>
                      {index < 2 && (
                        <span className="rounded-full border border-[#83f2b4]/20 bg-[#83f2b4]/5 px-2 py-1 font-mono text-[9px] tracking-wider text-[#83f2b4] uppercase">
                          Leadership signal
                        </span>
                      )}
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
                      {item.scope}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="spine-work"
            className="border-b border-[#8da2ff]/15 px-5 py-20 lg:px-8 lg:py-28"
          >
            <div className="mb-10">
              <p className="font-mono text-[10px] tracking-[0.18em] text-[#8da2ff] uppercase">
                02 / Personal project ownership
              </p>
              <h2 className="mt-4 text-3xl tracking-tight text-white sm:text-4xl">
                Takonbini, under the surface
              </h2>
            </div>
            <article className="overflow-hidden rounded-xl border border-[#8da2ff]/20 bg-[#0d1016]">
              <div className="grid xl:grid-cols-[0.9fr_1.1fr]">
                <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden border-b border-[#8da2ff]/15 bg-[#111724] p-7 xl:border-r xl:border-b-0">
                  <div className="absolute inset-0 [background-image:linear-gradient(rgba(141,162,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(141,162,255,.12)_1px,transparent_1px)] [background-size:40px_40px] opacity-40" />
                  <div className="relative flex items-center justify-between font-mono text-[10px] text-white/30">
                    <span>CASE STUDY / 001</span>
                    <span>日本 · CONVENIENCE</span>
                  </div>
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="size-2 rounded-full bg-[#83f2b4]" />
                      <span className="font-mono text-[10px] tracking-widest text-[#83f2b4] uppercase">
                        Shipped product
                      </span>
                    </div>
                    <h3 className="text-5xl leading-none tracking-[-0.05em] text-white sm:text-6xl">
                      Takonbini
                    </h3>
                    <p className="mt-5 max-w-md text-sm leading-6 text-white/45">
                      A product case study about making convenience-store
                      discovery useful across language and preference
                      boundaries.
                    </p>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {content.outcomes.map((outcome) => (
                      <div
                        key={outcome}
                        className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
                      >
                        <Check className="size-4 text-[#83f2b4]" />
                        <p className="mt-6 text-xs leading-5 text-white/58">
                          {outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg border border-amber-300/10 bg-amber-300/[0.03] p-4">
                    <div className="flex gap-3">
                      <Minus className="mt-0.5 size-4 shrink-0 text-amber-200/70" />
                      <div>
                        <p className="font-mono text-[9px] tracking-widest text-amber-200/60 uppercase">
                          Known constraint
                        </p>
                        <p className="mt-2 text-xs leading-5 text-white/45">
                          The live catalog was empty during the hydrated
                          baseline, so product-detail evidence remains
                          unavailable.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                    <p className="max-w-xs text-xs leading-5 text-white/35">
                      Decision narrative, tradeoffs, verified outcomes, and the
                      remaining limitation.
                    </p>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-xs font-medium text-white"
                    >
                      Case study <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>

            <div id="spine-projects" className="mt-5 grid gap-5 xl:grid-cols-2">
              {content.projects.map((project) => (
                <article
                  key={project.name}
                  className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1016]"
                >
                  <div className="relative h-44 border-b border-white/10">
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      className="object-cover opacity-65"
                      sizes="(max-width: 1280px) 100vw, 35vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[9px] tracking-widest text-white/30 uppercase">
                      {project.eyebrow}
                    </p>
                    <h3 className="mt-3 text-xl text-white">{project.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/42">
                      {project.summary}
                    </p>
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="text-xs text-[#83f2b4]/75">
                        {project.evidence}
                      </p>
                      <p className="mt-2 text-[10px] leading-4 text-white/25">
                        {project.constraint}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="spine-articles"
            className="border-b border-[#8da2ff]/15 px-5 py-20 lg:px-8 lg:py-28"
          >
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#8da2ff] uppercase">
              03 / Communication evidence
            </p>
            <h2 className="mt-4 text-3xl tracking-tight text-white sm:text-4xl">
              Selected articles
            </h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
              {content.articles.map((article, index) => (
                <a
                  key={article}
                  href="#"
                  className="group flex items-center justify-between bg-[#0d1016] p-5 hover:bg-[#111520]"
                >
                  <span className="flex items-center gap-5">
                    <span className="font-mono text-[10px] text-[#8da2ff]">
                      0{index + 1}
                    </span>
                    <span className="text-sm text-white/65">{article}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-white/25 group-hover:text-white" />
                </a>
              ))}
            </div>
          </section>

          <section id="spine-contact" className="px-5 py-24 lg:px-8 lg:py-32">
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#83f2b4] uppercase">
              Available for the right role
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl leading-tight tracking-[-0.04em] text-white sm:text-6xl">
              Bring clarity to a frontend problem that matters.
            </h2>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="mailto:hello@example.com"
                className="flex items-center gap-2 rounded-md bg-white px-5 py-3 text-xs font-semibold text-black"
              >
                Email Sean <ArrowRight className="size-3.5" />
              </a>
              <a
                href="#"
                className="rounded-md border border-white/15 px-5 py-3 text-xs text-white/55"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="rounded-md border border-white/15 px-5 py-3 text-xs text-white/55"
              >
                GitHub
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
