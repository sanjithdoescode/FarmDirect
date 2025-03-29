import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyRefreshToken, generateAccessToken } from '../../lib/utils/auth';
import { connectToDatabase } from '../../lib/utils/database';
import User from '../../lib/models/User';

/**
 * Handler for refreshing JWT tokens
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get refresh token from cookies
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    
    // If no refresh token in cookies, try to get it from the request body
    let refreshTokenFromBody;
    try {
      const body = await request.json();
      refreshTokenFromBody = body.refreshToken;
    } catch (e) {
      // Request might not have a body, which is fine
    }
    
    // Use either token source
    const token = refreshToken || refreshTokenFromBody;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 401 }
      );
    }
    
    // Verify the refresh token
    const decoded = verifyRefreshToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }
    
    // Find the user to ensure they still exist
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }
    
    // Generate a new access token
    const accessToken = generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    
    // Set the new access token in a cookie
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 15 * 60, // 15 minutes in seconds
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    
    // Return the new access token in the response
    return NextResponse.json({
      message: 'Token refreshed successfully',
      accessToken,
    });
    
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: 500 }
    );
  }
} 