'use client';

import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function CreatePostForm({ onSubmit, isLoading, error }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState(''); // Internal form validation error

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(''); // Clear previous errors

    if (!title.trim()) {
        setFormError('Title is required.');
        return;
    }
    if (!content.trim()) {
        setFormError('Content cannot be empty.');
        return;
    }
    
    // Basic content length check (example)
    if (content.trim().length < 10) {
        setFormError('Content should be at least 10 characters long.');
        return;
    }

    // TODO: Add tag input if needed
    onSubmit({ title: title.trim(), content: content.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow border border-gray-200">
      {/* Display submission error from parent page */}
      {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
          </div>
      )}
      {/* Display internal form validation error */}
      {formError && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{formError}</span>
          </div>
      )}
      <div>
        <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 mb-1">
          Post Title
        </label>
        <input
          type="text"
          id="post-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title"
          required
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          maxLength={150} // Example limit
        />
      </div>

      <div>
        <label htmlFor="post-content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="post-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts, ask a question... (Supports basic Markdown)"
          rows="8"
          required
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        />
        {/* TODO: Add Markdown preview or editor enhancement */}
      </div>

      {/* TODO: Add Tag input field */}
      {/* <div>...</div> */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center transition-colors"
        >
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
          {isLoading ? 'Submitting...' : 'Create Post'}
        </button>
      </div>
    </form>
  );
} 