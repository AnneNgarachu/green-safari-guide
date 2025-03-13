"use server"

import { headers } from "next/headers"
import { aiService, type QuizQuestion, fallbackQuestions } from "./ai-service"

// Helper function to generate a quiz question
export async function generateQuizQuestion(topic: string): Promise<QuizQuestion> {
  try {
    // Force server-side execution by accessing headers
    headers()
    return await aiService.generateQuizQuestion(topic)
  } catch (error) {
    console.error("Error in generateQuizQuestion:", error)
    // Return a fallback question if we're in a client context
    return fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]
  }
}

// Get a random fallback question
export async function getRandomFallbackQuestion(topic?: string): Promise<QuizQuestion> {
  // Filter by topic if provided
  const topicQuestions = topic
    ? fallbackQuestions.filter((q) => q.topic.toLowerCase() === topic.toLowerCase())
    : fallbackQuestions

  return topicQuestions.length > 0
    ? topicQuestions[Math.floor(Math.random() * topicQuestions.length)]
    : fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]
}

