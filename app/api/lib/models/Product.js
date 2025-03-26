import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FarmerProfile',
      required: [true, 'Farmer ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    images: {
      type: [String], // URLs to images
      default: [],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      trim: true,
    },
    quantityAvailable: {
      type: Number,
      required: [true, 'Quantity available is required'],
      min: 0,
    },
    organicCertified: {
      type: Boolean,
      default: false,
    },
    harvestDate: {
      type: Date,
    },
    seasonality: {
      type: [String], // Months when available
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      fiber: Number,
      vitamins: [String],
      minerals: [String],
    },
    status: {
      type: String,
      enum: ['available', 'out_of_stock', 'coming_soon'],
      default: 'available',
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add indexes for better query performance
ProductSchema.index({ farmerId: 1 });
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ 'ratings.average': -1 }); // For sorting by highest rated

// Export model or initialize it if it already exists
export default mongoose.models.Product || mongoose.model('Product', ProductSchema); 