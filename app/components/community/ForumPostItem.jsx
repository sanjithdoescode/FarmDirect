'use client';

import React from 'react';
import Link from 'next/link';
import { FaRegCommentAlt, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Using slightly different icons for variety

// Helper function to format date (can be moved to a utils file later)
const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    } catch (e) {
        console.error('Error formatting date:', e);
        return 'Invalid Date';
    }
};

export default function ForumPostItem({ post }) {
    if (!post) return null; // Don't render if no post data

    const authorName = post.userId?.fullName || 'Anonymous';
    // Calculate vote score directly if not provided by backend (though our model has a virtual)
    const voteScore = post.voteScore ?? ((post.upvotes?.length || 0) - (post.downvotes?.length || 0));
    const commentCount = post.commentCount ?? 0;

    return (
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200 ease-in-out">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                <Link href={`/community/forum/${post._id}`} className="block mb-2 sm:mb-0">
                    <h3 className="text-xl font-semibold text-green-700 hover:text-green-800 transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                </Link>
                {/* Stats for smaller screens */} 
                <div className="flex sm:hidden space-x-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center">
                        <FaThumbsUp className="mr-1" /> {voteScore}
                    </span>
                    <span className="flex items-center">
                        <FaRegCommentAlt className="mr-1" /> {commentCount}
                    </span>
                </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">
                Posted by <span className="font-medium text-gray-700">{authorName}</span> on {formatDate(post.createdAt)}
                {post.isEdited && <span className="text-xs italic text-gray-500 ml-1">(edited)</span>}
            </p>

            {/* Optional: Display tags if they exist */}
            {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="hidden sm:flex justify-end items-center text-sm text-gray-500 border-t border-gray-100 pt-3 mt-3">
                 <span className="flex items-center mr-4" title="Votes">
                    <FaThumbsUp className="mr-1" /> {voteScore}
                </span>
                <span className="flex items-center" title="Comments">
                    <FaRegCommentAlt className="mr-1" /> {commentCount}
                </span>
                 {/* Could add view count later if tracked */}
            </div>
        </div>
    );
} 