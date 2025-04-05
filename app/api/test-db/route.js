import { NextResponse } from 'next/server';
import connectToDatabase from '../lib/utils/database';
import FarmPoll from '../lib/models/FarmPoll';

export async function GET(request) {
  try {
    // 1. Connect to the database
    await connectToDatabase();
    
    // 2. Perform a simple query - count total polls
    const totalPolls = await FarmPoll.countDocuments({});
    
    // 3. Get the latest 5 polls (limited data for safety)
    const latestPolls = await FarmPoll.find({})
      .select('title cropSeason status createdAt')
      .sort({ createdAt: -1 })
      .limit(5);
    
    // 4. Return the results
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        totalPolls,
        latestPolls
      }
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to connect to database',
        error: error.message
      }, 
      { status: 500 }
    );
  }
} 