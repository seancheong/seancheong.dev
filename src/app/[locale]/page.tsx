import { Reveal } from '@/components/Reveal';
import { getYear } from 'date-fns';

import { Contact } from './components/Contact';
import { Email } from './components/Email';
import { Experience } from './components/Experience';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Projects } from './components/Projects';
import { DarkFirstPrototype } from './components/dark-first-prototype/DarkFirstPrototype';

const currentYear = getYear(new Date());

interface HomeProps {
  searchParams: Promise<{
    variant?: string | string[];
    motion?: string | string[];
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  if (process.env.NODE_ENV !== 'production') {
    const params = await searchParams;
    const rawVariant = params.variant;
    const rawMotion = params.motion;
    const variant = Array.isArray(rawVariant) ? rawVariant[0] : rawVariant;
    const motion = Array.isArray(rawMotion) ? rawMotion[0] : rawMotion;

    return <DarkFirstPrototype variant={variant} motion={motion} />;
  }

  return (
    <div className="mx-auto max-w-5xl px-6">
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
        <footer className="border-secondary-foreground/30 border-t py-6 text-center">
          {`© ${currentYear}, All Right Reserved`}
        </footer>
      </Reveal>
    </div>
  );
}
