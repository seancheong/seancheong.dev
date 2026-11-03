'use client';

import { type CareerEntry, careerPlaces } from '@/portfolio-content';
import Image from 'next/image';
import { type ReactNode, useEffect, useRef, useState } from 'react';

type Country = (typeof careerPlaces)[number]['id'];
export function CareerMap({
  career,
  children,
  map,
}: {
  career: readonly CareerEntry[];
  children: ReactNode;
  map: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | SVGElement | null>(null);
  const [active, setActive] = useState<Country>('malaysia');
  const [enhanced, setEnhanced] = useState(false);
  const [opened, setOpened] = useState<Country | null>(null);
  useEffect(() => {
    root.current?.querySelectorAll('[data-map-country]').forEach((element) => {
      element.setAttribute('role', 'button');
      element.setAttribute('tabindex', '0');
    });
    setEnhanced(true);
  }, []);
  useEffect(() => {
    root.current?.querySelectorAll('[data-map-country]').forEach((element) => {
      element.setAttribute(
        'aria-expanded',
        String(element.getAttribute('data-map-country') === opened),
      );
    });
  }, [opened]);
  function close(restore = true) {
    root.current
      ?.querySelectorAll<HTMLDetailsElement>('.home-country[open]')
      .forEach((d) => {
        d.open = false;
      });
    setOpened(null);
    if (restore) trigger.current?.focus();
  }
  function open(id: Country, element: HTMLElement | SVGElement) {
    close(false);
    trigger.current = element;
    const details = root.current?.querySelector<HTMLDetailsElement>(
      `#country-${id}`,
    );
    if (details) details.open = true;
    setActive(id);
    setOpened(id);
    requestAnimationFrame(() =>
      details
        ?.querySelector<HTMLButtonElement>('button')
        ?.focus({ preventScroll: true }),
    );
  }
  useEffect(() => {
    if (!opened) return;
    const keyboard = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        root.current
          ?.querySelectorAll<HTMLDetailsElement>('.home-country[open]')
          .forEach((d) => {
            d.open = false;
          });
        setOpened(null);
        trigger.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (
        e.target instanceof Element &&
        !e.target.closest(
          '.home-country-popup, .home-country summary, [data-map-country]',
        )
      ) {
        root.current
          ?.querySelectorAll<HTMLDetailsElement>('.home-country[open]')
          .forEach((d) => {
            d.open = false;
          });
        setOpened(null);
      }
    };
    document.addEventListener('keydown', keyboard);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', keyboard);
      document.removeEventListener('pointerdown', outside);
    };
  }, [opened]);
  useEffect(() => {
    if (opened) return;
    const rows = root.current?.querySelectorAll<HTMLElement>(
      '[data-career-country]',
    );
    if (!rows) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const row = entries
          .filter(
            (entry) => entry.isIntersecting && entry.intersectionRatio > 0,
          )
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]?.target;
        if (row instanceof HTMLElement) {
          const country = row.dataset.careerCountry;
          if (careerPlaces.some((place) => place.id === country))
            setActive(country as Country);
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [opened]);
  const place = careerPlaces.find((place) => place.id === active)!;
  return (
    <div
      ref={root}
      className="home-career-grid"
      data-enhanced={enhanced}
      data-active-country={active}
      onClick={(event) => {
        if (!(event.target instanceof Element)) return;
        const element = event.target.closest<SVGElement>('[data-map-country]');
        const country = careerPlaces.find(
          (place) => place.id === element?.getAttribute('data-map-country'),
        );
        if (element && country) open(country.id, element);
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        if (!(event.target instanceof Element)) return;
        const element = event.target.closest<SVGElement>('[data-map-country]');
        const country = careerPlaces.find(
          (place) => place.id === element?.getAttribute('data-map-country'),
        );
        if (element && country) {
          event.preventDefault();
          open(country.id, element);
        }
      }}
    >
      <div className="home-map-panel">
        <p className="home-map-intro">
          Three countries. Five companies.
          <br />
          From Singapore to Tokyo, now Kuala Lumpur.
        </p>
        <div className="home-map-surface">
          {map}
          <div className="home-country-picker">
            {careerPlaces.map((place) => (
              <details
                key={place.id}
                id={`country-${place.id}`}
                name="career-country"
                className="home-country"
                onToggle={(event) => {
                  if (!event.currentTarget.open && opened === place.id)
                    setOpened(null);
                }}
              >
                <summary
                  data-active={active === place.id}
                  onClick={(event) => {
                    if (enhanced) {
                      event.preventDefault();
                      if (opened === place.id) close();
                      else open(place.id, event.currentTarget);
                    }
                  }}
                >
                  {place.name}
                </summary>
                <div
                  className="home-country-popup"
                  role="region"
                  aria-label={`${place.name} companies`}
                >
                  <div className="home-country-heading">
                    <div>
                      <p>{place.dates}</p>
                      <h3>{place.name}</h3>
                    </div>
                    <button
                      type="button"
                      hidden={!enhanced}
                      aria-label="Close country details"
                      onClick={() => close()}
                    >
                      ×
                    </button>
                  </div>
                  {career
                    .filter((job) => job.country === place.id)
                    .map((job) => (
                      <article key={job.id}>
                        <h4>
                          <Image
                            src={job.logo}
                            alt={job.name}
                            width={160}
                            height={40}
                            className="home-company-logo"
                          />
                        </h4>
                        <p>{job.role}</p>
                        <p>{job.dates}</p>
                      </article>
                    ))}
                </div>
              </details>
            ))}
          </div>
        </div>
        <div className="home-map-caption">
          <p>
            {place.name} · {place.dates}
          </p>
          <h3>{place.city}</h3>
          <p>
            {career
              .filter((job) => job.country === active)
              .map((job) => job.name)
              .join(' · ')}
          </p>
          <small>Select a country to see the companies.</small>
        </div>
      </div>
      {children}
    </div>
  );
}
