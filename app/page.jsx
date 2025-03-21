'use client';

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProcessSteps from './components/ProcessSteps';
import Footer from './components/Footer';
import PageWrapper from './components/PageWrapper';

export default function Home() {
  return (
    <>
      <Header />
      <PageWrapper transitionType="spring">
        <main className="min-h-screen">
          <Hero />
          <ProcessSteps />
          <Features />
        </main>
      </PageWrapper>
      <Footer />
    </>
  );
} 