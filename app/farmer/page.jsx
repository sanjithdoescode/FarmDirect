'use client';

import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

export default function FarmerPage() {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">For Farmers</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our platform to connect directly with consumers, get better prices for your produce, and grow your farming business.
          </p>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join FarmDirect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Better Prices</h3>
              <p className="text-gray-600">
                Eliminate middlemen and get fair prices for your produce directly from consumers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">Direct Connection</h3>
              <p className="text-gray-600">
                Build relationships with your customers and understand their needs better.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Easy Management</h3>
              <p className="text-gray-600">
                Manage your inventory, orders, and payments all in one place.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Market Insights</h3>
              <p className="text-gray-600">
                Get valuable data about market trends and consumer preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Logistics Support</h3>
              <p className="text-gray-600">
                Access our network of delivery partners for reliable shipping.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-2">Sustainable Growth</h3>
              <p className="text-gray-600">
                Join a community committed to sustainable farming practices.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
                  <p className="text-gray-600">
                    Sign up and create your farmer profile. Add details about your farm, products, and farming practices.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold mb-2">List Your Products</h3>
                  <p className="text-gray-600">
                    Upload photos and descriptions of your products. Set your prices and available quantities.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold mb-2">Receive Orders</h3>
                  <p className="text-gray-600">
                    Get notified when customers place orders. Process orders and prepare for delivery.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold mb-2">Get Paid</h3>
                  <p className="text-gray-600">
                    Receive payments directly to your account. Track your earnings and growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Join thousands of farmers who are already growing their business with FarmDirect.
          </p>
          <Link 
            href="/dashboard/farmer"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-block"
          >
            Create Your Farmer Account
          </Link>
        </div>
      </div>
    </div>
  );
} 