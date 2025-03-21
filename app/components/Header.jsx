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
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAuthModal = (tab) => {
    setInitialAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  const toggleCommunityDropdown = () => {
    setCommunityDropdownOpen(!communityDropdownOpen);
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
            About Us
          </Link>
          
          {/* Community Dropdown */}
          <div className="relative inline-block">
            <button 
              className="text-gray-600 hover:text-gray-900 flex items-center"
              onClick={toggleCommunityDropdown}
            >
              Community
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={communityDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
            
            {communityDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50">
                <Link 
                  href="/community/adopt" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setCommunityDropdownOpen(false)}
                >
                  Crop Adoption
                </Link>
                <Link 
                  href="/community/vote" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setCommunityDropdownOpen(false)}
                >
                  Community Voting
                </Link>
                <Link 
                  href="/community/csa" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setCommunityDropdownOpen(false)}
                >
                  CSA Programs
                </Link>
                <Link 
                  href="/community/events" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setCommunityDropdownOpen(false)}
                >
                  Harvest Events
                </Link>
              </div>
            )}
          </div>
          
          <Link href="/farmer" className="text-gray-600 hover:text-gray-900">
            For Farmers
          </Link>
          <Link href="/consumer" className="text-gray-600 hover:text-gray-900">
            For Consumers
          </Link>
          <Link href="/dashboard/farmer" className="text-gray-600 hover:text-gray-900">
            Farmer Dashboard
          </Link>
          <Link href="/dashboard/consumer" className="text-gray-600 hover:text-gray-900">
            Consumer Dashboard
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
            About Us
          </Link>
          
          {/* Community Section */}
          <div className="py-2">
            <button 
              className="flex items-center justify-between w-full text-left text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setCommunityDropdownOpen(!communityDropdownOpen)}
            >
              <span>Community</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={communityDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
            
            {communityDropdownOpen && (
              <div className="pl-4 mt-2 space-y-2">
                <Link 
                  href="/community/adopt" 
                  className="block py-1 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Crop Adoption
                </Link>
                <Link 
                  href="/community/vote" 
                  className="block py-1 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Community Voting
                </Link>
                <Link 
                  href="/community/csa" 
                  className="block py-1 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CSA Programs
                </Link>
                <Link 
                  href="/community/events" 
                  className="block py-1 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Harvest Events
                </Link>
              </div>
            )}
          </div>
          
          <Link 
            href="/farmer" 
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            For Farmers
          </Link>
          <Link 
            href="/consumer" 
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            For Consumers
          </Link>
          
          <Link 
            href="/dashboard/farmer" 
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Farmer Dashboard
          </Link>
          
          <Link 
            href="/dashboard/consumer" 
            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Consumer Dashboard
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