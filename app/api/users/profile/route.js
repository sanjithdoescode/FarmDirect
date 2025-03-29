import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '../../../lib/utils/database';
import User from '../../../lib/models/User';
import { getUserFromToken } from '../../../lib/utils/auth';

/**
 * Handler for getting user profile
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get user information from token
    const decoded = getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Find the user in the database
    const user = await User.findById(decoded.id).select('-passwordHash -verificationToken -resetPasswordToken -resetPasswordExpires');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return the user profile
    return NextResponse.json({ user });
    
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get user profile' },
      { status: 500 }
    );
  }
}

/**
 * Handler for updating user profile
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function PUT(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get user information from token
    const decoded = getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    
    // Fields that can be updated
    const allowedUpdates = [
      'fullName',
      'phoneNumber',
      'address',
      'preferredLanguage',
    ];
    
    // Create an object with only the allowed fields
    const updates = {};
    for (const field of allowedUpdates) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }
    
    // Update the user
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-passwordHash -verificationToken -resetPasswordToken -resetPasswordExpires');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return the updated user profile
    return NextResponse.json({
      message: 'Profile updated successfully',
      user,
    });
    
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
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
      'Access-Control-Allow-Methods': 'GET, PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 