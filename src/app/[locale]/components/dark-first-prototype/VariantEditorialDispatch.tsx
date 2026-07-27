import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import { prototypeContent as content } from './prototype-content';

export function VariantEditorialDispatch() {
  return (
    <div className="min-h-screen bg-[#0c0b0a] text-[#e9e3d7] selection:bg-[#d4ff65] selection:text-black">
      <header className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-7 lg:px-12">
        <a href="#top" className="font-serif text-xl tracking-tight italic">
          Sean Cheong
        </a>
        <nav
          className="hidden items-center gap-8 text-xs tracking-wide text-[#e9e3d7]/55 md:flex"
          aria-label="Primary"
        >
          {content.nav.map((item) => (
            <a key={item} href={`#editorial-${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <a
          href="#editorial-contact"
          className="border-b border-[#d4ff65] pb-1 text-xs"
        >
          Let&apos;s talk
        </a>
      </header>

      <main id="top">
        <section className="mx-auto grid min-h-[760px] max-w-[1500px] items-center px-6 py-20 lg:grid-cols-[0.28fr_1fr] lg:px-12">
          <div className="hidden h-full flex-col justify-between border-r border-[#e9e3d7]/15 pr-8 font-mono text-[10px] tracking-[0.18em] text-[#e9e3d7]/35 uppercase lg:flex">
            <span>Portfolio / 2026</span>
            <span className="[writing-mode:vertical-rl]">
              Tokyo, Japan · Frontend engineering
            </span>
          </div>
          <div className="lg:pl-14">
            <p className="mb-10 text-xs tracking-[0.18em] text-[#d4ff65] uppercase">
              Senior frontend engineer · Team lead
            </p>
            <h1 className="max-w-6xl font-serif text-[clamp(3.6rem,9vw,9rem)] leading-[0.86] font-normal tracking-[-0.055em] text-[#f2ede4]">
              I build the systems behind{' '}
              <em className="font-normal text-[#e9e3d7]/42">clear, durable</em>{' '}
              product experiences.
            </h1>
            <div className="mt-14 grid gap-8 border-t border-[#e9e3d7]/15 pt-8 md:grid-cols-[1fr_0.55fr]">
              <p className="max-w-2xl text-lg leading-8 text-[#e9e3d7]/62">
                {content.positioning} {content.supporting}
              </p>
              <div className="flex items-end gap-7 md:justify-end">
                <a
                  href="#editorial-projects"
                  className="flex items-center gap-2 text-sm text-[#f2ede4]"
                >
                  Explore my work <ArrowDown className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e9e3d7]/15">
          <div className="mx-auto grid max-w-[1500px] grid-cols-2 lg:grid-cols-4">
            {content.credibility.map((item) => (
              <div
                key={item.label}
                className="border-r border-[#e9e3d7]/15 px-6 py-8 last:border-r-0 lg:px-12"
              >
                <div className="font-serif text-5xl tracking-tight text-[#f2ede4] sm:text-6xl">
                  {item.value}
                </div>
                <div className="mt-3 max-w-28 text-xs leading-5 text-[#e9e3d7]/42">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="editorial-projects"
          className="mx-auto max-w-[1500px] px-6 py-28 lg:px-12 lg:py-40"
        >
          <div className="grid gap-14 lg:grid-cols-[0.32fr_1fr]">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#d4ff65] uppercase">
                01 / Featured work
              </p>
              <p className="mt-6 max-w-52 text-sm leading-6 text-[#e9e3d7]/42">
                One complete case study. The decisions, constraints, and
                evidence behind the product.
              </p>
            </div>
            <article>
              <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#e9e3d7]/15 pb-8">
                <div>
                  <p className="text-xs text-[#e9e3d7]/42">
                    Personal project ownership · Japan
                  </p>
                  <h2 className="mt-3 font-serif text-7xl tracking-[-0.055em] text-[#f2ede4] sm:text-8xl lg:text-[8.5rem]">
                    Takonbini
                  </h2>
                </div>
                <a href="#" className="flex items-center gap-2 pb-3 text-sm">
                  Read the case study <ArrowUpRight className="size-4" />
                </a>
              </div>
              <div className="grid gap-10 py-10 lg:grid-cols-[1fr_0.9fr]">
                <div className="relative flex min-h-[460px] flex-col justify-between overflow-hidden bg-[#d4ff65] p-8 text-[#11120d] sm:p-12">
                  <div className="absolute -top-20 -right-16 size-80 rounded-full border-[48px] border-black/8" />
                  <div className="relative flex justify-between font-mono text-[10px] tracking-widest">
                    <span>PRODUCT STORY</span>
                    <span>01—03</span>
                  </div>
                  <p className="relative max-w-xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
                    A better way to discover Japan&apos;s convenience-store
                    finds.
                  </p>
                  <p className="relative max-w-md text-sm leading-6 text-black/60">
                    Prototype media treatment — replace with a recent product
                    capture when the live catalog is populated.
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="font-serif text-3xl leading-tight text-[#f2ede4]">
                      Product judgment made visible through constraints, not a
                      polished feature list.
                    </p>
                    <p className="mt-7 text-base leading-7 text-[#e9e3d7]/48">
                      The case study connects discovery, localization,
                      filtering, and theming to the choices behind the
                      interface.
                    </p>
                  </div>
                  <ol className="mt-12 border-t border-[#e9e3d7]/15">
                    {content.outcomes.map((outcome, index) => (
                      <li
                        key={outcome}
                        className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#e9e3d7]/15 py-5 text-sm leading-6 text-[#e9e3d7]/65"
                      >
                        <span className="font-mono text-[10px] text-[#d4ff65]">
                          0{index + 1}
                        </span>
                        {outcome}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 font-mono text-[10px] leading-5 text-[#e9e3d7]/35 uppercase">
                    Known boundary · The live catalog was empty during capture
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section
          id="editorial-experience"
          className="bg-[#e9e3d7] text-[#181715]"
        >
          <div className="mx-auto max-w-[1500px] px-6 py-28 lg:px-12 lg:py-36">
            <div className="grid gap-16 lg:grid-cols-[0.32fr_1fr]">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-black/45 uppercase">
                  02 / Experience
                </p>
                <h2 className="mt-6 font-serif text-5xl tracking-tight">
                  Leadership in practice.
                </h2>
              </div>
              <div>
                {content.experience.map((item) => (
                  <article
                    key={item.company}
                    className="grid gap-4 border-t border-black/15 py-7 md:grid-cols-[0.25fr_0.75fr]"
                  >
                    <p className="font-mono text-[10px] tracking-wider text-black/45">
                      {item.years}
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <h3 className="font-serif text-2xl">{item.role}</h3>
                        <p className="mt-1 text-xs text-black/50">
                          {item.company}
                        </p>
                      </div>
                      <p className="max-w-sm text-sm leading-6 text-black/55">
                        {item.scope}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-6 py-28 lg:px-12 lg:py-40">
          <div className="grid gap-14 lg:grid-cols-[0.32fr_1fr]">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#d4ff65] uppercase">
                03 / More selected projects
              </p>
            </div>
            <div className="grid gap-16 md:grid-cols-2">
              {content.projects.map((project, index) => (
                <article
                  key={project.name}
                  className={index === 1 ? 'md:mt-28' : ''}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#161513]">
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      className="object-cover opacity-70 grayscale-[45%]"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  <p className="mt-6 font-mono text-[10px] tracking-widest text-[#e9e3d7]/35 uppercase">
                    {project.eyebrow}
                  </p>
                  <h3 className="mt-3 font-serif text-4xl text-[#f2ede4]">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-6 text-[#e9e3d7]/48">
                    {project.summary}
                  </p>
                  <p className="mt-6 text-xs text-[#d4ff65]/75">
                    {project.evidence}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="editorial-articles"
          className="border-y border-[#e9e3d7]/15"
        >
          <div className="mx-auto max-w-[1500px] px-6 py-24 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[0.32fr_1fr]">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#d4ff65] uppercase">
                  04 / Selected articles
                </p>
              </div>
              <div>
                {content.articles.map((article, index) => (
                  <a
                    key={article}
                    href="#"
                    className="group flex items-center justify-between border-t border-[#e9e3d7]/15 py-7 last:border-b"
                  >
                    <span className="flex items-baseline gap-6">
                      <span className="font-mono text-[10px] text-[#e9e3d7]/30">
                        0{index + 1}
                      </span>
                      <span className="font-serif text-2xl text-[#f2ede4] sm:text-3xl">
                        {article}
                      </span>
                    </span>
                    <ArrowUpRight className="size-5 text-[#e9e3d7]/30 transition group-hover:text-[#d4ff65]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="editorial-contact"
          className="mx-auto max-w-[1500px] px-6 py-32 lg:px-12 lg:py-44"
        >
          <p className="text-xs tracking-[0.18em] text-[#d4ff65] uppercase">
            Start a conversation
          </p>
          <h2 className="mt-8 max-w-6xl font-serif text-6xl leading-[0.92] tracking-[-0.04em] text-[#f2ede4] sm:text-8xl lg:text-[8.5rem]">
            Let&apos;s make difficult product work feel clear.
          </h2>
          <a
            href="mailto:hello@example.com"
            className="mt-12 inline-flex items-center gap-3 border-b border-[#e9e3d7]/40 pb-2 text-sm"
          >
            Write to Sean <ArrowRight className="size-4" />
          </a>
        </section>
      </main>
    </div>
  );
}
