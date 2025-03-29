'use client';

import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
// TODO: Import user context/hook

export default function CreateCommentForm({ postId, parentId = null, onSubmit, isLoading, onCancelReply }) {
    // postId is required to associate the comment
    // parentId is optional, for replies
    // onSubmit is the function to call with the comment data
    // isLoading indicates if a submission is in progress
    // onCancelReply is optional, to hide the form when replying

    const [content, setContent] = useState('');
    // TODO: Get user information from context
    const user = null; // Placeholder

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim() || !postId) return;
        
        const commentData = {
            content: content,
            // parentId will be added by the page component if it's a reply
        };
        
        onSubmit(commentData); // Pass data to parent page handler
        setContent(''); // Clear form
    };

    // TODO: Check if user is logged in before showing the form
    // if (!user) { 
    //    return <p className="text-sm text-gray-600">Please <Link href="/login">log in</Link> to comment.</p>;
    // }

    return (
        <form onSubmit={handleSubmit} className={`mt-6 bg-white p-4 rounded-lg shadow border ${parentId ? 'ml-8 border-blue-100' : ''}`}>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
                {parentId ? 'Write a Reply' : 'Add a Comment'}
            </h3>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts..."
                rows="3"
                required
                className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                aria-label={parentId ? 'Reply content' : 'Comment content'}
            />
            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={isLoading || !content.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center transition-colors"
                >
                    {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
                    {parentId ? 'Post Reply' : 'Post Comment'}
                </button>
                {parentId && onCancelReply && (
                    <button
                        type="button"
                        onClick={onCancelReply}
                        className="text-sm text-gray-600 hover:text-gray-800"
                    >
                        Cancel Reply
                    </button>
                )}
            </div>
        </form>
    );
} 