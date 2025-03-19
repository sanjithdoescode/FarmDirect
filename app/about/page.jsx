'use client';

import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <Header />
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About FarmDirect</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connecting local farmers directly with consumers for fresher produce, better prices, and a more sustainable food system.
            </p>
          </div>
        </div>
        
        {/* Mission Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At FarmDirect, we're on a mission to transform the agricultural supply chain by eliminating unnecessary middlemen. 
                We believe that both farmers and consumers deserve better - farmers should receive fair compensation for their hard work, 
                and consumers should have access to fresh, high-quality produce at reasonable prices.
              </p>
              <p className="text-gray-600 mb-6">
                Our platform creates a direct connection between those who grow food and those who consume it, fostering transparency, 
                supporting local economies, and promoting sustainable farming practices. By shortening the supply chain, we reduce food miles, 
                decrease food waste, and ensure that more value goes to the people who matter most - farmers and consumers.
              </p>
              <p className="text-gray-600">
                We're committed to empowering small and medium-sized farmers, preserving traditional farming knowledge, and making 
                fresh, local food accessible to more people across Tamil Nadu and beyond.
              </p>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-green-500 text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  We promote environmentally friendly farming practices and reduce the carbon footprint of food distribution.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-green-500 text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2">Fairness</h3>
                <p className="text-gray-600">
                  We ensure farmers receive fair compensation for their produce and consumers pay fair prices.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-green-500 text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">Transparency</h3>
                <p className="text-gray-600">
                  We provide complete visibility into where food comes from, how it's grown, and how it reaches your table.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-green-500 text-4xl mb-4">🏡</div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-gray-600">
                  We foster connections between farmers and consumers, strengthening local food systems.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-green-500 text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We use technology to solve traditional agriculture challenges and improve efficiency.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-green-500 text-4xl mb-4">🍎</div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-gray-600">
                  We prioritize fresh, nutritious produce that supports healthy communities.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">Priya Sharma</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">Rajesh Kumar</h3>
                <p className="text-gray-600">Head of Farmer Relations</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">Ananya Patel</h3>
                <p className="text-gray-600">Technology Director</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <a 
              href="mailto:contact@farmdirect.com" 
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 