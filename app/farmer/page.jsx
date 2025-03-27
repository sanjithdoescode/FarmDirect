'use client';

import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect, useRef } from 'react';
import { FaLeaf, FaChartLine, FaHandshake, FaMobileAlt, FaTractor, FaSeedling, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import AuthModal from '../components/AuthModal';

export default function FarmerPage() {
  const { t } = useLanguage();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    benefits: false,
    stats: false,
    process: false,
    testimonials: false,
    cta: false
  });
  
  // References for intersection observer
  const benefitsRef = useRef(null);
  const statsRef = useRef(null);
  const processRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (benefitsRef.current) observer.observe(benefitsRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    if (processRef.current) observer.observe(processRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <>
      <Header />
      <div className="bg-white">
        {/* Hero Section with animated background and floating elements */}
        <div className="relative bg-gradient-to-r from-green-50 to-green-100 py-24 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 -right-40 w-96 h-96 rounded-full bg-green-200 opacity-30 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 -left-40 w-80 h-80 rounded-full bg-green-100 opacity-40 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-16 h-16 text-4xl animate-float" style={{ animationDelay: '0s' }}>🌾</div>
            <div className="absolute top-40 right-20 w-16 h-16 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>🥕</div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 text-4xl animate-float" style={{ animationDelay: '1s' }}>🍅</div>
            <div className="absolute bottom-40 right-1/4 w-16 h-16 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>🥬</div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Grow Your Farming Business with <span className="text-green-600">FarmDirect</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join our community of successful farmers who earn more by selling directly to consumers. 
              No middlemen, better prices, and complete control over your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard/farmer"
                className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium transform hover:scale-105 transition-transform inline-flex items-center justify-center"
              >
                <FaTractor className="mr-2" />
                Start Selling Today
              </Link>
              <a 
                href="#learn-more"
                className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-lg font-medium transform hover:scale-105 transition-transform inline-flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
            <svg className="relative block w-full h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
            </svg>
          </div>
        </div>
        
        {/* Stats Section */}
        <div 
          id="stats"
          ref={statsRef}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-1000 transform ${
              visibleSections.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
                <div className="text-gray-700">Active Farmers</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
                <div className="text-gray-700">Higher Earnings</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold text-green-600 mb-2">24h</div>
                <div className="text-gray-700">Quick Delivery</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold text-green-600 mb-2">5000+</div>
                <div className="text-gray-700">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits Section with interactive cards */}
        <div 
          id="benefits"
          ref={benefitsRef}
          className="py-20 bg-gradient-to-r from-green-50 to-green-100"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Why Choose FarmDirect?</h2>
            <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12">
              We provide everything you need to succeed in direct-to-consumer farming
            </p>
            
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 transform ${
              visibleSections.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                  <FaMoneyBillWave />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Better Prices</h3>
                <p className="text-gray-700">
                  Earn up to 40% more by selling directly to consumers. No middlemen means more profit for you.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                  <FaChartLine />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Market Insights</h3>
                <p className="text-gray-700">
                  Get valuable data about market trends and consumer preferences to optimize your farming.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                  <FaUsers />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Direct Relationships</h3>
                <p className="text-gray-700">
                  Build lasting relationships with your customers and get direct feedback.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                  <FaMobileAlt />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Easy Management</h3>
                <p className="text-gray-700">
                  User-friendly mobile app to manage your inventory, orders, and payments.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                  <FaLeaf />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Sustainable Farming</h3>
                <p className="text-gray-700">
                  Promote your sustainable farming practices and reach eco-conscious consumers.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                  <FaSeedling />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Growth Support</h3>
                <p className="text-gray-700">
                  Access resources and support to help your farming business grow and succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Process Section with animated timeline */}
        <div 
          id="process"
          ref={processRef}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12">
              Get started with FarmDirect in four simple steps
            </p>
            
            <div className={`max-w-4xl mx-auto relative transition-all duration-1000 transform ${
              visibleSections.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
              
              {/* Timeline items */}
              <div className="relative z-10 space-y-12">
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Your Profile</h3>
                    <p className="text-gray-700">
                      Sign up and create your farmer profile with details about your farm and practices.
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">1</div>
                  <div className="w-1/2 pl-8"></div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">2</div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">List Your Products</h3>
                    <p className="text-gray-700">
                      Add your products with photos, descriptions, and set your own prices.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Receive Orders</h3>
                    <p className="text-gray-700">
                      Get notified instantly when customers place orders for your products.
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">3</div>
                  <div className="w-1/2 pl-8"></div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">4</div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Grow Your Business</h3>
                    <p className="text-gray-700">
                      Deliver fresh produce, get paid quickly, and watch your business grow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div 
          id="testimonials"
          ref={testimonialsRef}
          className="py-20 bg-gradient-to-r from-green-50 to-green-100"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Farmer Success Stories</h2>
            <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12">
              Hear from farmers who have transformed their business with FarmDirect
            </p>
            
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 transform ${
              visibleSections.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="Farmer" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Rajesh Kumar</h3>
                    <p className="text-gray-600">Organic Vegetable Farmer</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Since joining FarmDirect, my income has increased by 45%. I now have direct relationships with my customers who value my organic farming practices."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="Farmer" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Lakshmi Devi</h3>
                    <p className="text-gray-600">Fruit Grower</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The platform is so easy to use. I can manage all my orders and deliveries right from my phone. My customers love getting fresh fruits directly from my farm."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="Farmer" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Muthu Raman</h3>
                    <p className="text-gray-600">Traditional Rice Farmer</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "FarmDirect helped me preserve our traditional farming methods while reaching modern consumers who appreciate quality. It's a perfect blend of tradition and technology."
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div 
          id="cta"
          ref={ctaRef}
          className="py-20 bg-white relative overflow-hidden"
        >
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 -right-40 w-96 h-96 rounded-full bg-green-100 opacity-30 blur-3xl"></div>
            <div className="absolute bottom-0 -left-40 w-80 h-80 rounded-full bg-green-200 opacity-30 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className={`transition-all duration-1000 transform ${
              visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Transform Your Farming Business?</h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-12">
                Join thousands of successful farmers who are already growing their business with FarmDirect.
                Start selling directly to consumers today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium transform hover:scale-105 transition-transform inline-flex items-center justify-center"
                >
                  <FaTractor className="mr-2" />
                  Join as a Farmer
                </button>
                <a 
                  href="#learn-more"
                  className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-lg font-medium transform hover:scale-105 transition-transform inline-flex items-center justify-center"
                >
                  Contact Sales Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialTab="register" />
    </>
  );
} 