import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '../../../lib/utils/database';
import User from '../../../lib/models/User';
import Product from '../../../lib/models/Product';
import FarmerProfile from '../../../lib/models/FarmerProfile';
import { getUserFromToken } from '../../../lib/utils/auth';

/**
 * Handler for getting a specific product
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters
 * @returns {Promise<NextResponse>} - The response object
 */
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    const { id } = params;
    
    // Find the product
    const product = await Product.findById(id)
      .populate('farmerId', 'farmName');
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Return the product
    return NextResponse.json({ product });
    
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Failed to get product' },
      { status: 500 }
    );
  }
}

/**
 * Handler for updating a product
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters
 * @returns {Promise<NextResponse>} - The response object
 */
export async function PUT(request, { params }) {
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
    
    const { id } = params;
    
    // Find the product
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Find the farmer's profile
    const farmerProfile = await FarmerProfile.findOne({ userId: decoded.id });
    
    if (!farmerProfile) {
      return NextResponse.json(
        { error: 'Farmer profile not found' },
        { status: 404 }
      );
    }
    
    // Check if the user is the owner of the product
    if (product.farmerId.toString() !== farmerProfile._id.toString()) {
      return NextResponse.json(
        { error: 'Access denied: You can only update your own products' },
        { status: 403 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
    
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * Handler for deleting a product
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters
 * @returns {Promise<NextResponse>} - The response object
 */
export async function DELETE(request, { params }) {
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
    
    const { id } = params;
    
    // Find the product
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Find the farmer's profile
    const farmerProfile = await FarmerProfile.findOne({ userId: decoded.id });
    
    // Check if user is admin or the owner of the product
    const user = await User.findById(decoded.id);
    const isAdmin = user.role.includes('admin');
    const isOwner = farmerProfile && product.farmerId.toString() === farmerProfile._id.toString();
    
    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { error: 'Access denied: You can only delete your own products' },
        { status: 403 }
      );
    }
    
    // Delete the product
    await Product.findByIdAndDelete(id);
    
    return NextResponse.json({
      message: 'Product deleted successfully',
    });
    
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
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
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 