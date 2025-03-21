'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaSearch, FaFilter, FaRegHeart, FaHeart, FaRegClock } from 'react-icons/fa';
import PageWrapper from '../../components/PageWrapper';

export default function EventsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: 'all',
    month: 'all',
    type: 'all'
  });
  const [favorites, setFavorites] = useState([]);
  
  // Mock events data
  const events = [
    {
      id: 1,
      title: "Summer Harvest Festival",
      date: "July 15, 2023",
      time: "9:00 AM - 2:00 PM",
      location: "Central Market, Coimbatore",
      image: "https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "festival",
      description: "Join us for a celebration of summer crops with over 20 local farmers. Sample fresh produce, enjoy cooking demonstrations, and participate in family-friendly activities.",
      farmers: 22,
      activities: ["Farm-to-table tasting", "Live cooking demos", "Children's planting workshop", "Local music performances"],
      attendees: 250,
      isFree: true
    },
    {
      id: 2,
      title: "Organic Farming Workshop",
      date: "July 22, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Green Earth Farm, Salem",
      image: "https://images.unsplash.com/photo-1595508064774-5ff825885dc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "workshop",
      description: "Learn natural pest control techniques and soil health management in this hands-on workshop led by experienced organic farmers.",
      farmers: 5,
      activities: ["Hands-on composting", "Organic pest control demonstration", "Q&A with farmers"],
      attendees: 40,
      isFree: false,
      price: "₹200"
    },
    {
      id: 3,
      title: "Mango Season Celebration",
      date: "July 29, 2023",
      time: "8:00 AM - 3:00 PM",
      location: "Paddy Organics, Thanjavur",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "festival",
      description: "Experience the sweetness of the season with a mango-centric event featuring 15+ varieties of mangoes from local orchards.",
      farmers: 8,
      activities: ["Mango tasting", "Mango recipe contest", "Orchard tours", "Mango eating competition"],
      attendees: 180,
      isFree: true
    },
    {
      id: 4,
      title: "Seed Saving Workshop",
      date: "August 5, 2023",
      time: "9:00 AM - 11:00 AM",
      location: "Heritage Farms, Thanjavur",
      image: "https://images.unsplash.com/photo-1512584744979-9f9f8b43693f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "workshop",
      description: "Learn traditional seed saving techniques to preserve heirloom varieties. Each participant will take home seeds to start their own garden.",
      farmers: 3,
      activities: ["Seed collection demonstration", "Seed storage techniques", "Seed exchange", "Heritage seed stories"],
      attendees: 35,
      isFree: false,
      price: "₹150"
    },
    {
      id: 5,
      title: "Farm-to-Table Dinner",
      date: "August 12, 2023",
      time: "6:00 PM - 9:00 PM",
      location: "Sunrise Organics, Madurai",
      image: "https://images.unsplash.com/photo-1568685002001-1017b6b99e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "dining",
      description: "Enjoy a five-course meal prepared with ingredients harvested the same day from our farm. Meet the farmers who grew your food.",
      farmers: 4,
      activities: ["Guided farm tour", "Five-course meal", "Wine pairing", "Chef's cooking demonstration"],
      attendees: 60,
      isFree: false,
      price: "₹1500"
    },
    {
      id: 6,
      title: "Monsoon Planting Day",
      date: "August 19, 2023",
      time: "8:00 AM - 1:00 PM",
      location: "Community Garden, Coimbatore",
      image: "https://images.unsplash.com/photo-1574276597656-11986751071d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "community",
      description: "Help us plant the community garden for the monsoon season. All ages welcome - come learn how to grow your own food!",
      farmers: 6,
      activities: ["Planting workshop", "Soil preparation", "Companion planting guide", "Free seedlings"],
      attendees: 100,
      isFree: true
    },
  ];
  
  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = filters.location === 'all' || event.location.includes(filters.location);
    
    const eventMonth = new Date(event.date).toLocaleString('en-US', { month: 'long' });
    const matchesMonth = filters.month === 'all' || eventMonth.toLowerCase() === filters.month.toLowerCase();
    
    const matchesType = filters.type === 'all' || event.type === filters.type;
    
    return matchesSearch && matchesLocation && matchesMonth && matchesType;
  });
  
  // Get unique locations, months and event types for filter options
  const locations = [...new Set(events.map(event => event.location.split(',')[1].trim()))];
  const months = [...new Set(events.map(event => new Date(event.date).toLocaleString('en-US', { month: 'long' })))];
  const eventTypes = [...new Set(events.map(event => event.type))];
  
  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };
  
  const toggleFavorite = (eventId) => {
    if (favorites.includes(eventId)) {
      setFavorites(favorites.filter(id => id !== eventId));
    } else {
      setFavorites([...favorites, eventId]);
    }
  };
  
  return (
    <>
      <Header />
      <PageWrapper transitionType="slideRight">
        <main className="bg-gray-50 min-h-screen">
          {/* Hero Section */}
          <section className="relative bg-orange-500 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Harvest Day Events</h1>
              <p className="text-xl max-w-2xl mx-auto mb-8">
                Connect with local farmers, learn sustainable practices, and celebrate seasonal harvests at community events across Tamil Nadu.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-orange-600 focus:outline-none"
                  placeholder="Search events by name, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </section>
          
          {/* Events Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="lg:flex">
                {/* Filters Sidebar */}
                <div className="lg:w-1/4 mb-8 lg:mb-0 lg:pr-8">
                  <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                      <FaFilter className="text-gray-500" />
                    </div>
                    
                    {/* Location Filter */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">Location</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                      >
                        <option value="all">All Locations</option>
                        {locations.map((location, index) => (
                          <option key={index} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Month Filter */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">Month</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
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
                      onClick={() => setFilters({ location: 'all', month: 'all', type: 'all' })}
                    >
                      Reset Filters
                    </button>
                  </div>
                  
                  {/* Farmer CTA */}
                  <div className="mt-6 bg-orange-50 rounded-lg shadow-md p-6 border border-orange-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Are You a Farmer?</h3>
                    <p className="text-gray-700 mb-4">
                      Host your own harvest event or workshop to connect with consumers and share your farming practices.
                    </p>
                    <Link 
                      href="/dashboard/farmer/events/create" 
                      className="block w-full px-4 py-2 bg-orange-600 text-white text-center rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Host an Event
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
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        onClick={() => {
                          setSearchTerm('');
                          setFilters({ location: 'all', month: 'all', type: 'all' });
                        }}
                      >
                        Show All Events
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredEvents.map(event => (
                        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <button 
                              onClick={() => toggleFavorite(event.id)}
                              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-colors hover:bg-gray-100"
                              aria-label={favorites.includes(event.id) ? "Remove from favorites" : "Add to favorites"}
                            >
                              {favorites.includes(event.id) ? (
                                <FaHeart className="text-red-500" />
                              ) : (
                                <FaRegHeart className="text-gray-400" />
                              )}
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                              <div className="text-white font-medium text-sm">
                                {event.isFree ? (
                                  <span className="bg-green-600 px-2 py-1 rounded-full">Free</span>
                                ) : (
                                  <span className="bg-blue-600 px-2 py-1 rounded-full">{event.price}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                            </div>
                            
                            <div className="flex items-center text-gray-600 mb-2">
                              <FaCalendarAlt className="mr-2 flex-shrink-0" />
                              <span>{event.date}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 mb-2">
                              <FaRegClock className="mr-2 flex-shrink-0" />
                              <span>{event.time}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 mb-3">
                              <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                            
                            <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>
                            
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Activities:</h4>
                              <div className="flex flex-wrap gap-2">
                                {event.activities.slice(0, 3).map((activity, index) => (
                                  <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                                    {activity}
                                  </span>
                                ))}
                                {event.activities.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                    +{event.activities.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center text-gray-600 mb-4">
                              <FaUsers className="mr-2 flex-shrink-0" />
                              <span>{event.farmers} Farmers • {event.attendees} Expected Attendees</span>
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              <Link 
                                href={`/community/events/${event.id}`} 
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                              >
                                RSVP & Details
                              </Link>
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
          
          {/* How It Works Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Harvest Events Work</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaCalendarAlt className="text-orange-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Find an Event</h3>
                  <p className="text-gray-600">Browse upcoming harvest celebrations, workshops, and farm events happening near you.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaRegHeart className="text-orange-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">RSVP to Attend</h3>
                  <p className="text-gray-600">Reserve your spot for free or paid events to connect with farmers and celebrate local food.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-orange-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Participate & Learn</h3>
                  <p className="text-gray-600">Join in activities, learn new skills, taste fresh produce, and build relationships with local farmers.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 bg-orange-500 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Next Harvest Day</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8">
                Experience the joy of seasonal harvests, learn sustainable farming practices, and connect with the people who grow your food.
              </p>
              <Link 
                href="#" 
                className="px-8 py-3 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium inline-block"
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              >
                Find Upcoming Events
              </Link>
            </div>
          </section>
        </main>
      </PageWrapper>
      <Footer />
    </>
  );
} 