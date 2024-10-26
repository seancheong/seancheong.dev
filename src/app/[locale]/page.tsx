import { Contact } from './components/Contact';
import { Email } from './components/Email';
import { Experience } from './components/Experience';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Projects } from './components/Projects';

export default function Home() {
  return (
    <div className="mx-auto max-w-[768px] px-6">
      <Header />

      <main className="mb-24 flex flex-col gap-2">
        <section id="hero" className="pt-20">
          <Hero />
        </section>

        <section id="profile" className="pt-20">
          <Profile />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact" className="flex flex-col gap-10 pt-20">
          <Contact />

          <Email />
        </section>
      </main>

      <footer className="border-t-[1px] border-secondary-foreground/30 py-6 text-center">
        © 2024, All Right Reserved
      </footer>
    </div>
  );
}
