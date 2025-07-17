import { NextRequest, NextResponse } from 'next/server'
import { localDB } from '@/lib/database'

// Google Pay notification handler
export async function POST(request: NextRequest) {
  try {
    console.log('Google Pay notification received')
    
    // Parse the request body
    let body: Record<string, any>
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError)
      return NextResponse.json({ 
        error: 'Invalid request body format',
        success: false
      }, { status: 400 })
    }
    
    const {
      order_id,
      payment_id,
      amount,
      currency,
      status,
      transaction_id
    } = body

    console.log('Google Pay notification data:', {
      order_id,
      payment_id,
      amount,
      currency,
      status,
      transaction_id
    })

    // Validate required fields
    const requiredFields = ['order_id', 'amount', 'currency', 'status']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields)
      return NextResponse.json({ 
        error: `Missing required fields: ${missingFields.join(', ')}`,
        success: false
      }, { status: 400 })
    }

    // Map Google Pay status to our order statuses
    const orderStatus = status === 'COMPLETED' ? 'completed' : 
                       status === 'PENDING' ? 'pending' : 
                       status === 'FAILED' ? 'failed' : 'cancelled'
    
    console.log('Status mapping:', {
      google_pay_status: status,
      our_status: orderStatus
    })

    // Find and update order in local database
    try {
      const order = await localDB.findOrderByPayhereId(order_id) // Reusing field for Google Pay
      
      if (!order) {
        console.error('Order not found for Google Pay ID:', order_id)
        return NextResponse.json({ 
          error: 'Order not found',
          success: false,
          order_id: order_id
        }, { status: 404 })
      }

      console.log('Found order:', {
        id: order.id,
        current_status: order.status,
        new_status: orderStatus
      })

      // Update order status and payment ID
      const updatedOrder = await localDB.updateOrder(order.id, {
        status: orderStatus,
        payhere_payment_id: payment_id || transaction_id || null // Reusing field for Google Pay
      })

      if (!updatedOrder) {
        console.error('Failed to update order:', order.id)
        return NextResponse.json({ 
          error: 'Failed to update order',
          success: false
        }, { status: 500 })
      }

      console.log(`Order ${order_id} updated successfully:`, {
        old_status: order.status,
        new_status: orderStatus,
        payment_id: payment_id || transaction_id
      })
      
      // Return success response
      return NextResponse.json({ 
        success: true,
        message: 'Order updated successfully',
        order_id: order_id,
        status: orderStatus,
        timestamp: new Date().toISOString()
      })
    } catch (dbError) {
      console.error('Database operation failed:', dbError)
      return NextResponse.json({ 
        error: 'Database operation failed',
        success: false
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Payment notification processing error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 })
  }
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Google Pay notification endpoint is active',
    timestamp: new Date().toISOString(),
    config: {
      merchant_id: 'BCR2DN7TZD7MBT2N',
      endpoint: '/api/payment/notify'
    }
  })
}