import { NextRequest, NextResponse } from 'next/server'
import { localDB } from '@/lib/database'

// Google Pay checkout endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      order_id,
      amount,
      currency,
      customer,
      items
    } = body

    console.log('Google Pay checkout request:', {
      order_id,
      amount,
      currency,
      customer_email: customer?.email
    })

    // Validate required fields
    if (!order_id || !amount || !currency || !customer?.email) {
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
      // For Google Pay, the checkout is handled client-side
      // This endpoint can be used for order validation and preparation
      
      console.log('Preparing Google Pay checkout...')
      
      // Return checkout configuration for Google Pay
      return NextResponse.json({
        success: true,
        message: 'Checkout session prepared successfully',
        data: {
          order_id: order_id,
          amount: amount,
          currency: currency,
          merchant_id: 'BCR2DN7TZD7MBT2N',
          checkout_type: 'google_pay',
          client_config: {
            environment: 'TEST', // Change to 'PRODUCTION' for live
            merchantInfo: {
              merchantId: 'BCR2DN7TZD7MBT2N',
              merchantName: 'Steal Or Die Cloud™'
            },
            allowedPaymentMethods: [{
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA']
              }
            }]
          }
        }
      })
    } catch (apiError) {
      console.error('Google Pay checkout preparation error:', apiError)
      
      return NextResponse.json({
        success: false,
        error: 'Failed to prepare checkout session'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Checkout API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({
    message: 'Google Pay checkout endpoint is active',
    timestamp: new Date().toISOString(),
    config: {
      merchant_id: 'BCR2DN7TZD7MBT2N',
      endpoint: '/api/payment/checkout'
    }
  })
}