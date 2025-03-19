'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import AuthModal from './AuthModal';

export default function Hero() {
  const { t } = useLanguage();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="relative bg-gradient-to-r from-green-50 to-green-100 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-400"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-green-300"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-400"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Column: Text content */}
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.welcome}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {t.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
              >
                {t.getStarted}
              </button>
              <a
                href="#about"
                className="px-8 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-lg font-medium text-center"
              >
                {t.aboutUs}
              </a>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="md:w-1/2">
            <div className="relative">
              <div className="w-full h-auto rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/hero-image.jpg"
                  alt="Farm fresh produce"
                  className="w-full h-auto"
                  style={{ aspectRatio: "4/3", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
                  }}
                />
              </div>
              {/* Floating card 1 */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-lg shadow-lg md:block hidden">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <span className="text-xl">🚜</span>
                  </div>
                  <div>
                    <p className="font-medium">1000+</p>
                    <p className="text-sm text-gray-600">{t.farmer}</p>
                  </div>
                </div>
              </div>
              {/* Floating card 2 */}
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg md:block hidden">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <span className="text-xl">🥕</span>
                  </div>
                  <div>
                    <p className="font-medium">5000+</p>
                    <p className="text-sm text-gray-600">Products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab="register"
      />
    </div>
  );
} 