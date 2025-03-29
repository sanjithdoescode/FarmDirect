import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/utils/database';
import Order from '../../lib/models/Order';
import { getUserFromToken } from '../../lib/utils/auth';
import mongoose from 'mongoose';

/**
 * Handler for getting a specific order by ID
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters (contains id)
 * @returns {Promise<NextResponse>} - The response object
 */
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    const decoded = getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid order ID format' }, { status: 400 });
    }

    const order = await Order.findById(id)
        .populate('consumerId', 'fullName email') // Populate consumer info
        .populate('items.productId', 'name description images category') // Populate product details
        .populate('items.farmerId', 'farmName location contact'); // Populate farmer details

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Ensure the user requesting the order is the one who placed it (or an admin/farmer in future)
    if (order.consumerId._id.toString() !== decoded.id) {
      // TODO: Add checks for farmer/admin roles if they need access
      return NextResponse.json({ error: 'Access denied: You can only view your own orders' }, { status: 403 });
    }

    return NextResponse.json({ order });

  } catch (error) {
    console.error('Get order by ID error:', error);
    return NextResponse.json({ error: 'Failed to get order details' }, { status: 500 });
  }
}

/**
 * Handler for updating an order (e.g., status update, cancellation)
 * For now, just allows cancellation by the consumer.
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters (contains id)
 * @returns {Promise<NextResponse>} - The response object
 */
export async function PUT(request, { params }) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await connectToDatabase();
        const { id } = params;

        const decoded = getUserFromToken(request);
        if (!decoded) {
            await session.abortTransaction();
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            await session.abortTransaction();
            return NextResponse.json({ error: 'Invalid order ID format' }, { status: 400 });
        }

        const body = await request.json();
        const { orderStatus, cancelReason } = body;

        // Only support cancellation for now
        if (orderStatus !== 'cancelled') {
            await session.abortTransaction();
            return NextResponse.json({ error: 'Only cancellation is supported via this endpoint currently' }, { status: 400 });
        }
         if (orderStatus === 'cancelled' && !cancelReason) {
            await session.abortTransaction();
            return NextResponse.json({ error: 'Cancellation reason is required when cancelling an order' }, { status: 400 });
        }

        const order = await Order.findById(id).session(session);

        if (!order) {
            await session.abortTransaction();
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Ensure the user cancelling the order is the one who placed it
        if (order.consumerId.toString() !== decoded.id) {
            await session.abortTransaction();
            return NextResponse.json({ error: 'Access denied: You can only cancel your own orders' }, { status: 403 });
        }

        // Check if the order can be cancelled (e.g., not already delivered or shipped)
        if (['shipped', 'delivered', 'cancelled'].includes(order.orderStatus)) {
            await session.abortTransaction();
            return NextResponse.json({ error: `Order cannot be cancelled as it is already ${order.orderStatus}` }, { status: 400 });
        }

        // Update order status to cancelled
        order.orderStatus = 'cancelled';
        order.cancelReason = cancelReason;
        order.cancelledBy = 'consumer';
        order.cancelledAt = new Date();

        // Restore product quantities (important!)
        for (const item of order.items) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { quantityAvailable: item.quantity },
                // Optionally update status back to 'available' if it went out_of_stock
                 $set: { status: 'available' } // Simple approach; might need refinement
            }).session(session);
        }

        await order.save({ session });
        await session.commitTransaction();

        return NextResponse.json({ message: 'Order cancelled successfully', order });

    } catch (error) {
        await session.abortTransaction();
        console.error('Update order error:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    } finally {
        session.endSession();
    }
}


/**
 * Handler for preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 