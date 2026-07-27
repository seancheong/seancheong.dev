import {
  ArrowRight,
  CircleDot,
  ExternalLink,
  Minus,
  MoveUpRight,
} from 'lucide-react';
import Image from 'next/image';

import { prototypeContent as content } from './prototype-content';

export function VariantProductLedger() {
  return (
    <div className="min-h-screen bg-[#07090c] font-sans text-[#f4f5f6] selection:bg-[#78f0bf] selection:text-black">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07090c]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <a href="#top" className="flex items-center gap-3 font-semibold">
            <span className="grid size-8 place-items-center rounded-md bg-[#78f0bf] text-xs font-black text-black">
              SC
            </span>
            <span className="hidden text-sm sm:inline">Sean Cheong</span>
          </a>
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {content.nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-md px-3 py-2 text-xs text-white/55 transition hover:bg-white/5 hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-xs font-medium hover:border-[#78f0bf]/70"
          >
            Let&apos;s talk <MoveUpRight className="size-3.5" />
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[1440px] px-5 pb-28 lg:px-10">
        <section className="grid min-h-[660px] items-stretch border-x border-white/10 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="flex flex-col justify-between border-b border-white/10 p-6 sm:p-10 lg:border-r lg:border-b-0 lg:p-14">
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-[#78f0bf] uppercase">
              <CircleDot className="size-3.5" /> Available for senior frontend
              roles
            </div>
            <div className="py-20 lg:py-10">
              <p className="mb-7 max-w-xl font-mono text-xs leading-6 text-white/45">
                FRONTEND ENGINEERING / TEAM LEADERSHIP / PRODUCT JUDGMENT
              </p>
              <h1 className="max-w-5xl text-5xl leading-[0.98] font-medium tracking-[-0.055em] text-white sm:text-7xl lg:text-[5.6rem]">
                {content.positioning}
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
                {content.supporting}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="flex items-center gap-3 rounded-md bg-[#f4f5f6] px-5 py-3 text-sm font-semibold text-black"
              >
                Explore my work <ArrowRight className="size-4" />
              </a>
              <a
                href="#contact"
                className="rounded-md border border-white/15 px-5 py-3 text-sm text-white/70"
              >
                Let&apos;s talk
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1">
            {content.credibility.map((item, index) => (
              <div
                key={item.label}
                className="flex min-h-36 flex-col justify-between border-r border-b border-white/10 p-6 last:border-b-0 even:border-r-0 lg:border-r-0 lg:p-8"
              >
                <span className="font-mono text-[10px] tracking-widest text-white/35">
                  0{index + 1} / SIGNAL
                </span>
                <div>
                  <div className="font-mono text-4xl tracking-[-0.08em] text-[#78f0bf]">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs text-white/45">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="border-x border-b border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase">
            <span>Engineering leadership in practice</span>
            <span>2011—Now</span>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {content.experience.map((item, index) => (
              <article
                key={item.company}
                className="group min-h-56 border-b border-white/10 p-6 md:border-r xl:border-b-0"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-white/35">
                  <span>0{index + 1}</span>
                  <span>{item.years}</span>
                </div>
                <h2 className="mt-12 text-lg font-medium text-white">
                  {item.role}
                </h2>
                <p className="mt-2 text-xs text-[#78f0bf]">{item.company}</p>
                <p className="mt-5 max-w-xs text-sm leading-6 text-white/45">
                  {item.scope}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="border-x border-b border-white/10 p-4 sm:p-8"
        >
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-[#78f0bf] uppercase">
                01 / Featured case study
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-white">
                Takonbini
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] text-white/35 sm:block">
              PERSONAL PROJECT OWNERSHIP
            </span>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0c1014]">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative min-h-[370px] overflow-hidden border-b border-white/10 p-8 lg:border-r lg:border-b-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,240,191,0.14),transparent_34%),linear-gradient(135deg,transparent_0_48%,rgba(255,255,255,0.035)_49%_50%,transparent_51%_100%)] bg-[length:auto,34px_34px]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex justify-between font-mono text-[10px] text-white/35">
                    <span>PRODUCT SURFACE / PROTOTYPE TREATMENT</span>
                    <span>東京 · JP</span>
                  </div>
                  <div>
                    <div className="mb-5 flex flex-wrap gap-2">
                      {['7-ELEVEN', 'LAWSON', 'FAMILY MART'].map((store) => (
                        <span
                          key={store}
                          className="rounded border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[10px] text-white/55"
                        >
                          {store}
                        </span>
                      ))}
                    </div>
                    <p className="max-w-xl text-3xl leading-tight tracking-tight text-white sm:text-4xl">
                      Finding what&apos;s worth trying in Japan&apos;s
                      convenience stores.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-6 text-white/50">
                  End-to-end product judgment across discovery, localization,
                  filtering, theming, and responsive interaction.
                </p>
                <div className="mt-8 space-y-3">
                  {content.outcomes.map((outcome, index) => (
                    <div
                      key={outcome}
                      className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-4"
                    >
                      <span className="font-mono text-[10px] text-[#78f0bf]">
                        V-{index + 1}
                      </span>
                      <p className="text-xs leading-5 text-white/65">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-start gap-3 border-t border-white/10 pt-5 text-xs leading-5 text-amber-200/65">
                  <Minus className="mt-0.5 size-3.5 shrink-0" /> Live catalog
                  was empty during the baseline capture.
                </div>
                <a
                  href="#"
                  className="mt-8 flex items-center gap-2 text-sm font-medium text-white"
                >
                  Read the case study <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {content.projects.map((project) => (
              <article
                key={project.name}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#0c1014]"
              >
                <div className="relative h-52 overflow-hidden border-b border-white/10 bg-white/[0.03]">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover opacity-75 grayscale-[35%]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <p className="font-mono text-[10px] tracking-widest text-white/35 uppercase">
                    {project.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-medium text-white">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/45">
                    {project.summary}
                  </p>
                  <p className="mt-6 text-xs text-[#78f0bf]">
                    {project.evidence}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="articles"
          className="grid border-x border-b border-white/10 lg:grid-cols-[0.55fr_1.45fr]"
        >
          <div className="border-b border-white/10 p-8 lg:border-r lg:border-b-0">
            <p className="font-mono text-[10px] tracking-widest text-[#78f0bf] uppercase">
              Selected articles
            </p>
            <h2 className="mt-4 text-3xl tracking-tight text-white">
              Thinking in public.
            </h2>
          </div>
          <div>
            {content.articles.map((article, index) => (
              <a
                key={article}
                href="#"
                className="flex items-center justify-between border-b border-white/10 p-6 last:border-b-0 hover:bg-white/[0.02]"
              >
                <span className="flex items-center gap-5">
                  <span className="font-mono text-[10px] text-white/30">
                    0{index + 1}
                  </span>
                  <span className="text-sm text-white/70">{article}</span>
                </span>
                <MoveUpRight className="size-4 text-white/35" />
              </a>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="border-x border-b border-white/10 px-6 py-24 text-center"
        >
          <p className="font-mono text-[10px] tracking-[0.18em] text-[#78f0bf] uppercase">
            Open to the right conversation
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl tracking-tight text-white sm:text-6xl">
            Need a frontend leader who stays close to the product?
          </h2>
          <a
            href="mailto:hello@example.com"
            className="mt-9 inline-flex items-center gap-2 rounded-md bg-[#78f0bf] px-5 py-3 text-sm font-semibold text-black"
          >
            Start a conversation <ArrowRight className="size-4" />
          </a>
        </section>
      </main>
    </div>
  );
}
