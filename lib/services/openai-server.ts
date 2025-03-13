"use server"

import { headers } from "next/headers"
import OpenAI from "openai"
import "server-only" // Import the package directly, not a named export

// Server-only function to create an OpenAI client
export async function createOpenAIClient(): Promise<OpenAI | null> {
  try {
    // Force server-side execution by accessing headers
    // This will throw an error if called from client
    headers()

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.warn("OpenAI API key is missing")
      return null
    }

    return new OpenAI({ apiKey })
  } catch (error) {
    console.error("Failed to initialize OpenAI client:", error)
    return null
  }
}

