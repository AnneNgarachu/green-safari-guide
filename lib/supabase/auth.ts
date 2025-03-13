import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/database.types"

// Initialize the Supabase client
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export async function getCurrentUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    // Get the profile information
    const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (error) throw error

    return {
      ...user,
      ...profile,
    }
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) throw error

  // Create a profile record
  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: data.user.id,
        email: data.user.email,
        username: email.split("@")[0], // Default username from email
        created_at: new Date().toISOString(),
      },
    ])

    if (profileError) throw profileError
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function updateProfile(profile: Partial<Profile>) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase.from("profiles").update(profile).eq("id", user.id).select().single()

  if (error) throw error
  return data
}

