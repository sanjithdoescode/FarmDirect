import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/utils/database';
import ForumPost from '../../lib/models/ForumPost';
import User from '../../lib/models/User'; // Needed for populating user info
import { getUserFromToken } from '../../lib/utils/auth';

/**
 * Handler for fetching forum posts with pagination, sorting, and filtering
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || 'createdAt'; // e.g., createdAt, voteScore, commentCount
    const order = searchParams.get('order') || 'desc'; // desc, asc
    const tags = searchParams.get('tags'); // Comma-separated tags
    const authorId = searchParams.get('authorId');

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (tags) {
      filter.tags = { $in: tags.split(',').map(tag => tag.trim()) };
    }
    if (authorId) {
      filter.userId = authorId;
    }
    // Add more filters as needed (e.g., search based on text index)

    // Build sort object
    const sortObj = {};
    // Allow sorting by virtual fields like voteScore
    if (sort === 'voteScore') {
        // Mongoose doesn't directly sort by virtuals in the query.
        // We fetch, then sort in application code, or use aggregation pipeline.
        // Simple approach: Fetch more than limit and sort after, or sort by a stored score if critical.
        // For now, stick to direct fields or createdAt.
        sortObj['createdAt'] = order === 'asc' ? 1 : -1; // Default fallback if sorting by virtual
    } else {
         sortObj[sort] = order === 'asc' ? 1 : -1;
    }


    const total = await ForumPost.countDocuments(filter);
    const posts = await ForumPost.find(filter)
      .populate('userId', 'fullName profilePicture') // Populate author details
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    // If sorting by voteScore was intended, sort the results here (less efficient for large datasets)
    // if (sort === 'voteScore') {
    //    posts.sort((a, b) => (order === 'asc' ? a.voteScore - b.voteScore : b.voteScore - a.voteScore));
    // }

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Get forum posts error:', error);
    return NextResponse.json({ error: 'Failed to get forum posts' }, { status: 500 });
  }
}

/**
 * Handler for creating a new forum post
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST(request) {
  try {
    await connectToDatabase();

    const decoded = getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Authentication required to create a post' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, tags } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Missing required fields: title and content' }, { status: 400 });
    }

    const newPost = new ForumPost({
      userId: decoded.id,
      title,
      content,
      tags: tags || [], // Ensure tags is an array
    });

    await newPost.save();

    // Populate user details for the response
    const populatedPost = await ForumPost.findById(newPost._id)
        .populate('userId', 'fullName profilePicture');

    return NextResponse.json({
      message: 'Forum post created successfully',
      post: populatedPost,
    }, { status: 201 });

  } catch (error) {
    console.error('Create forum post error:', error);
    if (error.name === 'ValidationError') {
       return NextResponse.json({ error: error.message }, { status: 400 });
     }
    return NextResponse.json({ error: 'Failed to create forum post' }, { status: 500 });
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