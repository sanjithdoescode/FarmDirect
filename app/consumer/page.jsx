'use client';

import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect, useRef } from 'react';
import { FaShoppingBasket, FaLeaf, FaHandHoldingHeart, FaSearchLocation, FaTruck, FaMobileAlt, FaRecycle, FaShieldAlt } from 'react-icons/fa';

export default function ConsumerPage() {
  const { t } = useLanguage();
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
            <div className="absolute top-20 left-10 w-16 h-16 text-4xl animate-float" style={{ animationDelay: '0s' }}>🥗</div>
            <div className="absolute top-40 right-20 w-16 h-16 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>🥬</div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 text-4xl animate-float" style={{ animationDelay: '1s' }}>🍎</div>
            <div className="absolute bottom-40 right-1/4 w-16 h-16 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>🥕</div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Fresh from Farm to Your <span className="text-green-600">Table</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience the freshest produce directly from local farmers. Better quality, better prices, 
              and the satisfaction of supporting your local farming community.
            </p>
            <div className="flex justify-center">
              <Link 
                href="/dashboard/consumer/store"
                className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium transform hover:scale-105 transition-transform inline-flex items-center justify-center"
              >
                <FaShoppingBasket className="mr-2" />
                Start Shopping
              </Link>
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
                <div className="text-4xl font-bold text-green-600 mb-2">30%</div>
                <div className="text-gray-700">Lower Prices</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold text-green-600 mb-2">24h</div>
                <div className="text-gray-700">Farm to Table</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
                <div className="text-gray-700">Local Farmers</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-700">Satisfaction</div>
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
              Experience the benefits of direct farm-to-table shopping
            </p>
            
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 transform ${
              visibleSections.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                  <FaLeaf />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Fresh Produce</h3>
                <p className="text-gray-700">
                  Get farm-fresh produce delivered directly to your doorstep, often harvested within 24 hours.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                  <FaHandHoldingHeart />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Support Local</h3>
                <p className="text-gray-700">
                  Help local farmers thrive while enjoying better quality produce at better prices.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                  <FaSearchLocation />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Full Transparency</h3>
                <p className="text-gray-700">
                  Know exactly where your food comes from and how it's grown. Meet your farmers virtually.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                  <FaTruck />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Quick Delivery</h3>
                <p className="text-gray-700">
                  Enjoy convenient home delivery or pickup options for your fresh produce.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                  <FaMobileAlt />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Easy Ordering</h3>
                <p className="text-gray-700">
                  Simple and convenient mobile app for browsing, ordering, and managing deliveries.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                  <FaRecycle />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Eco-Friendly</h3>
                <p className="text-gray-700">
                  Sustainable packaging and reduced food miles for a better environment.
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
              Start enjoying farm-fresh produce in four simple steps
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Browse Products</h3>
                    <p className="text-gray-700">
                      Explore fresh produce from local farmers in your area.
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">1</div>
                  <div className="w-1/2 pl-8"></div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">2</div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Add to Cart</h3>
                    <p className="text-gray-700">
                      Select your favorite items and add them to your shopping cart.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Delivery</h3>
                    <p className="text-gray-700">
                      Select your preferred delivery time and location.
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">3</div>
                  <div className="w-1/2 pl-8"></div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">4</div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Enjoy Fresh</h3>
                    <p className="text-gray-700">
                      Receive your farm-fresh produce and enjoy the taste of local farming.
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
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">What Our Customers Say</h2>
            <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12">
              Hear from people who love fresh, local produce
            </p>
            
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 transform ${
              visibleSections.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="Customer" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Priya Sharma</h3>
                    <p className="text-gray-600">Health Enthusiast</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The quality of produce from FarmDirect is amazing! Everything is so fresh and tastes better than anything I've bought from supermarkets."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="Customer" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Karthik Rajan</h3>
                    <p className="text-gray-600">Home Chef</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a chef, quality ingredients are crucial. FarmDirect connects me directly with farmers, ensuring I get the freshest produce for my dishes."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="Customer" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Anita Desai</h3>
                    <p className="text-gray-600">Busy Mom</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The convenience of home delivery combined with farm-fresh quality makes FarmDirect perfect for my family's needs."
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
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Taste the Difference?</h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-12">
                Join thousands of happy customers who enjoy fresh, local produce delivered to their doorstep.
                Start your farm-to-table journey today!
              </p>
              <div className="flex justify-center">
                <Link 
                  href="/dashboard/consumer/store"
                  className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium transform hover:scale-105 transition-transform inline-flex items-center justify-center"
                >
                  <FaShoppingBasket className="mr-2" />
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 