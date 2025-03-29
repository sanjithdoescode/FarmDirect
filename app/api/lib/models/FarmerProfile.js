import mongoose from 'mongoose';

const FarmerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    farmName: {
      type: String,
      required: [true, 'Farm name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    farmSize: {
      type: Number,
      min: 0,
    },
    establishedYear: {
      type: Number,
    },
    certifications: {
      type: [String],
      default: [],
    },
    specialties: {
      type: [String],
      default: [],
    },
    farmImages: {
      type: [String], // URLs to images
      default: [],
    },
    socialMedia: {
      website: String,
      facebook: String,
      instagram: String,
    },
    bankDetails: {
      accountHolder: String,
      accountNumber: String,
      bankName: String,
      ifscCode: String,
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    farmerExperience: {
      type: Number,
      default: 0,
      min: 0,
    },
    farmingPractices: {
      type: [String],
      default: [],
    },
    deliveryOptions: {
      type: [String],
      default: ['pickup'],
    },
    serviceableAreas: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add indexes for better query performance
FarmerProfileSchema.index({ userId: 1 });
FarmerProfileSchema.index({ farmName: 'text', description: 'text' });

// Add any additional methods or virtual properties here

// Export model or initialize it if it already exists
export default mongoose.models.FarmerProfile || mongoose.model('FarmerProfile', FarmerProfileSchema); 