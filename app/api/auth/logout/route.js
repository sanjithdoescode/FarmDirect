import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Handler for user logout
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST() {
  try {
    // Clear cookies
    const cookieStore = cookies();
    
    // Clear access token cookie
    cookieStore.set('accessToken', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0, // Expires immediately
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    
    // Clear refresh token cookie
    cookieStore.set('refreshToken', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0, // Expires immediately
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    
    return NextResponse.json({
      message: 'Logged out successfully',
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
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
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 