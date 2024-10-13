import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';

export default function Home() {
  return (
    <div className="mx-auto max-w-[768px] px-6">
      <Header />

      <main>
        <section id="hero" className="pt-20">
          <Hero />
        </section>

        <section id="profile" className="pt-20">
          <Profile />
        </section>
      </main>
    </div>
  );
}
