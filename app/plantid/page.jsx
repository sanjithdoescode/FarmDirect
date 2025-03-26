'use client';

import { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FaCamera, FaLeaf, FaUpload, FaSeedling, FaSpinner, FaInfoCircle, FaTimesCircle, FaCheckCircle, FaUser, FaMapMarkerAlt, FaStar, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

export default function PlantIdentificationPage() {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [farmerResults, setFarmerResults] = useState([]);
  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  
  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Reset states
    setError('');
    setResult(null);
    setFarmerResults([]);
    
    // File type validation
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Reset states
      setError('');
      setResult(null);
      setFarmerResults([]);
      
      // File type validation
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };
  
  // Analyze the image with Gemini API
  const analyzeImage = async () => {
    if (!image) {
      setError('Please upload an image first');
      return;
    }
    
    setIsAnalyzing(true);
    setError('');
    
    try {
      // In a real implementation, this would be an API call to your backend
      // which would then call the Gemini API with the image
      // For now, we'll simulate the response after a delay
      
      setTimeout(() => {
        // Mock result - in a real implementation this would come from Gemini API
        const mockResult = {
          plantName: 'Tomato (Solanum lycopersicum)',
          confidence: 0.94,
          category: 'Vegetable/Fruit',
          description: 'The tomato is the edible berry of the plant Solanum lycopersicum. Tomatoes are a significant source of umami flavor and are a widely grown crop, with thousands of cultivars.',
          nutritionalBenefits: [
            'Rich in vitamin C',
            'Good source of potassium',
            'Contains antioxidant lycopene',
            'Low in calories'
          ],
          growingRegions: ['Southern India', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh'],
          seasonality: 'Year-round with peak in summer',
          cookingUses: 'Used in curries, salads, chutneys, and many other dishes.'
        };
        
        setResult(mockResult);
        
        // Mock farmers who grow this crop
        const mockFarmers = [
          {
            id: 1,
            name: 'Annamalai Farms',
            farmer: 'Rajesh Annamalai',
            location: 'Coimbatore, Tamil Nadu',
            distance: '12 km',
            rating: 4.8,
            reviews: 124,
            organic: true,
            price: '₹60/kg',
            image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            varieties: ['Cherry Tomato', 'Beefsteak Tomato', 'Roma Tomato']
          },
          {
            id: 2,
            name: 'Green Harvest Collective',
            farmer: 'Priya Venkatesh',
            location: 'Madurai, Tamil Nadu',
            distance: '18 km',
            rating: 4.6,
            reviews: 89,
            organic: true,
            price: '₹55/kg',
            image: 'https://images.unsplash.com/photo-1592878850834-7f7fb6e5f393?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            varieties: ['Heirloom Tomato', 'Roma Tomato']
          },
          {
            id: 3,
            name: 'Nallur Family Farm',
            farmer: 'Karthik Nallur',
            location: 'Salem, Tamil Nadu',
            distance: '25 km',
            rating: 4.5,
            reviews: 67,
            organic: false,
            price: '₹52/kg',
            image: 'https://images.unsplash.com/photo-1561504935-4e5d607da631?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            varieties: ['Beefsteak Tomato', 'Cherry Tomato']
          }
        ];
        
        setFarmerResults(mockFarmers);
        setIsAnalyzing(false);
      }, 3000); // Simulate 3 second delay for API call
      
    } catch (err) {
      console.error(err);
      setError('Failed to analyze image. Please try again.');
      setIsAnalyzing(false);
    }
  };
  
  // Search by text
  const searchPlants = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchError('Please enter a search term');
      return;
    }
    
    setIsSearching(true);
    setSearchError('');
    setResult(null);
    setFarmerResults([]);
    setError('');
    
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        // Different mock data based on search query
        let mockResult;
        
        if (searchQuery.toLowerCase().includes('tom')) {
          mockResult = {
            plantName: 'Tomato (Solanum lycopersicum)',
            confidence: 0.98,
            category: 'Vegetable/Fruit',
            description: 'The tomato is the edible berry of the plant Solanum lycopersicum. Tomatoes are a significant source of umami flavor and are a widely grown crop, with thousands of cultivars.',
            nutritionalBenefits: [
              'Rich in vitamin C',
              'Good source of potassium',
              'Contains antioxidant lycopene',
              'Low in calories'
            ],
            growingRegions: ['Southern India', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh'],
            seasonality: 'Year-round with peak in summer',
            cookingUses: 'Used in curries, salads, chutneys, and many other dishes.'
          };
        } else if (searchQuery.toLowerCase().includes('rice')) {
          mockResult = {
            plantName: 'Rice (Oryza sativa)',
            confidence: 0.99,
            category: 'Grain',
            description: 'Rice is the seed of the grass species Oryza sativa. As a cereal grain, it is the most widely consumed staple food for a large part of the world\'s human population, especially in Asia.',
            nutritionalBenefits: [
              'Good source of energy',
              'Contains essential carbohydrates',
              'Low in fat',
              'Gluten-free grain option'
            ],
            growingRegions: ['Tamil Nadu', 'West Bengal', 'Andhra Pradesh', 'Punjab'],
            seasonality: 'Mainly kharif (monsoon) crop, some varieties in rabi season',
            cookingUses: 'Staple food prepared in countless dishes, from biryani to idli to kheer.'
          };
        } else if (searchQuery.toLowerCase().includes('mango')) {
          mockResult = {
            plantName: 'Mango (Mangifera indica)',
            confidence: 0.97,
            category: 'Fruit',
            description: 'Mango is a juicy stone fruit produced from numerous species of tropical trees belonging to the flowering plant genus Mangifera. Mangoes are native to South Asia and have been cultivated for thousands of years.',
            nutritionalBenefits: [
              'Rich in vitamin A and C',
              'Contains digestive enzymes',
              'Good source of fiber',
              'Has antioxidant properties'
            ],
            growingRegions: ['Andhra Pradesh', 'Uttar Pradesh', 'Karnataka', 'Tamil Nadu'],
            seasonality: 'Summer fruit (March to July)',
            cookingUses: 'Eaten fresh, used in desserts, pickles, juices, and chutneys.'
          };
        } else {
          mockResult = {
            plantName: 'Spinach (Spinacia oleracea)',
            confidence: 0.91,
            category: 'Leafy Green Vegetable',
            description: 'Spinach is a leafy green flowering plant native to central and western Asia. It is of the order Caryophyllales, family Amaranthaceae. Its leaves are a common edible vegetable consumed either fresh, or after storage using preservation techniques.',
            nutritionalBenefits: [
              'Very high in vitamin K',
              'Rich in iron and calcium',
              'Good source of antioxidants',
              'Contains vitamins A and C'
            ],
            growingRegions: ['Maharashtra', 'Uttar Pradesh', 'Karnataka', 'Tamil Nadu'],
            seasonality: 'Winter crop (October to March)',
            cookingUses: 'Used in curries, stir-fries, salads, and smoothies.'
          };
        }
        
        setResult(mockResult);
        
        // Mock farmers who grow this crop
        const mockFarmers = [
          {
            id: 1,
            name: 'Annamalai Farms',
            farmer: 'Rajesh Annamalai',
            location: 'Coimbatore, Tamil Nadu',
            distance: '12 km',
            rating: 4.8,
            reviews: 124,
            organic: true,
            price: '₹60/kg',
            image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            varieties: [`${mockResult.plantName.split('(')[0].trim()}`]
          },
          {
            id: 2,
            name: 'Green Harvest Collective',
            farmer: 'Priya Venkatesh',
            location: 'Madurai, Tamil Nadu',
            distance: '18 km',
            rating: 4.6,
            reviews: 89,
            organic: true,
            price: '₹55/kg',
            image: 'https://images.unsplash.com/photo-1592878850834-7f7fb6e5f393?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            varieties: [`${mockResult.plantName.split('(')[0].trim()}`]
          },
          {
            id: 3,
            name: 'Nallur Family Farm',
            farmer: 'Karthik Nallur',
            location: 'Salem, Tamil Nadu',
            distance: '25 km',
            rating: 4.5,
            reviews: 67,
            organic: false,
            price: '₹52/kg',
            image: 'https://images.unsplash.com/photo-1561504935-4e5d607da631?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            varieties: [`${mockResult.plantName.split('(')[0].trim()}`]
          }
        ];
        
        setFarmerResults(mockFarmers);
        setIsSearching(false);
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setSearchError('Failed to search. Please try again.');
      setIsSearching(false);
    }
  };
  
  // Clear the currently selected image
  const clearImage = () => {
    setImage(null);
    setImageUrl('');
    setResult(null);
    setFarmerResults([]);
    setError('');
  };
  
  // Clear search results
  const clearSearch = () => {
    setSearchQuery('');
    if (result) {
      setResult(null);
      setFarmerResults([]);
    }
  };
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-green-500 py-16 md:py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.plantIdentification.en}</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
              {t.uploadImageOrSearchName.en}
            </p>
            
            {/* Search Bar in Hero */}
            <form onSubmit={searchPlants} className="max-w-2xl mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlants.en}
                className="w-full px-5 py-3 pl-12 rounded-full text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button 
                type="submit"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green-600"
                aria-label="Search"
              >
                <FaSearch size={20} />
              </button>
              {searchQuery && (
                <button 
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <FaTimesCircle size={18} />
                </button>
              )}
            </form>
            {searchError && (
              <p className="mt-2 text-red-300">{searchError}</p>
            )}
          </div>
          
          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform">
            <svg className="relative block w-full h-8 md:h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f9fafb"></path>
            </svg>
          </div>
        </section>
        
        {/* Upload Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.orUploadImage.en}</h2>
              <p className="text-gray-600">{t.takePhotoLet.en}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Image Upload Area */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.uploadImage.en}</h2>
                
                <div 
                  className={`relative border-2 border-dashed rounded-lg mb-6 transition-colors ${
                    imageUrl ? 'border-green-300' : 'border-gray-300 hover:border-green-300'
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  
                  {!imageUrl ? (
                    <div 
                      className="min-h-60 md:min-h-80 flex flex-col items-center justify-center p-6 cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      <FaUpload className="text-green-500 text-3xl mb-4" />
                      <p className="text-gray-600 mb-2 text-center">
                        Drag & drop an image here, or click to browse
                      </p>
                      <p className="text-gray-500 text-sm text-center">
                        Supported formats: JPG, PNG, WEBP
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img 
                        src={imageUrl} 
                        alt="Plant to identify" 
                        className="w-full h-auto rounded-lg"
                      />
                      <button
                        className="absolute top-2 right-2 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-900/70 transition-colors"
                        onClick={clearImage}
                      >
                        <FaTimesCircle />
                      </button>
                    </div>
                  )}
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
                    <FaTimesCircle className="mr-2 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
                
                <button
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center space-x-2 ${
                    isAnalyzing || !image 
                      ? 'bg-green-500/70 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                  onClick={analyzeImage}
                  disabled={isAnalyzing || !image}
                >
                  {isAnalyzing ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      <span>{t.analyzingImage.en}</span>
                    </>
                  ) : (
                    <>
                      <FaLeaf className="mr-2" />
                      <span>{t.identifyPlant.en}</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Results Area */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.identificationResults.en}</h2>
                
                {isAnalyzing || isSearching ? (
                  <div className="py-12 flex flex-col items-center justify-center">
                    <div className="relative w-20 h-20">
                      <FaLeaf className="text-green-300 text-6xl animate-pulse absolute" />
                      <FaSpinner className="text-green-600 text-6xl animate-spin absolute" />
                    </div>
                    <p className="text-gray-600 mt-4 text-center">
                      {isAnalyzing ? t.analyzingImage.en : t.searchingDatabase.en}
                    </p>
                  </div>
                ) : result ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{result.plantName}</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {Math.round(result.confidence * 100)}% {t.match.en}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{result.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-1">{t.category.en}</h4>
                          <p className="text-gray-600">{result.category}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-1">{t.seasonality.en}</h4>
                          <p className="text-gray-600">{result.seasonality}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-1">{t.growingRegions.en}</h4>
                        <div className="flex flex-wrap gap-1">
                          {result.growingRegions.map((region, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                            >
                              {region}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">{t.nutritionalBenefits.en}</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          {result.nutritionalBenefits.map((benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {farmerResults.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                          <FaUser className="mr-2 text-green-600" />
                          {t.localFarmers.en}
                        </h3>
                        
                        <div className="space-y-3">
                          <Link 
                            href={`/store?search=${encodeURIComponent(result.plantName.split('(')[0].trim())}`}
                            className="block text-center py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mb-3"
                          >
                            {t.viewAllSellers.en}
                          </Link>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <FaSeedling className="text-green-200 text-6xl mb-4" />
                    <p className="text-gray-600 mb-2">{t.searchForPlantOrUpload.en}</p>
                    <p className="text-gray-500 text-sm">{t.aiWillIdentify.en}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Farmer Results Section */}
        {farmerResults.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                {t.farmersGrowing.en} {result?.plantName.split('(')[0].trim()}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {farmerResults.map(farmer => (
                  <motion.div
                    key={farmer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: farmer.id * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={farmer.image}
                        alt={farmer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-800">{farmer.name}</h3>
                        {farmer.organic && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {t.organic.en}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <FaUser className="mr-1 text-green-600" />
                        <span>{farmer.farmer}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <FaMapMarkerAlt className="mr-1 text-green-600" />
                        <span>{farmer.location}</span>
                        <span className="text-gray-500 ml-2">({farmer.distance})</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm mb-4">
                        <FaStar className="mr-1 text-yellow-500" />
                        <span>{farmer.rating}</span>
                        <span className="text-gray-500 ml-2">({farmer.reviews} reviews)</span>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-1 text-sm">{t.varietiesAvailable.en}:</h4>
                        <div className="flex flex-wrap gap-1">
                          {farmer.varieties.map((variety, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                            >
                              {variety}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">{farmer.price}</span>
                        <Link 
                          href={`/store/${farmer.id}`}
                          className="py-1 px-4 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                          {t.viewFarm.en}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t.howItWorks.en}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <FaCamera className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.uploadOrSearch.en}</h3>
                <p className="text-gray-600">
                  {t.uploadOrSearchText.en}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <FaLeaf className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.aiIdentifiesIt.en}</h3>
                <p className="text-gray-600">
                  {t.geminiTechnology.en}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.connectWithFarmers.en}</h3>
                <p className="text-gray-600">
                  {t.discoverFarmers.en}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t.discoverLocalProduce.en}</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              {t.usePlantId.en}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={triggerFileInput}
                className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium inline-flex items-center justify-center"
              >
                <FaCamera className="mr-2" />
                {t.identifyByImage.en}
              </button>
              <Link
                href="#search"
                className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors text-lg font-medium inline-flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('input[type="text"]').focus();
                }}
              >
                <FaSearch className="mr-2" />
                {t.searchByName.en}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 