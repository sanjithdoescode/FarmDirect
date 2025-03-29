import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/utils/database';
import Comment from '../../../../lib/models/Comment';
import { getUserFromToken } from '../../../../lib/utils/auth';
import mongoose from 'mongoose';

/**
 * Handler for updating a specific comment by ID
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters (contains commentId)
 * @returns {Promise<NextResponse>} - The response object
 */
export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const { commentId } = params;

        const decoded = getUserFromToken(request);
        if (!decoded) {
            return NextResponse.json({ error: 'Authentication required to update comment' }, { status: 401 });
        }

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return NextResponse.json({ error: 'Invalid comment ID format' }, { status: 400 });
        }

        const body = await request.json();
        const { content } = body;

        if (!content) {
             return NextResponse.json({ error: 'Missing required field: content' }, { status: 400 });
        }

        // Find the comment
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
        }

        // Check if the authenticated user is the author
        if (comment.userId.toString() !== decoded.id) {
            return NextResponse.json({ error: 'Access denied: You can only update your own comments' }, { status: 403 });
        }

        // Prepare updates
        const updates = {
            content: content,
            isEdited: true,
            updatedAt: new Date()
        };

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { $set: updates },
            { new: true, runValidators: true } // Return the updated doc, run schema validators
        ).populate('userId', 'fullName profilePicture username');

        return NextResponse.json({ message: 'Comment updated successfully', comment: updatedComment });

    } catch (error) {
        console.error('Update comment error:', error);
        if (error.name === 'ValidationError') {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
    }
}

/**
 * Handler for deleting a specific comment by ID
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters (contains commentId)
 * @returns {Promise<NextResponse>} - The response object
 */
export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { commentId } = params;

        const decoded = getUserFromToken(request);
        if (!decoded) {
            return NextResponse.json({ error: 'Authentication required to delete comment' }, { status: 401 });
        }

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return NextResponse.json({ error: 'Invalid comment ID format' }, { status: 400 });
        }

        // Find the comment first to check ownership
        const comment = await Comment.findById(commentId);

        if (!comment) {
            // Already deleted or never existed, return success or 404? Let's go with 404.
            return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
        }

        // Check if the authenticated user is the author
        // TODO: Add role check for admins/moderators/post authors?
        if (comment.userId.toString() !== decoded.id) {
            return NextResponse.json({ error: 'Access denied: You can only delete your own comments' }, { status: 403 });
        }

        // Use findOneAndDelete to trigger the post hook in the Comment model
        const deletedComment = await Comment.findOneAndDelete({ _id: commentId });

        if (!deletedComment) {
             // Should not happen if found above, but belt-and-suspenders
             return NextResponse.json({ error: 'Comment not found during deletion' }, { status: 404 });
        }

         // TODO: Handle deletion of replies if this was a parent comment?
         // For now, deleting a comment leaves its children orphaned (parentId still points to deleted comment).
         // A more robust system might delete children or re-parent them.

        return NextResponse.json({ message: 'Comment deleted successfully' });

    } catch (error) {
        console.error('Delete comment error:', error);
        return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
    }
}


/**
 * Handler for preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 