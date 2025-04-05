'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProcessSteps from './components/ProcessSteps';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import AuthModal from './components/AuthModal';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthTab, setInitialAuthTab] = useState('login');
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for auth parameters in URL
    const authParam = searchParams.get('auth');
    if (authParam === 'login' || authParam === 'register') {
      setInitialAuthTab(authParam);
      setIsAuthModalOpen(true);
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProcessSteps />
      <Features />
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={initialAuthTab}
      />
    </main>
  );
}
