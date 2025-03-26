'use client';

import { useLanguage } from '../context/LanguageContext';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function Features() {
  const { t } = useLanguage();
  // Initialize all sections to true so content is visible by default
  const [visibleSections, setVisibleSections] = useState({
    about: true,
    farmers: true,
    consumers: true
  });
  
  const aboutRef = useRef(null);
  const farmersRef = useRef(null);
  const consumersRef = useRef(null);
  
  useEffect(() => {
    // Set up animation enhancement only, not for critical content visibility
    const observers = [];
    
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Update state based on which section is visible
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
      threshold: 0.1 // Lower threshold to trigger earlier
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe each section
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
      observers.push(observer);
    }
    
    if (farmersRef.current) {
      observer.observe(farmersRef.current);
      observers.push(observer);
    }
    
    if (consumersRef.current) {
      observer.observe(consumersRef.current);
      observers.push(observer);
    }
    
    return () => {
      // Clean up observers
      observers.forEach(obs => obs.disconnect());
    };
  }, []);
  
  return (
    <div className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <section 
          id="about" 
          ref={aboutRef}
          className="mb-28"
        >
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-6'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">From Farm to Table</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We connect local farmers directly with consumers, creating a more sustainable food system
              that benefits everyone. Fresh produce, fair prices, and a healthier community.
            </p>
          </div>
          
          {/* Stats with subtle animations */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 transition-all duration-1000 delay-300 transform ${
            visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-6'
          }`}>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-green-600 mb-2 flex justify-center items-center">
                <span className="mr-2">🌱</span>40%
              </div>
              <p className="text-gray-700">Higher earnings for farmers</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-green-600 mb-2 flex justify-center items-center">
                <span className="mr-2">⏱️</span>24h
              </div>
              <p className="text-gray-700">Farm to table delivery</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-green-600 mb-2 flex justify-center items-center">
                <span className="mr-2">💰</span>30%
              </div>
              <p className="text-gray-700">Lower prices for consumers</p>
            </div>
          </div>
        </section>
        
        {/* For Farmers Section */}
        <section 
          id="for-farmers" 
          ref={farmersRef}
          className="mb-28"
        >
          <div className={`flex flex-col md:flex-row items-center transition-all duration-1000 transform ${
            visibleSections.farmers ? 'opacity-100 translate-x-0' : 'opacity-70 translate-x-0'
          }`}>
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1611735341450-74d61e660ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
                  alt="Farmer with produce" 
                  className="rounded-xl shadow-lg w-full h-auto object-cover z-10 relative"
                  style={{ aspectRatio: "4/3" }}
                />
                
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-100 rounded-lg -z-10"></div>
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-green-50 rounded-lg -z-10"></div>
                
                {/* Testimonial floating card */}
                <div className="absolute -bottom-10 right-10 bg-white p-4 rounded-lg shadow-lg md:block hidden max-w-xs">
                  <div className="flex items-start">
                    <span className="text-green-500 text-4xl mr-3">"</span>
                    <div>
                      <p className="text-sm text-gray-700 italic"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">For Farmers</h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Join our community of local farmers and experience better prices, direct customer relationships,
                and a streamlined selling process.
              </p>
              <ul className="space-y-6">
                <Feature 
                  icon="💰" 
                  title="Better Prices" 
                  description="Get up to 40% more for your produce without middlemen taking a cut" 
                  isAnimated={visibleSections.farmers}
                  delay={0}
                />
                <Feature 
                  icon="📊" 
                  title="Market Insights" 
                  description="Access data and trends to help plan your crops based on demand" 
                  isAnimated={visibleSections.farmers}
                  delay={150}
                />
                <Feature 
                  icon="🤝" 
                  title="Direct Customer Relationships" 
                  description="Build loyal customer relationships and get direct feedback" 
                  isAnimated={visibleSections.farmers}
                  delay={300}
                />
                <Feature 
                  icon="📱" 
                  title="Simple Platform" 
                  description="Easy-to-use mobile app to list products, manage orders, and track payments" 
                  isAnimated={visibleSections.farmers}
                  delay={450}
                />
              </ul>
              
              <button className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium transform hover:scale-105 transition-transform">
                Join as a Farmer
              </button>
            </div>
          </div>
        </section>
        
        {/* For Consumers Section */}
        <section 
          id="for-consumers"
          ref={consumersRef}
        >
          <div className={`flex flex-col md:flex-row-reverse items-center transition-all duration-1000 transform ${
            visibleSections.consumers ? 'opacity-100 translate-x-0' : 'opacity-70 translate-x-0'
          }`}>
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
                  alt="Customer with fresh vegetables" 
                  className="rounded-xl shadow-lg w-full h-auto object-cover z-10 relative"
                  style={{ aspectRatio: "4/3" }}
                />
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-100 rounded-lg -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-50 rounded-lg -z-10"></div>
                
                {/* Floating product card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-lg shadow-lg md:flex hidden items-center space-x-3 transform rotate-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="Fresh produce" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">Organic Bananas</div>
                    <div className="text-green-600">₹80 / dozen</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">For Consumers</h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Enjoy farm-fresh produce delivered directly to your doorstep. Better quality, better prices,
                and the satisfaction of supporting local farmers.
              </p>
              <ul className="space-y-6">
                <Feature 
                  icon="🥬" 
                  title="Fresh Produce" 
                  description="Get fruits and vegetables harvested within 24 hours of delivery" 
                  isAnimated={visibleSections.consumers}
                  delay={0}
                />
                <Feature 
                  icon="💸" 
                  title="Affordable Prices" 
                  description="Pay less than supermarket prices while supporting farmers more" 
                  isAnimated={visibleSections.consumers}
                  delay={150}
                />
                <Feature 
                  icon="🔍" 
                  title="Complete Transparency" 
                  description="Know exactly where your food comes from and how it was grown" 
                  isAnimated={visibleSections.consumers}
                  delay={300}
                />
                <Feature 
                  icon="♻️" 
                  title="Sustainable Packaging" 
                  description="All deliveries use eco-friendly, minimal packaging" 
                  isAnimated={visibleSections.consumers}
                  delay={450}
                />
              </ul>
              
              <button 
                className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium transform hover:scale-105 transition-transform"
              >
                <Link href="/dashboard/consumer/store">Start Shopping</Link>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Feature({ icon, title, description, isAnimated = false, delay = 0 }) {
  return (
    <li className={`flex items-start transition-all duration-700 transform ${
      isAnimated 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-70 translate-x-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mr-4 text-2xl bg-green-50 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </li>
  );
} 