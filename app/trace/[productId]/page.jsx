'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaQrcode, FaLeaf, FaSeedling, FaWater, FaTractor, FaBoxOpen, FaTruck } from 'react-icons/fa';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import Image from 'next/image';
import TrustBadge from '../../components/TrustBadge';

export default function ProductTracePage() {
  const { t } = useLanguage();
  const params = useParams();
  const { productId } = params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [supplyChainData, setSupplyChainData] = useState(null);
  const [activeTab, setActiveTab] = useState('journey');
  
  useEffect(() => {
    // In a real app, we would fetch the product data from an API
    // Here we're simulating that with some mock data
    setTimeout(() => {
      // Product database - mock different products based on ID
      const productDatabase = {
        '1': {
          id: '1',
          name: 'Organic Tomatoes',
          category: 'vegetables',
          description: 'Fresh, juicy tomatoes grown without pesticides. Perfect for salads and cooking.',
          price: 70,
          priceBreakdown: {
            farmGate: 45,
            processing: 5,
            transportation: 10,
            retailMargin: 10
          },
          unit: 'kg',
          quantity: 25,
          farmer: {
            id: 1,
            name: 'Lakshmi Farms',
            location: 'Coimbatore, Tamil Nadu',
            rating: 4.8,
            trustTier: 1
          },
          image: 'https://images.unsplash.com/photo-1594057687713-5fd14eed1c17',
          rating: 4.8,
          reviews: 24,
          organic: true,
          freeDelivery: true,
          harvestDate: '2023-09-20',
          batchId: 'LF-TOM-2309-A45',
          processed: false,
          valueScore: 4.6,
          badges: ['Farm Traceable', 'Zero Adulteration']
        },
        '2': {
          id: '2',
          name: 'Fresh Spinach',
          category: 'vegetables',
          description: 'Nutrient-rich spinach leaves, harvested fresh from our farm.',
          price: 40,
          priceBreakdown: {
            farmGate: 25,
            processing: 3,
            transportation: 7,
            retailMargin: 5
          },
          unit: '500g',
          quantity: 15,
          farmer: {
            id: 2,
            name: 'Hill Valley Farms',
            location: 'Ooty, Tamil Nadu',
            rating: 4.6,
            trustTier: 2
          },
          image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
          rating: 4.5,
          reviews: 18,
          organic: true,
          freeDelivery: false,
          harvestDate: '2023-09-21',
          batchId: 'HV-SPN-2309-B22',
          processed: false,
          valueScore: 4.7,
          badges: ['Farm Traceable', 'Zero Adulteration', 'Minimal Processing']
        },
        '3': {
          id: '3',
          name: 'Organic Mangoes',
          category: 'fruits',
          description: 'Sweet and juicy alphonso mangoes, grown organically.',
          price: 200,
          priceBreakdown: {
            farmGate: 140,
            processing: 10,
            transportation: 25,
            retailMargin: 25
          },
          unit: 'kg',
          quantity: 30,
          farmer: {
            id: 3,
            name: 'Paddy Organics',
            location: 'Thanjavur, Tamil Nadu',
            rating: 4.9,
            trustTier: 1
          },
          image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed',
          rating: 4.9,
          reviews: 42,
          organic: true,
          freeDelivery: true,
          harvestDate: '2023-09-18',
          batchId: 'PO-MNG-2309-C18',
          processed: false,
          valueScore: 4.9,
          badges: ['Farm Traceable', 'Zero Adulteration', 'Farmer-Friendly']
        },
        '4': {
          id: '4',
          name: 'Farm Fresh Eggs',
          category: 'dairy',
          description: 'Free-range eggs from happy hens, rich in nutrients.',
          price: 120,
          priceBreakdown: {
            farmGate: 85,
            processing: 5,
            transportation: 15,
            retailMargin: 15
          },
          unit: 'dozen',
          quantity: 20,
          farmer: {
            id: 1,
            name: 'Lakshmi Farms',
            location: 'Coimbatore, Tamil Nadu',
            rating: 4.8,
            trustTier: 1
          },
          image: 'https://images.unsplash.com/photo-1586802990181-a5771596eaea',
          rating: 4.7,
          reviews: 31,
          organic: false,
          freeDelivery: true,
          harvestDate: '2023-09-21',
          batchId: 'LF-EGG-2309-D31',
          processed: false,
          valueScore: 4.5,
          badges: ['Farm Traceable', 'Farmer-Friendly']
        },
        '5': {
          id: '5',
          name: 'Organic Brown Rice',
          category: 'grains',
          description: 'Nutritious brown rice grown using traditional farming methods.',
          price: 95,
          priceBreakdown: {
            farmGate: 60,
            processing: 15,
            transportation: 10,
            retailMargin: 10
          },
          unit: 'kg',
          quantity: 50,
          farmer: {
            id: 3,
            name: 'Paddy Organics',
            location: 'Thanjavur, Tamil Nadu',
            rating: 4.9,
            trustTier: 1
          },
          image: 'https://images.unsplash.com/photo-1613728913341-8f29b02b8253',
          rating: 4.6,
          reviews: 27,
          organic: true,
          freeDelivery: false,
          harvestDate: '2023-09-15',
          batchId: 'PO-RCE-2309-E15',
          processed: true,
          valueScore: 4.7,
          badges: ['Verified Processor', 'Zero Adulteration', 'Farm Traceable', 'Traditional Processing']
        },
        '6': {
          id: '6',
          name: 'Fresh Carrots',
          category: 'vegetables',
          description: 'Crunchy and sweet carrots, freshly harvested.',
          price: 60,
          priceBreakdown: {
            farmGate: 35,
            processing: 5,
            transportation: 10,
            retailMargin: 10
          },
          unit: 'kg',
          quantity: 35,
          farmer: {
            id: 4,
            name: 'Green Earth Farm',
            location: 'Salem, Tamil Nadu',
            rating: 4.7,
            trustTier: 3
          },
          image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979',
          rating: 4.4,
          reviews: 19,
          organic: false,
          freeDelivery: true,
          harvestDate: '2023-09-19',
          batchId: 'GE-CRT-2309-F19',
          processed: false,
          valueScore: 4.3,
          badges: ['Farm Traceable', 'Minimal Processing']
        },
        '7': {
          id: '7',
          name: 'Strawberries',
          category: 'fruits',
          description: 'Sweet and juicy strawberries from our hill farms.',
          price: 120,
          priceBreakdown: {
            farmGate: 80,
            processing: 10,
            transportation: 15,
            retailMargin: 15
          },
          unit: '250g',
          quantity: 15,
          farmer: {
            id: 2,
            name: 'Hill Valley Farms',
            location: 'Ooty, Tamil Nadu',
            rating: 4.6,
            trustTier: 2
          },
          image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6',
          rating: 4.8,
          reviews: 36,
          organic: false,
          freeDelivery: false,
          harvestDate: '2023-09-21',
          batchId: 'HV-STR-2309-G21',
          processed: false,
          valueScore: 4.5,
          badges: ['Farm Traceable', 'Zero Adulteration']
        },
        '8': {
          id: '8',
          name: 'Organic Honey',
          category: 'other',
          description: 'Pure, raw honey collected from our bee farms.',
          price: 350,
          priceBreakdown: {
            farmGate: 250,
            processing: 40,
            transportation: 30,
            retailMargin: 30
          },
          unit: '500g',
          quantity: 10,
          farmer: {
            id: 5,
            name: 'Nature\'s Bounty',
            location: 'Madurai, Tamil Nadu',
            rating: 4.5
          },
          image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924',
          rating: 4.9,
          reviews: 45,
          organic: true,
          freeDelivery: true,
          harvestDate: '2023-09-10',
          batchId: 'NB-HNY-2309-H10',
          processed: true,
          valueScore: 4.8,
          badges: ['Verified Processor', 'Farm Traceable', 'Zero Adulteration', 'Traditional Processing']
        },
        '9': {
          id: '9',
          name: 'Fresh Potatoes',
          category: 'vegetables',
          description: 'Farm fresh potatoes perfect for cooking.',
          price: 30,
          priceBreakdown: {
            farmGate: 18,
            processing: 2,
            transportation: 5,
            retailMargin: 5
          },
          unit: 'kg',
          quantity: 100,
          farmer: {
            id: 4,
            name: 'Green Earth Farm',
            location: 'Salem, Tamil Nadu',
            rating: 4.7
          },
          image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
          rating: 4.3,
          reviews: 22,
          organic: false,
          freeDelivery: true,
          harvestDate: '2023-09-17',
          batchId: 'GE-POT-2309-I17',
          processed: false,
          valueScore: 4.6,
          badges: ['Farm Traceable', 'Minimal Processing']
        },
        '10': {
          id: '10',
          name: 'Organic Milk',
          category: 'dairy',
          description: 'Fresh, creamy milk from grass-fed cows.',
          price: 65,
          priceBreakdown: {
            farmGate: 40,
            processing: 10,
            transportation: 8,
            retailMargin: 7
          },
          unit: 'liter',
          quantity: 20,
          farmer: {
            id: 1,
            name: 'Lakshmi Farms',
            location: 'Coimbatore, Tamil Nadu',
            rating: 4.8
          },
          image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
          rating: 4.7,
          reviews: 33,
          organic: true,
          freeDelivery: false,
          harvestDate: '2023-09-21',
          batchId: 'LF-MLK-2309-J21',
          processed: true,
          valueScore: 4.6,
          badges: ['Verified Processor', 'Zero Adulteration', 'Farm Traceable', 'Minimal Processing']
        },
        '11': {
          id: '11',
          name: 'Fresh Cucumber',
          category: 'vegetables',
          description: 'Crisp and refreshing cucumbers, perfect for salads.',
          price: 40,
          priceBreakdown: {
            farmGate: 25,
            processing: 3,
            transportation: 7,
            retailMargin: 5
          },
          unit: 'kg',
          quantity: 45,
          farmer: {
            id: 2,
            name: 'Hill Valley Farms',
            location: 'Ooty, Tamil Nadu',
            rating: 4.6
          },
          image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6',
          rating: 4.4,
          reviews: 17,
          organic: false,
          freeDelivery: true,
          harvestDate: '2023-09-20',
          batchId: 'HV-CUC-2309-K20',
          processed: false,
          valueScore: 4.2,
          badges: ['Farm Traceable', 'Minimal Processing']
        },
        '12': {
          id: '12',
          name: 'Organic Bananas',
          category: 'fruits',
          description: 'Sweet and nutritious bananas grown organically.',
          price: 80,
          priceBreakdown: {
            farmGate: 50,
            processing: 5,
            transportation: 15,
            retailMargin: 10
          },
          unit: 'dozen',
          quantity: 25,
          farmer: {
            id: 5,
            name: 'Nature\'s Bounty',
            location: 'Madurai, Tamil Nadu',
            rating: 4.5
          },
          image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
          rating: 4.6,
          reviews: 28,
          organic: true,
          freeDelivery: true,
          harvestDate: '2023-09-19',
          batchId: 'NB-BAN-2309-L19',
          processed: false,
          valueScore: 4.7,
          badges: ['Farm Traceable', 'Zero Adulteration', 'Farmer-Friendly']
        }
      };
      
      // Get the product data based on the ID, or provide a fallback
      const productData = productDatabase[productId] || {
        id: productId,
        name: 'Unknown Product',
        category: 'other',
        description: 'Product information not available.',
        price: 0,
        unit: '',
        quantity: 0,
        farmer: {
          id: 0,
          name: 'Unknown Farm',
          location: 'Unknown Location',
          rating: 0
        },
        image: 'https://images.unsplash.com/photo-1594057687713-5fd14eed1c17',
        rating: 0,
        reviews: 0,
        organic: false,
        freeDelivery: false,
        harvestDate: '2023-09-01',
        batchId: 'UNKNOWN',
      };
      
      setProduct(productData);
      
      // Fixed supply chain data
      setSupplyChainData({
        journey: [
          { 
            id: 1, 
            stage: 'Harvesting', 
            date: productData.harvestDate, 
            location: productData.farmer.location, 
            description: 'Harvested at optimal ripeness',
            icon: <FaLeaf className="text-green-500" size={24} />
          },
          { 
            id: 2, 
            stage: 'Quality Check', 
            date: new Date(new Date(productData.harvestDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
            location: productData.farmer.location, 
            description: 'Inspected for quality and graded',
            icon: <FaBoxOpen className="text-amber-500" size={24} />
          },
          { 
            id: 3, 
            stage: 'Transportation', 
            date: new Date(new Date(productData.harvestDate).getTime() + 48 * 60 * 60 * 1000).toISOString().split('T')[0], 
            location: 'En route to consumer', 
            description: 'Transported in temperature-controlled vehicles',
            icon: <FaTruck className="text-blue-500" size={24} />
          },
          { 
            id: 4, 
            stage: 'Ready for Delivery', 
            date: new Date(new Date(productData.harvestDate).getTime() + 72 * 60 * 60 * 1000).toISOString().split('T')[0], 
            location: 'Local distribution center', 
            description: 'Prepared for last-mile delivery',
            icon: <FaBoxOpen className="text-purple-500" size={24} />
          }
        ],
        farming: {
          method: productData.organic ? 'Organic Farming' : 'Conventional Farming',
          inputs: productData.organic ? 'Organic compost, natural pest management' : 'Standard fertilizers, pest control as needed',
          waterSource: 'Rainwater harvesting and drip irrigation',
          certification: productData.organic ? 'Organic Certified' : 'Standard Quality Certification',
          sustainability: 'Practices soil conservation and biodiversity protection'
        },
        carbon: {
          farmEmissions: 10, // Fixed value
          transportEmissions: 15, // Fixed value
          totalFootprint: 25, // Fixed total (sum of farm + transport)
          comparisonToAverage: 30 // Fixed percentage lower than average
        }
      });
      
      setLoading(false);
    }, 1000);
  }, [productId]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Loading product information...</p>
        </div>
      </div>
    );
  }
  
  if (!product || !supplyChainData) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for could not be found or has been removed.</p>
          <Link href="/" className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-green-50 pb-12">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="text-green-600 hover:text-green-700 mr-4">
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Product Verification</h1>
              <p className="text-sm text-gray-600">Batch ID: {product.batchId}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 h-64 md:h-auto relative">
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                priority
                onError={(e) => {
                  if (e.target.src !== "/fallback-image.jpg") {
                    e.target.src = "/fallback-image.jpg";
                  }
                }}
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
              <div className="flex flex-wrap items-center mb-4">
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2 mb-2">Verified</span>
                {product.organic && (
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2 mb-2">Organic</span>
                )}
                {product.badges.map((badge, index) => (
                  <span key={index} className={`text-sm px-2 py-1 rounded-full mr-2 mb-2 ${
                    badge.includes('Verified') ? 'bg-blue-100 text-blue-800' :
                    badge.includes('Zero') ? 'bg-purple-100 text-purple-800' :
                    badge.includes('Farmer-Friendly') ? 'bg-amber-100 text-amber-800' :
                    badge.includes('Farm Traceable') ? 'bg-green-100 text-green-800' :
                    badge.includes('Minimal') ? 'bg-teal-100 text-teal-800' :
                    badge.includes('Traditional') ? 'bg-indigo-100 text-indigo-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {badge}
                  </span>
                ))}
              </div>
              <div className="flex items-center mb-4">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-lg flex items-center mr-3">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span>Value Score: {product.valueScore}/5</span>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-lg flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>₹{product.price}/{product.unit}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Farmer</h3>
                <div className="flex items-center space-x-3">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(product.farmer.name)}&background=e9f5f0&color=16a34a&size=64`}
                    alt={product.farmer.name}
                    width={48}
                    height={48}
                    className="rounded-full border border-gray-200"
                  />
                  <div>
                    <div className="text-lg font-medium text-gray-900 flex items-center">
                      {product.farmer.name}
                      <span className="ml-2">
                        <TrustBadge tier={product.farmer.trustTier} />
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{product.farmer.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-yellow-500">
                  <span className="text-sm text-gray-700 ml-1">({product.farmer.rating} avg rating)</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Grown with care by {product.farmer.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="container mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            <button 
              className={`py-4 px-6 font-medium ${activeTab === 'journey' ? 'text-green-600 border-b-2 border-green-600 bg-green-50' : 'text-gray-500'}`}
              onClick={() => setActiveTab('journey')}
            >
              Supply Chain Journey
            </button>
            <button 
              className={`py-4 px-6 font-medium ${activeTab === 'farming' ? 'text-green-600 border-b-2 border-green-600 bg-green-50' : 'text-gray-500'}`}
              onClick={() => setActiveTab('farming')}
            >
              Farming Practices
            </button>
            <button 
              className={`py-4 px-6 font-medium ${activeTab === 'carbon' ? 'text-green-600 border-b-2 border-green-600 bg-green-50' : 'text-gray-500'}`}
              onClick={() => setActiveTab('carbon')}
            >
              Carbon Footprint
            </button>
            <button 
              className={`py-4 px-6 font-medium ${activeTab === 'pricing' ? 'text-green-600 border-b-2 border-green-600 bg-green-50' : 'text-gray-500'}`}
              onClick={() => setActiveTab('pricing')}
            >
              Price Breakdown
            </button>
            {product.processed && (
              <button 
                className={`py-4 px-6 font-medium ${activeTab === 'processing' ? 'text-green-600 border-b-2 border-green-600 bg-green-50' : 'text-gray-500'}`}
                onClick={() => setActiveTab('processing')}
              >
                Processing Details
              </button>
            )}
          </div>
          
          <div className="p-6">
            {/* Journey Tab */}
            {activeTab === 'journey' && (
              <div className="space-y-6">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute top-0 bottom-0 left-6 w-1 bg-green-200"></div>
                  
                  {/* Timeline items */}
                  {supplyChainData.journey.map((step, index) => (
                    <div key={step.id} className="relative flex items-start mb-8">
                      <div className="absolute left-0 mt-1 w-12 h-12 flex items-center justify-center bg-green-100 rounded-full z-10">
                        {step.icon}
                      </div>
                      <div className="ml-20">
                        <h4 className="text-lg font-medium text-gray-800">{step.stage}</h4>
                        <p className="text-sm text-gray-500">{step.date}</p>
                        <p className="text-sm text-gray-600 mt-1">{step.location}</p>
                        <p className="text-sm text-gray-700 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Farming Practices Tab */}
            {activeTab === 'farming' && (
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6">
                    <FaSeedling className="text-green-600" size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-gray-800">Farming Method</h4>
                    <p className="text-gray-700 mt-2">{supplyChainData.farming.method}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6">
                    <FaLeaf className="text-green-600" size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-gray-800">Inputs Used</h4>
                    <p className="text-gray-700 mt-2">{supplyChainData.farming.inputs}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6">
                    <FaWater className="text-green-600" size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-gray-800">Water Source</h4>
                    <p className="text-gray-700 mt-2">{supplyChainData.farming.waterSource}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6">
                    <FaTractor className="text-green-600" size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-gray-800">Sustainability Practices</h4>
                    <p className="text-gray-700 mt-2">{supplyChainData.farming.sustainability}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Carbon Footprint Tab */}
            {activeTab === 'carbon' && (
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-medium text-gray-800">Carbon Footprint</h4>
                    <span className="px-4 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                      {supplyChainData.carbon.comparisonToAverage}% lower than average
                    </span>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Farm Emissions</span>
                        <span className="text-gray-600 font-medium">{supplyChainData.carbon.farmEmissions} CO₂e</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: `${(supplyChainData.carbon.farmEmissions / supplyChainData.carbon.totalFootprint) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Transport Emissions</span>
                        <span className="text-gray-600 font-medium">{supplyChainData.carbon.transportEmissions} CO₂e</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${(supplyChainData.carbon.transportEmissions / supplyChainData.carbon.totalFootprint) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-800 font-medium">Total Footprint</span>
                        <span className="text-gray-800 font-medium">{supplyChainData.carbon.totalFootprint} CO₂e</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border border-green-200 rounded-lg">
                  <h4 className="text-xl font-medium text-gray-800 mb-3">Environmental Impact</h4>
                  <p className="text-gray-700">
                    By choosing this product, you're supporting farming practices that produce {supplyChainData.carbon.comparisonToAverage}% less carbon emissions than conventional agriculture and distribution. That's like saving {Math.floor(supplyChainData.carbon.totalFootprint * 0.1)} kg of CO₂e emissions.
                  </p>
                  <div className="mt-4 p-4 bg-green-100 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-green-800">
                        That's equivalent to taking {Math.floor(supplyChainData.carbon.totalFootprint * 0.05)} cars off the road for a day!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Price Breakdown Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-medium text-gray-800">Price Breakdown</h4>
                    <span className="px-4 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                      Value Score: {product.valueScore}/5
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Farm Gate Price</span>
                        <span className="text-gray-600 font-medium">₹{product.priceBreakdown.farmGate}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: `${(product.priceBreakdown.farmGate / product.price) * 100}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Amount paid directly to the farmer</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Processing Cost</span>
                        <span className="text-gray-600 font-medium">₹{product.priceBreakdown.processing}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${(product.priceBreakdown.processing / product.price) * 100}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Cost of cleaning, sorting, and packaging</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Transportation</span>
                        <span className="text-gray-600 font-medium">₹{product.priceBreakdown.transportation}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-amber-500 h-3 rounded-full" style={{ width: `${(product.priceBreakdown.transportation / product.price) * 100}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Cost of delivery from farm to market</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Retail Margin</span>
                        <span className="text-gray-600 font-medium">₹{product.priceBreakdown.retailMargin}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full" style={{ width: `${(product.priceBreakdown.retailMargin / product.price) * 100}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Retail operating costs and profit</p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-800 font-medium">Final Price</span>
                        <span className="text-gray-800 font-medium">₹{product.price}/{product.unit}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {Math.round((product.priceBreakdown.farmGate / product.price) * 100)}% of your payment goes directly to farmers
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border border-green-200 rounded-lg">
                  <h4 className="text-xl font-medium text-gray-800 mb-3">Value for Money</h4>
                  <div className="flex items-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-600 mr-4">
                      {product.valueScore}
                    </div>
                    <div>
                      <p className="text-gray-700">
                        This score combines quality, price, nutritional value, and ethical sourcing. Higher scores mean better value for your money.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Compared to similar products, this item offers {product.valueScore >= 4.5 ? 'excellent' : product.valueScore >= 4 ? 'very good' : 'good'} value.
                  </p>
                </div>
              </div>
            )}
            
            {/* Processing Details Tab */}
            {activeTab === 'processing' && product.processed && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="text-xl font-medium text-gray-800 mb-4">Processing Information</h4>
                  <p className="text-gray-700 mb-4">
                    This product has undergone processing to maintain quality and extend shelf life. All processing methods maintain the nutritional integrity and quality of the product.
                  </p>
                  
                  <div className="space-y-4 mt-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-lg font-medium text-gray-800">Quality Control</h5>
                        <p className="text-gray-600 mt-1">Rigorous testing at every stage ensures safety and quality</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-lg font-medium text-gray-800">Processing Method</h5>
                        <p className="text-gray-600 mt-1">{product.badges.includes('Traditional Processing') ? 'Traditional methods passed down through generations' : 'Modern minimal processing techniques'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-lg font-medium text-gray-800">Additives & Preservatives</h5>
                        <p className="text-gray-600 mt-1">{product.badges.includes('Zero Adulteration') ? 'No artificial additives or preservatives' : 'Minimal preservatives used to maintain freshness'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border border-blue-200 rounded-lg">
                  <h4 className="text-xl font-medium text-gray-800 mb-4">Processor Information</h4>
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Local Processing Facility</p>
                      <p className="text-sm text-gray-600">Located within 50km of farm</p>
                      <p className="text-sm text-gray-600 mt-1">Certified for food safety and quality</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Share Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-8 p-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Share This Information</h3>
          <p className="text-gray-700 mb-4">
            Help spread awareness about sustainable food sources and transparent supply chains.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Share on Facebook
            </button>
            <button className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
              Share on Twitter
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Share via WhatsApp
            </button>
          </div>
        </div>
        
        {/* Report Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-8 p-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Report an Issue</h3>
          <p className="text-gray-700 mb-4">
            Found misleading information or have concerns about this product? Let us know.
          </p>
          
          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Your report helps everyone</h3>
                <div className="mt-1 text-sm text-yellow-700">
                  <p>Reports are reviewed by our team to ensure accuracy and honesty in our marketplace.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="report-type" className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
              <select 
                id="report-type" 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="">Select an issue type</option>
                <option value="misleading">Misleading Information</option>
                <option value="quality">Product Quality Issue</option>
                <option value="certification">Certification Concerns</option>
                <option value="price">Price Discrepancy</option>
                <option value="other">Other Issue</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="report-details" className="block text-sm font-medium text-gray-700 mb-1">Details</label>
              <textarea 
                id="report-details" 
                rows="4" 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Please provide details about the issue..."
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input 
                id="report-anonymous" 
                type="checkbox" 
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
              />
              <label htmlFor="report-anonymous" className="ml-2 block text-sm text-gray-700">
                Submit anonymously
              </label>
            </div>
            
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors mt-2">
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 