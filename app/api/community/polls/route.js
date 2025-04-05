import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/utils/database';
import FarmPoll from '../../lib/models/FarmPoll';
import { getUserFromToken } from '../../lib/utils/auth';

// Constants for limit configuration
const CROP_WARNING_THRESHOLD = 300; // Warning at 300 polls for same crop
const CROP_LIMIT_THRESHOLD = 500;   // Hard limit at 500 polls for same crop

/**
 * GET handler for polls
 * Supports filtering by region, crop type, farmer, etc.
 */
export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const pollType = searchParams.get('pollType'); // 'personal', 'public'
    const state = searchParams.get('state');
    const district = searchParams.get('district');
    const cropSeason = searchParams.get('season');
    const farmerId = searchParams.get('farmerId');
    const status = searchParams.get('status');
    
    // Build filter
    const filter = {};
    
    // If personal polls are requested, validate the user is authenticated
    if (pollType === 'personal') {
      const user = await getUserFromToken(request);
      if (!user) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      }
      filter.farmerId = user._id;
    } else if (pollType === 'public') {
      filter.pollType = 'public';
    }
    
    // Apply additional filters
    if (state) filter['location.state'] = state;
    if (district) filter['location.district'] = district;
    if (cropSeason) filter.cropSeason = cropSeason;
    if (farmerId) filter.farmerId = farmerId;
    if (status) filter.status = status;
    
    // Fetch polls from database
    const polls = await FarmPoll.find(filter)
      .populate('farmerId', 'fullName')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ polls });
  } catch (error) {
    console.error('Error fetching polls:', error);
    return NextResponse.json({ error: 'Failed to fetch polls' }, { status: 500 });
  }
}

/**
 * POST handler for creating a new poll
 * Includes logic for checking crop limits per region
 */
export async function POST(request) {
  try {
    await connectToDatabase();
    
    // Authentication check
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    // Only farmers can create polls
    if (!user.role.includes('farmer')) {
      return NextResponse.json({ error: 'Only farmers can create polls' }, { status: 403 });
    }
    
    // Get poll data from request
    const pollData = await request.json();
    const { title, description, location, cropSeason, options, pollType, deadline } = pollData;
    
    // Validate required fields
    if (!title || !description || !location || !cropSeason || !options || !deadline) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Check for crop limits in the region for each crop option
    const cropWarnings = [];
    const blockedCrops = [];
    
    for (const option of options) {
      const { cropName } = option;
      
      // Get count of polls for this crop in the region
      const cropCount = await FarmPoll.getCropTrendByRegion(
        cropName, 
        location.state, 
        location.district,
        cropSeason
      );
      
      // Check against thresholds
      if (cropCount >= CROP_LIMIT_THRESHOLD) {
        blockedCrops.push({ 
          crop: cropName, 
          count: cropCount,
          message: `This crop has reached the maximum limit of ${CROP_LIMIT_THRESHOLD} polls in your region`
        });
      } else if (cropCount >= CROP_WARNING_THRESHOLD) {
        cropWarnings.push({ 
          crop: cropName, 
          count: cropCount,
          message: `This crop is approaching the poll limit. ${cropCount}/${CROP_LIMIT_THRESHOLD} polls created.`
        });
      }
    }
    
    // If any crops are blocked, return error
    if (blockedCrops.length > 0) {
      return NextResponse.json({ 
        error: 'Some crops have reached the poll limit',
        blockedCrops,
        cropWarnings
      }, { status: 400 });
    }
    
    // Create the poll
    const poll = new FarmPoll({
      farmerId: user._id,
      title,
      description,
      location,
      cropSeason,
      options,
      pollType: pollType || 'public',
      deadline,
      status: 'active'
    });
    
    await poll.save();
    
    // Return success with warnings if any
    if (cropWarnings.length > 0) {
      return NextResponse.json({
        message: 'Poll created successfully with warnings',
        poll,
        cropWarnings
      });
    }
    
    return NextResponse.json({
      message: 'Poll created successfully',
      poll
    });
    
  } catch (error) {
    console.error('Error creating poll:', error);
    return NextResponse.json({ error: 'Failed to create poll' }, { status: 500 });
  }
}

/**
 * PATCH handler for updating a poll (implement, close, etc.)
 */
export async function PATCH(request) {
  try {
    await connectToDatabase();
    
    // Authentication check
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    // Get data from request
    const { id, ...updateData } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Poll ID is required' }, { status: 400 });
    }
    
    // Find the poll
    const poll = await FarmPoll.findById(id);
    
    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }
    
    // Check if user is the poll owner
    if (poll.farmerId.toString() !== user._id.toString()) {
      return NextResponse.json({ error: 'Not authorized to update this poll' }, { status: 403 });
    }
    
    // Update allowed fields
    const allowedUpdates = ['status', 'selectedOption'];
    const updates = {};
    
    for (const field of allowedUpdates) {
      if (updateData[field] !== undefined) {
        updates[field] = updateData[field];
      }
    }
    
    updates.updatedAt = new Date();
    
    // Perform update
    const updatedPoll = await FarmPoll.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );
    
    return NextResponse.json({
      message: 'Poll updated successfully',
      poll: updatedPoll
    });
    
  } catch (error) {
    console.error('Error updating poll:', error);
    return NextResponse.json({ error: 'Failed to update poll' }, { status: 500 });
  }
} 