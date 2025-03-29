import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/utils/database';
import ForumPost from '../../../lib/models/ForumPost';
import Comment from '../../../lib/models/Comment'; // Needed for deleting associated comments
import User from '../../../lib/models/User'; // Needed for populating user info
import { getUserFromToken } from '../../../lib/utils/auth';
import mongoose from 'mongoose';

/**
 * Handler for getting a specific forum post by ID
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters (contains postId)
 * @returns {Promise<NextResponse>} - The response object
 */
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { postId } = params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return NextResponse.json({ error: 'Invalid post ID format' }, { status: 400 });
    }

    // Fetch the post and populate author details
    const post = await ForumPost.findById(postId)
        .populate('userId', 'fullName profilePicture username'); // Add username or other fields as needed

    if (!post) {
      return NextResponse.json({ error: 'Forum post not found' }, { status: 404 });
    }

    // Publicly viewable, no auth check needed here usually
    return NextResponse.json({ post });

  } catch (error) {
    console.error('Get post by ID error:', error);
    return NextResponse.json({ error: 'Failed to get forum post details' }, { status: 500 });
  }
}

/**
 * Handler for updating a specific forum post by ID
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters (contains postId)
 * @returns {Promise<NextResponse>} - The response object
 */
export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const { postId } = params;

        const decoded = getUserFromToken(request);
        if (!decoded) {
            return NextResponse.json({ error: 'Authentication required to update post' }, { status: 401 });
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return NextResponse.json({ error: 'Invalid post ID format' }, { status: 400 });
        }

        const body = await request.json();
        const { title, content, tags } = body;

        // Find the post
        const post = await ForumPost.findById(postId);

        if (!post) {
            return NextResponse.json({ error: 'Forum post not found' }, { status: 404 });
        }

        // Check if the authenticated user is the author
        if (post.userId.toString() !== decoded.id) {
            return NextResponse.json({ error: 'Access denied: You can only update your own posts' }, { status: 403 });
        }

        // Prepare updates - only update fields that are provided
        const updates = {};
        if (title) updates.title = title;
        if (content) updates.content = content;
        if (tags !== undefined) updates.tags = tags; // Allow updating tags to an empty array
        updates.isEdited = true; // Mark the post as edited
        updates.updatedAt = new Date(); // Explicitly set updatedAt for clarity

        const updatedPost = await ForumPost.findByIdAndUpdate(
            postId,
            { $set: updates },
            { new: true, runValidators: true } // Return the updated doc, run schema validators
        ).populate('userId', 'fullName profilePicture username');

        return NextResponse.json({ message: 'Post updated successfully', post: updatedPost });

    } catch (error) {
        console.error('Update post error:', error);
        if (error.name === 'ValidationError') {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to update forum post' }, { status: 500 });
    }
}

/**
 * Handler for deleting a specific forum post by ID
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters (contains postId)
 * @returns {Promise<NextResponse>} - The response object
 */
export async function DELETE(request, { params }) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await connectToDatabase();
        const { postId } = params;

        const decoded = getUserFromToken(request);
        if (!decoded) {
            await session.abortTransaction();
            return NextResponse.json({ error: 'Authentication required to delete post' }, { status: 401 });
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            await session.abortTransaction();
            return NextResponse.json({ error: 'Invalid post ID format' }, { status: 400 });
        }

        // Find the post
        const post = await ForumPost.findById(postId).session(session);

        if (!post) {
            await session.abortTransaction();
            return NextResponse.json({ error: 'Forum post not found' }, { status: 404 });
        }

        // Check if the authenticated user is the author
        // TODO: Add role check for admins/moderators if they should be allowed to delete
        if (post.userId.toString() !== decoded.id) {
            await session.abortTransaction();
            return NextResponse.json({ error: 'Access denied: You can only delete your own posts' }, { status: 403 });
        }

        // Delete the post
        await ForumPost.findByIdAndDelete(postId).session(session);

        // Delete all associated comments
        await Comment.deleteMany({ postId: postId }).session(session);

        await session.commitTransaction();

        return NextResponse.json({ message: 'Post and associated comments deleted successfully' });

    } catch (error) {
        await session.abortTransaction();
        console.error('Delete post error:', error);
        return NextResponse.json({ error: 'Failed to delete forum post' }, { status: 500 });
    } finally {
        session.endSession();
    }
}

/**
 * Handler for preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 