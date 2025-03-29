import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '../../lib/utils/database';
import User from '../../lib/models/User';
import { comparePassword, generateAccessToken, generateRefreshToken } from '../../lib/utils/auth';

/**
 * Handler for user login
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    const { email, password } = body;
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Find the user by email
    const user = await User.findOne({ email });
    
    // If user not found or password doesn't match
    if (!user || !(await comparePassword(password, user.passwordHash))) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Generate JWT tokens
    const accessToken = generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    
    const refreshToken = generateRefreshToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    
    // Set cookies
    const cookieStore = cookies();
    
    // Set access token cookie (15 minutes)
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 15 * 60, // 15 minutes in seconds
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    
    // Set refresh token cookie (7 days)
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    
    // Return user information (without sensitive data)
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      // Include tokens in the response for clients that don't use cookies
      accessToken,
      refreshToken,
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
} 