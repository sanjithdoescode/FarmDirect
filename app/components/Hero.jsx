'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import AuthModal from './AuthModal';
import Link from 'next/link';

export default function Hero() {
  const { t } = useLanguage();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // This will trigger animations after component mounts
    // but content is already visible
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-green-50 to-green-100 overflow-hidden">
      {/* Background elements - more subtle and modern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-green-200 opacity-40 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-green-100 opacity-60 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-green-200 opacity-50 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Column: Text content with fade-in animation */}
          <div 
            className={`md:w-1/2 mb-12 md:mb-0 md:pr-12 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-80 translate-x-0'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Fresh From Farm <br/><span className="text-green-600">To Your Table</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Connect directly with local farmers for the freshest produce. Support local agriculture and enjoy farm-fresh quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium transform hover:scale-105 transition-transform"
              >
                {t.getStarted}
              </button>
              <Link
                href="/about"
                className="px-8 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-lg font-medium text-center transform hover:scale-105 transition-transform"
              >
                {t.aboutUs}
              </Link>
            </div>
          </div>

          {/* Right Column: Image gallery with animations */}
          <div 
            className={`md:w-1/2 transition-all duration-1000 delay-300 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-80 translate-x-0'
            }`}
          >
            <div className="relative">
              {/* Main image */}
              <div className="w-full h-auto rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                  alt="Fresh organic produce"
                  className="w-full h-auto rounded-xl"
                  style={{ aspectRatio: "4/3", objectFit: "cover" }}
                />
              </div>
              
              {/* Decorative smaller images positioned absolutely */}
              <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-lg overflow-hidden shadow-lg transform rotate-6 hover:rotate-0 transition-transform float-animation">
                <img
                  src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Farmer holding vegetables"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -top-5 -right-5 w-28 h-28 rounded-lg overflow-hidden shadow-lg transform -rotate-3 hover:rotate-0 transition-transform float-animation" style={{ animationDelay: "1s" }}>
                <img
                  src="https://images.unsplash.com/photo-1603046891744-c307019ed0ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Fresh strawberries"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating stat cards with animations */}
              <div className="absolute -top-8 -right-4 bg-white p-4 rounded-lg shadow-lg md:block hidden transform hover:translate-y-1 transition-transform">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <span className="text-xl">🚜</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">1000+</p>
                    <p className="text-sm text-gray-600">Local Farmers</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 right-20 bg-white p-4 rounded-lg shadow-lg md:block hidden transform hover:translate-y-1 transition-transform">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <span className="text-xl">🥕</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">5000+</p>
                    <p className="text-sm text-gray-600">Fresh Products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div 
          className={`mt-16 flex justify-center space-x-8 transition-all duration-1000 delay-600 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-0'
          }`}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">100% Organic</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-xl">🚚</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Fast Delivery</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-xl">💯</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Quality Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Curved wave separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform">
        <svg className="relative block w-full h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
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