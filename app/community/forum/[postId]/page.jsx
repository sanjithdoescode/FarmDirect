'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Use next/navigation for App Router
import Link from 'next/link';
import { FaSpinner, FaExclamationTriangle, FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
// Import actual components
import ForumPostDetail from '@/components/community/ForumPostDetail';
import CommentList from '@/components/community/CommentList';
import CreateCommentForm from '@/components/community/CreateCommentForm';

// --- Remove Placeholder Components ---

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params?.postId;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); // State to track which comment is being replied to { id, authorName }

  // TODO: Replace with actual user context/auth state
  const [user, setUser] = useState({ id: 'TEMP_USER_ID' }); // Placeholder user ID

  const fetchPost = useCallback(async () => {
    if (!postId) return;
    setLoadingPost(true);
    setError(null);
    try {
      const response = await fetch(`/api/community/posts/${postId}`);
      if (!response.ok) {
        if (response.status === 404) {
           throw new Error('Post not found.');
        } else {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      const data = await response.json();
      setPost(data.post);
    } catch (e) {
      console.error("Failed to fetch post:", e);
      setError(e.message || 'Could not load the post.');
    } finally {
      setLoadingPost(false);
    }
  }, [postId]);

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    setLoadingComments(true);
    setCommentError(null);
    try {
       // TODO: Add pagination for comments if needed
      const response = await fetch(`/api/community/posts/${postId}/comments?sort=createdAt&order=asc`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (e) {
      console.error("Failed to fetch comments:", e);
      setCommentError('Could not load comments.');
    } finally {
      setLoadingComments(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [fetchPost, fetchComments]);

  const handleAddComment = async (commentData) => {
      if (!postId) return;
      setIsSubmittingComment(true);
      setCommentError(null);
      
      // Add parentId if replying
      const payload = { 
          ...commentData, 
          parentId: replyingTo ? replyingTo.id : null 
      };
      
      try {
          const response = await fetch(`/api/community/posts/${postId}/comments`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', /* Add Auth header */ },
              body: JSON.stringify(payload),
          });
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          }
          const newComment = await response.json();
          // Add new comment to the list (or refetch for simplicity if nesting)
          setComments(prev => [...prev, newComment.comment]); 
          setReplyingTo(null); // Clear reply state
          // Optionally refetch post to update comment count shown
          fetchPost();
      } catch (e) {
          console.error("Failed to add comment:", e);
          setCommentError(e.message || 'Could not post comment.');
      } finally {
          setIsSubmittingComment(false);
      }
  };

  const handleDeletePost = async () => {
       if (!postId || !window.confirm('Are you sure you want to delete this post and all its comments?')) return;
       try {
           const response = await fetch(`/api/community/posts/${postId}`, {
               method: 'DELETE',
               headers: { /* Add Auth header */ },
           });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
           alert('Post deleted successfully');
           router.push('/community/forum'); // Redirect back to forum index
       } catch (e) {
            console.error("Failed to delete post:", e);
            setError(e.message || 'Could not delete post.');
       }
  };

    const handleDeleteComment = async (commentId) => {
       if (!commentId || !window.confirm('Are you sure you want to delete this comment?')) return;
       try {
           const response = await fetch(`/api/community/comments/${commentId}`, {
               method: 'DELETE',
               headers: { /* Add Auth header */ },
           });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
           // Remove comment from state (or refetch)
           setComments(prev => prev.filter(c => c._id !== commentId));
            // Optionally refetch post to update comment count shown
           fetchPost();
       } catch (e) {
            console.error("Failed to delete comment:", e);
            setCommentError(e.message || 'Could not delete comment.');
       }
  };

   // --- Voting Handlers --- 
  const handleVotePost = async (voteType) => {
        if (!postId) return;
        // TODO: Check authentication
         try {
            const response = await fetch(`/api/community/posts/${postId}/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', /* Auth */ },
                body: JSON.stringify({ voteType })
            });
             if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(errorData.error || 'Vote failed');
             }
             const data = await response.json();
             // Update post state optimistically or refetch
             setPost(prev => ({ ...prev, voteScore: data.post.voteScore, upvotes: data.post.upvotes, downvotes: data.post.downvotes })); // Assuming API returns counts or score
         } catch (e) {
             console.error('Vote post error:', e);
             // Show error message to user
         }
  };

  const handleVoteComment = async (commentId, voteType) => {
      if (!commentId) return;
       // TODO: Check authentication
       try {
            const response = await fetch(`/api/community/comments/${commentId}/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', /* Auth */ },
                body: JSON.stringify({ voteType })
            });
             if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(errorData.error || 'Vote failed');
             }
             const data = await response.json();
             // Update specific comment in state
             setComments(prevComments => prevComments.map(c => 
                c._id === commentId 
                ? { ...c, voteScore: data.comment.voteScore, upvotes: data.comment.upvotes, downvotes: data.comment.downvotes } 
                : c
             ));
         } catch (e) {
             console.error('Vote comment error:', e);
              // Show error message to user
         }
  };

  // --- Edit Handlers (Placeholders) --- 
  const handleEditPost = () => alert('Edit post functionality not implemented yet.');
  const handleEditComment = (comment) => alert(`Edit comment ${comment._id} functionality not implemented yet.`);

  // --- Reply Handler --- 
  const handleSetReply = (comment) => {
      setReplyingTo({ id: comment._id, authorName: comment.userId?.fullName || 'Anonymous' });
  };
  const handleCancelReply = () => {
       setReplyingTo(null);
  };

  if (loadingPost) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <FaExclamationTriangle className="inline mr-2"/>
        <span className="block sm:inline">{error}</span>
        <Link href="/community/forum" className="ml-4 underline text-sm">Back to Forum</Link>
      </div>
    );
  }

  if (!post) {
    // This case should ideally be covered by the error state from fetchPost
    return <div className="text-center py-10">Post not found.</div>;
  }

  return (
    <div>
      <Link href="/community/forum" className="inline-flex items-center text-green-600 hover:text-green-800 mb-4">
        <FaArrowLeft className="mr-2" />
        Back to Forum
      </Link>

      <ForumPostDetail 
          post={post} 
          user={user} 
          onDelete={handleDeletePost} 
          onEdit={handleEditPost} 
          onVote={handleVotePost} 
      />

      <CreateCommentForm 
          postId={postId} 
          parentId={replyingTo ? replyingTo.id : null} 
          onSubmit={handleAddComment} 
          isLoading={isSubmittingComment} 
          onCancelReply={replyingTo ? handleCancelReply : undefined} 
          key={replyingTo ? replyingTo.id : 'new'}
      />
      {replyingTo && <p className="text-sm text-blue-600 ml-8 mt-1">Replying to {replyingTo.authorName}</p>}
      {commentError && <p className="text-red-500 text-sm mt-2">{commentError}</p>}

      {loadingComments ? (
          <div className="flex justify-center items-center py-6">
              <FaSpinner className="animate-spin text-2xl text-gray-500" />
              <p className="ml-2 text-gray-500">Loading comments...</p>
          </div>
      ) : (
          <CommentList 
              comments={comments} 
              user={user} 
              onDelete={handleDeleteComment} 
              onEdit={handleEditComment} 
              onVote={handleVoteComment}
              onReply={handleSetReply}
          />
      )}

    </div>
  );
} 