export interface Database {
  public: {
    Tables: {
      plans: {
        Row: {
          id: string
          name: string
          category: 'minecraft' | 'vps' | 'vlss' | 'v2ray'
          price_usd: number
          price_lkr: number
          vcpu: number
          ram: number
          storage: number
          storage_type: 'SSD' | 'NVMe'
          is_popular: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: 'minecraft' | 'vps' | 'vlss' | 'v2ray'
          price_usd: number
          price_lkr: number
          vcpu: number
          ram: number
          storage: number
          storage_type: 'SSD' | 'NVMe'
          is_popular?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: 'minecraft' | 'vps' | 'vlss' | 'v2ray'
          price_usd?: number
          price_lkr?: number
          vcpu?: number
          ram?: number
          storage?: number
          storage_type?: 'SSD' | 'NVMe'
          is_popular?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_email: string
          plan_id: string
          status: 'pending' | 'completed' | 'failed' | 'cancelled'
          amount_usd: number
          amount_lkr: number
          currency: 'USD' | 'LKR'
          payhere_order_id: string | null
          payhere_payment_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_email: string
          plan_id: string
          status?: 'pending' | 'completed' | 'failed' | 'cancelled'
          amount_usd: number
          amount_lkr: number
          currency: 'USD' | 'LKR'
          payhere_order_id?: string | null
          payhere_payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_email?: string
          plan_id?: string
          status?: 'pending' | 'completed' | 'failed' | 'cancelled'
          amount_usd?: number
          amount_lkr?: number
          currency?: 'USD' | 'LKR'
          payhere_order_id?: string | null
          payhere_payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      promo_codes: {
        Row: {
          id: string
          code: string
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          currency: 'USD' | 'LKR'
          usage_limit: number | null
          usage_count: number
          expires_at: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          currency: 'USD' | 'LKR'
          usage_limit?: number | null
          usage_count?: number
          expires_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          discount_type?: 'percentage' | 'fixed'
          discount_value?: number
          currency?: 'USD' | 'LKR'
          usage_limit?: number | null
          usage_count?: number
          expires_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          username: string
          password_hash: string
          email: string
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          password_hash: string
          email: string
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          password_hash?: string
          email?: string
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Plan = Database['public']['Tables']['plans']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type PromoCode = Database['public']['Tables']['promo_codes']['Row']
export type Admin = Database['public']['Tables']['admins']['Row']