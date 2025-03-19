'use client';

import { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [userType, setUserType] = useState('consumer');
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Modal Header */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 font-medium ${
              activeTab === 'login' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('login')}
          >
            {t.login}
          </button>
          <button
            className={`flex-1 py-4 font-medium ${
              activeTab === 'register' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('register')}
          >
            {t.register}
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {activeTab === 'login' ? (
            <LoginForm t={t} />
          ) : (
            <RegisterForm t={t} userType={userType} setUserType={setUserType} />
          )}

          {/* Footer with toggle link */}
          <div className="mt-6 text-center text-sm">
            {activeTab === 'login' ? (
              <p>
                {t.noAccount}{' '}
                <button
                  onClick={() => setActiveTab('register')}
                  className="text-green-600 hover:underline font-medium"
                >
                  {t.register}
                </button>
              </p>
            ) : (
              <p>
                {t.alreadyAccount}{' '}
                <button
                  onClick={() => setActiveTab('login')}
                  className="text-green-600 hover:underline font-medium"
                >
                  {t.login}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ t }) {
  return (
    <form className="space-y-4">
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">
          <FaEnvelope />
        </span>
        <input
          type="email"
          placeholder={t.email}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-700"
          required
        />
      </div>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">
          <FaLock />
        </span>
        <input
          type="password"
          placeholder={t.password}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-700"
          required
        />
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2 w-4 h-4 accent-green-600" />
          <span>Remember me</span>
        </label>
        <button type="button" className="text-green-600 hover:underline">
          {t.forgotPassword}
        </button>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
      >
        {t.login}
      </button>
    </form>
  );
}

function RegisterForm({ t, userType, setUserType }) {
  return (
    <form className="space-y-4">
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">
          <FaUser />
        </span>
        <input
          type="text"
          placeholder={t.name}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-700"
          required
        />
      </div>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">
          <FaEnvelope />
        </span>
        <input
          type="email"
          placeholder={t.email}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-700"
          required
        />
      </div>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">
          <FaPhone />
        </span>
        <input
          type="tel"
          placeholder={t.phone}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-700"
          required
        />
      </div>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">
          <FaMapMarkerAlt />
        </span>
        <input
          type="text"
          placeholder={t.address}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-700"
          required
        />
      </div>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">
          <FaLock />
        </span>
        <input
          type="password"
          placeholder={t.password}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-700"
          required
        />
      </div>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">
          <FaLock />
        </span>
        <input
          type="password"
          placeholder={t.confirmPassword}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-700"
          required
        />
      </div>
      
      <div>
        <p className="text-sm mb-2">{t.registerAs}</p>
        <div className="flex space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="userType"
              value="farmer"
              checked={userType === 'farmer'}
              onChange={() => setUserType('farmer')}
              className="mr-2 w-4 h-4 accent-green-600"
            />
            <span>{t.farmer}</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="userType"
              value="consumer"
              checked={userType === 'consumer'}
              onChange={() => setUserType('consumer')}
              className="mr-2 w-4 h-4 accent-green-600"
            />
            <span>{t.consumer}</span>
          </label>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
      >
        {t.register}
      </button>
    </form>
  );
} 