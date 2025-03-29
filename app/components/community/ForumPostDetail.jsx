'use client';

import React from 'react';
import { FaEdit, FaTrash, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
// TODO: Import VoteControl component when created
// TODO: Import user context/hook to get current user

// Helper function to format date (can be moved to a utils file later)
const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        // More detailed format for post view
        return new Date(dateString).toLocaleString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'
        });
    } catch (e) {
        console.error('Error formatting date:', e);
        return 'Invalid Date';
    }
};

// Basic sanitization (replace with a proper library like DOMPurify in production)
const sanitizeContent = (htmlString) => {
    // Extremely basic: replace script tags. THIS IS NOT SECURE FOR PRODUCTION.
    return htmlString.replace(/<script.*?>.*?<\/script>/gi, '');
};

export default function ForumPostDetail({ post, user, onDelete, onEdit, onVote }) {
    // user prop would ideally come from context, representing the logged-in user
    if (!post) return null;

    const authorName = post.userId?.fullName || 'Anonymous';
    const voteScore = post.voteScore ?? ((post.upvotes?.length || 0) - (post.downvotes?.length || 0));

    // Basic check if the current user is the author
    const isAuthor = user && post.userId && user.id === post.userId._id; // Adjust user.id based on actual user object structure

    const handleVote = (voteType) => {
        if (onVote) {
            onVote(voteType); // Pass 'upvote' or 'downvote'
        }
    };

    const sanitizedHtml = sanitizeContent(post.content.replace(/\n/g, '<br />'));

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 mb-8 border border-gray-200">
            {/* Post Header */}
            <div className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{post.title}</h1>
                <div className="text-sm text-gray-500 flex flex-wrap items-center gap-x-3">
                    <span>Posted by <span className="font-medium text-gray-700">{authorName}</span></span>
                    <span>on {formatDate(post.createdAt)}</span>
                    {post.isEdited && <span className="text-xs italic">(edited)</span>}
                </div>
            </div>

            {/* Post Content */}
            {/* WARNING: dangerouslySetInnerHTML is risky without proper sanitization */}
            <div 
                className="prose prose-green max-w-none mb-8" 
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
             />

            {/* Post Footer Actions/Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-gray-200 pt-4">
                {/* Voting Component Placeholder */} 
                <div className="flex items-center gap-2 mb-3 sm:mb-0">
                    <button 
                        onClick={() => handleVote('upvote')} 
                        className="p-2 rounded-full hover:bg-green-100 text-gray-600 hover:text-green-600 transition-colors disabled:opacity-50" 
                        title="Upvote"
                        // TODO: Disable if user not logged in or has already voted
                    >
                        <FaThumbsUp />
                    </button>
                    <span className="font-semibold text-lg text-gray-700 min-w-[2rem] text-center">{voteScore}</span>
                     <button 
                        onClick={() => handleVote('downvote')} 
                        className="p-2 rounded-full hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50" 
                        title="Downvote"
                         // TODO: Disable if user not logged in or has already voted
                    >
                        <FaThumbsDown />
                    </button>
                </div>
                
                {/* Edit/Delete Buttons for Author */} 
                {isAuthor && (
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={onEdit} 
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <FaEdit className="mr-1" /> Edit
                        </button>
                        <button 
                            onClick={onDelete} 
                            className="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors"
                        >
                            <FaTrash className="mr-1" /> Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 