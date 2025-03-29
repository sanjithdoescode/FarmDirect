'use client';

import { Inter } from 'next/font/google';
import { LanguageProvider } from '../context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function CommunityLayout({ children }) {
  return (
    <LanguageProvider>
      <div className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
} 