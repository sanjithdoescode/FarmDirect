import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    role: {
      type: [String],
      enum: ['farmer', 'consumer', 'admin'],
      default: ['consumer'],
    },
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
    preferredLanguage: {
      type: String,
      enum: ['en', 'ta'], // English, Tamil
      default: 'en',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add any additional methods or virtual properties here

// Export model or initialize it if it already exists
export default mongoose.models.User || mongoose.model('User', UserSchema); 