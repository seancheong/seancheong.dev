import { useTranslations } from 'next-intl';

import { Contact } from './components/Contact';
import { Email } from './components/Email';
import { Experience } from './components/Experience';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Projects } from './components/Projects';

export default function Home() {
  const t = useTranslations('Shell');
  return (
    <div className="flex flex-col gap-12 pb-20 md:gap-20">
      <section tabIndex={-1} id="hero" className="pt-12 md:pt-20">
        <Hero />
      </section>
      <section tabIndex={-1} id="profile">
        <Profile />
      </section>
      <section tabIndex={-1} id="experience">
        <Experience />
      </section>
      <section tabIndex={-1} id="projects">
        <Projects />
      </section>
      <section
        tabIndex={-1}
        id="articles"
        className="border-border border-t pt-10"
      >
        <h2>{t('navigation.articles')}</h2>
        <p className="mt-4">{t('articles-description')}</p>
        <a
          className="text-primary mt-4 inline-flex min-h-11 items-center underline underline-offset-4"
          href="https://medium.com/@seancheongzhenxiong"
        >
          {t('articles-link')}
        </a>
      </section>
      <section tabIndex={-1} id="contact" className="flex flex-col gap-10">
        <Contact />
        <Email />
      </section>
    </div>
  );
}
