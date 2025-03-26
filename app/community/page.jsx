'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { FaSeedling, FaVoteYea, FaCalendarAlt, FaHandsHelping, FaUsers, FaLeaf, FaHeart, FaChartBar } from 'react-icons/fa';

export default function CommunityHub() {
  const { t } = useLanguage();

  // Mock stats data
  const stats = {
    farmers: 125,
    consumers: 850,
    events: 32,
    adoptions: 215
  };

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-400 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Community Initiatives</h1>
            <p className="text-xl max-w-2xl mx-auto mb-10">
              Join our growing community of farmers and consumers building a sustainable food system in Tamil Nadu.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="#initiatives" 
                className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
              >
                Explore Initiatives
              </Link>
              <Link 
                href="/about" 
                className="px-6 py-3 border border-white text-white rounded-lg hover:bg-green-500 transition-colors text-lg font-medium"
              >
                About Our Mission
              </Link>
            </div>
          </div>
          
          {/* Stats Overlay */}
          <div className="max-w-5xl mx-auto px-4 mt-16">
            <div className="bg-white rounded-lg shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-green-600 mb-2">{stats.farmers}</span>
                <span className="text-gray-600">Farmers Involved</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-green-600 mb-2">{stats.consumers}</span>
                <span className="text-gray-600">Consumers Mobilized</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-green-600 mb-2">{stats.events}</span>
                <span className="text-gray-600">Events Hosted</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-green-600 mb-2">{stats.adoptions}</span>
                <span className="text-gray-600">Crops Adopted</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Initiatives Section */}
        <section id="initiatives" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Community Initiatives</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Crop Adoption */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-amber-500 flex items-center justify-center">
                  <FaSeedling className="text-white text-6xl" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Crop Adoption Program</h3>
                  <p className="text-gray-700 mb-6">
                    Adopt a plant, tree, or plot and receive its harvest. Follow your crop's journey from seed to plate while supporting local farmers.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Connect with Farmers</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Support Sustainable Farming</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Farm-to-Table Experience</span>
                  </div>
                  <Link 
                    href="/community/adopt" 
                    className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Explore Adoption Options
                  </Link>
                </div>
              </div>
              
              {/* Community Voting */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-blue-600 flex items-center justify-center">
                  <FaVoteYea className="text-white text-6xl" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Community Voting</h3>
                  <p className="text-gray-700 mb-6">
                    Shape the future of local farming by voting on what farmers grow next. Your voice directly influences farming decisions.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Democratic Farming</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Influence Crop Selection</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Support Farmer Decisions</span>
                  </div>
                  <Link 
                    href="/community/vote" 
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Cast Your Vote
                  </Link>
                </div>
              </div>
              
              {/* CSA Programs */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-emerald-600 flex items-center justify-center">
                  <FaHandsHelping className="text-white text-6xl" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Community Supported Agriculture</h3>
                  <p className="text-gray-700 mb-6">
                    Subscribe to regular deliveries of seasonal produce from local farmers. Pre-pay for harvest shares and support farmers throughout the growing season.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">Regular Fresh Produce</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">Support Local Economy</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">Share Farming Risk</span>
                  </div>
                  <Link 
                    href="/community/csa" 
                    className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Browse CSA Programs
                  </Link>
                </div>
              </div>
              
              {/* Harvest Day Events */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-orange-500 flex items-center justify-center">
                  <FaCalendarAlt className="text-white text-6xl" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Harvest Day Events</h3>
                  <p className="text-gray-700 mb-6">
                    Join farmers for seasonal harvest celebrations, workshops, and farm tours. Connect with the farming community and learn about sustainable agriculture.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Educational Workshops</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Family-Friendly Activities</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Farm Tours</span>
                  </div>
                  <Link 
                    href="/community/events" 
                    className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    View Upcoming Events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Community Voices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <p className="text-gray-600 text-sm">Organic Rice Farmer</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Being part of this community has transformed my farm. The direct connection with consumers gives me confidence to invest in sustainable practices, knowing there's demand for quality produce."
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Consumer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Priya Sharma</h3>
                    <p className="text-gray-600 text-sm">CSA Subscriber</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Our family joined a CSA program last year, and it's changed how we eat. We've discovered so many local varieties, and my children now understand where food comes from. The weekly deliveries are the highlight of our weekend."
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Community Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Arjun Mehta</h3>
                    <p className="text-gray-600 text-sm">Crop Adopter</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "I adopted a coffee plant cluster in Kodaikanal last season. Watching it grow through photos and then receiving my own coffee was incredible. I even visited during harvest - an experience I'll never forget."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Community Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <FaLeaf className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Environmental Sustainability</h3>
                <p className="text-gray-600">
                  Our community initiatives have helped reduce food miles by 65% and supported 45 farmers in transitioning to organic practices.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <FaHeart className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Social Connection</h3>
                <p className="text-gray-600">
                  Created meaningful connections between 125 farmers and over 850 consumers, building community through food and shared values.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <FaChartBar className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Economic Impact</h3>
                <p className="text-gray-600">
                  Farmers in our network report 40% increased income on average by selling directly to consumers through our platform.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Whether you're a farmer or a consumer, there's a place for you in our community. Join us in building a more sustainable and connected food system.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/register" 
                className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
              >
                Sign Up Today
              </Link>
              <Link 
                href="#initiatives" 
                className="px-8 py-3 border border-white text-white rounded-lg hover:bg-green-500 transition-colors text-lg font-medium"
              >
                Explore Initiatives
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 