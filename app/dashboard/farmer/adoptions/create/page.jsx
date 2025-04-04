'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../../../context/LanguageContext';
import { 
  FaCloudUploadAlt, FaLeaf, FaMapMarkerAlt, FaCalendarAlt, 
  FaRupeeSign, FaInfoCircle, FaImage, FaCheck, FaArrowLeft, 
  FaArrowRight, FaEye
} from 'react-icons/fa';

export default function CreateAdoptionListing() {
  const { t } = useLanguage();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    cropName: '',
    cropType: 'fruit',
    description: '',
    location: '',
    growthStage: 'seedling',
    harvestDate: '',
    price: '',
    duration: '3',
    quantity: '1',
    benefits: {
      photos: true,
      updates: true,
      certificate: true,
      harvest: false,
      visit: false
    },
    story: '',
    farmingPractices: 'organic',
    deliveryOptions: 'pickup',
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    
    // Revoke the URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('benefits.')) {
      const benefitName = name.split('.')[1];
      setFormData({
        ...formData,
        benefits: {
          ...formData.benefits,
          [benefitName]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form data:', formData);
    console.log('Images:', images);
    
    // Show success message and redirect
    alert('Your crop has been listed for adoption successfully!');
    router.push('/dashboard/farmer');
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Define benefit descriptions
  const benefitDescriptions = {
    photos: "Monthly progress photos of your adopted crop",
    updates: "Regular updates on growth and care",
    certificate: "Digital adoption certificate with your name",
    harvest: "Share of the harvest delivered to you",
    visit: "Opportunity to visit the farm and your adopted crop"
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.push('/dashboard/farmer')}
            className="text-green-700 hover:text-green-900 mr-3"
          >
            <FaArrowLeft className="inline mr-1" /> Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800">List Your Crop for Adoption</h1>
        </div>
        
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                    ${currentStep >= step ? 'bg-green-600' : 'bg-gray-300'}`}
                >
                  {step}
                </div>
                <span className={`text-sm mt-2 ${currentStep >= step ? 'text-green-600' : 'text-gray-500'}`}>
                  {step === 1 && "Basic Info"}
                  {step === 2 && "Adoption Details"}
                  {step === 3 && "Crop Story"}
                  {step === 4 && "Preview & Submit"}
                </span>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto mt-2 h-1 bg-gray-200">
            <div 
              className="h-full bg-green-600 transition-all duration-300" 
              style={{ width: `${(currentStep - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {currentStep === 1 && "Basic Crop Information"}
                  {currentStep === 2 && "Adoption Details"}
                  {currentStep === 3 && "Tell Your Crop's Story"}
                  {currentStep === 4 && "Preview & Submit Your Listing"}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {currentStep === 1 && "Tell us about the crop you're offering for adoption"}
                  {currentStep === 2 && "Set pricing and benefits for adopters"}
                  {currentStep === 3 && "Share your farming practices and crop details"}
                  {currentStep === 4 && "Review your listing before submitting"}
                </p>
              </div>
              
              {currentStep === 4 && (
                <button 
                  type="button"
                  onClick={togglePreview}
                  className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  <FaEye className="mr-2" />
                  {showPreview ? "Edit Listing" : "Preview Listing"}
                </button>
              )}
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Crop Name */}
                    <div>
                      <label htmlFor="cropName" className="block text-sm font-medium text-gray-700 mb-1">
                        Crop Name*
                      </label>
                      <input
                        type="text"
                        id="cropName"
                        name="cropName"
                        value={formData.cropName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                        placeholder="e.g. Alphonso Mango Tree"
                        required
                      />
                    </div>
                    
                    {/* Crop Type */}
                    <div>
                      <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">
                        Crop Type*
                      </label>
                      <select
                        id="cropType"
                        name="cropType"
                        value={formData.cropType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                        required
                      >
                        <option value="fruit">Fruit</option>
                        <option value="vegetable">Vegetable</option>
                        <option value="grain">Grain/Rice</option>
                        <option value="spice">Spice</option>
                        <option value="herb">Herb</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    {/* Location */}
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Farm Location*
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                        placeholder="e.g. Green Farms, Coimbatore"
                        required
                      />
                    </div>
                    
                    {/* Growth Stage */}
                    <div>
                      <label htmlFor="growthStage" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Growth Stage*
                      </label>
                      <select
                        id="growthStage"
                        name="growthStage"
                        value={formData.growthStage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                        required
                      >
                        <option value="seedling">Seedling</option>
                        <option value="growing">Growing</option>
                        <option value="flowering">Flowering</option>
                        <option value="fruiting">Fruiting</option>
                        <option value="mature">Mature</option>
                      </select>
                    </div>
                    
                    {/* Harvest Date */}
                    <div>
                      <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expected Harvest Date*
                      </label>
                      <input
                        type="date"
                        id="harvestDate"
                        name="harvestDate"
                        value={formData.harvestDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                        required
                      />
                    </div>
                    
                    {/* Farming Practices */}
                    <div>
                      <label htmlFor="farmingPractices" className="block text-sm font-medium text-gray-700 mb-1">
                        Farming Practices*
                      </label>
                      <select
                        id="farmingPractices"
                        name="farmingPractices"
                        value={formData.farmingPractices}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                        required
                      >
                        <option value="organic">Organic</option>
                        <option value="natural">Natural (No Certification)</option>
                        <option value="traditional">Traditional Methods</option>
                        <option value="conventional">Conventional</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Short Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                      placeholder="Briefly describe the crop available for adoption"
                      required
                    ></textarea>
                  </div>
                </div>
              )}
              
              {/* Step 2: Adoption Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Adoption Price */}
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Adoption Price (₹)*
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
                          className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                          placeholder="1500"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Suggested: ₹1,000-3,000 for vegetables, ₹3,000-7,000 for fruit trees</p>
                    </div>
                    
                    {/* Duration */}
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                        Adoption Duration (months)*
                      </label>
                      <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                        required
                      >
                        <option value="3">3 months</option>
                        <option value="6">6 months</option>
                        <option value="9">9 months</option>
                        <option value="12">12 months</option>
                      </select>
                    </div>
                    
                    {/* Quantity Available */}
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity Available for Adoption*
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                        min="1"
                        required
                      />
                    </div>
                    
                    {/* Delivery Options */}
                    <div>
                      <label htmlFor="deliveryOptions" className="block text-sm font-medium text-gray-700 mb-1">
                        Harvest Delivery Options*
                      </label>
                      <select
                        id="deliveryOptions"
                        name="deliveryOptions"
                        value={formData.deliveryOptions}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                        required
                      >
                        <option value="pickup">Farm Pickup Only</option>
                        <option value="delivery">Home Delivery Available</option>
                        <option value="both">Both Pickup and Delivery</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Benefits */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Benefits for Adopters*
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(benefitDescriptions).map(([benefit, description]) => (
                        <div key={benefit} className="flex items-start">
                          <input
                            type="checkbox"
                            id={`benefit-${benefit}`}
                            name={`benefits.${benefit}`}
                            checked={formData.benefits[benefit]}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`benefit-${benefit}`} className="ml-2 text-sm text-gray-700">
                            {description}
                          </label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Select at least 3 benefits to offer adopters</p>
                  </div>
                </div>
              )}
              
              {/* Step 3: Crop Story */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Crop Story */}
                  <div>
                    <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Crop's Story*
                    </label>
                    <textarea
                      id="story"
                      name="story"
                      value={formData.story}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                      placeholder="Tell the story of your crop - its heritage, what makes it special, how you care for it, and why someone would enjoy adopting it."
                      required
                    ></textarea>
                  </div>
                  
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Crop Images* (up to 5)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                      <input
                        type="file"
                        id="imageUpload"
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                        multiple
                        disabled={previewUrls.length >= 5}
                      />
                      <label 
                        htmlFor="imageUpload" 
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                        <span className="text-gray-600">Click to upload images</span>
                        <span className="text-gray-500 text-sm mt-1">
                          {previewUrls.length === 0 
                            ? "PNG, JPG up to 5MB each" 
                            : `${previewUrls.length}/5 images uploaded`}
                        </span>
                      </label>
                    </div>
                    
                    {/* Image Previews */}
                    {previewUrls.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={url} 
                              alt={`Preview ${index + 1}`} 
                              className="h-24 w-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Step 4: Preview & Submit */}
              {currentStep === 4 && (
                <div>
                  {showPreview ? (
                    <div className="preview-container">
                      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                        {/* Preview Header */}
                        <div className="relative h-64">
                          {previewUrls.length > 0 ? (
                            <img 
                              src={previewUrls[0]} 
                              alt={formData.cropName} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-green-100 flex items-center justify-center">
                              <FaLeaf className="text-5xl text-green-500" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                            <h2 className="text-2xl font-bold">{formData.cropName || "Crop Name"}</h2>
                            <div className="flex items-center text-sm mt-2">
                              <FaMapMarkerAlt className="mr-1" />
                              <span>{formData.location || "Farm Location"}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Preview Price Badge */}
                        <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                          ₹{formData.price || "1500"}
                        </div>
                        
                        {/* Preview Body */}
                        <div className="p-6">
                          <p className="text-gray-600 mb-4">
                            {formData.description || "Short description about the crop..."}
                          </p>
                          
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <FaCalendarAlt className="mr-1" />
                            <span>Duration: {formData.duration || "3"} months</span>
                          </div>
                          
                          <h3 className="font-bold text-gray-800 mb-2">What You'll Get:</h3>
                          <ul className="space-y-2 mb-4">
                            {Object.entries(formData.benefits).map(([benefit, isIncluded]) => (
                              isIncluded && (
                                <li key={benefit} className="flex items-start">
                                  <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                  <span>{benefitDescriptions[benefit]}</span>
                                </li>
                              )
                            ))}
                          </ul>
                          
                          <button type="button" className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                            Adopt Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-bold text-green-800 mb-2">Almost Ready to Submit!</h3>
                        <p className="text-green-700">
                          Please review your information before submitting. You can go back to previous steps to make any changes.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-gray-800">Basic Information</h3>
                          <ul className="mt-2 space-y-1">
                            <li><span className="text-gray-600">Crop Name:</span> {formData.cropName}</li>
                            <li><span className="text-gray-600">Crop Type:</span> {formData.cropType}</li>
                            <li><span className="text-gray-600">Location:</span> {formData.location}</li>
                            <li><span className="text-gray-600">Growth Stage:</span> {formData.growthStage}</li>
                            <li><span className="text-gray-600">Expected Harvest:</span> {formData.harvestDate}</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-gray-800">Adoption Details</h3>
                          <ul className="mt-2 space-y-1">
                            <li><span className="text-gray-600">Price:</span> ₹{formData.price}</li>
                            <li><span className="text-gray-600">Duration:</span> {formData.duration} months</li>
                            <li><span className="text-gray-600">Quantity Available:</span> {formData.quantity}</li>
                            <li><span className="text-gray-600">Delivery Options:</span> {formData.deliveryOptions}</li>
                            <li>
                              <span className="text-gray-600">Benefits:</span> {" "}
                              {Object.entries(formData.benefits)
                                .filter(([_, isIncluded]) => isIncluded)
                                .map(([benefit, _]) => benefit)
                                .join(", ")}
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-gray-800">Uploaded Images</h3>
                          <div className="mt-2">
                            {previewUrls.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {previewUrls.map((url, index) => (
                                  <img 
                                    key={index}
                                    src={url} 
                                    alt={`Preview ${index + 1}`} 
                                    className="h-12 w-12 object-cover rounded-lg"
                                  />
                                ))}
                              </div>
                            ) : (
                              <p className="text-yellow-600">No images uploaded yet. Images help adopters connect with your crop.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                >
                  <FaArrowLeft className="mr-2" />
                  Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  Next
                  <FaArrowRight className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <FaCheck className="mr-2" />
                  Submit Listing
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 