import { Header } from './components/Header';
import { Hero } from './components/Hero';

export default function Home() {
  return (
    <div className="px-6">
      <Header />

      <main>
        <section id="hero" className="pt-20">
          <Hero />
        </section>
      </main>
    </div>
  );
}
