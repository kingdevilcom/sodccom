import { NextRequest, NextResponse } from 'next/server'

// Google Pay hash generation endpoint (if needed for custom implementations)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Google Pay hash generation request:', body)

    // For Google Pay, hash generation is typically handled by Google's servers
    // This endpoint can be used for custom payment processing if needed
    
    return NextResponse.json({ 
      message: 'Google Pay handles payment processing directly',
      success: true,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Hash generation error:', error)
    return NextResponse.json({ 
      error: 'Internal server error during hash generation',
      success: false
    }, { status: 500 })
  }
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Google Pay payment endpoint is active',
    timestamp: new Date().toISOString(),
    config: {
      merchant_id: 'BCR2DN7TZD7MBT2N',
      endpoint: '/api/payment/hash'
    }
  })
}