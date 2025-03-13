import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { fallbackQuestions } from "@/lib/services/ai-service"

// This file should only be imported from server components or API routes
export type QuizQuestion = {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  topic: string
}

// Track OpenAI quota status to avoid repeated failed calls
let openAIQuotaExceeded = false
let lastQuotaCheckTime = 0
const QUOTA_CHECK_INTERVAL = 3600000 // 1 hour in milliseconds

// Generate a quiz question using the AI SDK
export async function generateQuizQuestionWithAI(topic: string): Promise<QuizQuestion | null> {
  // If we know the quota is exceeded and it's been less than the check interval, skip the API call
  const currentTime = Date.now()
  if (openAIQuotaExceeded && currentTime - lastQuotaCheckTime < QUOTA_CHECK_INTERVAL) {
    console.log("Skipping OpenAI call due to previously exceeded quota")
    return null
  }

  try {
    const prompt = `Generate a multiple-choice quiz question about Africa related to the topic: ${topic}.
    Include a detailed explanation for the correct answer that helps users learn.
    Format your response as a JSON object with the following structure:
    {
      "question": "Your question here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "The correct option",
      "explanation": "A detailed explanation of why this is the correct answer and what we can learn from it"
    }`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
    })

    // Reset quota exceeded flag if successful
    if (openAIQuotaExceeded) {
      openAIQuotaExceeded = false
      console.log("OpenAI quota check: API call successful, quota not exceeded")
    }

    // Parse the JSON response
    const parsedContent = JSON.parse(text)

    return {
      question: parsedContent.question,
      options: parsedContent.options,
      correctAnswer: parsedContent.correctAnswer,
      explanation: parsedContent.explanation,
      topic,
    }
  } catch (error) {
    // Check if the error is related to quota
    const errorMessage = error.toString().toLowerCase()
    if (
      errorMessage.includes("quota") ||
      errorMessage.includes("exceeded") ||
      errorMessage.includes("billing") ||
      errorMessage.includes("rate limit")
    ) {
      // Set the quota exceeded flag and update the last check time
      openAIQuotaExceeded = true
      lastQuotaCheckTime = currentTime
      console.log("OpenAI quota exceeded. Using fallback questions for the next hour.")
    } else {
      console.log("Error generating quiz question with AI:", error)
    }
    return null
  }
}

// Get a random fallback question
export function getRandomFallbackQuestion(topic?: string): QuizQuestion {
  // Filter by topic if provided
  const topicQuestions = topic
    ? fallbackQuestions.filter((q) => q.topic.toLowerCase() === topic.toLowerCase())
    : fallbackQuestions

  return topicQuestions.length > 0
    ? topicQuestions[Math.floor(Math.random() * topicQuestions.length)]
    : fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]
}

