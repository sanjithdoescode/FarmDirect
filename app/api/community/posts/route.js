import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/utils/database';
import ForumPost from '../../lib/models/ForumPost';
import User from '../../lib/models/User'; // Needed for populating user info
import { getUserFromToken } from '../../lib/utils/auth';
import dbConnect from '@/lib/dbConnect'; // Assuming you have a db connection utility

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
    // 1. Connect to Database
    await dbConnect();

    // 2. Parse Request Body
    const body = await request.json();
    const { title, content, userId } = body;

    // 3. Validate Input (Basic)
    if (!title || !content || !userId) {
      return NextResponse.json({ error: 'Missing required fields (title, content, userId)' }, { status: 400 });
    }
    
    // TODO: Add more robust validation (e.g., length checks, sanitization)
    // TODO: Validate userId existence (e.g., check against User collection or auth context)
    // For now, we trust the placeholder userId from the client

    // 4. Create New Post
    const newPost = new ForumPost({
      title: title.trim(),
      content: content.trim(),
      userId: userId, // Directly use the provided userId for now
      voteScore: 0, // Initialize vote score
      // Add tags or other fields if necessary
    });

    // 5. Save to Database
    const savedPost = await newPost.save();

    // 6. Return Success Response
    return NextResponse.json({ message: 'Post created successfully', postId: savedPost._id, post: savedPost }, { status: 201 });

  } catch (error) {
    console.error('API_POST_CREATE_ERROR:', error);

    // Handle potential errors (e.g., validation, database errors)
    if (error.name === 'ValidationError') {
        return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to create post', details: error.message }, { status: 500 });
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