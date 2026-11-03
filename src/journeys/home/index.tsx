import {
  type PublishedLocale,
  getCuratedNotes,
  getFeaturedProjects,
  getHomeContent,
} from '@/portfolio-content';
import Image from 'next/image';

import { CareerMap } from './map';
import { MapArtwork } from './map-artwork';
import { Orbit } from './orbit';
import './styles.css';
import { TimelineProgress } from './timeline-progress';

export function loadHome(locale: PublishedLocale) {
  const content = getHomeContent(locale);
  const projects = getFeaturedProjects(locale);
  const articles = getCuratedNotes(locale);
  if (
    content.status !== 'found' ||
    projects.status !== 'found' ||
    articles.status !== 'found'
  )
    throw new Error('Home content failed validation');
  return {
    ...content.value,
    projects: projects.value,
    articles: articles.value,
  };
}
export function HomePage({
  locale,
  content,
}: {
  locale: PublishedLocale;
  content: ReturnType<typeof loadHome>;
}) {
  const takonbini = content.projects.find((p) => p.slug === 'takonbini');
  const script = content.projects.find((p) => p.slug === 'script-blender');
  if (!takonbini || !script)
    throw new Error('Home requires its two curated projects');
  return (
    <div className="home-journey">
      <section
        id="hero"
        tabIndex={-1}
        className="home-hero"
        aria-labelledby="home-title"
      >
        <div className="home-introduction">
          <div className="home-current">
            <Image
              src="/images/profile.jpeg"
              alt="Sean Cheong"
              width={72}
              height={72}
              sizes="72px"
              priority
            />
            <p>
              Senior Consultant · Guidewire
              <br />
              <span>Kuala Lumpur, Malaysia</span>
            </p>
          </div>
          <h1 id="home-title">
            Sean
            <br />
            Cheong.
          </h1>
          <p className="home-positioning">{content.positioning}</p>
          <p className="home-supporting">{content.supporting}</p>
          <div className="home-actions">
            <a className="home-action" href={`/${locale}#projects`}>
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <a className="home-text-link" href={`/${locale}#contact`}>
              Let’s talk
            </a>
          </div>
        </div>
        <Orbit
          projects={content.projects.map(
            ({ slug, title, description, destination }) => ({
              slug,
              title,
              description,
              destination,
            }),
          )}
        />
      </section>
      <section
        id="profile"
        tabIndex={-1}
        className="home-section home-leadership"
        aria-labelledby="leadership-heading"
      >
        <p className="home-eyebrow">Professional experience</p>
        <h2 id="leadership-heading">Engineering leadership in practice.</h2>
        <div className="home-leadership-grid">
          {content.leadership.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="projects"
        tabIndex={-1}
        className="home-section"
        aria-labelledby="work-heading"
      >
        <p className="home-eyebrow">Personal project ownership</p>
        <h2 id="work-heading">Selected work</h2>
        <article className="home-showcase home-flagship">
          <div className="home-preview">
            <Image
              src={takonbini.cover}
              alt={takonbini.coverAlt}
              width={1440}
              height={1000}
              sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
              loading="lazy"
            />
          </div>
          <div className="home-project-copy">
            <p className="home-eyebrow">Flagship · Case study</p>
            <h3>{takonbini.title}</h3>
            <p>{content.takonbini.problem}</p>
            <p>{content.takonbini.role}</p>
            <ul>
              {content.takonbini.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
            <a className="home-action" href={takonbini.destination}>
              Read the case study <span aria-hidden="true">↗</span>
            </a>
            <p className="home-limitation">{content.takonbini.limitation}</p>
          </div>
        </article>
      </section>
      <section
        id="experience"
        tabIndex={-1}
        className="home-section"
        aria-labelledby="experience-heading"
      >
        <p className="home-eyebrow">Singapore / Japan / Malaysia</p>
        <h2 id="experience-heading">A career across borders.</h2>
        <CareerMap career={content.career} map={<MapArtwork />}>
          <div className="home-timeline">
            <h3>Where I’ve worked</h3>
            <TimelineProgress>
              <ol>
                {content.career.map((job) => (
                  <li key={job.id} data-career-country={job.country}>
                    <div className="home-timeline-date">
                      <span aria-hidden="true">{job.year}</span>
                      <p>{job.dates}</p>
                    </div>
                    <article>
                      <h4>
                        <Image
                          src={job.logo}
                          alt={job.name}
                          width={200}
                          height={48}
                          sizes="200px"
                          className="home-company-logo"
                        />
                      </h4>
                      <p className="home-role">{job.role}</p>
                      <p className="home-muted">{job.city}</p>
                      <p>{job.scope}</p>
                    </article>
                  </li>
                ))}
              </ol>
            </TimelineProgress>
          </div>
        </CareerMap>
      </section>
      <section
        id="more-selected-work"
        tabIndex={-1}
        className="home-section"
        aria-labelledby="more-work-heading"
      >
        <p className="home-eyebrow">Personal project · Preview</p>
        <h2 id="more-work-heading">More selected work</h2>
        <article className="home-showcase">
          <div className="home-preview">
            <Image
              src={script.cover}
              alt="Script Blender workspace with an empty JavaScript editor and console"
              width={1280}
              height={720}
              sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
              loading="lazy"
            />
          </div>
          <div className="home-project-copy">
            <h3>{script.title}</h3>
            <p>{script.description}</p>
            <p>
              A browser workspace for JavaScript and TypeScript. This is a
              project preview; accessibility follow-up remains.
            </p>
            <a className="home-action" href={script.destination}>
              Open Script Blender <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </section>
      <section
        id="articles"
        tabIndex={-1}
        className="home-section"
        aria-labelledby="articles-heading"
      >
        <p className="home-eyebrow">Writing</p>
        <h2 id="articles-heading">Articles</h2>
        {content.articles.length ? (
          <ul className="home-articles">
            {content.articles.map((article) => (
              <li key={article.slug}>
                <h3>
                  <a className="home-text-link" href={article.url}>
                    {article.title}
                  </a>
                </h3>
                <p>{article.summary}</p>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p>Notes on frontend engineering, published on Medium.</p>
            <a
              className="home-text-link"
              href="https://medium.com/@seancheongzhenxiong"
            >
              Read my articles on Medium <span aria-hidden="true">↗</span>
            </a>
          </>
        )}
      </section>
      <section
        id="contact"
        tabIndex={-1}
        className="home-section home-contact"
        aria-labelledby="contact-heading"
      >
        <p className="home-eyebrow">Start a conversation</p>
        <h2 id="contact-heading">Let’s talk.</h2>
        <p>Have a frontend engineering role or a product challenge in mind?</p>
        <div className="home-actions">
          <a
            className="home-action"
            href="https://www.linkedin.com/in/zhen-xiong-cheong-b80630ba/"
          >
            Connect on LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a className="home-text-link" href="https://github.com/seancheong">
            GitHub
          </a>
          <a
            className="home-text-link"
            href="https://sean-certification.s3.ap-southeast-1.amazonaws.com/Cheong+Zhen+Xiong+Senior+Software+Engineer+Resume.pdf"
          >
            Résumé
          </a>
        </div>
      </section>
    </div>
  );
}
