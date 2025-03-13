"use server"

import { getActiveApiKey } from "./api-key-manager"
import { fallbackQuestions } from "./services/ai-service"

// Define a common interface for AI providers
export type QuizQuestion = {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  topic: string
}

// Provider-agnostic function to generate quiz questions
export async function generateQuizQuestion(topic: string): Promise<QuizQuestion> {
  // Try OpenAI first
  try {
    const openaiKey = await getActiveApiKey("openai")
    if (openaiKey) {
      const question = await generateWithOpenAI(topic, openaiKey)
      return question
    }
  } catch (error) {
    console.error("OpenAI generation failed:", error)
    // Continue to fallback
  }

  // Try Perplexity as fallback
  try {
    const perplexityKey = await getActiveApiKey("perplexity")
    if (perplexityKey) {
      const question = await generateWithPerplexity(topic, perplexityKey)
      return question
    }
  } catch (error) {
    console.error("Perplexity generation failed:", error)
    // Continue to static fallback
  }

  // Use static fallback if both fail
  return getStaticFallbackQuestion(topic)
}

// Implementation for OpenAI
async function generateWithOpenAI(topic: string, apiKey: string): Promise<QuizQuestion> {
  // Implementation similar to your existing OpenAI code
  // ...
  throw new Error("Not implemented")
}

// Implementation for Perplexity
async function generateWithPerplexity(topic: string, apiKey: string): Promise<QuizQuestion> {
  // Implementation similar to your existing Perplexity code
  // ...
  throw new Error("Not implemented")
}

// Get a static fallback question
function getStaticFallbackQuestion(topic: string): QuizQuestion {
  // Filter by topic if possible
  const topicQuestions = fallbackQuestions.filter((q) => q.topic.toLowerCase() === topic.toLowerCase())

  const question =
    topicQuestions.length > 0
      ? topicQuestions[Math.floor(Math.random() * topicQuestions.length)]
      : fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]

  return {
    question: question.question,
    options: question.options,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    topic: question.topic,
  }
}

