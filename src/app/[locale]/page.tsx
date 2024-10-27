import { Reveal } from '@/components/Reveal';
import { getYear } from 'date-fns';

import { Contact } from './components/Contact';
import { Email } from './components/Email';
import { Experience } from './components/Experience';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Projects } from './components/Projects';

const currentYear = getYear(new Date());

export default function Home() {
  return (
    <div className="mx-auto max-w-[768px] px-6">
      <Reveal direction="top" delay={0.3}>
        <Header />
      </Reveal>

      <main className="mb-24 flex flex-col gap-2">
        <section id="hero" className="pt-20">
          <Reveal direction="bottom" delay={0.4}>
            <Hero />
          </Reveal>
        </section>

        <section id="profile" className="pt-20">
          <Reveal direction="bottom">
            <Profile />
          </Reveal>
        </section>

        <section id="experience">
          <Reveal direction="bottom">
            <Experience />
          </Reveal>
        </section>

        <section id="projects">
          <Reveal direction="bottom">
            <Projects />
          </Reveal>
        </section>

        <section id="contact" className="flex flex-col gap-10 pt-20">
          <Reveal direction="bottom">
            <Contact />
          </Reveal>

          <Reveal direction="bottom">
            <Email />
          </Reveal>
        </section>
      </main>

      <Reveal direction="bottom">
        <footer className="border-t-[1px] border-secondary-foreground/30 py-6 text-center">
          {`© ${currentYear}, All Right Reserved`}
        </footer>
      </Reveal>
    </div>
  );
}
