'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import AuthModal from './AuthModal';
import Link from 'next/link';

export default function Header() {
  const { t, language, changeLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthTab, setInitialAuthTab] = useState('login');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAuthModal = (tab) => {
    setInitialAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold text-green-600 flex items-center">
            <span className="text-2xl mr-2">🌱</span>
            FarmDirect
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            {t.aboutUs}
          </Link>
          <Link href="/farmer" className="text-gray-600 hover:text-gray-900">
            {t.forFarmers}
          </Link>
          <Link href="/consumer" className="text-gray-600 hover:text-gray-900">
            {t.forConsumers}
          </Link>
          <Link href="/dashboard/farmer" className="text-gray-600 hover:text-gray-900">
            {t.farmerDashboard}
          </Link>
          <Link href="/dashboard/consumer" className="text-gray-600 hover:text-gray-900">
            {t.consumerDashboard}
          </Link>
          
          {/* Language Selector */}
          <div className="relative">
            <button 
              className="flex items-center text-gray-700 hover:text-green-600"
              onClick={() => changeLanguage(language === 'en' ? 'ta' : 'en')}
            >
              <span className="mr-1">🌐</span>
              {language === 'en' ? 'EN' : 'TA'}
            </button>
          </div>
          
          {/* Auth Buttons */}
          <button
            onClick={() => openAuthModal('login')}
            className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
          >
            {t.login}
          </button>
          <button
            onClick={() => openAuthModal('register')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {t.register}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-lg">
          <Link 
            href="/about" 
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.aboutUs}
          </Link>
          <Link 
            href="/farmer" 
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.forFarmers}
          </Link>
          <Link 
            href="/consumer" 
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.forConsumers}
          </Link>
          
          <Link 
            href="/dashboard/farmer" 
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.farmerDashboard}
          </Link>
          
          <Link 
            href="/dashboard/consumer" 
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.consumerDashboard}
          </Link>
          
          {/* Language Selector */}
          <button 
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => {
              changeLanguage(language === 'en' ? 'ta' : 'en');
              setIsMenuOpen(false);
            }}
          >
            <span className="mr-1">🌐</span>
            {language === 'en' ? t.tamil : t.english}
          </button>
          
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => {
                openAuthModal('login');
                setIsMenuOpen(false);
              }}
              className="flex-1 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors text-center"
            >
              {t.login}
            </button>
            <button
              onClick={() => {
                openAuthModal('register');
                setIsMenuOpen(false);
              }}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              {t.register}
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={initialAuthTab}
      />
    </header>
  );
} 