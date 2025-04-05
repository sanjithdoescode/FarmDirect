import { NextResponse } from 'next/server';
import connectToDatabase from '../lib/utils/database';
import FarmPoll from '../lib/models/FarmPoll';

// Sample data for testing
const samplePolls = [
  {
    farmerId: '60d0fe4f5311236168a109ca', // This would be a real user ID in production
    title: 'Which vegetable crop should I plant for the Kharif season?',
    description: 'I\'m deciding between several vegetable options for my 5-acre plot.',
    location: {
      district: 'Pune',
      state: 'Maharashtra',
      coordinates: {
        latitude: 18.5204,
        longitude: 73.8567,
      },
    },
    cropSeason: 'kharif',
    pollType: 'public',
    options: [
      {
        cropName: 'Tomatoes',
        description: 'Resistant variety suitable for Pune climate',
        votes: 12,
        voters: []
      },
      {
        cropName: 'Okra',
        description: 'High-yield variety with good market demand',
        votes: 8,
        voters: []
      },
      {
        cropName: 'Eggplant',
        description: 'Disease-resistant hybrid',
        votes: 5,
        voters: []
      }
    ],
    status: 'active',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
  {
    farmerId: '60d0fe4f5311236168a109ca',
    title: 'Which paddy variety should I grow this season?',
    description: 'Looking for recommendations on rice varieties suitable for my region.',
    location: {
      district: 'Thane',
      state: 'Maharashtra',
      coordinates: {
        latitude: 19.2183,
        longitude: 72.9781,
      },
    },
    cropSeason: 'kharif',
    pollType: 'personal',
    options: [
      {
        cropName: 'Basmati',
        description: 'Premium variety with export potential',
        votes: 0,
        voters: []
      },
      {
        cropName: 'IR-36',
        description: 'High-yield variety with good resistance',
        votes: 0,
        voters: []
      }
    ],
    status: 'active',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  },
  {
    farmerId: '60d0fe4f5311236168a109cb', // Different farmer
    title: 'Best crop rotation after wheat harvest?',
    description: 'I\'ve just harvested wheat and need to decide what to plant next.',
    location: {
      district: 'Nagpur',
      state: 'Maharashtra',
      coordinates: {
        latitude: 21.1458,
        longitude: 79.0882,
      },
    },
    cropSeason: 'rabi',
    pollType: 'public',
    options: [
      {
        cropName: 'Gram',
        description: 'Legume to improve soil nitrogen',
        votes: 15,
        voters: []
      },
      {
        cropName: 'Mustard',
        description: 'Good for oil production',
        votes: 7,
        voters: []
      },
      {
        cropName: 'Fallow',
        description: 'Let the land rest for a season',
        votes: 3,
        voters: []
      }
    ],
    status: 'closed',
    selectedOption: {
      cropName: 'Gram',
      implementationDate: new Date(),
      outcome: 'Successful harvest with good yield',
    },
    deadline: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago (closed)
  }
];

export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Check if we already have polls
    const existingCount = await FarmPoll.countDocuments({});
    
    if (existingCount > 0) {
      return NextResponse.json({ 
        success: false,
        message: 'Database already contains polls. Seed operation cancelled.',
        existingCount 
      }, { status: 400 });
    }
    
    // Insert the sample data
    const result = await FarmPoll.insertMany(samplePolls);
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded database with ${result.length} polls`,
      insertedCount: result.length
    });
  } catch (error) {
    console.error('Failed to seed database:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to seed database',
      error: error.message 
    }, { status: 500 });
  }
} 