'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';
import { FaPlus, FaLeaf, FaEdit, FaEye, FaTrash } from 'react-icons/fa';

export default function FarmerAdoptionsPage() {
  const { t } = useLanguage();
  const [adoptions, setAdoptions] = useState([
    // This would come from a database in a real app
    {
      id: 1,
      cropName: "Alphonso Mango Tree",
      location: "Sunshine Orchards, Ratnagiri",
      price: 1500,
      duration: "6 months",
      adoptedCount: 3,
      availableCount: 2,
      status: "active",
      createdAt: "2023-06-15",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      cropName: "Organic Tomato Plot",
      location: "Green Thumb Farms, Coimbatore",
      price: 750,
      duration: "3 months",
      adoptedCount: 5,
      availableCount: 0,
      status: "fully_adopted",
      createdAt: "2023-07-01",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ]);
  
  const deleteAdoption = (id) => {
    if (window.confirm("Are you sure you want to delete this adoption listing?")) {
      // In a real app, this would call an API
      setAdoptions(adoptions.filter(adoption => adoption.id !== id));
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Crop Adoptions</h1>
            <p className="text-gray-600 mt-1">Manage your crop adoption listings</p>
          </div>
          <Link href="/dashboard/farmer/adoptions/create">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <FaPlus className="mr-2" />
              List New Crop
            </button>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">Your Crop Adoption Listings</h2>
          </div>
          
          {adoptions.length > 0 ? (
            <div className="divide-y">
              {adoptions.map(adoption => (
                <div key={adoption.id} className="p-6 flex flex-col md:flex-row md:items-center">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                      {adoption.image ? (
                        <img 
                          src={adoption.image} 
                          alt={adoption.cropName} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaLeaf className="text-3xl text-green-500" />
                        </div>
                      )}
                      <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${
                        adoption.status === 'active' ? 'bg-green-500 text-white' : 
                        adoption.status === 'fully_adopted' ? 'bg-blue-500 text-white' : 
                        'bg-yellow-500 text-white'
                      }`}>
                        {adoption.status === 'active' ? 'Active' : 
                         adoption.status === 'fully_adopted' ? 'Fully Adopted' : 
                         'Draft'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-800">{adoption.cropName}</h3>
                    <div className="text-sm text-gray-500 mb-2">{adoption.location}</div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500">Price</div>
                        <div className="font-medium">₹{adoption.price}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="font-medium">{adoption.duration}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Adopted</div>
                        <div className="font-medium">{adoption.adoptedCount} plants</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Available</div>
                        <div className="font-medium">{adoption.availableCount} plants</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button 
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center text-sm"
                        onClick={() => alert("View details functionality would go here")}
                      >
                        <FaEye className="mr-1" />
                        View
                      </button>
                      <button 
                        className="px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors flex items-center text-sm"
                        onClick={() => alert("Edit functionality would go here")}
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </button>
                      <button 
                        className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors flex items-center text-sm"
                        onClick={() => deleteAdoption(adoption.id)}
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto flex items-center justify-center bg-green-100 rounded-full mb-4">
                <FaLeaf className="text-2xl text-green-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No Adoption Listings Yet</h3>
              <p className="text-gray-600 mb-4">Start by listing your first crop for adoption</p>
              <Link href="/dashboard/farmer/adoptions/create">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center">
                  <FaPlus className="mr-2" />
                  Create Your First Listing
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 