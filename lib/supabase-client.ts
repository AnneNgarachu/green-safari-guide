import { createClient } from "@supabase/supabase-js"

// Create a more robust Supabase client with error handling
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
  },
  global: {
    fetch: fetch.bind(globalThis),
  },
})

// Helper function to check if Supabase is available
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("daily_challenges").select("count").limit(1)
    if (error) throw error
    return { connected: true }
  } catch (error) {
    console.error("Supabase connection error:", error)
    return { connected: false, error }
  }
}

