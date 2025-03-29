import React from 'react';

// This layout wraps the forum pages
export default function ForumLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Could add forum-specific navigation or sidebar here later */}
      {children}
    </div>
  );
} 