// Remove the "use server" directive from the top of this file
// This file will contain the class implementation but won't be directly used in client components

import type OpenAI from "openai"
import { createOpenAIClient } from "./openai-server"
import { generatePerplexityQuestion } from "./perplexity-server"

// Define common types
export type QuizQuestion = {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  topic: string
}

// Fallback questions to use when API fails
export const fallbackQuestions: QuizQuestion[] = [
  {
    question: "Which African country is known as the 'Land of a Thousand Hills'?",
    options: ["Kenya", "Rwanda", "Ethiopia", "Tanzania"],
    correctAnswer: "Rwanda",
    explanation:
      "Rwanda is called the 'Land of a Thousand Hills' due to its mountainous terrain. The country's landscape is characterized by rolling hills, valleys, and lakes, creating a unique and beautiful geography that has shaped its culture and history.",
    topic: "Geography",
  },
  {
    question: "Which is the longest river in Africa?",
    options: ["Congo River", "Niger River", "Zambezi River", "Nile River"],
    correctAnswer: "Nile River",
    explanation:
      "The Nile River is the longest river in Africa and is often considered the longest river in the world, stretching approximately 6,650 kilometers (4,130 miles). It flows through 11 countries, including Egypt, Sudan, and Uganda, and has been vital to the development of ancient civilizations.",
    topic: "Geography",
  },
  {
    question: "Which ancient African civilization built the Great Pyramids of Giza?",
    options: ["Nubian Kingdom", "Ancient Egyptians", "Aksumite Empire", "Carthaginians"],
    correctAnswer: "Ancient Egyptians",
    explanation:
      "The Great Pyramids of Giza were built by the Ancient Egyptians during the Old and Middle Kingdom periods, roughly between 2700-2200 BCE. They served as monumental tombs for pharaohs and are among the most impressive architectural achievements in human history, demonstrating the Egyptians' advanced knowledge of mathematics, astronomy, and engineering.",
    topic: "History",
  },
  {
    question: "Which African country was never colonized by European powers?",
    options: ["Ethiopia", "South Africa", "Nigeria", "Kenya"],
    correctAnswer: "Ethiopia",
    explanation:
      "Ethiopia is the only African country that was never formally colonized by European powers. It successfully resisted Italian invasion attempts, most notably at the Battle of Adwa in 1896 when Ethiopian forces defeated the Italian military. This victory made Ethiopia a symbol of African independence during the colonial era.",
    topic: "History",
  },
  {
    question: "Which African animal is known as the 'King of the Beasts'?",
    options: ["Elephant", "Rhinoceros", "Lion", "Gorilla"],
    correctAnswer: "Lion",
    explanation:
      "The lion is known as the 'King of the Beasts' due to its strength, majestic appearance, and its position at the top of the food chain. Lions are social animals that live in groups called prides, and they play a crucial role in maintaining the ecological balance in African savannas by controlling herbivore populations.",
    topic: "Wildlife",
  },
]

// AI Provider types
export type AIProvider = "openai" | "perplexity"

// AI Service class
export class AIService {
  private static instance: AIService
  private preferredProvider: AIProvider = "openai"

