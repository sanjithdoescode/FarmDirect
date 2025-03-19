'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FaShoppingCart, FaHeart, FaHistory, FaUser, FaMapMarkerAlt, FaInfoCircle, FaStore } from 'react-icons/fa';
import Link from 'next/link';

export default function ConsumerDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      address: '123 Main Street, Apartment 4B',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600001',
      isDefault: true
    },
    {
      id: 2,
      name: 'Work',
      address: '456 Office Park, Building C',
      city: 'Chennai', 
      state: 'Tamil Nadu',
      postalCode: '600002',
      isDefault: false
    }
  ]);
  
  const [orderHistory, setOrderHistory] = useState([
    {
      id: 'ORD-001',
      date: '2023-08-15',
      items: [
        { name: 'Fresh Tomatoes', quantity: '2 kg', price: '₹180' },
        { name: 'Organic Carrots', quantity: '1 kg', price: '₹120' }
      ],
      total: '₹300',
      status: 'Delivered'
    },
    {
      id: 'ORD-002',
      date: '2023-09-02',
      items: [
        { name: 'Fresh Spinach', quantity: '500 g', price: '₹60' },
        { name: 'Organic Potatoes', quantity: '3 kg', price: '₹210' },
        { name: 'Farm Eggs', quantity: '12 pcs', price: '₹120' }
      ],
      total: '₹390',
      status: 'Processing'
    }
  ]);
  
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: 'Organic Honey',
      farmer: 'Lakshmi Farms',
      price: '₹350',
      image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924'
    },
    {
      id: 2,
      name: 'Fresh Strawberries',
      farmer: 'Hill Valley Farms',
      price: '₹280',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6'
    },
    {
      id: 3,
      name: 'Organic Brown Rice',
      farmer: 'Paddy Organics',
      price: '₹180',
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6'
    }
  ]);

  return (
    <>
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">Consumer Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your shopping, orders, and preferences</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-green-600 text-white">
                <h2 className="text-xl font-bold">Welcome, Raj</h2>
                <p className="text-green-100">Member since January 2023</p>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/dashboard/consumer/store"
                      className="w-full text-left px-4 py-2 rounded-md flex items-center text-gray-700 hover:bg-gray-100"
                    >
                      <FaStore className="mr-3" />
                      Browse Store
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                        activeTab === 'profile' ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FaUser className="mr-3" />
                      My Profile
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                        activeTab === 'orders' ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FaHistory className="mr-3" />
                      Order History
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('wishlist')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                        activeTab === 'wishlist' ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FaHeart className="mr-3" />
                      Wishlist
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('addresses')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                        activeTab === 'addresses' ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FaMapMarkerAlt className="mr-3" />
                      Saved Addresses
                    </button>
                  </li>
                </ul>
              </nav>
              
              <div className="p-4 border-t">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800">Account Summary</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Orders</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wishlist Items</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saved Addresses</span>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
                  <p className="text-gray-600 text-sm mt-1">Manage your personal information</p>
                </div>
                
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          defaultValue="Raj"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          defaultValue="Kumar"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          defaultValue="raj.kumar@example.com"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          defaultValue="+91 9876543210"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Communication Preferences</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="emailNotifications"
                            name="emailNotifications"
                            defaultChecked
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                            Email notifications for orders and promotions
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="smsNotifications"
                            name="smsNotifications"
                            defaultChecked
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-700">
                            SMS notifications for order updates
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Order History Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-800">Order History</h2>
                  <p className="text-gray-600 text-sm mt-1">View and track your previous orders</p>
                </div>
                
                <div className="p-6">
                  {orderHistory.length > 0 ? (
                    <div className="space-y-6">
                      {orderHistory.map((order) => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 p-4 flex items-center justify-between">
                            <div>
                              <span className="text-sm text-gray-500">Order ID: </span>
                              <span className="font-medium">{order.id}</span>
                              <span className="ml-4 text-sm text-gray-500">Date: </span>
                              <span className="font-medium">{order.date}</span>
                            </div>
                            <div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <table className="w-full">
                              <thead className="text-xs text-gray-700 uppercase border-b">
                                <tr>
                                  <th className="px-4 py-2 text-left">Item</th>
                                  <th className="px-4 py-2 text-left">Quantity</th>
                                  <th className="px-4 py-2 text-right">Price</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y">
                                {order.items.map((item, idx) => (
                                  <tr key={idx}>
                                    <td className="px-4 py-3">{item.name}</td>
                                    <td className="px-4 py-3">{item.quantity}</td>
                                    <td className="px-4 py-3 text-right">{item.price}</td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot className="border-t">
                                <tr>
                                  <td colSpan="2" className="px-4 py-3 text-right font-medium">Total:</td>
                                  <td className="px-4 py-3 text-right font-bold">{order.total}</td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                          
                          <div className="bg-gray-50 p-4 flex justify-end">
                            <button className="px-4 py-2 text-green-600 hover:text-green-700 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FaHistory className="mx-auto h-16 w-16 text-gray-300" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
                      <p className="mt-1 text-sm text-gray-500">Once you place orders, they will appear here.</p>
                      <div className="mt-6">
                        <Link
                          href="/dashboard/consumer/store"
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Browse Store
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-800">My Wishlist</h2>
                  <p className="text-gray-600 text-sm mt-1">Products you've saved for later</p>
                </div>
                
                <div className="p-6">
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((item) => (
                        <div key={item.id} className="border rounded-lg overflow-hidden">
                          <div className="h-48 w-full bg-gray-200 relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3';
                              }}
                            />
                            <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm hover:text-red-600 transition-colors">
                              <FaHeart />
                            </button>
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.farmer}</p>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="font-bold text-gray-900">{item.price}</span>
                              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FaHeart className="mx-auto h-16 w-16 text-gray-300" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                      <p className="mt-1 text-sm text-gray-500">Save items you like while browsing the store.</p>
                      <div className="mt-6">
                        <Link
                          href="/dashboard/consumer/store"
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Browse Store
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Saved Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-800">Saved Addresses</h2>
                  <p className="text-gray-600 text-sm mt-1">Manage your delivery addresses</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedAddresses.map((address) => (
                      <div key={address.id} className={`border rounded-lg p-4 ${address.isDefault ? 'border-green-500' : ''}`}>
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{address.name}</h3>
                          {address.isDefault && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Default</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{address.address}</p>
                        <p className="text-gray-600 text-sm">{address.city}, {address.state} {address.postalCode}</p>
                        
                        <div className="mt-4 flex justify-end space-x-2">
                          <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
                            Edit
                          </button>
                          {!address.isDefault && (
                            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
                              Set as Default
                            </button>
                          )}
                          {!address.isDefault && (
                            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {/* Add New Address Card */}
                    <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center">
                      <FaMapMarkerAlt className="text-gray-400 text-3xl mb-2" />
                      <h3 className="font-medium text-gray-900">Add New Address</h3>
                      <p className="text-gray-500 text-sm mt-1">Save a new delivery location</p>
                      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                        Add Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 