'use client';

import { useState } from 'react';
import { FaShoppingCart, FaHeart, FaStar, FaLeaf, FaTruck, FaQrcode, FaInfoCircle } from 'react-icons/fa';
import ProductTraceability from './ProductTraceability';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

export default function ProductCard({ product, onAddToCart }) {
  const { t } = useLanguage();
  const [isTraceabilityOpen, setIsTraceabilityOpen] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  
  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlist(!isWishlist);
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };
  
  const toggleTraceability = (e) => {
    e.stopPropagation();
    setIsTraceabilityOpen(!isTraceabilityOpen);
  };
  
  return (
    <div className="rounded-lg bg-white shadow-md overflow-hidden h-full flex flex-col relative">
      {/* Product Image */}
      <div className="relative aspect-square">
        <img 
          src={`${product.image}?w=400&h=400&fit=crop&crop=faces&auto=compress`} 
          alt={product.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Wishlist button */}
        <button 
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
        >
          <FaHeart className={isWishlist ? "text-red-500" : "text-gray-400"} />
        </button>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.organic && (
            <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
              <FaLeaf className="mr-1" size={12} />
              Organic
            </div>
          )}
          {product.freeDelivery && (
            <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
              <FaTruck className="mr-1" size={12} />
              Free Delivery
            </div>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">{product.name}</h3>
          <div className="flex items-center text-yellow-500">
            <FaStar size={14} />
            <span className="ml-1 text-sm text-gray-700">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex items-center mb-3">
          <img 
            src={`https://ui-avatars.com/api/?name=${product.farmer.name}&background=e9f5f0&color=16a34a&size=32`}
            alt={product.farmer.name}
            className="w-6 h-6 rounded-full mr-2 border border-gray-200"
          />
          <span className="text-sm text-gray-700">{product.farmer.name}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-gray-900 font-bold">
            ₹{product.price}
            <span className="text-sm text-gray-500 font-normal">/{product.unit}</span>
          </div>
          
          <div className="flex gap-2">
            {/* QR/Traceability Button */}
            <button
              onClick={toggleTraceability}
              className="p-2 text-gray-600 hover:text-green-600 bg-gray-100 hover:bg-green-50 rounded-full transition-colors"
              title="View Product Traceability"
            >
              <FaQrcode size={16} />
            </button>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <FaShoppingCart className="mr-1" size={14} />
              <span className="text-sm">Add</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Public QR Code Link */}
      <Link 
        href={`/trace/${product.id}`}
        className="absolute bottom-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors text-xs flex items-center"
      >
        <FaInfoCircle className="mr-1" size={12} />
        Verify Product
      </Link>
      
      {/* Traceability Modal */}
      {isTraceabilityOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={toggleTraceability}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Product Traceability</h2>
              <button onClick={toggleTraceability} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <ProductTraceability product={product} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 