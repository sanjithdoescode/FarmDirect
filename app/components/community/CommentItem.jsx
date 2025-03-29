'use client';

import React from 'react';
import { FaEdit, FaTrash, FaThumbsUp, FaThumbsDown, FaReply } from 'react-icons/fa';
// TODO: Import VoteControl component when created
// TODO: Import user context/hook to get current user

// Helper function to format date (can be moved to a utils file later)
const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
        });
    } catch (e) {
        console.error('Error formatting date:', e);
        return 'Invalid Date';
    }
};

export default function CommentItem({ comment, user, onDelete, onEdit, onVote, onReply }) {
     // user prop would ideally come from context
    if (!comment) return null;

    const authorName = comment.userId?.fullName || 'Anonymous';
    const voteScore = comment.voteScore ?? ((comment.upvotes?.length || 0) - (comment.downvotes?.length || 0));

    // Basic check if the current user is the author
    const isAuthor = user && comment.userId && user.id === comment.userId._id; // Adjust user.id structure

    const handleVote = (voteType) => {
        if (onVote) {
            onVote(comment._id, voteType); // Pass comment ID and type
        }
    };

    const handleReply = () => {
        if (onReply) {
            onReply(comment); // Pass the comment object being replied to
        }
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
            {/* Comment Content - needs sanitization if allowing HTML */}
            <p className="text-gray-800 mb-3 text-sm">{comment.content}</p>
            
            {/* Comment Footer */}
            <div className="text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                 <div className="mb-2 sm:mb-0">
                    <span>By <span className="font-medium text-gray-700">{authorName}</span></span>
                    <span className="mx-1">•</span>
                    <span>{formatDate(comment.createdAt)}</span>
                    {comment.isEdited && <span className="italic ml-1">(edited)</span>}
                 </div>
                 
                 {/* Action Buttons */} 
                 <div className="flex items-center gap-2 flex-wrap">
                    {/* Voting Placeholder */} 
                    <div className="flex items-center gap-1">
                        <button onClick={() => handleVote('upvote')} className="p-1 rounded hover:bg-green-100 text-gray-500 hover:text-green-600 disabled:opacity-50" title="Upvote">
                            <FaThumbsUp size=".85em"/>
                        </button>
                        <span className="font-medium text-gray-700 text-sm w-4 text-center">{voteScore}</span>
                        <button onClick={() => handleVote('downvote')} className="p-1 rounded hover:bg-red-100 text-gray-500 hover:text-red-600 disabled:opacity-50" title="Downvote">
                            <FaThumbsDown size=".85em"/>
                        </button>
                    </div>
                    
                    {/* Reply Button */} 
                    {/* TODO: Only show if user logged in? */}
                     <button onClick={handleReply} className="flex items-center text-gray-600 hover:text-blue-600" title="Reply">
                         <FaReply size=".85em" className="mr-1"/> Reply
                     </button>

                     {/* Edit/Delete for Author */} 
                     {isAuthor && (
                         <div className="inline-flex items-center gap-2 border-l border-gray-300 pl-2 ml-1">
                             <button onClick={() => onEdit(comment)} className="text-blue-500 hover:text-blue-700" title="Edit">
                                 <FaEdit size=".85em"/>
                             </button>
                             <button onClick={() => onDelete(comment._id)} className="text-red-500 hover:text-red-700" title="Delete">
                                 <FaTrash size=".85em"/>
                             </button>
                         </div>
                     )}
                </div>
            </div>
            
             {/* TODO: Placeholder for rendering replies/nested comments */} 
             {/* <div className="ml-4 mt-3 border-l-2 border-gray-200 pl-4"> Replies go here </div> */} 
        </div>
    );
} 