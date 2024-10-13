import { Experience } from './components/Experience';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { WorkedWith } from './components/WorkedWith';

export default function Home() {
  return (
    <div className="mx-auto max-w-[768px] px-6">
      <Header />

      <main className="flex flex-col gap-2">
        <section id="hero" className="pt-20">
          <Hero />
        </section>

        <section id="profile" className="pt-20">
          <Profile />
        </section>

        <section id="worked-with">
          <WorkedWith />
        </section>

        <section id="experience">
          <Experience />
        </section>
      </main>
    </div>
  );
}
