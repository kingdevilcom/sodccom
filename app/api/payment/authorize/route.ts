import { NextRequest, NextResponse } from 'next/server'
import { localDB } from '@/lib/database'

// Google Pay authorization endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      order_id,
      amount,
      currency,
      customer_email,
      payment_token
    } = body

    console.log('Google Pay authorize request:', {
      order_id,
      amount,
      currency,
      customer_email
    })

    // Validate required fields
    if (!order_id || !amount || !currency || !customer_email) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        success: false
      }, { status: 400 })
    }

    // Find the order in our database
    const order = await localDB.findOrderByPayhereId(order_id) // Reusing field
    if (!order) {
      return NextResponse.json({ 
        error: 'Order not found',
        success: false
      }, { status: 404 })
    }

    try {
      // In a real implementation, you would process the Google Pay token here
      // For demo purposes, we'll simulate a successful authorization
      
      console.log('Processing Google Pay token...')
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update order status to completed
      await localDB.updateOrder(order.id, {
        status: 'completed',
        payhere_payment_id: `gp_${Date.now()}` // Google Pay transaction ID
      })

      return NextResponse.json({
        success: true,
        message: 'Payment authorized successfully',
        data: {
          order_id: order_id,
          payment_id: `gp_${Date.now()}`,
          amount: amount,
          currency: currency,
          status: 'completed',
          method: 'google_pay',
          created_at: new Date().toISOString()
        }
      })
    } catch (apiError) {
      console.error('Google Pay processing error:', apiError)
      
      // Update order status to failed
      await localDB.updateOrder(order.id, {
        status: 'failed'
      })

      return NextResponse.json({
        success: false,
        error: 'Payment processing failed'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Authorize API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({
    message: 'Google Pay authorize endpoint is active',
    timestamp: new Date().toISOString(),
    config: {
      merchant_id: 'BCR2DN7TZD7MBT2N',
      endpoint: '/api/payment/authorize'
    }
  })
}