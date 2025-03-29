'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import CreatePostForm from '@/components/community/CreatePostForm';

export default function NewPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Get userId from auth context
  const userId = 'TEMP_USER_ID'; 

  const handleCreatePost = async (postData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // TODO: Add Authorization header with user token
        },
        body: JSON.stringify({ ...postData, userId }), // Add userId to payload
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Redirect to the main forum page on success
      // Optionally, redirect to the new post: router.push(`/community/forum/${result.postId}`);
      alert('Post created successfully!'); // Simple feedback
      router.push('/community/forum'); 

    } catch (e) {
      console.error("Failed to create post:", e);
      setError(e.message || 'Could not create post. Please try again.');
      setIsSubmitting(false); // Ensure loading state is turned off on error
    } 
    // No finally block for setIsSubmitting(false) because we navigate away on success
  };

  return (
    <div>
      <Link href="/community/forum" className="inline-flex items-center text-green-600 hover:text-green-800 mb-6">
        <FaArrowLeft className="mr-2" />
        Back to Forum
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Forum Post</h1>
      <CreatePostForm 
        onSubmit={handleCreatePost} 
        isLoading={isSubmitting} 
        error={error} 
      />
    </div>
  );
} 