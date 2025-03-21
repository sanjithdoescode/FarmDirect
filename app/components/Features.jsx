'use client';

import { useLanguage } from '../context/LanguageContext';
import { useEffect, useState, useRef } from 'react';

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
          className="py-16 mx-auto max-w-6xl px-4"
        >
          <div className={`max-w-3xl mx-auto text-center transition-opacity duration-1000 ${visibleSections.about ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {t.aboutUs}
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              {t.aboutContent}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mt-12">
            <div 
              className={`bg-white p-8 rounded-xl shadow-lg transform transition-all duration-700 ${
                visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.1s' }}
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
                {t.forFarmers}
              </h3>
              <p className="text-gray-700 text-center">
                {t.farmerBenefits}
              </p>
            </div>
            
            <div 
              className={`bg-white p-8 rounded-xl shadow-lg transform transition-all duration-700 ${
                visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.3s' }}
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
                {t.supportLocal}
              </h3>
              <p className="text-gray-700 text-center">
                {t.supportLocalDesc}
              </p>
            </div>
            
            <div 
              className={`bg-white p-8 rounded-xl shadow-lg transform transition-all duration-700 ${
                visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.5s' }}
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🥕</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
                {t.forConsumers}
              </h3>
              <p className="text-gray-700 text-center">
                {t.consumerBenefits}
              </p>
            </div>
          </div>
        </section>
        
        {/* For Farmers Section */}
        <section 
          id="for-farmers" 
          ref={farmersRef}
          className="py-16 bg-green-50"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className={`max-w-3xl mx-auto text-center mb-12 transition-opacity duration-1000 ${visibleSections.farmers ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                {t.forFarmers}
              </h2>
              <p className="text-xl text-gray-700">
                {t.farmerBenefits}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Feature 
                icon="💰" 
                title={t.betterPrices}
                description={t.betterPricesDesc}
                isAnimated={visibleSections.farmers} 
                delay={0.1} 
              />
              <Feature 
                icon="📊" 
                title={t.marketInsights}
                description={t.marketInsightsDesc}
                isAnimated={visibleSections.farmers} 
                delay={0.3} 
              />
              <Feature 
                icon="🤝" 
                title={t.directConnection}
                description={t.directConnectionDesc}
                isAnimated={visibleSections.farmers} 
                delay={0.5} 
              />
              <Feature 
                icon="📱" 
                title={t.simplePlatform}
                description={t.simplePlatformDesc}
                isAnimated={visibleSections.farmers} 
                delay={0.7} 
              />
            </div>
          </div>
        </section>
        
        {/* For Consumers Section */}
        <section 
          id="for-consumers"
          ref={consumersRef}
          className="py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className={`max-w-3xl mx-auto text-center mb-12 transition-opacity duration-1000 ${visibleSections.consumers ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                {t.forConsumers}
              </h2>
              <p className="text-xl text-gray-700">
                {t.consumerBenefits}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Feature 
                icon="🥬" 
                title={t.freshProduce}
                description={t.freshProduceDesc}
                isAnimated={visibleSections.consumers} 
                delay={0.1} 
              />
              <Feature 
                icon="💰" 
                title={t.betterPrices}
                description={t.betterPricesDesc}
                isAnimated={visibleSections.consumers} 
                delay={0.3} 
              />
              <Feature 
                icon="🌱" 
                title={t.supportLocal}
                description={t.supportLocalDesc}
                isAnimated={visibleSections.consumers} 
                delay={0.5} 
              />
              <Feature 
                icon="🚚" 
                title={t.fastDelivery}
                description={t.fastDeliveryDesc}
                isAnimated={visibleSections.consumers} 
                delay={0.7} 
              />
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