  private constructor() {
    // Empty constructor - we'll initialize the client only when needed
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  // Use the server-only function to get the OpenAI client
  private async getOpenAIClient(): Promise<OpenAI | null> {
    try {
      return await createOpenAIClient()
    } catch (error) {
      console.error("Failed to get OpenAI client:", error)
      return null
    }
  }

  // Check if OpenAI is available
  public async checkOpenAIConnection(): Promise<{ connected: boolean; error?: any }> {
    try {
      const client = await this.getOpenAIClient()
      if (!client) {
        return { connected: false, error: "OpenAI client not initialized" }
      }

      const completion = await client.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: "Hello" }],
        max_tokens: 5,
      })
      return { connected: true }
    } catch (error) {
      console.error("OpenAI connection error:", error)
      return { connected: false, error }
    }
  }

  // Check if Perplexity is available
  public async checkPerplexityConnection(): Promise<{ connected: boolean; error?: any }> {
    try {
      const apiKey = process.env.PERPLEXITY_API_KEY
      if (!apiKey) {
        return { connected: false, error: "Perplexity API key missing" }
      }

      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-instruct",
          messages: [{ role: "user", content: "Hello" }],
          max_tokens: 5,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      return { connected: true }
    } catch (error) {
      console.error("Perplexity connection error:", error)
      return { connected: false, error }
    }
  }

  // Set preferred AI provider
  public setPreferredProvider(provider: AIProvider): void {
    this.preferredProvider = provider
  }

  // Generate quiz question with OpenAI
  private async generateWithOpenAI(topic: string): Promise<QuizQuestion> {
    try {
      const openai = await this.getOpenAIClient()
      if (!openai) throw new Error("Failed to initialize OpenAI client")

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an expert in African studies, creating educational quiz questions. Provide accurate, engaging questions with detailed explanations for the correct answers.",
          },
          {
            role: "user",
            content: `Generate a multiple-choice quiz question about Africa related to the topic: ${topic}.
            Include a detailed explanation for the correct answer that helps users learn.
            Format your response as a JSON object with the following structure:
            {
              "question": "Your question here?",
              "options": ["Option A", "Option B", "Option C", "Option D"],
              "correctAnswer": "The correct option",
              "explanation": "A detailed explanation of why this is the correct answer and what we can learn from it"
            }`,
          },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      })

      const content = completion.choices[0].message.content
      if (!content) {
        throw new Error("No content received from OpenAI")
      }

      // Parse the JSON response
      const parsedContent = JSON.parse(content)

      return {
        question: parsedContent.question,
        options: parsedContent.options,
        correctAnswer: parsedContent.correctAnswer,
        explanation: parsedContent.explanation,
        topic,
      }
    } catch (error) {
      console.error("Error generating quiz question with OpenAI:", error)
      throw error
    }
  }

  // Update the generateWithPerplexity method to use the server-only function
  private async generateWithPerplexity(topic: string): Promise<QuizQuestion> {
    return generatePerplexityQuestion(topic)
  }

  // Get a random fallback question
  private getRandomFallbackQuestion(topic?: string): QuizQuestion {
    // Filter by topic if provided
    const topicQuestions = topic
      ? fallbackQuestions.filter((q) => q.topic.toLowerCase() === topic.toLowerCase())
      : fallbackQuestions

    return topicQuestions.length > 0
      ? topicQuestions[Math.floor(Math.random() * topicQuestions.length)]
      : fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]
  }

  // Generate quiz question using the preferred provider with fallbacks
  public async generateQuizQuestion(topic: string): Promise<QuizQuestion> {
    // Try preferred provider first
    try {
      if (this.preferredProvider === "openai") {
        const { connected } = await this.checkOpenAIConnection()
        if (connected) {
          return await this.generateWithOpenAI(topic)
        }
        // Fall back to Perplexity if OpenAI fails
        const { connected: perplexityConnected } = await this.checkPerplexityConnection()
        if (perplexityConnected) {
          return await this.generateWithPerplexity(topic)
        }
      } else {
        // Try Perplexity first
        const { connected } = await this.checkPerplexityConnection()
        if (connected) {
          return await this.generateWithPerplexity(topic)
        }
        // Fall back to OpenAI if Perplexity fails
        const { connected: openaiConnected } = await this.checkOpenAIConnection()
        if (openaiConnected) {
          return await this.generateWithOpenAI(topic)
        }
      }
    } catch (error) {
      console.error("Error generating quiz question:", error)
      // Continue to fallback
    }

    // Use fallback if both providers fail
    console.log("Using fallback question due to API connection issues")
    return this.getRandomFallbackQuestion(topic)
  }
}

// Export singleton instance
export const aiService = AIService.getInstance()

