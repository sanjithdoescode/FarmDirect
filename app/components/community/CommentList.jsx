'use client';

import React from 'react';
import CommentItem from './CommentItem'; // Import the item component

export default function CommentList({ comments, user, onDelete, onEdit, onVote, onReply }) {
    // Expects an array of comment objects
    if (!comments || comments.length === 0) {
        return <p className="text-gray-600 italic my-4">No comments yet. Be the first to share your thoughts!</p>; 
    }

    // TODO: Add logic here to handle nesting/threading if comments have parentId
    // For now, just render them flat

    return (
        <div className="space-y-4 mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments ({comments.length})</h2>
            {comments.map((comment) => (
                <CommentItem 
                    key={comment._id} 
                    comment={comment} 
                    user={user} 
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onVote={onVote}
                    onReply={onReply}
                />
            ))}
        </div>
    );
} 