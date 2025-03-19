'use client';

import { useLanguage } from '../context/LanguageContext';

export default function Features() {
  const { t } = useLanguage();
  
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <section id="about" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.aboutUs}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.aboutContent}
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
              <p className="text-gray-700">Higher earnings for farmers</p>
            </div>
            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">24h</div>
              <p className="text-gray-700">Farm to table delivery</p>
            </div>
            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">30%</div>
              <p className="text-gray-700">Lower prices for consumers</p>
            </div>
          </div>
        </section>
        
        {/* For Farmers Section */}
        <section id="for-farmers" className="mb-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <img 
                src="/farmers.jpg" 
                alt="Farmers" 
                className="rounded-xl shadow-lg w-full h-auto"
                style={{ aspectRatio: "4/3", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
                }}
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.forFarmers}</h2>
              <p className="text-xl text-gray-600 mb-6">
                {t.farmerBenefits}
              </p>
              <ul className="space-y-4">
                <Feature icon="💰" title="Better Prices" description="Get up to 40% more for your produce without middlemen taking a cut" />
                <Feature icon="📊" title="Market Insights" description="Access data and trends to help plan your crops based on demand" />
                <Feature icon="🤝" title="Direct Customer Relationships" description="Build loyal customer relationships and get direct feedback" />
                <Feature icon="📱" title="Simple Platform" description="Easy-to-use mobile app to list products, manage orders, and track payments" />
              </ul>
            </div>
          </div>
        </section>
        
        {/* For Consumers Section */}
        <section id="for-consumers">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
              <img 
                src="/consumers.jpg" 
                alt="Consumers" 
                className="rounded-xl shadow-lg w-full h-auto"
                style={{ aspectRatio: "4/3", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1506617420156-8e4536971650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
                }}
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.forConsumers}</h2>
              <p className="text-xl text-gray-600 mb-6">
                {t.consumerBenefits}
              </p>
              <ul className="space-y-4">
                <Feature icon="🥬" title="Fresh Produce" description="Get fruits and vegetables harvested within 24 hours of delivery" />
                <Feature icon="💸" title="Affordable Prices" description="Pay less than supermarket prices while supporting farmers more" />
                <Feature icon="🔍" title="Complete Transparency" description="Know exactly where your food comes from and how it was grown" />
                <Feature icon="♻️" title="Sustainable Packaging" description="All deliveries use eco-friendly, minimal packaging" />
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <li className="flex items-start">
      <div className="mr-4 text-2xl">{icon}</div>
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </li>
  );
} 