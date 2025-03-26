'use client';

import { Inter } from 'next/font/google';
import { LanguageProvider } from '../context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export default function PlantIdLayout({ children }) {
  return (
    <LanguageProvider>
      <div className={inter.className}>
        {children}
      </div>
    </LanguageProvider>
  );
} 