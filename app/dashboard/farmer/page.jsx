'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FaCloudUploadAlt, FaImages, FaBox, FaTag, FaRupeeSign, FaWeightHanging, FaCalendarDay, FaClock, FaInfo } from 'react-icons/fa';

export default function FarmerDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('upload');
  const [productImages, setProductImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    category: 'vegetables',
    description: '',
    price: '',
    unit: 'kg',
    quantity: '',
    harvestDate: '',
    availability: '7',
    organic: false,
    freeDelivery: false,
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages([...productImages, ...files]);
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    const newImages = [...productImages];
    const newPreviews = [...previewUrls];
    
    // Revoke the URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setProductImages(newImages);
    setPreviewUrls(newPreviews);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form data:', formData);
    console.log('Images:', productImages);
    
    // Show success message
    alert('Product added successfully!');
    
    // Reset form
    setFormData({
      productName: '',
      category: 'vegetables',
      description: '',
      price: '',
      unit: 'kg',
      quantity: '',
      harvestDate: '',
      availability: '7',
      organic: false,
      freeDelivery: false,
    });
    setProductImages([]);
    setPreviewUrls([]);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">Farmer Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your farm products and sales</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-green-600 text-white">
                <h2 className="text-xl font-bold">Farmer Name</h2>
                <p className="text-green-100">Organic Vegetable Farm</p>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setActiveTab('upload')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                        activeTab === 'upload' ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FaCloudUploadAlt className="mr-3" />
                      Upload Products
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('inventory')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                        activeTab === 'inventory' ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FaBox className="mr-3" />
                      My Inventory
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                        activeTab === 'orders' ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FaTag className="mr-3" />
                      Orders
                    </button>
                  </li>
                </ul>
              </nav>
              
              <div className="p-4 border-t">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800">Quick Stats</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Products</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Orders</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Earnings</span>
                      <span className="font-medium">₹15,240</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            {activeTab === 'upload' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-800">Upload New Product</h2>
                  <p className="text-gray-600 text-sm mt-1">Add details about your fresh farm produce</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div className="col-span-2">
                      <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g. Fresh Organic Tomatoes"
                        required
                      />
                    </div>
                    
                    {/* Category */}
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      >
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="grains">Grains</option>
                        <option value="dairy">Dairy Products</option>
                        <option value="poultry">Poultry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    {/* Price & Unit */}
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                          Price
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRupeeSign className="text-gray-400" />
                          </div>
                          <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="w-1/3">
                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                          Unit
                        </label>
                        <select
                          id="unit"
                          name="unit"
                          value={formData.unit}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        >
                          <option value="kg">Kilogram (kg)</option>
                          <option value="g">Gram (g)</option>
                          <option value="piece">Piece</option>
                          <option value="dozen">Dozen</option>
                          <option value="l">Liter (l)</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Quantity & Availability */}
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                        Available Quantity
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaWeightHanging className="text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="0"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                        Available For (Days)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendarDay className="text-gray-400" />
                        </div>
                        <select
                          id="availability"
                          name="availability"
                          value={formData.availability}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        >
                          <option value="1">1 day</option>
                          <option value="3">3 days</option>
                          <option value="7">1 week</option>
                          <option value="14">2 weeks</option>
                          <option value="30">1 month</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Harvest Date */}
                    <div>
                      <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Harvest Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaClock className="text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="harvestDate"
                          name="harvestDate"
                          value={formData.harvestDate}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                    
                    {/* Options */}
                    <div className="col-span-2 flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="organic"
                          checked={formData.organic}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 rounded"
                        />
                        <span className="ml-2 text-gray-700">Certified Organic</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="freeDelivery"
                          checked={formData.freeDelivery}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 rounded"
                        />
                        <span className="ml-2 text-gray-700">Free Delivery</span>
                      </label>
                    </div>
                    
                    {/* Description */}
                    <div className="col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Product Description
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 text-gray-400">
                          <FaInfo />
                        </div>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Describe your product, including details about quality, taste, and growing methods..."
                          required
                        ></textarea>
                      </div>
                    </div>
                    
                    {/* Product Images */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Images
                      </label>
                      
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <FaImages className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                              <span>Upload images</span>
                              <input 
                                id="file-upload" 
                                name="file-upload" 
                                type="file" 
                                className="sr-only" 
                                multiple 
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                      
                      {/* Image Previews */}
                      {previewUrls.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          {previewUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={url} 
                                alt={`Preview ${index + 1}`} 
                                className="h-24 w-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      className="mr-4 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Upload Product
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'inventory' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-800">My Inventory</h2>
                  <p className="text-gray-600 text-sm mt-1">Manage your current product listings</p>
                </div>
                
                <div className="p-6">
                  <div className="text-center py-12">
                    <FaBox className="mx-auto h-16 w-16 text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No products yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding your first product.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => setActiveTab('upload')}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                  <p className="text-gray-600 text-sm mt-1">Track and manage your customer orders</p>
                </div>
                
                <div className="p-6">
                  <div className="text-center py-12">
                    <FaTag className="mx-auto h-16 w-16 text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Your order history will appear here.</p>
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