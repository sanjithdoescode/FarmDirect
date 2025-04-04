'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaQrcode, FaLeaf, FaSeedling, FaWater, FaTractor, FaBoxOpen, FaTruck } from 'react-icons/fa';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import Image from 'next/image';

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
          unit: 'kg',
          quantity: 25,
          farmer: {
            id: 1,
            name: 'Lakshmi Farms',
            location: 'Coimbatore, Tamil Nadu',
            rating: 4.8
          },
          image: 'https://images.unsplash.com/photo-1594057687713-5fd14eed1c17',
          rating: 4.8,
          reviews: 24,
          organic: true,
          freeDelivery: true,
          harvestDate: '2023-09-20',
          batchId: 'LF-TOM-2309-A45',
        },
        '2': {
          id: '2',
          name: 'Fresh Spinach',
          category: 'vegetables',
          description: 'Nutrient-rich spinach leaves, harvested fresh from our farm.',
          price: 40,
          unit: '500g',
          quantity: 15,
          farmer: {
            id: 2,
            name: 'Hill Valley Farms',
            location: 'Ooty, Tamil Nadu',
            rating: 4.6
          },
          image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
          rating: 4.5,
          reviews: 18,
          organic: true,
          freeDelivery: false,
          harvestDate: '2023-09-21',
          batchId: 'HV-SPN-2309-B22',
        },
        '3': {
          id: '3',
          name: 'Organic Mangoes',
          category: 'fruits',
          description: 'Sweet and juicy alphonso mangoes, grown organically.',
          price: 200,
          unit: 'kg',
          quantity: 30,
          farmer: {
            id: 3,
            name: 'Paddy Organics',
            location: 'Thanjavur, Tamil Nadu',
            rating: 4.9
          },
          image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed',
          rating: 4.9,
          reviews: 42,
          organic: true,
          freeDelivery: true,
          harvestDate: '2023-09-18',
          batchId: 'PO-MNG-2309-C18',
        },
        '4': {
          id: '4',
          name: 'Farm Fresh Eggs',
          category: 'dairy',
          description: 'Free-range eggs from happy hens, rich in nutrients.',
          price: 120,
          unit: 'dozen',
          quantity: 20,
          farmer: {
            id: 1,
            name: 'Lakshmi Farms',
            location: 'Coimbatore, Tamil Nadu',
            rating: 4.8
          },
          image: 'https://images.unsplash.com/photo-1586802990181-a5771596eaea',
          rating: 4.7,
          reviews: 31,
          organic: false,
          freeDelivery: true,
          harvestDate: '2023-09-21',
          batchId: 'LF-EGG-2309-D31',
        },
        '5': {
          id: '5',
          name: 'Organic Brown Rice',
          category: 'grains',
          description: 'Nutritious brown rice grown using traditional farming methods.',
          price: 95,
          unit: 'kg',
          quantity: 50,
          farmer: {
            id: 3,
            name: 'Paddy Organics',
            location: 'Thanjavur, Tamil Nadu',
            rating: 4.9
          },
          image: 'https://images.unsplash.com/photo-1613728913341-8f29b02b8253',
          rating: 4.6,
          reviews: 27,
          organic: true,
          freeDelivery: false,
          harvestDate: '2023-09-15',
          batchId: 'PO-RCE-2309-E15',
        },
        '6': {
          id: '6',
          name: 'Fresh Carrots',
          category: 'vegetables',
          description: 'Crunchy and sweet carrots, freshly harvested.',
          price: 60,
          unit: 'kg',
          quantity: 35,
          farmer: {
            id: 4,
            name: 'Green Earth Farm',
            location: 'Salem, Tamil Nadu',
            rating: 4.7
          },
          image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979',
          rating: 4.4,
          reviews: 19,
          organic: false,
          freeDelivery: true,
          harvestDate: '2023-09-19',
          batchId: 'GE-CRT-2309-F19',
        },
        '7': {
          id: '7',
          name: 'Strawberries',
          category: 'fruits',
          description: 'Sweet and juicy strawberries from our hill farms.',
          price: 120,
          unit: '250g',
          quantity: 15,
          farmer: {
            id: 2,
            name: 'Hill Valley Farms',
            location: 'Ooty, Tamil Nadu',
            rating: 4.6
          },
          image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6',
          rating: 4.8,
          reviews: 36,
          organic: false,
          freeDelivery: false,
          harvestDate: '2023-09-21',
          batchId: 'HV-STR-2309-G21',
        },
        '8': {
          id: '8',
          name: 'Organic Honey',
          category: 'other',
          description: 'Pure, raw honey collected from our bee farms.',
          price: 350,
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
        },
        '9': {
          id: '9',
          name: 'Fresh Potatoes',
          category: 'vegetables',
          description: 'Farm fresh potatoes perfect for cooking.',
          price: 30,
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
        },
        '10': {
          id: '10',
          name: 'Organic Milk',
          category: 'dairy',
          description: 'Fresh, creamy milk from grass-fed cows.',
          price: 65,
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
        },
        '11': {
          id: '11',
          name: 'Fresh Cucumber',
          category: 'vegetables',
          description: 'Crisp and refreshing cucumbers, perfect for salads.',
          price: 40,
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
        },
        '12': {
          id: '12',
          name: 'Organic Bananas',
          category: 'fruits',
          description: 'Sweet and nutritious bananas grown organically.',
          price: 80,
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
              <div className="flex items-center mb-4">
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2">Verified</span>
                {product.organic && (
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2">Organic</span>
                )}
              </div>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Farmer</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    {product.farmer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{product.farmer.name}</p>
                    <p className="text-sm text-gray-600">{product.farmer.location}</p>
                  </div>
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
          <div className="flex border-b">
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
          </div>
        </div>
        
        {/* Share Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-8 p-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Share This Information</h3>
          <p className="text-gray-700 mb-4">
            Help spread awareness about sustainable food sources and transparent supply chains.
          </p>
          <div className="flex space-x-4">
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
      </div>
    </div>
  );
} 