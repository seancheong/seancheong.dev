'use client';

import { useEffect, useRef, useState } from 'react';

type Project = {
  slug: string;
  title: string;
  description: string;
  destination: string;
};
export function Orbit({ projects }: { projects: Project[] }) {
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setReady(true);
  }, []);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => {
      element.dataset.spinning = String(
        playing && visible && !document.hidden && !preference.matches,
      );
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    preference.addEventListener('change', update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      preference.removeEventListener('change', update);
    };
  }, [playing]);
  return (
    <div
      ref={root}
      className="home-orbit"
      role="group"
      aria-label="Explore selected projects"
    >
      {projects.map((project, index) => (
        <input
          key={project.slug}
          id={`orbit-${project.slug}`}
          type="radio"
          name="orbit-project"
          value={project.slug}
          defaultChecked={index === 0}
          className="home-orbit-radio"
        />
      ))}
      <div className="home-orbit-stage">
        <div className="home-orbit-rings" aria-hidden="true">
          <span />
          <span />
          <span className="home-orbit-track">
            <i />
            <i />
          </span>
        </div>
        {projects.map((project, index) => (
          <label
            key={project.slug}
            htmlFor={`orbit-${project.slug}`}
            className={`home-orbit-choice home-orbit-choice-${index}`}
          >
            {project.title}
          </label>
        ))}
        {projects.map((project) => (
          <div
            className={`home-orbit-center home-orbit-panel-${project.slug}`}
            key={project.slug}
            aria-hidden="true"
          >
            {project.title}
          </div>
        ))}
      </div>
      {projects.map((project) => (
        <div
          className={`home-orbit-description home-orbit-panel-${project.slug}`}
          key={project.slug}
        >
          <p>{project.description}</p>
          <a
            className="home-text-link"
            href={
              project.slug === 'takonbini' ? '#projects' : '#more-selected-work'
            }
          >
            Explore {project.title} <span aria-hidden="true">↓</span>
          </a>
        </div>
      ))}
      <button
        hidden={!ready}
        type="button"
        className="home-orbit-spin home-text-link"
        aria-pressed={playing}
        onClick={() => setPlaying(!playing)}
      >
        {playing ? 'Pause orbit' : 'Spin orbit'}
      </button>
      <p className="home-orbit-hint">
        Choose a project to explore. The rings move only when you choose Spin
        orbit.
      </p>
    </div>
  );
}
