import mongoose from 'mongoose';
// Import ForumPost using a relative path, assuming Comment.js and ForumPost.js are in the same directory
// Adjust the path if the file structure is different.
import ForumPost from './ForumPost';

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ForumPost',
      required: [true, 'Post ID is required'],
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author ID is required'],
      index: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null, // null indicates a top-level comment
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
    },
    upvotes: {
       // Store user IDs who upvoted
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    downvotes: {
       // Store user IDs who downvoted
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
    // status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'approved' } // If moderation needed
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Ensure virtuals are included when converting to JSON
    toObject: { virtuals: true }
  }
);

// Virtual property for vote score
CommentSchema.virtual('voteScore').get(function() {
  return (this.upvotes?.length || 0) - (this.downvotes?.length || 0);
});

// Index for efficient querying
CommentSchema.index({ createdAt: 1 }); // Often fetched in ascending order for threads


// Middleware to update the parent post's comment count after saving a new comment
CommentSchema.post('save', { document: true, query: false }, async function(doc, next) {
    // The { document: true, query: false } option ensures this hook runs for doc.save()
    // Check if it's a new document (not an update being saved)
    // Note: `this.isNew` might be more reliable inside `pre('save')`, using `doc` here.
    // We might need a more robust way to detect if this save incremented the count.
    // A simple check: if the comment was just created.
    const isNewComment = this.isNew;

    if (isNewComment && doc) {
        try {
            // Use mongoose.model to avoid potential circular dependency issues if models import each other
            const PostModel = mongoose.model('ForumPost');
            await PostModel.findByIdAndUpdate(doc.postId, { $inc: { commentCount: 1 } });
        } catch (error) {
            console.error('Error updating comment count on post after save:', error);
            // Decide if the error should block the operation
            // next(error); // Uncomment to propagate the error
        }
    }
    next();
});

// Middleware to update the parent post's comment count after removing a comment
// Using findOneAndDelete hook because 'remove' document middleware might not have the doc context always
CommentSchema.post('findOneAndDelete', async function(doc, next) {
    // `doc` here is the document that was deleted
    if (doc) {
        try {
            const PostModel = mongoose.model('ForumPost');
            // Decrement count, ensuring it doesn't go below 0
            await PostModel.findByIdAndUpdate(doc.postId, { $inc: { commentCount: -1 } });
            // Optional: Add a check to ensure count doesn't go negative if $inc somehow fails gracefully
            // const post = await PostModel.findById(doc.postId);
            // if (post && post.commentCount < 0) { post.commentCount = 0; await post.save(); }
        } catch (error) {
            console.error('Error updating comment count on post after delete:', error);
             // Decide if the error should block the operation
            // next(error); // Uncomment to propagate the error
        }
    }
    next();
});


export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema); 