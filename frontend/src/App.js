import { Suspense, lazy, useEffect } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ProductRail from './components/ProductRail';
import './App.css';

const ProductOrbit = lazy(() => import('./components/ProductOrbit'));
const About = lazy(() => import('./components/About'));
const Catalog = lazy(() => import('./components/Catalog'));
const Campaigns = lazy(() => import('./components/Campaigns'));
const Business = lazy(() => import('./components/Business'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const Gap = () => <div className="h-24" aria-hidden="true" />;

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return (
    <div dir="rtl" className="grain bg-[#FAF8F5] text-[#201a17] antialiased">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <ProductRail />
        <Suspense fallback={<Gap />}>
          <ProductOrbit />
          <About />
          <Catalog />
          <Campaigns />
          <Business />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<Gap />}>
        <Footer />
      </Suspense>
    </div>
  );
}
