'use client';

import { useState, useRef } from 'react';
import { FaCamera, FaSearch } from 'react-icons/fa';

export default function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: searchQuery,
          type: 'text'
        })
      });

      const data = await response.json();
      if (data.success) {
        // Display results in a structured way
        if (data.data.includes('Product:')) {
          setResults(`✅ **Product Found in Database:**\n${data.data}`);
        } else {
          setResults(`🤖 **AI-Generated Info (Product Not Found in Database):**\n${data.data}`);
        }
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setResults('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSearch = async (file: File) => {
    try {
      setIsLoading(true);
      const base64Image = await convertFileToBase64(file);
      
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'image',
          image: base64Image.split(',')[1], // Remove data URL prefix
          prompt: 'What agricultural product is this? Please provide details about its quality indicators and typical market price.'
        })
      });

      const data = await response.json();
      if (data.success) {
        setResults(`📷 **Image Analysis Result:**\n${data.data}`);
      } else {
        throw new Error(data.error);
      }

      // Show image preview
      setImagePreview(base64Image);
    } catch (error) {
      console.error('Image search failed:', error);
      setResults('Image search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex flex-col gap-4">
        {/* Text Search Form */}
        <form onSubmit={handleTextSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for agricultural products..."
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2 disabled:opacity-50"
          >
            <FaSearch />
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Image Upload/Camera Button */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            capture="environment"
            onChange={(e) => e.target.files?.[0] && handleImageSearch(e.target.files[0])}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaCamera />
            {isLoading ? 'Processing...' : 'Take Photo or Upload Image'}
          </button>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="max-h-48 rounded mx-auto"
            />
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="mt-4 p-4 border rounded bg-white shadow">
            <h3 className="font-bold mb-2">Search Results:</h3>
            <div className="whitespace-pre-wrap">{results}</div>
          </div>
        )}
      </div>
    </div>
  );
}
