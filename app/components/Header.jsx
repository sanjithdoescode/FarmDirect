'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import AuthModal from './AuthModal';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { t, language, changeLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthTab, setInitialAuthTab] = useState('login');
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCommunityDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation variants for dropdown menu
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-sm bg-white/85 border-b border-gray-100">
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
            <div className="relative inline-block" ref={dropdownRef}>
              <button 
                className="text-gray-600 hover:text-gray-900 flex items-center py-2 focus:outline-none"
                onClick={toggleCommunityDropdown}
                aria-expanded={communityDropdownOpen}
                aria-haspopup="true"
              >
                <span className="mr-1">Community</span>
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${communityDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {communityDropdownOpen && (
                  <motion.div
                    className="absolute left-0 mt-2 w-56 rounded-md backdrop-blur-sm bg-white/90 border border-gray-100 shadow-lg ring-1 ring-black/5 z-50 overflow-hidden"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                  >
                    <motion.div className="py-1 divide-y divide-gray-100/70">
                      <motion.div variants={itemVariants}>
                        <Link 
                          href="/community/adopt" 
                          className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50/80 transition-colors"
                          onClick={() => setCommunityDropdownOpen(false)}
                        >
                          <span className="w-8 h-8 mr-3 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 group-hover:bg-amber-200 transition-colors">
                            🌱
                          </span>
                          <div>
                            <span className="block font-medium">Crop Adoption</span>
                            <span className="block text-xs text-gray-500 mt-0.5">Support farmers directly</span>
                          </div>
                        </Link>
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <Link 
                          href="/community/vote" 
                          className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50/80 transition-colors"
                          onClick={() => setCommunityDropdownOpen(false)}
                        >
                          <span className="w-8 h-8 mr-3 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                            🗳️
                          </span>
                          <div>
                            <span className="block font-medium">Community Voting</span>
                            <span className="block text-xs text-gray-500 mt-0.5">Shape farming decisions</span>
                          </div>
                        </Link>
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <Link 
                          href="/community/csa" 
                          className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50/80 transition-colors"
                          onClick={() => setCommunityDropdownOpen(false)}
                        >
                          <span className="w-8 h-8 mr-3 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                            🥕
                          </span>
                          <div>
                            <span className="block font-medium">CSA Programs</span>
                            <span className="block text-xs text-gray-500 mt-0.5">Subscribe to harvest shares</span>
                          </div>
                        </Link>
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <Link 
                          href="/community/events" 
                          className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50/80 transition-colors"
                          onClick={() => setCommunityDropdownOpen(false)}
                        >
                          <span className="w-8 h-8 mr-3 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-200 transition-colors">
                            📅
                          </span>
                          <div>
                            <span className="block font-medium">Harvest Events</span>
                            <span className="block text-xs text-gray-500 mt-0.5">Join farming celebrations</span>
                          </div>
                        </Link>
                      </motion.div>
                      
                      {/* Add Forum Link */}
                      <motion.div variants={itemVariants}>
                        <Link 
                          href="/community/forum" 
                          className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50/80 transition-colors"
                          onClick={() => setCommunityDropdownOpen(false)}
                        >
                          <span className="w-8 h-8 mr-3 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 group-hover:bg-indigo-200 transition-colors">
                            💬
                          </span>
                          <div>
                            <span className="block font-medium">Community Forum</span>
                            <span className="block text-xs text-gray-500 mt-0.5">Discuss and connect</span>
                          </div>
                        </Link>
                      </motion.div>
                      {/* End Add Forum Link */}
                      
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden backdrop-blur-sm bg-white/95 py-2 px-4 shadow-lg border-t border-gray-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
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
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${communityDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {communityDropdownOpen && (
                    <motion.div 
                      className="pl-4 mt-2 space-y-0 border-l-2 border-green-100"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Link 
                          href="/community/adopt" 
                          className="flex items-center py-2 text-gray-700 hover:text-green-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="w-6 h-6 mr-2 flex items-center justify-center">🌱</span>
                          Crop Adoption
                        </Link>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <Link 
                          href="/community/vote" 
                          className="flex items-center py-2 text-gray-700 hover:text-green-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="w-6 h-6 mr-2 flex items-center justify-center">🗳️</span>
                          Community Voting
                        </Link>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Link 
                          href="/community/csa" 
                          className="flex items-center py-2 text-gray-700 hover:text-green-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="w-6 h-6 mr-2 flex items-center justify-center">🥕</span>
                          CSA Programs
                        </Link>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <Link 
                          href="/community/events" 
                          className="flex items-center py-2 text-gray-700 hover:text-green-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="w-6 h-6 mr-2 flex items-center justify-center">📅</span>
                          Harvest Events
                        </Link>
                      </motion.div>
                      
                      {/* Add Forum Link (Mobile) */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Link 
                          href="/community/forum" 
                          className="flex items-center py-2 text-gray-700 hover:text-green-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="w-6 h-6 mr-2 flex items-center justify-center">💬</span>
                          Community Forum
                        </Link>
                      </motion.div>
                      {/* End Add Forum Link (Mobile) */}
                      
                    </motion.div>
                  )}
                </AnimatePresence>
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
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Auth Modal - Moved outside header to ensure proper positioning */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={initialAuthTab}
      />
    </>
  );
} 