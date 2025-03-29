'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
// Import the actual components
import ForumPostList from '@/components/community/ForumPostList';
// import CreatePostForm from '@/components/community/CreatePostForm'; // Keep for later

// Remove the inline ForumPostItemPlaceholder

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  // TODO: Add state for sort, filter, etc.

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Add query params for pagination, sorting, filtering
        const response = await fetch(`/api/community/posts?page=${page}&limit=10&sort=createdAt&order=desc`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.posts);
        setPagination(data.pagination);
      } catch (e) {
        console.error("Failed to fetch posts:", e);
        setError('Could not load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]); // Refetch when page changes

  // TODO: Implement pagination controls
  const handleNextPage = () => {
    if (page < pagination.pages) {
        setPage(prev => prev + 1);
    }
  };
  const handlePrevPage = () => {
      if (page > 1) {
          setPage(prev => prev - 1);
      }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Discussion Forum</h1>
        {/* Link the button to the new post page */}
        <Link href="/community/forum/new" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors">
          <FaPlus className="mr-2" /> New Post
        </Link>
      </div>

      {/* TODO: Add filtering/sorting controls */} 

      {loading && (
        <div className="flex justify-center items-center py-10">
          <FaSpinner className="animate-spin text-4xl text-green-600" />
          <p className="ml-3 text-gray-600">Loading posts...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <FaExclamationTriangle className="inline mr-2"/>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-10 bg-gray-100 rounded-lg">
            <p className="text-gray-600">No posts found. Be the first to start a discussion!</p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div>
            {/* Use the ForumPostList component */}
            <ForumPostList posts={posts} />

            {/* Basic Pagination */} 
            <div className="flex justify-between items-center mt-6">
                <button 
                    onClick={handlePrevPage} 
                    disabled={page <= 1}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {pagination.page || '-'} of {pagination.pages || '-'}
                </span>
                <button 
                    onClick={handleNextPage} 
                    disabled={page >= pagination.pages}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
      )}

      {/* TODO: Add CreatePostForm modal/section */}
    </div>
  );
} 