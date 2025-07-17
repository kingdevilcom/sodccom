import { NextRequest, NextResponse } from 'next/server'
import { localDB } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      user_email,
      plan_id,
      amount_usd,
      amount_lkr,
      currency,
      payhere_order_id
    } = body

    // Create order in local database
    const order = await localDB.createOrder({
      user_email,
      plan_id,
      amount_usd,
      amount_lkr,
      currency,
      payhere_order_id,
      payhere_payment_id: null,
      status: 'pending'
    })

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Fetch orders from local database
    const orders = await localDB.fetchOrders()

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Fetch orders error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}