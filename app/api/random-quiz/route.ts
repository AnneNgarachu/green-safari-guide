import { NextResponse } from "next/server"
import { generateQuizQuestion, getRandomFallbackQuestion } from "@/lib/services/ai-service-server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const count = Number.parseInt(searchParams.get("count") || "5", 10)

    // Define topics to randomly select from
    const topics = ["Geography", "Wildlife", "Culture", "History", "Cuisine", "General Knowledge"]

    // Get questions for random topics
    const questions = []

    for (let i = 0; i < count; i++) {
      // Select a random topic
      const randomTopic = topics[Math.floor(Math.random() * topics.length)]

      // Try AI generation first
      let aiQuestion = null
      try {
        aiQuestion = await generateQuizQuestion(randomTopic)
      } catch (e) {
        console.log("Caught error in random quiz API, using fallback:", e)
      }

      if (aiQuestion) {
        questions.push(aiQuestion)
      } else {
        // Use static fallback if AI fails or is skipped
        const fallbackQuestion = await getRandomFallbackQuestion(randomTopic)
        questions.push(fallbackQuestion)
      }
    }

    return NextResponse.json({ questions })
  } catch (error) {
    console.log("Error in random quiz API, returning fallbacks:", error)

    // Return fallback questions if everything fails
    const fallbackQuestions = await Promise.all(
      Array(5)
        .fill(0)
        .map(() => getRandomFallbackQuestion()),
    )
    return NextResponse.json({ questions: fallbackQuestions })
  }
}

