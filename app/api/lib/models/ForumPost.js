import mongoose from 'mongoose';

const ForumPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
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
    commentCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
    // status: { type: String, enum: ['published', 'draft', 'archived'], default: 'published' } // Optional status field
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Ensure virtuals are included when converting to JSON
    toObject: { virtuals: true }
  }
);

// Virtual property for vote score
ForumPostSchema.virtual('voteScore').get(function() {
  return (this.upvotes?.length || 0) - (this.downvotes?.length || 0);
});

// Index for efficient querying
ForumPostSchema.index({ createdAt: -1 }); // Often fetched in reverse chronological order
ForumPostSchema.index({ 'tags': 1, createdAt: -1 }); // For filtering by tag and sorting

// Add a text index for searching if needed later
// ForumPostSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.models.ForumPost || mongoose.model('ForumPost', ForumPostSchema); 