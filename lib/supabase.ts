import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Quiz = {
  id: string
  title: string
  description: string
  category: string
  questions: Question[]
}

export type Question = {
  id: string
  quiz_id: string
  text: string
  options: string[]
  correct_answer: string
}

export type UserProgress = {
  user_id: string
  quiz_id: string
  completed: boolean
  score: number
  last_attempt: string
}

