import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Check if we're in a browser environment and have valid Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if we have valid credentials
let supabase: ReturnType<typeof createClient<Database>> | null = null
let supabaseAdmin: ReturnType<typeof createClient<Database>> | null = null

if (supabaseUrl && supabaseAnonKey && 
    supabaseUrl !== 'https://your-project.supabase.co' && 
    supabaseAnonKey !== 'your-anon-key-here') {
  
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
  
  // Server-side client for admin operations
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (serviceRoleKey && serviceRoleKey !== 'your-service-role-key-here') {
    supabaseAdmin = createClient<Database>(supabaseUrl, serviceRoleKey)
  }
}

// Export with null check helpers
export { supabase, supabaseAdmin }

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null
}