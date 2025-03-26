import mongoose from 'mongoose';

const ConsumerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    dietaryPreferences: {
      type: [String],
      default: [],
    },
    preferredPaymentMethods: {
      type: [String],
      default: ['cash'],
    },
    savedAddresses: [
      {
        nickname: String,
        address: {
          street: String,
          city: String,
          state: String,
          postal: String,
          country: String,
          coordinates: {
            latitude: Number,
            longitude: Number,
          },
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    favoriteProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    favoriteFarmers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FarmerProfile',
      },
    ],
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      orderUpdates: {
        type: Boolean,
        default: true,
      },
      marketingEmails: {
        type: Boolean,
        default: false,
      },
      communityUpdates: {
        type: Boolean,
        default: true,
      },
    },
    purchaseHistory: {
      totalOrders: {
        type: Number,
        default: 0,
      },
      totalSpent: {
        type: Number,
        default: 0,
      },
      lastOrderDate: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add indexes for better query performance
ConsumerProfileSchema.index({ userId: 1 });

// Add any additional methods or virtual properties here

// Export model or initialize it if it already exists
export default mongoose.models.ConsumerProfile || mongoose.model('ConsumerProfile', ConsumerProfileSchema); 