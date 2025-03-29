import { NextResponse } from 'next/server';
import { connectToDatabase } from '../lib/utils/database';
import Order from '../lib/models/Order';
import Product from '../lib/models/Product';
import User from '../lib/models/User';
import { getUserFromToken } from '../lib/utils/auth';
import mongoose from 'mongoose';

/**
 * Handler for creating a new order
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST(request) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connectToDatabase();

    const decoded = getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { items, paymentMethod, shippingAddress, tax = 0, deliveryFee = 0, discount = 0 } = body;

    if (!items || items.length === 0 || !paymentMethod || !shippingAddress) {
      return NextResponse.json({ error: 'Missing required fields: items, paymentMethod, shippingAddress' }, { status: 400 });
    }

    let subtotal = 0;
    const orderItems = [];

    // Validate items and calculate subtotal
    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        throw new Error('Invalid item data. Each item must have productId and positive quantity.');
      }

      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }
      if (product.quantityAvailable < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}. Available: ${product.quantityAvailable}, Requested: ${item.quantity}`);
      }

      const itemTotalPrice = product.price * item.quantity;
      subtotal += itemTotalPrice;

      orderItems.push({
        productId: product._id,
        farmerId: product.farmerId, // Get farmerId from the product
        name: product.name,
        quantity: item.quantity,
        pricePerUnit: product.price,
        totalPrice: itemTotalPrice,
        unit: product.unit,
      });

      // Decrease product quantity
      product.quantityAvailable -= item.quantity;
      if (product.quantityAvailable === 0) {
          product.status = 'out_of_stock';
      }
      await product.save({ session });
    }

    const totalAmount = subtotal + tax + deliveryFee - discount;

    // Create the new order
    const newOrder = new Order({
      consumerId: decoded.id, // Use the user ID from token
      items: orderItems,
      subtotal,
      tax,
      deliveryFee,
      discount,
      totalAmount,
      paymentMethod,
      paymentStatus: 'pending', // Default status
      shippingAddress,
      orderStatus: 'pending', // Default status
    });

    await newOrder.save({ session });

    await session.commitTransaction();

    return NextResponse.json({
      message: 'Order created successfully',
      order: newOrder,
    }, { status: 201 });

  } catch (error) {
    await session.abortTransaction();
    console.error('Create order error:', error);
    // Check for specific mongoose validation errors
     if (error.name === 'ValidationError') {
       return NextResponse.json({ error: error.message }, { status: 400 });
     }
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  } finally {
      session.endSession();
  }
}

/**
 * Handler for getting orders for the logged-in user
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function GET(request) {
  try {
    await connectToDatabase();

    const decoded = getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); // Filter by orderStatus
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    const skip = (page - 1) * limit;

    // Base filter for the current user's orders
    const filter = { consumerId: decoded.id };

    if (status) {
      filter.orderStatus = status;
    }

    const sortObj = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;

    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .populate('items.productId', 'name images') // Populate basic product info
      .populate('items.farmerId', 'farmName') // Populate farmer name
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ error: 'Failed to get orders' }, { status: 500 });
  }
}

/**
 * Handler for preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 