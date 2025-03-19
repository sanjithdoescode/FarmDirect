'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { FaFilter, FaSearch, FaShoppingCart, FaHeart, FaStar, FaMapMarkerAlt, FaLeaf, FaTruck } from 'react-icons/fa';
import Link from 'next/link';

export default function Store() {
  const { t } = useLanguage();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    organic: false,
    freeDelivery: false,
    rating: 'all',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Mock farmer data
  const farmers = [
    { id: 1, name: 'Lakshmi Farms', location: 'Coimbatore, Tamil Nadu', rating: 4.8 },
    { id: 2, name: 'Hill Valley Farms', location: 'Ooty, Tamil Nadu', rating: 4.6 },
    { id: 3, name: 'Paddy Organics', location: 'Thanjavur, Tamil Nadu', rating: 4.9 },
    { id: 4, name: 'Green Earth Farm', location: 'Salem, Tamil Nadu', rating: 4.7 },
    { id: 5, name: 'Nature\'s Bounty', location: 'Madurai, Tamil Nadu', rating: 4.5 },
  ];
  
  // Mock product data
  useEffect(() => {
    // Simulating an API call to fetch products
    const mockProducts = [
      {
        id: 1,
        name: 'Organic Tomatoes',
        category: 'vegetables',
        description: 'Fresh, juicy tomatoes grown without pesticides. Perfect for salads and cooking.',
        price: 70,
        unit: 'kg',
        quantity: 25,
        farmer: farmers[0],
        image: 'https://images.unsplash.com/photo-1546104454-c2c86581704e',
        rating: 4.8,
        reviews: 24,
        organic: true,
        freeDelivery: true,
        harvestDate: '2023-09-20'
      },
      {
        id: 2,
        name: 'Fresh Spinach',
        category: 'vegetables',
        description: 'Nutrient-rich spinach leaves, harvested fresh from our farm.',
        price: 40,
        unit: '500g',
        quantity: 15,
        farmer: farmers[1],
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
        rating: 4.5,
        reviews: 18,
        organic: true,
        freeDelivery: false,
        harvestDate: '2023-09-21'
      },
      {
        id: 3,
        name: 'Organic Mangoes',
        category: 'fruits',
        description: 'Sweet and juicy alphonso mangoes, grown organically.',
        price: 200,
        unit: 'kg',
        quantity: 30,
        farmer: farmers[2],
        image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed',
        rating: 4.9,
        reviews: 42,
        organic: true,
        freeDelivery: true,
        harvestDate: '2023-09-18'
      },
      {
        id: 4,
        name: 'Farm Fresh Eggs',
        category: 'dairy',
        description: 'Free-range eggs from happy hens, rich in nutrients.',
        price: 120,
        unit: 'dozen',
        quantity: 20,
        farmer: farmers[0],
        image: 'https://images.unsplash.com/photo-1489782419474-4d4221dc5b10',
        rating: 4.7,
        reviews: 31,
        organic: false,
        freeDelivery: true,
        harvestDate: '2023-09-21'
      },
      {
        id: 5,
        name: 'Organic Brown Rice',
        category: 'grains',
        description: 'Nutritious brown rice grown using traditional farming methods.',
        price: 95,
        unit: 'kg',
        quantity: 50,
        farmer: farmers[2],
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac',
        rating: 4.6,
        reviews: 27,
        organic: true,
        freeDelivery: false,
        harvestDate: '2023-09-15'
      },
      {
        id: 6,
        name: 'Fresh Carrots',
        category: 'vegetables',
        description: 'Crunchy and sweet carrots, freshly harvested.',
        price: 60,
        unit: 'kg',
        quantity: 35,
        farmer: farmers[3],
        image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979',
        rating: 4.4,
        reviews: 19,
        organic: false,
        freeDelivery: true,
        harvestDate: '2023-09-19'
      },
      {
        id: 7,
        name: 'Strawberries',
        category: 'fruits',
        description: 'Sweet and juicy strawberries from our hill farms.',
        price: 120,
        unit: '250g',
        quantity: 15,
        farmer: farmers[1],
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6',
        rating: 4.8,
        reviews: 36,
        organic: false,
        freeDelivery: false,
        harvestDate: '2023-09-21'
      },
      {
        id: 8,
        name: 'Organic Honey',
        category: 'other',
        description: 'Pure, raw honey collected from our bee farms.',
        price: 350,
        unit: '500g',
        quantity: 10,
        farmer: farmers[4],
        image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924',
        rating: 4.9,
        reviews: 45,
        organic: true,
        freeDelivery: true,
        harvestDate: '2023-09-10'
      },
      {
        id: 9,
        name: 'Fresh Potatoes',
        category: 'vegetables',
        description: 'Farm fresh potatoes perfect for cooking.',
        price: 30,
        unit: 'kg',
        quantity: 100,
        farmer: farmers[3],
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
        rating: 4.3,
        reviews: 22,
        organic: false,
        freeDelivery: true,
        harvestDate: '2023-09-17'
      },
      {
        id: 10,
        name: 'Organic Milk',
        category: 'dairy',
        description: 'Fresh, creamy milk from grass-fed cows.',
        price: 65,
        unit: 'liter',
        quantity: 20,
        farmer: farmers[0],
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
        rating: 4.7,
        reviews: 33,
        organic: true,
        freeDelivery: false,
        harvestDate: '2023-09-21'
      },
      {
        id: 11,
        name: 'Fresh Cucumber',
        category: 'vegetables',
        description: 'Crisp and refreshing cucumbers, perfect for salads.',
        price: 40,
        unit: 'kg',
        quantity: 45,
        farmer: farmers[1],
        image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6',
        rating: 4.4,
        reviews: 17,
        organic: false,
        freeDelivery: true,
        harvestDate: '2023-09-20'
      },
      {
        id: 12,
        name: 'Organic Bananas',
        category: 'fruits',
        description: 'Sweet and nutritious bananas grown organically.',
        price: 80,
        unit: 'dozen',
        quantity: 25,
        farmer: farmers[4],
        image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
        rating: 4.6,
        reviews: 28,
        organic: true,
        freeDelivery: true,
        harvestDate: '2023-09-19'
      }
    ];
    
    setProducts(mockProducts);
  }, []);
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };
  
  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // If product already exists in cart, update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // If product is new to cart, add it
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    // Open cart
    setIsCartOpen(true);
  };
  
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };
  
  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
  };
  
  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const filterProducts = () => {
    return products.filter(product => {
      // Filter by search query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      
      // Filter by price range
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (product.price < min || (max && product.price > max)) {
          return false;
        }
      }
      
      // Filter by organic
      if (filters.organic && !product.organic) {
        return false;
      }
      
      // Filter by free delivery
      if (filters.freeDelivery && !product.freeDelivery) {
        return false;
      }
      
      // Filter by rating
      if (filters.rating !== 'all') {
        const minRating = Number(filters.rating);
        if (product.rating < minRating) {
          return false;
        }
      }
      
      return true;
    });
  };
  
  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const filteredProducts = filterProducts();
  
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Farm Fresh Store</h1>
            <p className="text-gray-600 mt-2">Browse fresh produce directly from local farmers</p>
          </div>
          <div className="relative">
            <button 
              onClick={toggleCart}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              <span>Cart ({cartItems.length})</span>
            </button>
            
            {/* Cart Dropdown */}
            {isCartOpen && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-800">Your Cart ({cartItems.length})</h3>
                </div>
                
                <div className="max-h-96 overflow-y-auto p-4">
                  {cartItems.length > 0 ? (
                    <div className="space-y-4">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <div className="h-16 w-16 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3';
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">₹{item.price} / {item.unit}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FaShoppingCart className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-gray-600">Your cart is empty</p>
                    </div>
                  )}
                </div>
                
                {cartItems.length > 0 && (
                  <>
                    <div className="p-4 border-t">
                      <div className="flex justify-between font-medium">
                        <span>Subtotal:</span>
                        <span>₹{calculateCartTotal()}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Shipping and delivery charges calculated at checkout</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-b-lg">
                      <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="lg:hidden mb-4">
            <button 
              onClick={toggleFilterPanel}
              className="w-full px-4 py-2 bg-white border rounded-lg shadow-sm flex items-center justify-center"
            >
              <FaFilter className="mr-2" />
              {isFilterPanelOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters - Sidebar */}
          <div className={`lg:w-1/4 ${isFilterPanelOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                  />
                  <div className="absolute top-3 left-3 text-gray-400">
                    <FaSearch />
                  </div>
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === 'all'}
                      onChange={() => handleFilterChange('category', 'all')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">All Categories</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === 'vegetables'}
                      onChange={() => handleFilterChange('category', 'vegetables')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Vegetables</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === 'fruits'}
                      onChange={() => handleFilterChange('category', 'fruits')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Fruits</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === 'dairy'}
                      onChange={() => handleFilterChange('category', 'dairy')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Dairy & Eggs</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === 'grains'}
                      onChange={() => handleFilterChange('category', 'grains')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Grains</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === 'other'}
                      onChange={() => handleFilterChange('category', 'other')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Other Products</span>
                  </label>
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange === 'all'}
                      onChange={() => handleFilterChange('priceRange', 'all')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">All Prices</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange === '0-50'}
                      onChange={() => handleFilterChange('priceRange', '0-50')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Under ₹50</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange === '50-100'}
                      onChange={() => handleFilterChange('priceRange', '50-100')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">₹50 - ₹100</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange === '100-200'}
                      onChange={() => handleFilterChange('priceRange', '100-200')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">₹100 - ₹200</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange === '200-'}
                      onChange={() => handleFilterChange('priceRange', '200-')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">₹200 & Above</span>
                  </label>
                </div>
              </div>
              
              {/* Other Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Other Filters</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.organic}
                      onChange={() => handleFilterChange('organic', !filters.organic)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 flex items-center">
                      <FaLeaf className="text-green-500 mr-1" /> Organic Products
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.freeDelivery}
                      onChange={() => handleFilterChange('freeDelivery', !filters.freeDelivery)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 flex items-center">
                      <FaTruck className="text-green-500 mr-1" /> Free Delivery
                    </span>
                  </label>
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === 'all'}
                      onChange={() => handleFilterChange('rating', 'all')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">All Ratings</span>
                  </label>
                  {[4, 3].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating.toString()}
                        onChange={() => handleFilterChange('rating', rating.toString())}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-xs ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-1">& Up</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Reset Filters */}
              <button
                onClick={() => setFilters({
                  category: 'all',
                  priceRange: 'all',
                  organic: false,
                  freeDelivery: false,
                  rating: 'all',
                })}
                className="w-full py-2 text-green-600 border border-green-600 rounded hover:bg-green-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="lg:w-3/4">
            {/* Results Summary */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-medium">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Sort by:</span>
                <select className="border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    <div className="h-48 w-full bg-gray-200 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3';
                        }}
                      />
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-500 shadow-sm hover:text-red-500 transition-colors">
                        <FaHeart />
                      </button>
                      {product.organic && (
                        <span className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <FaLeaf className="mr-1" /> Organic
                        </span>
                      )}
                    </div>
                    
                    <div className="p-4 flex-grow">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400 text-xs">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mt-1">{product.name}</h3>
                      
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>by {product.farmer.name}</span>
                      </div>
                      
                      <div className="mt-2 flex items-center">
                        <FaMapMarkerAlt className="text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{product.farmer.location}</span>
                      </div>
                      
                      <p className="mt-2 text-xs text-gray-600 line-clamp-2">{product.description}</p>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-gray-900">₹{product.price}</span>
                          <span className="text-xs text-gray-500 ml-1">/ {product.unit}</span>
                        </div>
                        {product.freeDelivery && (
                          <span className="text-xs text-green-600 flex items-center">
                            <FaTruck className="mr-1" /> Free Delivery
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 border-t">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-1 text-sm text-gray-600">Try adjusting your filters or search term</p>
                  <button
                    onClick={() => {
                      setFilters({
                        category: 'all',
                        priceRange: 'all',
                        organic: false,
                        freeDelivery: false,
                        rating: 'all',
                      });
                      setSearchQuery('');
                    }}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 