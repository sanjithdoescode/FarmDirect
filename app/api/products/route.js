import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '../../lib/utils/database';
import User from '../../lib/models/User';
import Product from '../../lib/models/Product';
import FarmerProfile from '../../lib/models/FarmerProfile';
import { verifyToken } from '../../lib/utils/auth';

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
 * Handler for getting products with optional filters
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const farmerId = searchParams.get('farmerId');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (farmerId) {
      filter.farmerId = farmerId;
    }
    
    // Status should be 'available' by default
    filter.status = searchParams.get('status') || 'available';
    
    // Add search query if provided
    if (search) {
      filter.$text = { $search: search };
    }
    
    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;
    
    // Count total products matching the filter
    const total = await Product.countDocuments(filter);
    
    // Get products
    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .populate('farmerId', 'farmName'); // Populate farmer information
    
    // Return products with pagination info
    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
    
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Failed to get products' },
      { status: 500 }
    );
  }
}

/**
 * Handler for creating a new product
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
    
    // Check if user has farmer role
    const user = await User.findById(decoded.id);
    if (!user || !user.role.includes('farmer')) {
      return NextResponse.json(
        { error: 'Access denied: Only farmers can create products' },
        { status: 403 }
      );
    }
    
    // Check if farmer profile exists
    const farmerProfile = await FarmerProfile.findOne({ userId: decoded.id });
    if (!farmerProfile) {
      return NextResponse.json(
        { error: 'Farmer profile not found. Please create a farmer profile first' },
        { status: 404 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description || !body.category || !body.price || !body.unit || !body.quantityAvailable) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new product
    const newProduct = new Product({
      farmerId: farmerProfile._id, // Use the farmer profile ID, not user ID
      ...body,
    });
    
    // Save the product
    await newProduct.save();
    
    return NextResponse.json({
      message: 'Product created successfully',
      product: newProduct,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
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
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 