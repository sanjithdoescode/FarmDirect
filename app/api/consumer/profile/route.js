import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '../../../lib/utils/database';
import User from '../../../lib/models/User';
import ConsumerProfile from '../../../lib/models/ConsumerProfile';
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
 * Handler for getting consumer profile
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
    
    // Find the consumer profile
    const consumerProfile = await ConsumerProfile.findOne({ userId: decoded.id });
    
    if (!consumerProfile) {
      return NextResponse.json(
        { 
          exists: false,
          message: 'Consumer profile not found'
        },
        { status: 404 }
      );
    }
    
    // Return the consumer profile
    return NextResponse.json({
      exists: true,
      consumerProfile
    });
    
  } catch (error) {
    console.error('Get consumer profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get consumer profile' },
      { status: 500 }
    );
  }
}

/**
 * Handler for creating or updating consumer profile
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
    
    // Parse the request body
    const body = await request.json();
    
    // Check if profile already exists
    const existingProfile = await ConsumerProfile.findOne({ userId: decoded.id });
    
    if (existingProfile) {
      // Update existing profile
      const updatedProfile = await ConsumerProfile.findOneAndUpdate(
        { userId: decoded.id },
        { $set: body },
        { new: true, runValidators: true }
      );
      
      return NextResponse.json({
        message: 'Consumer profile updated successfully',
        consumerProfile: updatedProfile,
      });
    } else {
      // Create new profile
      const newProfile = new ConsumerProfile({
        userId: decoded.id,
        ...body,
      });
      
      await newProfile.save();
      
      return NextResponse.json({
        message: 'Consumer profile created successfully',
        consumerProfile: newProfile,
      }, { status: 201 });
    }
    
  } catch (error) {
    console.error('Create/update consumer profile error:', error);
    return NextResponse.json(
      { error: 'Failed to create/update consumer profile' },
      { status: 500 }
    );
  }
}

/**
 * Handler for updating consumer profile
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
    
    // Parse the request body
    const body = await request.json();
    
    // Find and update the consumer profile
    const consumerProfile = await ConsumerProfile.findOneAndUpdate(
      { userId: decoded.id },
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!consumerProfile) {
      return NextResponse.json(
        { error: 'Consumer profile not found' },
        { status: 404 }
      );
    }
    
    // Return the updated consumer profile
    return NextResponse.json({
      message: 'Consumer profile updated successfully',
      consumerProfile,
    });
    
  } catch (error) {
    console.error('Update consumer profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update consumer profile' },
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