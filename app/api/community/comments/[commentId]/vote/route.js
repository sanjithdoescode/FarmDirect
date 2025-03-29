import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/utils/database';
import Comment from '../../../../lib/models/Comment';
import { getUserFromToken } from '../../../../lib/utils/auth';
import mongoose from 'mongoose';

/**
 * Handler for voting on a specific comment
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters (contains commentId)
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST(request, { params }) {
    try {
        await connectToDatabase();
        const { commentId } = params;

        const decoded = getUserFromToken(request);
        if (!decoded) {
            return NextResponse.json({ error: 'Authentication required to vote' }, { status: 401 });
        }

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return NextResponse.json({ error: 'Invalid comment ID format' }, { status: 400 });
        }

        const body = await request.json();
        const { voteType } = body; // 'upvote' or 'downvote'

        if (!['upvote', 'downvote'].includes(voteType)) {
             return NextResponse.json({ error: 'Invalid vote type. Must be \'upvote\' or \'downvote\'.' }, { status: 400 });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
        }

        const userId = decoded.id;
        const userIdObject = new mongoose.Types.ObjectId(userId);

        // Atomically update votes using $addToSet and $pull
        let updateOperation = {};
        if (voteType === 'upvote') {
            updateOperation = {
                $addToSet: { upvotes: userIdObject },
                $pull: { downvotes: userIdObject },
            };
        } else { // downvote
             updateOperation = {
                $addToSet: { downvotes: userIdObject },
                $pull: { upvotes: userIdObject },
            };
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            updateOperation,
            { new: true } // Return the updated document
        ).populate('userId', 'fullName profilePicture username');

        if (!updatedComment) {
             return NextResponse.json({ error: 'Comment not found during update' }, { status: 404 });
        }

        return NextResponse.json({
            message: `Vote ${voteType} recorded successfully`,
            comment: {
                _id: updatedComment._id,
                voteScore: updatedComment.voteScore,
                upvotes: updatedComment.upvotes.length,
                downvotes: updatedComment.downvotes.length
                // Include other fields if needed
            }
        });

    } catch (error) {
        console.error('Vote on comment error:', error);
        return NextResponse.json({ error: 'Failed to record vote on comment' }, { status: 500 });
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