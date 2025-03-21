'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { FaCalendarAlt, FaSeedling, FaVoteYea, FaHandshake, FaChevronRight, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

export default function CommunityPage() {
  const { t } = useLanguage();
  const [visibleSection, setVisibleSection] = useState('intro');
  
  // Scroll tracking for animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.75;
      
      document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
          setVisibleSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Summer Harvest Festival",
      date: "July 15, 2023",
      time: "9:00 AM - 2:00 PM",
      location: "Central Market, Coimbatore",
      image: "https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      farmers: 12,
      attendees: 250
    },
    {
      id: 2,
      title: "Organic Farming Workshop",
      date: "July 22, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Green Earth Farm, Salem",
      image: "https://images.unsplash.com/photo-1595508064774-5ff825885dc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      farmers: 5,
      attendees: 40
    },
    {
      id: 3,
      title: "Mango Season Celebration",
      date: "July 29, 2023",
      time: "8:00 AM - 3:00 PM",
      location: "Paddy Organics, Thanjavur",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      farmers: 8,
      attendees: 180
    }
  ];
  
  return (
    <>
      <Header />
      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-50 to-green-100 py-24 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 -translate-x-1/4 -translate-y-1/4 rounded-full bg-green-200 opacity-40 blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 translate-x-1/3 -translate-y-1/2 rounded-full bg-green-100 opacity-60 blur-3xl"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Build Community Through <span className="text-green-600">Food</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
              Join initiatives that connect farmers and consumers, strengthen local food systems, and create meaningful relationships around locally grown food.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/community/events" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium">
                Explore Events
              </Link>
              <Link href="/community/csa" className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-lg font-medium">
                Join CSA Program
              </Link>
            </div>
          </div>
          
          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg className="w-full h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
            </svg>
          </div>
        </section>
        
        {/* Initiative Cards Section */}
        <section id="initiatives" className={`py-16 transition-opacity duration-1000 ${visibleSection === 'initiatives' ? 'opacity-100' : 'opacity-70'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Community Initiatives</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Harvest Day Events */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
                <div className="h-40 bg-green-600 text-white flex items-center justify-center">
                  <FaCalendarAlt size={64} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Harvest Day Events</h3>
                  <p className="text-gray-600 mb-4">Attend mini-markets where local farmers bring their freshly harvested produce directly to central locations.</p>
                  <Link href="/community/events" className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Learn More <FaChevronRight className="ml-1" size={12} />
                  </Link>
                </div>
              </div>
              
              {/* Crop Adoption Program */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
                <div className="h-40 bg-amber-500 text-white flex items-center justify-center">
                  <FaSeedling size={64} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Crop Adoption</h3>
                  <p className="text-gray-600 mb-4">Adopt specific plants or trees on a farm and receive exclusive produce throughout the harvest season.</p>
                  <Link href="/community/adopt" className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Learn More <FaChevronRight className="ml-1" size={12} />
                  </Link>
                </div>
              </div>
              
              {/* Collaborative Farming Decisions */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
                <div className="h-40 bg-blue-500 text-white flex items-center justify-center">
                  <FaVoteYea size={64} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Community Votes</h3>
                  <p className="text-gray-600 mb-4">Shape future harvests by voting on what crops farmers should grow next season.</p>
                  <Link href="/community/vote" className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Learn More <FaChevronRight className="ml-1" size={12} />
                  </Link>
                </div>
              </div>
              
              {/* Community Supported Agriculture */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
                <div className="h-40 bg-purple-500 text-white flex items-center justify-center">
                  <FaHandshake size={64} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">CSA Program</h3>
                  <p className="text-gray-600 mb-4">Invest in a share of the season's harvest with our Community Supported Agriculture program.</p>
                  <Link href="/community/csa" className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Learn More <FaChevronRight className="ml-1" size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Upcoming Events Section */}
        <section id="upcoming" className={`py-16 bg-gradient-to-r from-green-50 to-green-100 transition-opacity duration-1000 ${visibleSection === 'upcoming' ? 'opacity-100' : 'opacity-70'}`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
              <Link 
                href="/community/events" 
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                View All Events
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 mb-1">
                      <FaCalendarAlt className="mr-2" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div className="flex items-center text-gray-600">
                        <FaUsers className="mr-2" />
                        <span>{event.farmers} Farmers • {event.attendees} Attendees</span>
                      </div>
                      <Link 
                        href={`/community/events/${event.id}`} 
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Impact Stats */}
        <section id="impact" className={`py-16 transition-opacity duration-1000 ${visibleSection === 'impact' ? 'opacity-100' : 'opacity-70'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Community Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
                  <FaUsers className="text-green-600" size={32} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">5,000+</div>
                <div className="text-gray-600">Community Members</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 mx-auto mb-4 flex items-center justify-center">
                  <FaCalendarAlt className="text-amber-600" size={32} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">120+</div>
                <div className="text-gray-600">Events Organized</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                  <FaSeedling className="text-blue-600" size={32} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">350+</div>
                <div className="text-gray-600">Adopted Crops</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 mx-auto mb-4 flex items-center justify-center">
                  <FaHandshake className="text-purple-600" size={32} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">₹2.5M+</div>
                <div className="text-gray-600">CSA Investments</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section id="testimonials" className={`py-16 bg-gradient-to-r from-green-50 to-green-100 transition-opacity duration-1000 ${visibleSection === 'testimonials' ? 'opacity-100' : 'opacity-70'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Community Voices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Rajesh Kumar</h3>
                    <p className="text-gray-600 text-sm">CSA Member for 2 years</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Being part of the CSA program has transformed how our family eats. We've discovered so many new varieties of vegetables, and my children now know where their food comes from."
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Priya Sharma</h3>
                    <p className="text-gray-600 text-sm">Crop Adopter</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "I adopted a mango tree last year, and receiving updates about my tree throughout the season created such a personal connection. The mangoes were the best I've ever tasted!"
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Farmer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Muthu Velan</h3>
                    <p className="text-gray-600 text-sm">Farmer, Paddy Organics</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The community voting system has helped me understand what my customers actually want. Now I'm growing varieties that people are excited about, and it's increased my sales tremendously."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Join the Community CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Growing Community</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
              Be part of a movement that's transforming local food systems and building stronger communities through food.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium">
                Sign Up Now
              </Link>
              <Link href="/community/events" className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-lg font-medium">
                Browse Events
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 