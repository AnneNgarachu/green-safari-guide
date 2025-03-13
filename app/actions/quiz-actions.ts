"use server"

import { revalidatePath } from "next/cache"
import {
  submitDailyChallenge as submitDailyChallengeServer,
  subscribeToMailingList as subscribeToMailingListServer,
} from "@/lib/services/supabase-service-server"
import { getRandomFallbackQuestion } from "@/lib/services/ai-service-server"

// Get daily challenge - now just a wrapper around the API route
export async function getDailyChallenge() {
  try {
    // Use a relative URL instead of constructing an absolute URL
    const response = await fetch("/api/daily-challenge", {
      cache: "no-store", // Ensure we get a fresh challenge
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching daily challenge:", error)
    // Provide a fallback challenge
    const fallbackQuestion = await getRandomFallbackQuestion()
    return {
      question: fallbackQuestion.question,
      options: fallbackQuestion.options,
      correct_answer: fallbackQuestion.correctAnswer,
      explanation: fallbackQuestion.explanation,
      topic: fallbackQuestion.topic,
    }
  }
}

// Submit daily challenge
export async function submitDailyChallenge(formData: FormData) {
  const userAnswer = formData.get("answer") as string
  const correctAnswer = formData.get("correctAnswer") as string

  try {
    const result = await submitDailyChallengeServer(userAnswer, correctAnswer)
    revalidatePath("/")
    return result
  } catch (error) {
    console.error("Error in submitDailyChallenge:", error)
    return { isCorrect: userAnswer === correctAnswer }
  }
}

// Subscribe to mailing list
export async function subscribeToMailingList(formData: FormData) {
  const email = formData.get("email") as string
  return subscribeToMailingListServer(email)
}

