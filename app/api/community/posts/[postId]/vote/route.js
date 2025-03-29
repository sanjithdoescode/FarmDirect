import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/utils/database';
import ForumPost from '../../../../lib/models/ForumPost';
import { getUserFromToken } from '../../../../lib/utils/auth';
import mongoose from 'mongoose';

/**
 * Handler for voting on a specific forum post
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
            return NextResponse.json({ error: 'Authentication required to vote' }, { status: 401 });
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return NextResponse.json({ error: 'Invalid post ID format' }, { status: 400 });
        }

        const body = await request.json();
        const { voteType } = body; // 'upvote' or 'downvote'

        if (!['upvote', 'downvote'].includes(voteType)) {
             return NextResponse.json({ error: 'Invalid vote type. Must be \'upvote\' or \'downvote\'.' }, { status: 400 });
        }

        const post = await ForumPost.findById(postId);

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const userId = decoded.id;
        const userIdObject = new mongoose.Types.ObjectId(userId);

        // Atomically update votes using $addToSet and $pull
        let updateOperation = {};
        if (voteType === 'upvote') {
            // Add to upvotes, remove from downvotes if exists
            updateOperation = {
                $addToSet: { upvotes: userIdObject },
                $pull: { downvotes: userIdObject },
            };
        } else { // downvote
             // Add to downvotes, remove from upvotes if exists
             updateOperation = {
                $addToSet: { downvotes: userIdObject },
                $pull: { upvotes: userIdObject },
            };
        }

        const updatedPost = await ForumPost.findByIdAndUpdate(
            postId,
            updateOperation,
            { new: true } // Return the updated document
        ).populate('userId', 'fullName profilePicture username');

        if (!updatedPost) {
            // Should not happen if found earlier, but for safety
            return NextResponse.json({ error: 'Post not found during update' }, { status: 404 });
        }

        return NextResponse.json({
            message: `Vote ${voteType} recorded successfully`,
            post: {
                 _id: updatedPost._id,
                 voteScore: updatedPost.voteScore,
                 upvotes: updatedPost.upvotes.length, // Return counts for simplicity
                 downvotes: updatedPost.downvotes.length
                 // Include other fields if needed by the frontend
            }
        });

    } catch (error) {
        console.error('Vote on post error:', error);
        return NextResponse.json({ error: 'Failed to record vote on post' }, { status: 500 });
    }
}


/**
 * Handler for preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 