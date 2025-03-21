'use client';

import { useState } from 'react';
import { FaQrcode, FaLeaf, FaSeedling, FaWater, FaSun, FaTractor, FaTemperatureHigh, FaBoxOpen, FaTruck } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function ProductTraceability({ product }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('journey');
  
  // Mock data for supply chain journey
  const supplyChainData = {
    journey: [
      { 
        id: 1, 
        stage: 'Harvesting', 
        date: product.harvestDate || '2023-09-20', 
        location: product.farmer.location, 
        description: 'Harvested at optimal ripeness',
        icon: <FaLeaf className="text-green-500" size={24} />
      },
      { 
        id: 2, 
        stage: 'Quality Check', 
        date: new Date(new Date(product.harvestDate || '2023-09-20').getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
        location: product.farmer.location, 
        description: 'Inspected for quality and graded',
        icon: <FaBoxOpen className="text-amber-500" size={24} />
      },
      { 
        id: 3, 
        stage: 'Transportation', 
        date: new Date(new Date(product.harvestDate || '2023-09-20').getTime() + 48 * 60 * 60 * 1000).toISOString().split('T')[0], 
        location: 'En route to consumer', 
        description: 'Transported in temperature-controlled vehicles',
        icon: <FaTruck className="text-blue-500" size={24} />
      },
      { 
        id: 4, 
        stage: 'Ready for Delivery', 
        date: new Date(new Date(product.harvestDate || '2023-09-20').getTime() + 72 * 60 * 60 * 1000).toISOString().split('T')[0], 
        location: 'Local distribution center', 
        description: 'Prepared for last-mile delivery',
        icon: <FaBoxOpen className="text-purple-500" size={24} />
      }
    ],
    farming: {
      method: product.organic ? 'Organic Farming' : 'Conventional Farming',
      inputs: product.organic ? 'Organic compost, natural pest management' : 'Standard fertilizers, pest control as needed',
      waterSource: 'Rainwater harvesting and drip irrigation',
      certification: product.organic ? 'Organic Certified' : 'Standard Quality Certification',
      sustainability: 'Practices soil conservation and biodiversity protection'
    },
    carbon: {
      farmEmissions: Math.floor(Math.random() * 10) + 5, // Random value between 5-15
      transportEmissions: Math.floor(Math.random() * 20) + 10, // Random value between 10-30
      totalFootprint: Math.floor(Math.random() * 30) + 15, // Random value between 15-45
      comparisonToAverage: Math.floor(Math.random() * 40) + 20, // Random % between 20-60% lower
    }
  };

  // Generate QR code data - in a real app this would link to a public page with this product's trace info
  const qrData = `https://farmdirect.example.com/trace/${product.id}`;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">{t.productTraceability}</h3>
        <div className="p-2 bg-green-100 rounded-full">
          <FaQrcode className="text-green-600" size={24} />
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'journey' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('journey')}
        >
          {t.supplyChainJourney}
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'farming' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('farming')}
        >
          {t.farmingPractices}
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'carbon' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('carbon')}
        >
          {t.carbonFootprint}
        </button>
      </div>
      
      {/* Journey Tab */}
      {activeTab === 'journey' && (
        <div className="space-y-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 left-6 w-1 bg-green-200"></div>
            
            {/* Timeline items */}
            {supplyChainData.journey.map((step, index) => (
              <div key={step.id} className="relative flex items-start mb-6">
                <div className="absolute left-0 mt-1 w-12 h-12 flex items-center justify-center bg-green-100 rounded-full z-10">
                  {step.icon}
                </div>
                <div className="ml-16">
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
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <FaSeedling className="text-green-600" size={24} />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-800">{t.farmingMethod}</h4>
              <p className="text-gray-700">{supplyChainData.farming.method}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <FaLeaf className="text-green-600" size={24} />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-800">{t.inputsUsed}</h4>
              <p className="text-gray-700">{supplyChainData.farming.inputs}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <FaWater className="text-green-600" size={24} />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-800">{t.waterSource}</h4>
              <p className="text-gray-700">{supplyChainData.farming.waterSource}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <FaTractor className="text-green-600" size={24} />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-800">{t.sustainability}</h4>
              <p className="text-gray-700">{supplyChainData.farming.sustainability}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Carbon Footprint Tab */}
      {activeTab === 'carbon' && (
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-800">{t.carbonFootprint}</h4>
              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                {supplyChainData.carbon.comparisonToAverage}% lower than average
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{t.farmEmissions}</span>
                  <span className="text-sm text-gray-600">{supplyChainData.carbon.farmEmissions} CO₂e</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(supplyChainData.carbon.farmEmissions / supplyChainData.carbon.totalFootprint) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{t.transportEmissions}</span>
                  <span className="text-sm text-gray-600">{supplyChainData.carbon.transportEmissions} CO₂e</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(supplyChainData.carbon.transportEmissions / supplyChainData.carbon.totalFootprint) * 100}%` }}></div>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-800">{t.totalFootprint}</span>
                  <span className="text-sm font-medium text-gray-800">{supplyChainData.carbon.totalFootprint} CO₂e</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-green-200 rounded-lg">
            <h4 className="text-lg font-medium text-gray-800 mb-2">{t.whatThisMeans}</h4>
            <p className="text-gray-700">
              By choosing this product, you're supporting farming practices that produce {supplyChainData.carbon.comparisonToAverage}% less carbon emissions than conventional agriculture and distribution. That's like saving {Math.floor(supplyChainData.carbon.totalFootprint * 0.1)} kg of CO₂e emissions.
            </p>
          </div>
        </div>
      )}
      
      {/* QR Code Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-medium text-gray-800">{t.verifyAuthenticity}</h4>
            <p className="text-sm text-gray-600">{t.scanQRCode}</p>
          </div>
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
            {/* In a real implementation, we would generate an actual QR code here */}
            <FaQrcode size={64} className="text-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
} 