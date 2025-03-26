import mongoose from 'mongoose';

const CropAdoptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Crop name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FarmerProfile',
      required: [true, 'Farmer ID is required'],
    },
    cropType: {
      type: String,
      required: [true, 'Crop type is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    currency: {
      type: String,
      default: '₹',
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    adoptions: [
      {
        consumerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        startDate: {
          type: Date,
          default: Date.now,
        },
        endDate: Date,
        status: {
          type: String,
          enum: ['active', 'completed', 'cancelled'],
          default: 'active',
        },
        paymentStatus: {
          type: String,
          enum: ['pending', 'paid', 'refunded'],
          default: 'pending',
        },
        updates: [
          {
            date: {
              type: Date,
              default: Date.now,
            },
            description: {
              type: String,
              required: true,
            },
            images: [String],
          },
        ],
      },
    ],
    availableSlots: {
      type: Number,
      default: 10,
      min: 0,
    },
    adoptedSlots: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    plantingDate: Date,
    expectedHarvestDate: Date,
    // Specific details about the crop
    scientificName: String,
    growingConditions: String,
    careInstructions: String,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add indexes for better query performance
CropAdoptionSchema.index({ farmerId: 1 });
CropAdoptionSchema.index({ cropType: 1 });
CropAdoptionSchema.index({ name: 'text', description: 'text' });
CropAdoptionSchema.index({ status: 1 });
CropAdoptionSchema.index({ featured: 1 });

// Export model or initialize it if it already exists
export default mongoose.models.CropAdoption || mongoose.model('CropAdoption', CropAdoptionSchema); 