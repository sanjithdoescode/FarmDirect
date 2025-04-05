import mongoose from 'mongoose';

const FarmPollSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Poll title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Poll description is required'],
      trim: true,
    },
    location: {
      district: String,
      state: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    cropSeason: {
      type: String,
      required: true,
      enum: ['kharif', 'rabi', 'zaid', 'year-round'],
    },
    // Visibility options
    pollType: {
      type: String,
      required: true,
      enum: ['personal', 'public'],
      default: 'public'
    },
    options: [
      {
        cropName: {
          type: String,
          required: true,
        },
        description: String,
        votes: {
          type: Number,
          default: 0,
        },
        // Track who voted for this option
        voters: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }]
      }
    ],
    // For tracking if a poll has been closed and which option was chosen
    status: {
      type: String,
      enum: ['active', 'closed', 'implemented'],
      default: 'active',
    },
    selectedOption: {
      cropName: String,
      implementationDate: Date,
      outcome: String,
    },
    // Deadline for voting
    deadline: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  }
);

// Static method to check if a crop is approaching the limit in a particular region
FarmPollSchema.statics.getCropTrendByRegion = async function(crop, state, district, season) {
  const result = await this.aggregate([
    {
      $match: {
        'location.state': state,
        ...(district ? { 'location.district': district } : {}),
        cropSeason: season,
        status: { $in: ['active', 'closed'] },
        'options.cropName': crop
      }
    },
    {
      $group: {
        _id: '$options.cropName',
        count: { $sum: 1 }
      }
    }
  ]);
  
  return result.length > 0 ? result[0].count : 0;
};

// Index for efficient querying by location and crops
FarmPollSchema.index({ 'location.state': 1, 'location.district': 1, cropSeason: 1 });
FarmPollSchema.index({ 'options.cropName': 1 });

export default mongoose.models.FarmPoll || mongoose.model('FarmPoll', FarmPollSchema); 