import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '../../../lib/utils/database';
import User from '../../../lib/models/User';
import FarmerProfile from '../../../lib/models/FarmerProfile';
import { verifyToken } from '../../../lib/utils/auth';

/**
 * Get the user from the authorization headers or cookies
 * @param {Request} request - The incoming request object
 * @returns {Object|null} - The decoded user information or null
 */
async function getUserFromToken(request) {
  // Get access token from cookies
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  
  // If no token in cookies, try to get it from the Authorization header
  let token = accessToken;
  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }
  
  if (!token) {
    return null;
  }
  
  // Verify the token
  return verifyToken(token);
}

/**
 * Handler for getting farmer profile
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get user information from token
    const decoded = await getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if user has farmer role
    const user = await User.findById(decoded.id);
    if (!user.role.includes('farmer')) {
      return NextResponse.json(
        { error: 'Access denied: User is not a farmer' },
        { status: 403 }
      );
    }
    
    // Find the farmer profile
    const farmerProfile = await FarmerProfile.findOne({ userId: decoded.id });
    
    if (!farmerProfile) {
      return NextResponse.json(
        { 
          exists: false,
          message: 'Farmer profile not found'
        },
        { status: 404 }
      );
    }
    
    // Return the farmer profile
    return NextResponse.json({
      exists: true,
      farmerProfile
    });
    
  } catch (error) {
    console.error('Get farmer profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get farmer profile' },
      { status: 500 }
    );
  }
}

/**
 * Handler for creating or updating farmer profile
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get user information from token
    const decoded = await getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if user has farmer role, if not add it
    const user = await User.findById(decoded.id);
    if (!user.role.includes('farmer')) {
      await User.findByIdAndUpdate(
        decoded.id,
        { $addToSet: { role: 'farmer' } }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.farmName) {
      return NextResponse.json(
        { error: 'Farm name is required' },
        { status: 400 }
      );
    }
    
    // Check if profile already exists
    const existingProfile = await FarmerProfile.findOne({ userId: decoded.id });
    
    if (existingProfile) {
      // Update existing profile
      const updatedProfile = await FarmerProfile.findOneAndUpdate(
        { userId: decoded.id },
        { $set: body },
        { new: true, runValidators: true }
      );
      
      return NextResponse.json({
        message: 'Farmer profile updated successfully',
        farmerProfile: updatedProfile,
      });
    } else {
      // Create new profile
      const newProfile = new FarmerProfile({
        userId: decoded.id,
        ...body,
      });
      
      await newProfile.save();
      
      return NextResponse.json({
        message: 'Farmer profile created successfully',
        farmerProfile: newProfile,
      }, { status: 201 });
    }
    
  } catch (error) {
    console.error('Create/update farmer profile error:', error);
    return NextResponse.json(
      { error: 'Failed to create/update farmer profile' },
      { status: 500 }
    );
  }
}

/**
 * Handler for updating farmer profile
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function PUT(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get user information from token
    const decoded = await getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if user has farmer role
    const user = await User.findById(decoded.id);
    if (!user.role.includes('farmer')) {
      return NextResponse.json(
        { error: 'Access denied: User is not a farmer' },
        { status: 403 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    
    // Find and update the farmer profile
    const farmerProfile = await FarmerProfile.findOneAndUpdate(
      { userId: decoded.id },
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!farmerProfile) {
      return NextResponse.json(
        { error: 'Farmer profile not found' },
        { status: 404 }
      );
    }
    
    // Return the updated farmer profile
    return NextResponse.json({
      message: 'Farmer profile updated successfully',
      farmerProfile,
    });
    
  } catch (error) {
    console.error('Update farmer profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update farmer profile' },
      { status: 500 }
    );
  }
}

/**
 * Handler for preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204, // No content
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST, PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
