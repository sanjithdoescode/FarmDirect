'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';
import { FaSeedling, FaMapMarkerAlt, FaTree, FaSearch, FaRegHeart, FaHeart, FaCamera, FaCalendarAlt } from 'react-icons/fa';

export default function CropAdoptionPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    cropType: 'all',
    location: 'all',
    price: 'all'
  });
  const [favorites, setFavorites] = useState([]);
  
  // Mock adoptable crops data
  const adoptableCrops = [
    {
      id: 1,
      name: "Alphonso Mango Tree",
      farmer: "Ravi Patel",
      farm: "Sunshine Orchards",
      location: "Ratnagiri",
      price: 1500,
      currency: "₹",
      duration: "6 months",
      cropType: "fruit",
      image: "https://www.agrifarming.in/wp-content/uploads/How-to-Grow-Miyazaki-Mango1-768x768.jpg",
      description: "Adopt this 5-year-old Alphonso mango tree and receive its delicious fruits directly from our farm to your doorstep during the harvest season.",
      benefits: [
        "Monthly progress photos & updates",
        "Certificate of adoption",
        "3kg of premium Alphonso mangoes",
        "Farm visit opportunity",
        "Name plate on your tree"
      ],
      nextUpdate: "July 15, 2023"
    },
    {
      id: 2,
      name: "Organic Tomato Plot",
      farmer: "Anjali Krishnan",
      farm: "Green Thumb Farms",
      location: "Coimbatore",
      price: 750,
      currency: "₹",
      duration: "3 months",
      cropType: "vegetable",
      image: "https://images.unsplash.com/photo-1594975620064-bad38e1c9e30?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Adopt a 50 sq ft plot of organic cherry tomatoes. Perfect for those who love fresh tomatoes and want to support sustainable farming practices.",
      benefits: [
        "Weekly harvest updates with photos",
        "5kg of organic tomatoes over the season",
        "Invitation to participate in harvest",
        "Tomato preservation recipe book",
        "Certificate of adoption"
      ],
      nextUpdate: "July 10, 2023"
    },
    {
      id: 3,
      name: "Coffee Plant Cluster",
      farmer: "Joseph Thomas",
      farm: "Highland Coffee Estate",
      location: "Kodaikanal",
      price: 2500,
      currency: "₹",
      duration: "12 months",
      cropType: "beverage",
      image: "https://images.unsplash.com/photo-1611330556082-0ba06d2780d0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Adopt a cluster of Arabica coffee plants and follow their journey from flower to cup. Receive your own batch of freshly roasted coffee from your adopted plants.",
      benefits: [
        "Quarterly photo updates",
        "500g of premium single-origin coffee beans",
        "Coffee processing tour",
        "Certificate with GPS coordinates of your plants",
        "Custom roast profile options"
      ],
      nextUpdate: "August 5, 2023"
    },
    {
      id: 4,
      name: "Organic Rice Paddy",
      farmer: "Lakshmi Velan",
      farm: "Heritage Farms",
      location: "Thanjavur",
      price: 1200,
      currency: "₹",
      duration: "4 months",
      cropType: "grain",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Adopt a traditional paddy field where we grow heritage rice varieties using time-honored organic methods. Support biodiversity while receiving premium rice.",
      benefits: [
        "Monthly growth updates",
        "5kg of traditional organic rice",
        "Participate in traditional planting or harvest rituals",
        "Certificate of adoption",
        "Recipe book for heritage rice dishes"
      ],
      nextUpdate: "July 20, 2023"
    },
    {
      id: 5,
      name: "Coconut Palm",
      farmer: "Suresh Kumar",
      farm: "Coastal Grove",
      location: "Kanyakumari",
      price: 2000,
      currency: "₹",
      duration: "12 months",
      cropType: "fruit",
      image: "https://images.unsplash.com/photo-1610020909765-c3d3ffe88f45?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Adopt a mature coconut palm and receive fresh coconuts, coconut oil, and other products derived from your tree throughout the year.",
      benefits: [
        "Bi-monthly updates",
        "12 fresh coconuts throughout the year",
        "500ml of virgin coconut oil",
        "Coconut crafts made from your tree",
        "Name plate on your palm"
      ],
      nextUpdate: "July 12, 2023"
    },
    {
      id: 6,
      name: "Cardamom Plantation Plot",
      farmer: "Maya Chandran",
      farm: "Spice Gardens",
      location: "Munnar",
      price: 1800,
      currency: "₹",
      duration: "8 months",
      cropType: "spice",
      image: "https://images.unsplash.com/photo-1683525869484-4575d47a5f37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Adopt a plot in our cardamom plantation and receive premium grade cardamom directly from your adopted plants. Experience the journey of this prized spice.",
      benefits: [
        "Monthly growth and harvest updates",
        "250g of premium green cardamom",
        "Spice farm tour",
        "Certificate of adoption",
        "Exclusive cardamom-based recipe collection"
      ],
      nextUpdate: "August 2, 2023"
    },
  ];
  
  // Filter crops based on search and filters
  const filteredCrops = adoptableCrops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          crop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          crop.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          crop.farm.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCropType = filters.cropType === 'all' || crop.cropType === filters.cropType;
    const matchesLocation = filters.location === 'all' || crop.location === filters.location;
    
    let matchesPrice = true;
    if (filters.price === 'under1000') {
      matchesPrice = crop.price < 1000;
    } else if (filters.price === '1000to2000') {
      matchesPrice = crop.price >= 1000 && crop.price <= 2000;
    } else if (filters.price === 'over2000') {
      matchesPrice = crop.price > 2000;
    }
    
    return matchesSearch && matchesCropType && matchesLocation && matchesPrice;
  });
  
  // Get unique crop types and locations for filter options
  const cropTypes = [...new Set(adoptableCrops.map(crop => crop.cropType))];
  const locations = [...new Set(adoptableCrops.map(crop => crop.location))];
  
  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };
  
  const toggleFavorite = (cropId) => {
    if (favorites.includes(cropId)) {
      setFavorites(favorites.filter(id => id !== cropId));
    } else {
      setFavorites([...favorites, cropId]);
    }
  };
  
  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-amber-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Crop Adoption Program</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Forge a personal connection with your food by adopting a plant, tree, or plot. Receive exclusive produce and updates directly from your farmer.
            </p>
            
            {/* Search bar */}
            <div className="max-w-xl mx-auto relative">
              <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-md">
                <div className="p-4 text-amber-500">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search by crop name, farmer, or farm..."
                  className="w-full p-4 text-gray-700 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Crop Adoption Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <FaSeedling className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Choose a Crop</h3>
                <p className="text-gray-600">Browse available plants, trees, or plots and select one that matches your preferences.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <FaHeart className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Adopt</h3>
                <p className="text-gray-600">Complete your adoption with a one-time payment that supports the farmer throughout the growing season.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <FaCamera className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Follow Along</h3>
                <p className="text-gray-600">Receive regular updates, photos, and stories about your crop's progress throughout the growing season.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <FaTree className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">4. Enjoy the Harvest</h3>
                <p className="text-gray-600">Receive fresh produce from your adopted crop, delivered directly to your doorstep when ready.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Available Crops Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="lg:flex">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4 mb-8 lg:mb-0 lg:pr-8">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 max-h-screen overflow-auto">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Filter Crops</h2>
                  
                  {/* Crop Type Filter */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Crop Type</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      value={filters.cropType}
                      onChange={(e) => handleFilterChange('cropType', e.target.value)}
                    >
                      <option value="all">All Types</option>
                      {cropTypes.map((type, index) => (
                        <option key={index} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Location Filter */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Location</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                    >
                      <option value="all">All Locations</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Price Range</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      value={filters.price}
                      onChange={(e) => handleFilterChange('price', e.target.value)}
                    >
                      <option value="all">All Prices</option>
                      <option value="under1000">Under ₹1,000</option>
                      <option value="1000to2000">₹1,000 - ₹2,000</option>
                      <option value="over2000">Over ₹2,000</option>
                    </select>
                  </div>
                  
                  {/* Reset Filters */}
                  <button 
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={() => setFilters({ cropType: 'all', location: 'all', price: 'all' })}
                  >
                    Reset Filters
                  </button>
                </div>
                
                {/* Farmer CTA */}
                <div className="mt-6 bg-amber-50 rounded-lg shadow-md p-6 border border-amber-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Are You a Farmer?</h3>
                  <p className="text-gray-700 mb-4">
                    List your crops for adoption and connect directly with consumers who care about where their food comes from.
                  </p>
                  <Link 
                    href="/dashboard/farmer/adoptions/create" 
                    className="block w-full px-4 py-2 bg-amber-600 text-white text-center rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    List Your Crops
                  </Link>
                </div>
              </div>
              
              {/* Crop Listings */}
              <div className="lg:w-3/4">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredCrops.length} {filteredCrops.length === 1 ? 'Crop' : 'Crops'} Available for Adoption
                  </h2>
                </div>
                
                {filteredCrops.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                      <FaSeedling size={64} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Crops Found</h3>
                    <p className="text-gray-700 mb-4">
                      Try adjusting your search or filters to find crops for adoption.
                    </p>
                    <button 
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                      onClick={() => {
                        setSearchTerm('');
                        setFilters({ cropType: 'all', location: 'all', price: 'all' });
                      }}
                    >
                      Show All Crops
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCrops.map(crop => (
                      <div key={crop.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={crop.image} 
                            alt={crop.name} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <button 
                            onClick={() => toggleFavorite(crop.id)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-colors hover:bg-gray-100"
                            aria-label={favorites.includes(crop.id) ? "Remove from favorites" : "Add to favorites"}
                          >
                            {favorites.includes(crop.id) ? (
                              <FaHeart className="text-red-500" />
                            ) : (
                              <FaRegHeart className="text-gray-400" />
                            )}
                          </button>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{crop.name}</h3>
                            <span className="font-bold text-amber-600">{crop.currency}{crop.price}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600 mb-3">
                            <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                            <span>{crop.farm}, {crop.location}</span>
                          </div>
                          
                          <p className="text-gray-700 mb-4 line-clamp-2">{crop.description}</p>
                          
                          <div className="flex items-center text-gray-600 mb-4">
                            <FaCalendarAlt className="mr-2 flex-shrink-0" />
                            <span>Duration: {crop.duration}</span>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">What You'll Get:</h4>
                            <ul className="text-sm text-gray-700">
                              {crop.benefits.slice(0, 3).map((benefit, index) => (
                                <li key={index} className="mb-1 flex items-start">
                                  <span className="text-amber-500 mr-2">•</span>
                                  {benefit}
                                </li>
                              ))}
                              {crop.benefits.length > 3 && (
                                <li className="text-amber-600 font-medium">+ {crop.benefits.length - 3} more benefits</li>
                              )}
                            </ul>
                          </div>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Next update:</span> {crop.nextUpdate}
                            </div>
                            
                            <Link 
                              href={`/community/adopt/${crop.id}`} 
                              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                            >
                              Adopt Now
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
        
        {/* Testimonials Section */}
        <section className="py-16 bg-amber-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Adopters Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <p className="text-gray-600 text-sm">Adopted a Mango Tree</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Adopting a mango tree has been such a joy. I receive regular updates with photos of my tree, and when the mangoes were ready, they were delivered right to my door. The sweetest mangoes I've ever tasted!"
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Arjun Mehta</h3>
                    <p className="text-gray-600 text-sm">Adopted Coffee Plants</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a coffee lover, adopting coffee plants was a no-brainer. I visited my plants during harvest season and even participated in the picking. The coffee I received was incredible - knowing it came from my own plants made it taste even better."
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Neha Reddy</h3>
                    <p className="text-gray-600 text-sm">Adopted a Rice Paddy</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "My family adopted a rice paddy and it's been a wonderful educational experience for my children. We visited during planting and harvest, and the traditional rice we received is exceptional. We're adopting again next season!"
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">What happens if my crop fails or is damaged?</h3>
                <p className="text-gray-700">
                  We understand that farming involves natural risks. If your adopted crop is severely damaged or fails due to natural causes, the farmer will either offer you a partial refund or transfer your adoption to another available crop.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Can I visit my adopted crop?</h3>
                <p className="text-gray-700">
                  Yes! Most farmers welcome visits from adopters by appointment. Some even organize special harvest days where you can participate in harvesting your crop. Visit details are specified in each listing.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How is the produce delivered?</h3>
                <p className="text-gray-700">
                  Delivery methods vary by farmer and location. Most farmers offer delivery within a certain radius, while others may have pickup points. Shipping options and any additional delivery costs are noted in each crop listing.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Can I renew my adoption?</h3>
                <p className="text-gray-700">
                  Absolutely! Most farmers offer renewal options at a discounted rate for returning adopters. You'll receive a notification when your adoption period is nearing its end with renewal options.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-amber-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Adopt Your Own Crop?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Build a meaningful connection with your food and the farmer who grows it. Adopt a crop today and taste the difference.
            </p>
            <Link 
              href="#" 
              className="px-8 py-3 bg-white text-amber-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium inline-block"
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
              Browse Available Crops
            </Link>
          </div>
        </section>
      </main>
    </>
  );
} 