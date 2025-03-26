import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/utils/database';
import User from '../../lib/models/User';
import { hashPassword } from '../../lib/utils/auth';

/**
 * Handler for user registration
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
    const { email, password, fullName, role } = body;
    
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Validate password strength (at least 8 characters with a mix of letters and numbers)
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long and contain both letters and numbers' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash the password
    const passwordHash = await hashPassword(password);
    
    // Create the user
    const newUser = new User({
      email,
      passwordHash,
      fullName,
      role: role ? [role] : ['consumer'], // Default to consumer if no role is provided
      // Add other fields from the request body if needed
      phoneNumber: body.phoneNumber,
      address: body.address,
      preferredLanguage: body.preferredLanguage || 'en',
    });
    
    // Save the user to the database
    await newUser.save();
    
    // Return a success response (without sensitive information)
    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
} 