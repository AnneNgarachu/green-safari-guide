"use server"

import { headers } from "next/headers"
import "server-only" // Import the package directly, not a named export
import type { QuizQuestion } from "./ai-service"

// Server-only function to create a Perplexity request
export async function generatePerplexityQuestion(topic: string): Promise<QuizQuestion> {
  try {
    // Force server-side execution by accessing headers
    headers()

    const apiKey = process.env.PERPLEXITY_API_KEY
    if (!apiKey) {
      throw new Error("Perplexity API key is not defined")
    }

    const prompt = `Generate a multiple-choice quiz question about Africa related to the topic: ${topic}.
    Format your response as a JSON object with the following structure:
    {
      "question": "Your question here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "The correct option",
      "explanation": "A detailed explanation of why this is the correct answer and what we can learn from it"
    }
    Make sure the question is educational, factual, and appropriate for all ages.`

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-instruct",
        messages: [
          {
            role: "system",
            content: "You are an expert in African studies, creating educational quiz questions.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Parse the JSON response
    const parsedContent = JSON.parse(content)

    return {
      question: parsedContent.question,
      options: parsedContent.options,
      correctAnswer: parsedContent.correctAnswer,
      explanation: parsedContent.explanation || "No explanation provided.",
      topic,
    }
  } catch (error) {
    console.error("Error generating quiz question with Perplexity:", error)
    throw error
  }
}

