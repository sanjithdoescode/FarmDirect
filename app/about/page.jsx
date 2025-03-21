'use client';

import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect, useRef } from 'react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import PageWrapper from '../components/PageWrapper';

export default function AboutPage() {
  const { t } = useLanguage();
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    mission: false,
    values: false,
    team: false,
    contact: false
  });
  
  // References for intersection observer
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);
  
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
    
    if (missionRef.current) observer.observe(missionRef.current);
    if (valuesRef.current) observer.observe(valuesRef.current);
    if (teamRef.current) observer.observe(teamRef.current);
    if (contactRef.current) observer.observe(contactRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <>
      <Header />
      <PageWrapper transitionType="fadeIn">
        <div className="bg-white overflow-hidden">
          {/* Hero Section with animated background and gradient overlay */}
          <div className="relative bg-gradient-to-r from-green-50 to-green-100 py-20 md:py-28 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-green-200 opacity-40 blur-3xl"></div>
              <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-green-100 opacity-60 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-green-200 opacity-50 blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                About <span className="text-green-600">FarmDirect</span>
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Connecting local farmers directly with consumers for fresher produce, better prices, and a more sustainable food system.
              </p>
              
              {/* Scroll indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </div>
            
            {/* Wave separator */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform">
              <svg className="relative block w-full h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
              </svg>
            </div>
          </div>
          
          {/* Mission Section with animated entrance */}
          <div 
            id="mission" 
            ref={missionRef} 
            className="py-20"
          >
            <div className="container mx-auto px-4">
              <div className={`max-w-3xl mx-auto transition-all duration-1000 transform ${
                visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">Our Mission</h2>
                
                <div className="relative mb-12">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full border-t border-green-100"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-green-600 text-2xl">🌟</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  At FarmDirect, we're on a mission to transform the agricultural supply chain by eliminating unnecessary middlemen. 
                  We believe that both farmers and consumers deserve better - farmers should receive fair compensation for their hard work, 
                  and consumers should have access to fresh, high-quality produce at reasonable prices.
                </p>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Our platform creates a direct connection between those who grow food and those who consume it, fostering transparency, 
                  supporting local economies, and promoting sustainable farming practices. By shortening the supply chain, we reduce food miles, 
                  decrease food waste, and ensure that more value goes to the people who matter most - farmers and consumers.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  We're committed to empowering small and medium-sized farmers, preserving traditional farming knowledge, and making 
                  fresh, local food accessible to more people across Tamil Nadu and beyond.
                </p>
              </div>
            </div>
          </div>
          
          {/* Values Section with cards and hover effects */}
          <div 
            id="values" 
            ref={valuesRef}
            className="py-20 bg-gradient-to-r from-green-50 to-green-100"
          >
            <div className="container mx-auto px-4">
              <div className={`transition-all duration-1000 transform ${
                visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">Our Values</h2>
                <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12">
                  The principles that guide our mission and shape our approach
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-4xl mb-6 mx-auto">🌱</div>
                    <h3 className="text-xl font-bold mb-3 text-center text-gray-800">Sustainability</h3>
                    <p className="text-gray-700 text-center">
                      We promote environmentally friendly farming practices and reduce the carbon footprint of food distribution.
                    </p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-4xl mb-6 mx-auto">🤝</div>
                    <h3 className="text-xl font-bold mb-3 text-center text-gray-800">Fairness</h3>
                    <p className="text-gray-700 text-center">
                      We ensure farmers receive fair compensation for their produce and consumers pay fair prices.
                    </p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-4xl mb-6 mx-auto">🔍</div>
                    <h3 className="text-xl font-bold mb-3 text-center text-gray-800">Transparency</h3>
                    <p className="text-gray-700 text-center">
                      We provide complete visibility into where food comes from, how it's grown, and how it reaches your table.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-4xl mb-6 mx-auto">🏡</div>
                    <h3 className="text-xl font-bold mb-3 text-center text-gray-800">Community</h3>
                    <p className="text-gray-700 text-center">
                      We foster connections between farmers and consumers, strengthening local food systems.
                    </p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-4xl mb-6 mx-auto">💡</div>
                    <h3 className="text-xl font-bold mb-3 text-center text-gray-800">Innovation</h3>
                    <p className="text-gray-700 text-center">
                      We use technology to solve traditional agriculture challenges and improve efficiency.
                    </p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-4xl mb-6 mx-auto">🍎</div>
                    <h3 className="text-xl font-bold mb-3 text-center text-gray-800">Quality</h3>
                    <p className="text-gray-700 text-center">
                      We prioritize fresh, nutritious produce that supports healthy communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Section with profile cards and animations */}
          <div 
            id="team" 
            ref={teamRef}
            className="py-20"
          >
            <div className="container mx-auto px-4">
              <div className={`transition-all duration-1000 transform ${
                visibleSections.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">Meet Our Team</h2>
                <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12">
                  The passionate individuals behind FarmDirect
                </p>
                
                <div className="flex flex-col md:flex-row gap-12 justify-center items-center md:items-stretch max-w-5xl mx-auto">
                  {/* Team Leader */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-xs transform hover:scale-105 transition-transform hover:shadow-xl">
                    <div className="h-64 bg-gradient-to-r from-green-400 to-green-600 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                        alt="Sanjith K" 
                        className="w-full h-full object-cover mix-blend-overlay opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-2xl font-bold">Sanjith K</h3>
                        <p className="text-white/90">Team Leader</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-700 mb-4">
                        Dedicated to building innovative solutions that connect farmers directly with consumers. Expertly handles development and technical implementation.
                      </p>
                      <div className="flex gap-4 justify-center">
                        <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                          <FaLinkedin size={24} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                          <FaTwitter size={24} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                          <FaGithub size={24} />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Team Member */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-xs transform hover:scale-105 transition-transform hover:shadow-xl">
                    <div className="h-64 bg-gradient-to-r from-green-400 to-green-600 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1639747280929-e84ef392c69a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                        alt="Roshan V R" 
                        className="w-full h-full object-cover mix-blend-overlay opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-2xl font-bold">Roshan V R</h3>
                        <p className="text-white/90">Team Member</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-700 mb-4">
                        Passionate about transforming agriculture with technology. Leading our team to create sustainable food systems and empower farmers.
                      </p>
                      <div className="flex gap-4 justify-center">
                        <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                          <FaLinkedin size={24} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                          <FaTwitter size={24} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                          <FaGithub size={24} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Journey Section - Timeline */}
          <div className="py-20 bg-gradient-to-r from-green-50 to-green-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">Our Journey</h2>
              <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12">
                From idea to impact - how FarmDirect has grown
              </p>
              
              <div className="max-w-4xl mx-auto relative">
                {/* Timeline line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-green-200 transform -translate-x-1/2"></div>
                
                {/* Timeline items */}
                <div className="relative z-10">
                  {/* Item 1 */}
                  <div className="flex flex-col md:flex-row items-center mb-12">
                    <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                      <h3 className="text-xl font-bold text-gray-800">The Beginning</h3>
                      <p className="text-gray-600">2022</p>
                      <p className="text-gray-700 mt-2">
                        FarmDirect was born from a simple idea: connect farmers directly with consumers.
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white z-10 mx-4 md:mx-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">1</div>
                    <div className="md:w-1/2 md:pl-12 md:text-left"></div>
                  </div>
                  
                  {/* Item 2 */}
                  <div className="flex flex-col md:flex-row items-center mb-12">
                    <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right"></div>
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white z-10 mx-4 md:mx-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">2</div>
                    <div className="md:w-1/2 md:pl-12 md:text-left">
                      <h3 className="text-xl font-bold text-gray-800">First Partnerships</h3>
                      <p className="text-gray-600">2023</p>
                      <p className="text-gray-700 mt-2">
                        We established our first partnerships with local farmers in Tamil Nadu.
                      </p>
                    </div>
                  </div>
                  
                  {/* Item 3 */}
                  <div className="flex flex-col md:flex-row items-center mb-12">
                    <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                      <h3 className="text-xl font-bold text-gray-800">Platform Launch</h3>
                      <p className="text-gray-600">2023</p>
                      <p className="text-gray-700 mt-2">
                        Our platform went live, allowing consumers to order directly from farmers.
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white z-10 mx-4 md:mx-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">3</div>
                    <div className="md:w-1/2 md:pl-12 md:text-left"></div>
                  </div>
                  
                  {/* Item 4 */}
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right"></div>
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white z-10 mx-4 md:mx-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">4</div>
                    <div className="md:w-1/2 md:pl-12 md:text-left">
                      <h3 className="text-xl font-bold text-gray-800">Today & Beyond</h3>
                      <p className="text-gray-600">2024</p>
                      <p className="text-gray-700 mt-2">
                        Growing our network and expanding to new regions, with a vision for a more sustainable food future.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Section with animation */}
          <div 
            id="contact" 
            ref={contactRef}
            className="py-20 relative overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-green-400"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-green-400"></div>
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className={`transition-all duration-1000 transform ${
                visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Get in Touch</h2>
                <p className="text-xl text-gray-700 max-w-xl mx-auto mb-10">
                  Have questions or feedback? We'd love to hear from you!
                </p>
                
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto transform hover:shadow-xl transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  
                  <button 
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium transform hover:scale-105 transition-transform w-full md:w-auto"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
}