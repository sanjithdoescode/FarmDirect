'use client';

import React from 'react';
import ForumPostItem from './ForumPostItem'; // Import the item component

export default function ForumPostList({ posts }) {
    // Expects an array of post objects
    if (!posts || posts.length === 0) {
        // This case is handled in the page component, but good to be defensive
        return null; 
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <ForumPostItem key={post._id} post={post} />
            ))}
        </div>
    );
} 