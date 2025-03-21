'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaFilter, FaSearch } from 'react-icons/fa';

export default function EventsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: 'all',
    month: 'all',
    eventType: 'all'
  });
  
  // Mock events data
  const events = [
    {
      id: 1,
      title: "Summer Harvest Festival",
      date: "July 15, 2023",
      time: "9:00 AM - 2:00 PM",
      location: "Central Market, Coimbatore",
      city: "Coimbatore",
      month: "July",
      type: "market",
      image: "https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      farmers: 12,
      attendees: 250,
      description: "Join us for a celebration of summer's bounty. Meet 12 local farmers and taste the freshest seasonal produce."
    },
    {
      id: 2,
      title: "Organic Farming Workshop",
      date: "July 22, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Green Earth Farm, Salem",
      city: "Salem",
      month: "July",
      type: "workshop",
      image: "https://images.unsplash.com/photo-1595508064774-5ff825885dc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      farmers: 5,
      attendees: 40,
      description: "Learn organic farming techniques directly from experienced farmers. Hands-on activities included."
    },
    {
      id: 3,
      title: "Mango Season Celebration",
      date: "July 29, 2023",
      time: "8:00 AM - 3:00 PM",
      location: "Paddy Organics, Thanjavur",
      city: "Thanjavur",
      month: "July",
      type: "market",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      farmers: 8,
      attendees: 180,
      description: "Celebrate the mango harvest with tastings of 15+ varieties, direct purchases from farmers, and cooking demonstrations."
    },
    {
      id: 4,
      title: "Farm-to-Table Dinner",
      date: "August 5, 2023",
      time: "6:00 PM - 9:00 PM",
      location: "Heritage Gardens, Chennai",
      city: "Chennai",
      month: "August",
      type: "dining",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      farmers: 6,
      attendees: 80,
      description: "An exclusive dinner featuring ingredients sourced from local farms within 30km. Meet the farmers who grew your food."
    },
    {
      id: 5,
      title: "Children's Farm Day",
      date: "August 12, 2023",
      time: "9:00 AM - 1:00 PM",
      location: "Happy Acres, Madurai",
      city: "Madurai",
      month: "August",
      type: "educational",
      image: "https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      farmers: 4,
      attendees: 120,
      description: "A family-friendly event where children can learn about farming, participate in planting activities, and meet farm animals."
    },
    {
      id: 6,
      title: "Weekly Farmers Market",
      date: "Every Saturday",
      time: "7:00 AM - 12:00 PM",
      location: "Community Center, Coimbatore",
      city: "Coimbatore",
      month: "Recurring",
      type: "market",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      farmers: 15,
      attendees: 300,
      description: "Our weekly farmers market featuring seasonal produce, homemade goods, and direct interaction with local farmers."
    }
  ];
  
  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = filters.city === 'all' || event.city === filters.city;
    const matchesMonth = filters.month === 'all' || event.month === filters.month;
    const matchesType = filters.eventType === 'all' || event.type === filters.eventType;
    
    return matchesSearch && matchesCity && matchesMonth && matchesType;
  });
  
  // Get unique cities, months, and event types for filter options
  const cities = [...new Set(events.map(event => event.city))];
  const months = [...new Set(events.map(event => event.month))];
  const eventTypes = [...new Set(events.map(event => event.type))];
  
  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };
  
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Harvest Day Events</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Connect with local farmers at our community events, from markets to workshops, and experience the freshest produce directly from the source.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Search events, locations, or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>
        
        {/* Filters and Event Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="lg:flex">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4 mb-8 lg:mb-0 lg:pr-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <FaFilter className="text-green-600 mr-2" />
                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                  </div>
                  
                  {/* City Filter */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">City</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                      value={filters.city}
                      onChange={(e) => handleFilterChange('city', e.target.value)}
                    >
                      <option value="all">All Cities</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Month Filter */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Month</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                      value={filters.month}
                      onChange={(e) => handleFilterChange('month', e.target.value)}
                    >
                      <option value="all">All Months</option>
                      {months.map((month, index) => (
                        <option key={index} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Event Type Filter */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Event Type</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                      value={filters.eventType}
                      onChange={(e) => handleFilterChange('eventType', e.target.value)}
                    >
                      <option value="all">All Types</option>
                      {eventTypes.map((type, index) => (
                        <option key={index} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Reset Filters */}
                  <button 
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={() => setFilters({ city: 'all', month: 'all', eventType: 'all' })}
                  >
                    Reset Filters
                  </button>
                </div>
                
                {/* Create Event CTA for Farmers */}
                <div className="mt-6 bg-green-50 rounded-lg shadow-md p-6 border border-green-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Are You a Farmer?</h3>
                  <p className="text-gray-700 mb-4">
                    List your own harvest day event and connect directly with consumers.
                  </p>
                  <Link 
                    href="/dashboard/farmer/events/create" 
                    className="block w-full px-4 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Create Event
                  </Link>
                </div>
              </div>
              
              {/* Event Listings */}
              <div className="lg:w-3/4">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
                  </h2>
                </div>
                
                {filteredEvents.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                      <FaCalendarAlt size={64} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Events Found</h3>
                    <p className="text-gray-700 mb-4">
                      Try adjusting your search or filters to find events.
                    </p>
                    <button 
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      onClick={() => {
                        setSearchTerm('');
                        setFilters({ city: 'all', month: 'all', eventType: 'all' });
                      }}
                    >
                      Show All Events
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredEvents.map(event => (
                      <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full capitalize">
                              {event.type}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                          
                          <div className="flex flex-col space-y-2 mb-4">
                            <div className="flex items-center text-gray-600">
                              <FaCalendarAlt className="mr-2 flex-shrink-0" />
                              <span>{event.date} • {event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FaUsers className="mr-2 flex-shrink-0" />
                              <span>{event.farmers} Farmers • {event.attendees} Attendees</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Link 
                              href={`/community/events/${event.id}`} 
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              View Details
                            </Link>
                            
                            <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                              RSVP
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Host Your Own Event CTA */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Looking for More Events?</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
              Our network of farmers hosts new events every week. Check back often or subscribe to our newsletter for updates.
            </p>
            <div className="max-w-md mx-auto flex">
              <input 
                type="email" 
                className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your email address"
              />
              <button className="px-6 py-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 