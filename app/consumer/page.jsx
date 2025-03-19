'use client';

import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

export default function ConsumerPage() {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">For Consumers</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Shop fresh produce directly from local farmers. Get better quality, better prices, and support sustainable farming.
          </p>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FarmDirect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 text-4xl mb-4">🥬</div>
              <h3 className="text-xl font-bold mb-2">Fresh Produce</h3>
              <p className="text-gray-600">
                Get farm-fresh produce delivered directly to your doorstep, often harvested within 24 hours.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Better Prices</h3>
              <p className="text-gray-600">
                Save money by buying directly from farmers, eliminating middlemen costs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-2">Support Local</h3>
              <p className="text-gray-600">
                Help local farmers thrive and contribute to your community's economy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-gray-600">
                Know exactly where your food comes from and how it's grown.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Convenient Delivery</h3>
              <p className="text-gray-600">
                Get your groceries delivered to your doorstep at your preferred time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">
                Reduce your carbon footprint by supporting local food systems.
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
                  <h3 className="text-xl font-bold mb-2">Browse Products</h3>
                  <p className="text-gray-600">
                    Explore fresh produce from local farmers. Filter by category, price, and location.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold mb-2">Add to Cart</h3>
                  <p className="text-gray-600">
                    Select your items and quantities. Review your cart before checkout.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold mb-2">Checkout</h3>
                  <p className="text-gray-600">
                    Choose your delivery address and payment method. Place your order.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold mb-2">Receive Delivery</h3>
                  <p className="text-gray-600">
                    Get your fresh produce delivered to your doorstep at your chosen time.
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
          <h2 className="text-3xl font-bold mb-6">Ready to Shop?</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Join thousands of customers who are already enjoying fresh produce from local farmers.
          </p>
          <Link 
            href="/dashboard/consumer/store"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-block"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 