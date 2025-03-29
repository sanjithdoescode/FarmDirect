import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/utils/database';
import Comment from '../../../../lib/models/Comment';
import ForumPost from '../../../../lib/models/ForumPost'; // To check if post exists
import User from '../../../../lib/models/User'; // Needed for populating user info
import { getUserFromToken } from '../../../../lib/utils/auth';
import mongoose from 'mongoose';

/**
 * Handler for fetching comments for a specific forum post
 * Supports pagination and basic sorting.
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

    // Optional: Check if post exists
    const postExists = await ForumPost.findById(postId).select('_id');
    if (!postExists) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15'); // Default to 15 comments per page
    const sort = searchParams.get('sort') || 'createdAt'; // e.g., createdAt (asc for oldest first, desc for newest)
    const order = searchParams.get('order') || 'asc'; // Default to ascending for comments thread

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { postId: postId };
    // We might want to fetch only top-level comments first (parentId: null)
    // and then fetch replies client-side, or fetch all and nest them.
    // Fetching all for now:
    // filter.parentId = null; // To get only top-level comments

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;

    const total = await Comment.countDocuments(filter);
    const comments = await Comment.find(filter)
      .populate('userId', 'fullName profilePicture username') // Populate author details
      // .populate('replies') // If implementing nested replies via model population
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      comments,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json({ error: 'Failed to get comments' }, { status: 500 });
  }
}

/**
 * Handler for creating a new comment on a specific forum post
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters (contains postId)
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST(request, { params }) {
  try {
    await connectToDatabase();
    const { postId } = params;

    const decoded = getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Authentication required to comment' }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return NextResponse.json({ error: 'Invalid post ID format' }, { status: 400 });
    }

    // Check if post exists before allowing comment
    const postExists = await ForumPost.findById(postId).select('_id');
    if (!postExists) {
        return NextResponse.json({ error: 'Cannot comment on a non-existent post' }, { status: 404 });
    }

    const body = await request.json();
    const { content, parentId } = body; // parentId is optional for replies

    if (!content) {
      return NextResponse.json({ error: 'Missing required field: content' }, { status: 400 });
    }

    // Optional: Validate parentId if provided
    if (parentId && !mongoose.Types.ObjectId.isValid(parentId)) {
        return NextResponse.json({ error: 'Invalid parent comment ID format' }, { status: 400 });
    }
    // Optional: Check if parent comment exists and belongs to the same post
    if (parentId) {
        const parentComment = await Comment.findOne({ _id: parentId, postId: postId });
        if (!parentComment) {
             return NextResponse.json({ error: 'Parent comment not found or does not belong to this post' }, { status: 404 });
        }
    }

    const newComment = new Comment({
      postId: postId,
      userId: decoded.id,
      content,
      parentId: parentId || null,
    });

    await newComment.save(); // Middleware in Comment model will update ForumPost.commentCount

    // Populate user details for the response
    const populatedComment = await Comment.findById(newComment._id)
        .populate('userId', 'fullName profilePicture username');

    return NextResponse.json({
      message: 'Comment added successfully',
      comment: populatedComment,
    }, { status: 201 });

  } catch (error) {
    console.error('Create comment error:', error);
    if (error.name === 'ValidationError') {
       return NextResponse.json({ error: error.message }, { status: 400 });
     }
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}

/**
 * Handler for preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 