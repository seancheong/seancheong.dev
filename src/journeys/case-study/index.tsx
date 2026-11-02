import { getProject } from '@/portfolio-content';
import { type CaseStudyMedia, getCaseStudy } from '@/portfolio-content/server';
import { run } from '@mdx-js/mdx';
import type { Metadata } from 'next';
import { cache } from 'react';
import * as runtime from 'react/jsx-runtime';

import { MediaImage } from './media-image';
import './styles.css';

type Section = { id: string; title: string; compiledSource: string };

export const loadCaseStudy = cache(async (locale: string, slug: string) => {
  const project = getProject(locale, slug);
  if (project.status !== 'found') return project;
  const document = await getCaseStudy(locale, slug);
  if (document.status !== 'found') return document;
  if (document.value.sections[0]?.id !== 'summary')
    return {
      status: 'invalid' as const,
      issues: [
        {
          path: document.value.id,
          message: 'Case study requires a leading Summary section',
        },
      ],
    };
  return {
    status: 'found' as const,
    value: {
      locale,
      project: project.value,
      sections: document.value.sections,
      media: document.value.media,
    },
  };
});

type Study = Extract<
  Awaited<ReturnType<typeof loadCaseStudy>>,
  { status: 'found' }
>['value'];

export function caseStudyMetadata(study: Study): Metadata {
  return {
    title: `${study.project.title} — Sean Cheong`,
    description: study.project.seoDescription,
    twitter: {
      card: 'summary',
      title: `${study.project.title} — Sean Cheong`,
      description: study.project.seoDescription,
    },
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://www.seancheong.dev/${study.locale}/work/${study.project.slug}`,
    },
    openGraph: {
      title: `${study.project.title} — Sean Cheong`,
      description: study.project.seoDescription,
      url: `https://www.seancheong.dev/${study.locale}/work/${study.project.slug}`,
    },
  };
}

async function renderSection(section: Section) {
  // Only registered local MDX compiled by Portfolio Content reaches this boundary.
  const { default: Body } = await run(section.compiledSource, {
    ...runtime,
    baseUrl: import.meta.url,
  });
  return (
    <div className="case-prose">
      <Body />
    </div>
  );
}

function Figure({ item }: { item: CaseStudyMedia }) {
  return (
    <figure className="case-figure">
      <MediaImage
        src={item.src}
        width={item.width}
        height={item.height}
        alt={item.alt}
        loading="lazy"
        sizes={
          item.width === 390
            ? '(max-width: 767px) 85vw, 340px'
            : '(max-width: 767px) 100vw, 1100px'
        }
      />
      <figcaption>
        {item.caption}{' '}
        <a href="https://takonbini.com/?lang=en">View the live product</a>
      </figcaption>
    </figure>
  );
}

export async function CaseStudyPage({ study }: { study: Study }) {
  const [summary, ...depth] = await Promise.all(
    study.sections.map(renderSection),
  );
  const home = `/${study.locale}`;
  return (
    <article className="case-study" aria-labelledby="case-title">
      <header className="case-header">
        <a href={`${home}#projects`} className="case-back">
          ← Back to projects
        </a>
        <p className="case-kicker">Personal project · Case study</p>
        <h1 id="case-title">{study.project.title}</h1>
        <p className="case-deck">
          Finding something new to try at a Japanese convenience store.
        </p>
        <nav className="case-actions" aria-label="Case study links">
          <a className="site-contact-link" href="#case-summary">
            Read the summary
          </a>
          <a href={study.project.liveUrl}>
            Visit Takonbini <span className="case-quiet">(external)</span>
          </a>
          <a href={study.project.sourceUrl}>
            View public source <span className="case-quiet">(GitHub)</span>
          </a>
        </nav>
      </header>
      <section
        id="case-summary"
        tabIndex={-1}
        className="case-summary"
        aria-labelledby="summary-title"
      >
        <div>
          <p className="case-kicker">The brief · About a minute</p>
          <h2 id="summary-title">Why I built it</h2>
        </div>
        {summary}
      </section>
      {study.media.catalog ? (
        <Figure item={study.media.catalog} />
      ) : (
        <p>
          Product media is unavailable. The summary and evidence remain
          readable.
        </p>
      )}
      <section className="case-depth" aria-labelledby="depth-title">
        <div className="case-depth-intro">
          <p className="case-kicker">Optional depth</p>
          <h2 id="depth-title">Decisions, evidence and limitations</h2>
          <p>
            Each section stands on its own. The measurements include their
            method and remaining limits.
          </p>
        </div>
        {study.sections.slice(1).map((section, index) => (
          <details
            key={section.id}
            id={section.id}
            className="case-disclosure"
            open={section.id === 'remaining-work'}
          >
            <summary>
              <h3>{section.title}</h3>
              <span aria-hidden="true">+</span>
            </summary>
            <div className="case-detail-body">
              {depth[index]}
              {section.id ===
                'keeping-a-place-without-keeping-every-product' && (
                <>
                  {study.media.detail && <Figure item={study.media.detail} />}
                  <div className="case-mobile-media">
                    {study.media.mobile && <Figure item={study.media.mobile} />}
                    {study.media.filters && (
                      <Figure item={study.media.filters} />
                    )}
                  </div>
                </>
              )}
            </div>
          </details>
        ))}
      </section>
      <aside className="case-limitations" aria-labelledby="case-limits-title">
        <h2 id="case-limits-title">What remains open</h2>
        <p>
          The catalog accessible-name finding and broader device, operational
          and release checks remain open. The detailed evidence distinguishes
          controlled measurements from live observations.
        </p>
        <a href="#remaining-work">Review the remaining-work section</a>
      </aside>
      <footer className="case-next">
        <h2>Talk through the decisions</h2>
        <p>
          If you want to discuss the browsing, rendering or accessibility
          tradeoffs, get in touch.
        </p>
        <a href={`${home}#contact`}>Contact Sean</a>
        <a href={`${home}#projects`}>Back to selected work</a>
      </footer>
    </article>
  );
}
