'use client';

import React from 'react';
import { Inter } from "next/font/google";
import { LanguageProvider } from "../context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function TraceLayout({ children }) {
  return (
    <LanguageProvider>
      <div className={`${inter.variable} antialiased`}>
        {children}
      </div>
    </LanguageProvider>
  );
} 