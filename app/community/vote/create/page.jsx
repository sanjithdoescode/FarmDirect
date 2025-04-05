'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { FaPlus, FaTimes, FaExclamationTriangle, FaLock, FaGlobeAmericas, FaChartLine, FaSeedling } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CreatePollPage() {
  const { t } = useLanguage();
  const router = useRouter();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cropSeason, setCropSeason] = useState('kharif');
  const [pollType, setPollType] = useState('public');
  const [deadline, setDeadline] = useState('');
  const [options, setOptions] = useState([
    { cropName: '', description: '' },
    { cropName: '', description: '' }
  ]);
  const [location, setLocation] = useState({
    state: '',
    district: ''
  });
  
  // States for UI feedback
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [warnings, setWarnings] = useState([]);
  const [success, setSuccess] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  
  // For crop trends
  const [showingTrends, setShowingTrends] = useState(false);
  const [trends, setTrends] = useState({
    stats: null,
    trends: [],
    recommendations: []
  });
  
  // Mock location data (replace with actual API in production)
  const states = ['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh'];
  const districts = {
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Thanjavur', 'Salem'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
    'Kerala': ['Trivandrum', 'Kochi', 'Kozhikode', 'Thrissur'],
    'Andhra Pradesh': ['Hyderabad', 'Visakhapatnam', 'Vijayawada', 'Guntur']
  };
  
  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setHasLocationPermission(true);
          // In a real app, you would use a geocoding API to convert coordinates to state/district
        },
        (error) => {
          setHasLocationPermission(false);
        }
      );
    }
    
    // Set minimum deadline to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    setDeadline(tomorrowString);
  }, []);
  
  // Handle adding a new crop option
  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, { cropName: '', description: '' }]);
    }
  };
  
  // Handle removing a crop option
  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };
  
  // Handle option change
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };
  
  // Fetch crop trends for the selected region
  const fetchCropTrends = async () => {
    if (!location.state) {
      setErrorMessage('Please select a state to view crop trends.');
      return;
    }
    
    setLoading(true);
    setErrorMessage('');
    
    try {
      // API call to get crop trends
      const response = await fetch(`/api/community/polls/trends?state=${encodeURIComponent(location.state)}${location.district ? `&district=${encodeURIComponent(location.district)}` : ''}&season=${cropSeason}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch crop trends');
      }
      
      const data = await response.json();
      setTrends(data);
      setShowingTrends(true);
    } catch (error) {
      console.error('Error fetching crop trends:', error);
      setErrorMessage('Failed to fetch crop trends. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !description || !cropSeason || !deadline || !location.state) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    // Validate options
    const validOptions = options.filter(option => option.cropName.trim() !== '');
    if (validOptions.length < 2) {
      setErrorMessage('Please provide at least two crop options.');
      return;
    }
    
    setLoading(true);
    setErrorMessage('');
    setWarnings([]);
    
    try {
      // API call to create poll
      const response = await fetch('/api/community/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          cropSeason,
          pollType,
          deadline,
          location,
          options: validOptions
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.blockedCrops && data.blockedCrops.length > 0) {
          // Special handling for blocked crops
          setErrorMessage(`Some crops have reached the poll limit: ${data.blockedCrops.map(c => c.crop).join(', ')}`);
          return;
        }
        throw new Error(data.error || 'Failed to create poll');
      }
      
      // Handle warnings
      if (data.cropWarnings && data.cropWarnings.length > 0) {
        setWarnings(data.cropWarnings);
      }
      
      // Success - show confirmation and redirect
      setSuccess(true);
      setTimeout(() => {
        router.push('/community/vote');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating poll:', error);
      setErrorMessage(error.message || 'Failed to create poll. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Determine if showing warnings about potential oversupply based on trends
  const showCropWarning = (cropName) => {
    if (!showingTrends || !trends.trends || trends.trends.length === 0) return false;
    
    const cropTrend = trends.trends.find(t => t.crop.toLowerCase() === cropName.toLowerCase());
    return cropTrend && (cropTrend.status === 'warning' || cropTrend.status === 'limit_reached');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Farm Poll</h1>
          <p className="text-gray-600 mb-8">Ask the community what you should grow next</p>
          
          {/* Success message */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-lg">
              Poll created successfully! Redirecting...
            </div>
          )}
          
          {/* Error message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-800 rounded-lg">
              {errorMessage}
            </div>
          )}
          
          {/* Warnings */}
          {warnings.length > 0 && (
            <div className="mb-6 p-4 bg-amber-100 border border-amber-200 text-amber-800 rounded-lg">
              <h3 className="font-bold flex items-center mb-2">
                <FaExclamationTriangle className="mr-2" />
                Warning: Potential Crop Oversupply
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {warnings.map((warning, index) => (
                  <li key={index}>{warning.message}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Poll Creation Form */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Poll Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Poll Type</label>
                  <div className="flex space-x-4">
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${pollType === 'public' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                      <input
                        type="radio"
                        name="pollType"
                        value="public"
                        checked={pollType === 'public'}
                        onChange={() => setPollType('public')}
                        className="hidden"
                      />
                      <FaGlobeAmericas className={`mr-2 ${pollType === 'public' ? 'text-blue-500' : 'text-gray-400'}`} />
                      <div>
                        <span className="block font-medium">Public Poll</span>
                        <span className="text-sm text-gray-500">Visible to all community members</span>
                      </div>
                    </label>
                    
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${pollType === 'personal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                      <input
                        type="radio"
                        name="pollType"
                        value="personal"
                        checked={pollType === 'personal'}
                        onChange={() => setPollType('personal')}
                        className="hidden"
                      />
                      <FaLock className={`mr-2 ${pollType === 'personal' ? 'text-blue-500' : 'text-gray-400'}`} />
                      <div>
                        <span className="block font-medium">Personal Poll</span>
                        <span className="text-sm text-gray-500">Private - only you can see results</span>
                      </div>
                    </label>
                  </div>
                  {pollType === 'personal' && (
                    <p className="mt-2 text-sm text-blue-600">
                      Personal polls help you make decisions without influencing other farmers.
                    </p>
                  )}
                </div>
                
                {/* Basic Poll Information */}
                <div className="mb-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Poll Title</label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="E.g., 'Which vegetable should I grow next season?'"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide details about your farm, land area, and why you're creating this poll"
                    required
                  />
                </div>
                
                {/* Location Information */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Location Information</h3>
                  
                  {!hasLocationPermission && (
                    <p className="text-sm text-amber-700 mb-3">
                      <FaExclamationTriangle className="inline mr-1" />
                      Location permission not granted. Please select your location manually.
                    </p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <select
                        id="state"
                        value={location.state}
                        onChange={(e) => setLocation({ ...location, state: e.target.value, district: '' })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">District</label>
                      <select
                        id="district"
                        value={location.district}
                        onChange={(e) => setLocation({ ...location, district: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        disabled={!location.state}
                      >
                        <option value="">All Districts</option>
                        {location.state && districts[location.state]?.map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Crop Season & Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="cropSeason" className="block text-sm font-medium text-gray-700 mb-1">Crop Season</label>
                    <select
                      id="cropSeason"
                      value={cropSeason}
                      onChange={(e) => setCropSeason(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="kharif">Kharif (June-October)</option>
                      <option value="rabi">Rabi (October-March)</option>
                      <option value="zaid">Zaid (March-June)</option>
                      <option value="year-round">Year-round</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">Voting Deadline</label>
                    <input
                      id="deadline"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                {/* Check Region Trends Button */}
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={fetchCropTrends}
                    disabled={!location.state || loading}
                    className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    <FaChartLine className="mr-2" />
                    {loading ? 'Loading...' : 'Check Crop Trends in Your Region'}
                  </button>
                  <p className="mt-1 text-xs text-gray-500">
                    View anonymous data about what other farmers in your region are planning to grow
                  </p>
                </div>
                
                {/* Crop Trends Display */}
                {showingTrends && trends.stats && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Crop Trends in {trends.region.district !== 'All districts' ? `${trends.region.district}, ` : ''}{trends.region.state}
                    </h3>
                    
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mr-3">
                        {trends.stats.cropDiversity}%
                      </div>
                      <div>
                        <p className="font-medium">Crop Diversity Score</p>
                        <p className="text-sm text-gray-600">{trends.stats.diversityMessage}</p>
                      </div>
                    </div>
                    
                    {/* Recommendations */}
                    {trends.recommendations.length > 0 && (
                      <div className="mb-4 space-y-3">
                        {trends.recommendations.map((rec, index) => (
                          <div 
                            key={index} 
                            className={`p-3 rounded-lg ${
                              rec.type === 'warning' ? 'bg-red-50 border border-red-100' :
                              rec.type === 'suggestion' ? 'bg-green-50 border border-green-100' :
                              'bg-blue-50 border border-blue-100'
                            }`}
                          >
                            <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                            <p className="text-sm text-gray-700">{rec.message}</p>
                            
                            {rec.crops && rec.type === 'suggestion' && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {rec.crops.map((crop, idx) => (
                                  <span 
                                    key={idx}
                                    className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                                  >
                                    <FaSeedling className="mr-1" />
                                    {crop.name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Popular Crops Chart */}
                    {trends.trends.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Popular Crops in Your Region</h4>
                        <div className="space-y-3">
                          {trends.trends.slice(0, 5).map((crop, index) => (
                            <div key={index}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">{crop.crop}</span>
                                <span className={`${
                                  crop.status === 'limit_reached' ? 'text-red-600' :
                                  crop.status === 'warning' ? 'text-amber-600' :
                                  'text-gray-600'
                                }`}>
                                  {Math.round(crop.percentageOfLimit)}% of limit
                                </span>
                              </div>
                              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`absolute top-0 left-0 h-full ${
                                    crop.status === 'limit_reached' ? 'bg-red-500' :
                                    crop.status === 'warning' ? 'bg-amber-500' :
                                    'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min(100, crop.percentageOfLimit)}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Poll Options */}
                <div className="mb-6">
                  <label className="block text-lg font-medium text-gray-900 mb-3">Crop Options</label>
                  <p className="text-sm text-gray-600 mb-4">Add the crops you're considering growing</p>
                  
                  {options.map((option, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-lg relative">
                      {index >= 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                          aria-label="Remove option"
                        >
                          <FaTimes />
                        </button>
                      )}
                      
                      <div className="mb-3">
                        <label htmlFor={`crop-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                        <input
                          id={`crop-${index}`}
                          type="text"
                          value={option.cropName}
                          onChange={(e) => handleOptionChange(index, 'cropName', e.target.value)}
                          className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                            showCropWarning(option.cropName) ? 'border-amber-300 bg-amber-50' : 'border-gray-300'
                          }`}
                          placeholder="E.g., Tomatoes, Rice, Spinach"
                          required={index < 2}
                        />
                        
                        {/* Warning for crops approaching limits */}
                        {showCropWarning(option.cropName) && option.cropName && (
                          <p className="mt-1 text-xs text-amber-600 flex items-center">
                            <FaExclamationTriangle className="mr-1" />
                            This crop is popular in your region and may lead to oversupply
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Option Description (optional)</label>
                        <input
                          id={`description-${index}`}
                          type="text"
                          value={option.description}
                          onChange={(e) => handleOptionChange(index, 'description', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="E.g., 'Organic variety', 'High-yield hybrid'"
                        />
                      </div>
                    </div>
                  ))}
                  
                  {options.length < 6 && (
                    <button
                      type="button"
                      onClick={addOption}
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                      <FaPlus className="mr-2" />
                      Add Another Option
                    </button>
                  )}
                </div>
                
                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading || success}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? 'Creating Poll...' : 'Create Poll'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 