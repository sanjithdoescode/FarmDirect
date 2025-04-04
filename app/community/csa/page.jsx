'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';
import { FaHandshake, FaMapMarkerAlt, FaCalendarAlt, FaBox, FaShoppingBasket, FaLeaf, FaRupeeSign, FaCheck, FaArrowRight } from 'react-icons/fa';

export default function CSAPage() {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    location: 'all',
    duration: 'all',
    price: 'all'
  });
  
  // Mock CSA programs data
  const csaPrograms = [
    {
      id: 1,
      title: "Seasonal Vegetable Share",
      farm: "Heritage Farms",
      farmer: "Saranya",
      location: "Thanjavur",
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A diverse weekly box of our finest seasonal vegetables, grown using traditional organic methods.",
      price: 6000,
      duration: "3 months",
      frequency: "Weekly",
      deliveryMethod: "Pickup or Home Delivery",
      shareSize: "Feeds 2-3 people",
      startDate: "August 15, 2023",
      itemsIncluded: [
        "6-8 seasonal vegetables weekly",
        "Seasonal fruits when available",
        "Herbs and greens from our garden",
        "Weekly newsletter with recipes"
      ],
      badges: ["Organic", "Traditional Seeds"]
    },
    {
      id: 2,
      title: "Premium Fruit Subscription",
      farm: "Sunshine Orchards",
      farmer: "Muthuramalingam",
      location: "Ratnagiri",
      image: "https://plus.unsplash.com/premium_photo-1689596510917-d337f077d559",
      description: "Enjoy a curated selection of seasonal fruits from our orchard, harvested at peak ripeness for maximum flavor.",
      price: 8000,
      duration: "6 months",
      frequency: "Bi-weekly",
      deliveryMethod: "Home Delivery Only",
      shareSize: "Feeds 3-4 people",
      startDate: "July 20, 2023",
      itemsIncluded: [
        "4-5 varieties of seasonal fruits",
        "Monthly special exotic fruit",
        "Fruit preserves once a month",
        "Exclusive orchard tour invitation"
      ],
      badges: ["No Pesticides", "Carbon Neutral"]
    },
    {
      id: 3,
      title: "Mixed Farm Share",
      farm: "Green Thumb Farms",
      farmer: "Sasikala",
      location: "Coimbatore",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A comprehensive farm share with vegetables, fruits, herbs, and occasional value-added products from our cooperative.",
      price: 10000,
      duration: "6 months",
      frequency: "Weekly",
      deliveryMethod: "Pickup or Home Delivery",
      shareSize: "Feeds 4-5 people",
      startDate: "August 1, 2023",
      itemsIncluded: [
        "8-10 seasonal vegetables weekly",
        "2-3 fruit varieties weekly",
        "Fresh herbs and edible flowers",
        "Homemade products (jams, pickles) monthly",
        "Special access to farm workshops"
      ],
      badges: ["Organic", "Family Farm"]
    },
    {
      id: 4,
      title: "Rice & Grains Share",
      farm: "Paddy Organics",
      farmer: "Ragul",
      location: "Thanjavur",
      image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A monthly supply of heritage rice varieties and traditional grains grown using ancient farming practices.",
      price: 7500,
      duration: "6 months",
      frequency: "Monthly",
      deliveryMethod: "Pickup or Home Delivery",
      shareSize: "5kg monthly package",
      startDate: "September 1, 2023",
      itemsIncluded: [
        "3kg of rotating heritage rice varieties",
        "1kg of millets and other traditional grains",
        "500g of lentils or pulses",
        "500g special grain (popped rice, rice flour)",
        "Traditional recipe cards"
      ],
      badges: ["Heirloom Varieties", "Water Conserving"]
    },
    {
      id: 5,
      title: "Small Family Vegetable Share",
      farm: "Family First Farms",
      farmer: "Senthil Kumar",
      location: "Salem",
      image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A perfectly sized vegetable share for small families or couples, with flexible delivery options.",
      price: 4500,
      duration: "3 months",
      frequency: "Weekly",
      deliveryMethod: "Pickup or Home Delivery",
      shareSize: "Feeds 1-2 people",
      startDate: "August 1, 2023",
      itemsIncluded: [
        "4-6 seasonal vegetables weekly",
        "Salad greens every week",
        "Occasional fruits in season",
        "Weekly newsletter with storage tips"
      ],
      badges: ["Small Batch", "Beginner Friendly"]
    },
    {
      id: 6,
      title: "Artisanal Farm Products",
      farm: "Heritage Homestead",
      farmer: "Velammal",
      location: "Madurai",
      image: "https://images.unsplash.com/photo-1640348784724-93f7b14d8047",
      description: "A monthly box of handcrafted farm products including preserves, pickles, oils, and specialty items.",
      price: 9000,
      duration: "6 months",
      frequency: "Monthly",
      deliveryMethod: "Home Delivery Only",
      shareSize: "Assortment of 6-8 products",
      startDate: "July 30, 2023",
      itemsIncluded: [
        "2-3 preserves or jams",
        "1-2 specialty pickles",
        "Cold-pressed oils or ghee",
        "Seasonal specialty product",
        "Herb or spice blend"
      ],
      badges: ["Artisanal", "Traditional Recipes"]
    }
  ];
  
  // Filter CSA programs based on filters
  const filteredPrograms = csaPrograms.filter(program => {
    const matchesLocation = filters.location === 'all' || program.location === filters.location;
    
    let matchesDuration = true;
    if (filters.duration === '3months') {
      matchesDuration = program.duration === "3 months";
    } else if (filters.duration === '6months') {
      matchesDuration = program.duration === "6 months";
    }
    
    let matchesPrice = true;
    if (filters.price === 'under5000') {
      matchesPrice = program.price < 5000;
    } else if (filters.price === '5000to8000') {
      matchesPrice = program.price >= 5000 && program.price <= 8000;
    } else if (filters.price === 'over8000') {
      matchesPrice = program.price > 8000;
    }
    
    return matchesLocation && matchesDuration && matchesPrice;
  });
  
  // Get unique locations for filter options
  const locations = [...new Set(csaPrograms.map(program => program.location))];
  
  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };
  
  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Community Supported Agriculture</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Support local farmers by investing in a share of their harvest. Receive regular deliveries of fresh, seasonal produce and build a relationship with the people who grow your food.
            </p>
            <Link 
              href="#programs" 
              className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
            >
              View Available Shares
            </Link>
          </div>
          
          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform">
            <svg className="relative block w-full h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f9fafb"></path>
            </svg>
          </div>
        </section>
        
        {/* What is CSA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What is Community Supported Agriculture?</h2>
              <p className="text-lg text-gray-700 mb-6">
                Community Supported Agriculture (CSA) is a partnership between farmers and consumers. Members pay upfront for a share of the anticipated harvest, providing farmers with early working capital and sharing in both the risks and rewards of food production.
              </p>
              <p className="text-lg text-gray-700 mb-10">
                By participating in a CSA, you're not just buying food; you're supporting sustainable agriculture, preserving farmland, and building a more resilient local food system while receiving the freshest seasonal produce available.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaHandshake className="text-purple-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Relationship</h3>
                  <p className="text-gray-600">Connect directly with the farmers who grow your food, putting a face to your food source.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaShoppingBasket className="text-purple-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Regular Deliveries</h3>
                  <p className="text-gray-600">Receive regular boxes of the freshest seasonal produce throughout the growing season.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaLeaf className="text-purple-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainable Farming</h3>
                  <p className="text-gray-600">Support farming practices that prioritize soil health, biodiversity, and environmental stewardship.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How CSA Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="relative">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Choose a Share</h3>
                <p className="text-center text-gray-600">Browse available CSA programs and select one that matches your needs.</p>
                
                {/* Arrow - visible only on desktop */}
                <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                  <FaArrowRight className="text-purple-300 text-4xl" />
                </div>
              </div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Pay Upfront</h3>
                <p className="text-center text-gray-600">Make your investment, providing farmers with capital when they need it most.</p>
                
                {/* Arrow - visible only on desktop */}
                <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                  <FaArrowRight className="text-purple-300 text-4xl" />
                </div>
              </div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Receive Deliveries</h3>
                <p className="text-center text-gray-600">Get regular boxes of fresh produce throughout the season.</p>
                
                {/* Arrow - visible only on desktop */}
                <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                  <FaArrowRight className="text-purple-300 text-4xl" />
                </div>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">4</div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Enjoy & Connect</h3>
                <p className="text-center text-gray-600">Enjoy fresh food and strengthen your connection to local agriculture.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CSA Programs Section */}
        <section id="programs" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Available CSA Programs</h2>
            
            <div className="lg:flex">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4 mb-8 lg:mb-0 lg:pr-8">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Filter Programs</h3>
                  
                  {/* Location Filter */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Location</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                    >
                      <option value="all">All Locations</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Duration Filter */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Duration</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      value={filters.duration}
                      onChange={(e) => handleFilterChange('duration', e.target.value)}
                    >
                      <option value="all">All Durations</option>
                      <option value="3months">3 Months</option>
                      <option value="6months">6 Months</option>
                    </select>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Price Range</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      value={filters.price}
                      onChange={(e) => handleFilterChange('price', e.target.value)}
                    >
                      <option value="all">All Prices</option>
                      <option value="under5000">Under ₹5,000</option>
                      <option value="5000to8000">₹5,000 - ₹8,000</option>
                      <option value="over8000">Over ₹8,000</option>
                    </select>
                  </div>
                  
                  {/* Reset Filters */}
                  <button 
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={() => setFilters({ location: 'all', duration: 'all', price: 'all' })}
                  >
                    Reset Filters
                  </button>
                </div>
                
                {/* Farmer CTA */}
                <div className="mt-6 bg-purple-50 rounded-lg shadow-md p-6 border border-purple-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Are You a Farmer?</h3>
                  <p className="text-gray-700 mb-4">
                    Start your own CSA program and build a community of supporters for your farm.
                  </p>
                  <Link 
                    href="/dashboard/farmer/csa/create" 
                    className="block w-full px-4 py-2 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Create a CSA Program
                  </Link>
                </div>
              </div>
              
              {/* CSA Program Listings */}
              <div className="lg:w-3/4">
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {filteredPrograms.length} {filteredPrograms.length === 1 ? 'Program' : 'Programs'} Available
                  </h3>
                </div>
                
                {filteredPrograms.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                      <FaBox size={64} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No CSA Programs Found</h3>
                    <p className="text-gray-700 mb-4">
                      Try adjusting your filters to find CSA programs.
                    </p>
                    <button 
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      onClick={() => setFilters({ location: 'all', duration: 'all', price: 'all' })}
                    >
                      Show All Programs
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredPrograms.map(program => (
                      <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            <img 
                              src={program.image} 
                              alt={program.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="md:w-2/3 p-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {program.badges.map((badge, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h3>
                            
                            <div className="flex items-center text-gray-600 mb-3">
                              <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                              <span>{program.farm}, {program.location}</span>
                            </div>
                            
                            <p className="text-gray-700 mb-4">{program.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                              <div className="flex items-center text-gray-600">
                                <FaRupeeSign className="mr-2 flex-shrink-0" />
                                <span>₹{program.price.toLocaleString()} for {program.duration}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <FaCalendarAlt className="mr-2 flex-shrink-0" />
                                <span>Starts: {program.startDate}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <FaBox className="mr-2 flex-shrink-0" />
                                <span>{program.frequency} deliveries</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <FaShoppingBasket className="mr-2 flex-shrink-0" />
                                <span>{program.shareSize}</span>
                              </div>
                            </div>
                            
                            <div className="border-t border-gray-100 pt-4 mt-4">
                              <h4 className="font-bold text-gray-900 mb-2">What's Included:</h4>
                              <ul className="mb-4">
                                {program.itemsIncluded.map((item, index) => (
                                  <li key={index} className="flex items-start mb-1 text-gray-700">
                                    <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-gray-100">
                              <div className="text-sm text-gray-600 mb-2 md:mb-0">
                                <span className="font-medium">By {program.farmer}</span>
                              </div>
                              <div className="flex gap-3">
                                <Link 
                                  href={`/community/csa/${program.id}`} 
                                  className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                                >
                                  Learn More
                                </Link>
                                <Link 
                                  href={`/community/csa/${program.id}/subscribe`} 
                                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                  Subscribe Now
                                </Link>
                              </div>
                            </div>
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
        
        {/* Testimonials Section */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Members Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Senthil Kumar</h3>
                    <p className="text-gray-600 text-sm">CSA Member for 2 years</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Being part of the Heritage Farms CSA has transformed how our family eats. The quality and freshness of the produce is remarkable, and we love the connection we've built with Lakshmi and her team."
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Saranya</h3>
                    <p className="text-gray-600 text-sm">First-time CSA Subscriber</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "I was hesitant to join a CSA at first, but it's been an amazing journey. I've discovered so many new vegetables and recipes, and I love knowing exactly where my food comes from and who grows it."
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
                    <h3 className="font-bold text-gray-900">Muthuramalingam</h3>
                    <p className="text-gray-600 text-sm">CSA Farmer</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Starting a CSA program has transformed our farm's financial stability. Having guaranteed income at the start of the season allows us to focus on growing the best food possible for our community members."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What happens if I can't pick up my share one week?</h3>
                <p className="text-gray-700">
                  Most CSA programs offer flexible options if you need to miss a pickup. You can often arrange for a friend to pick up your share, donate it to a food bank, or work with the farmer for an alternative arrangement. Each program has its own policy, so check the details before subscribing.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What if there's a crop failure?</h3>
                <p className="text-gray-700">
                  When you join a CSA, you're sharing both the bounty and risks of farming. If one crop fails, your farmer will typically substitute with other available produce. In cases of catastrophic crop loss, policies vary by farm, but many offer partial refunds or extend the season if possible.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Can I choose what's in my box?</h3>
                <p className="text-gray-700">
                  Traditional CSA shares include whatever is harvested that week, but many farms now offer customization options. Some have "market-style" pickups where you select items within categories, while others offer add-ons or substitutions. Each program is different, so check the details.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do payment plans work?</h3>
                <p className="text-gray-700">
                  While the traditional CSA model involves paying the full amount upfront, many farms now offer flexible payment options such as monthly installments or deposit-based systems. Some also accept government nutrition assistance programs. Reach out to individual farmers to discuss payment options.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join a CSA?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Invest in your health, local farmers, and a more resilient food system. Subscribe to a CSA share today and taste the difference.
            </p>
            <Link 
              href="#programs" 
              className="px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium inline-block"
              onClick={() => window.scrollTo({top: document.getElementById('programs').offsetTop - 100, behavior: 'smooth'})}
            >
              Browse CSA Programs
            </Link>
          </div>
        </section>
      </main>
    </>
  );
} 