'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProcessSteps from './components/ProcessSteps';
import Footer from './components/Footer';
import ProductSearch from './components/ProductSearch'; // Add this import

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      {/* Add ProductSearch component after Hero section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-8">Search Products</h2>
        <ProductSearch />
      </div>
      <ProcessSteps />
      <Features />
      <Footer />
    </main>
  );
}
