'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProcessSteps from './components/ProcessSteps';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProcessSteps />
      <Features />
      <Footer />
    </main>
  );
}
