import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    consumerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Consumer ID is required'],
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        farmerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'FarmerProfile',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        pricePerUnit: {
          type: Number,
          required: true,
          min: 0,
        },
        totalPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['cash', 'upi', 'card', 'bank_transfer'],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentDetails: {
      transactionId: String,
      paymentDate: Date,
      gateway: String,
    },
    shippingAddress: {
      fullName: String,
      phoneNumber: String,
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
    orderStatus: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    orderNotes: String,
    estimatedDeliveryDate: Date,
    deliveryDate: Date,
    trackingDetails: {
      carrier: String,
      trackingNumber: String,
      trackingUrl: String,
    },
    cancelReason: String,
    cancelledBy: {
      type: String,
      enum: ['consumer', 'farmer', 'admin'],
    },
    cancelledAt: Date,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add indexes for better query performance
OrderSchema.index({ consumerId: 1 });
OrderSchema.index({ 'items.farmerId': 1 });
OrderSchema.index({ orderStatus: 1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ createdAt: -1 });

// Export model or initialize it if it already exists
export default mongoose.models.Order || mongoose.model('Order', OrderSchema); 