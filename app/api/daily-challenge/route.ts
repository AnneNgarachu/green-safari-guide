import { NextResponse } from "next/server"
import { generateQuizQuestion, getRandomFallbackQuestion } from "@/lib/services/ai-service-server"

// Fun and engaging daily challenge questions
const funDailyChallengeQuestions = [
  {
    question: "Which African animal can sleep standing up?",
    options: ["Elephant", "Giraffe", "Zebra", "Hippopotamus"],
    correct_answer: "Giraffe",
    explanation:
      "Giraffes can sleep standing up and typically only need 5-30 minutes of sleep in a 24-hour period! They sometimes take quick power naps that last only a few minutes.",
    topic: "Wildlife Fun Facts",
  },
  {
    question: "In which African country would you find a city with no roads, only canals?",
    options: ["Egypt", "Morocco", "Mali", "Venice is not in Africa!"],
    correct_answer: "Venice is not in Africa!",
    explanation:
      "Trick question! While Africa has many unique cities, Venice (the famous city with canals instead of roads) is located in Italy, not Africa.",
    topic: "Geography Trivia",
  },
  {
    question: "Which African country is the only one in the world to be named after a brand of chocolate?",
    options: ["Ghana", "Ivory Coast", "Madagascar", "None - it's the other way around!"],
    correct_answer: "None - it's the other way around!",
    explanation:
      "It's actually the opposite! Ghana chocolate was named after the country, not the other way around. Ghana is one of the world's largest cocoa producers.",
    topic: "Food Facts",
  },
  {
    question: "What percentage of the world's chocolate comes from Africa?",
    options: ["About 10%", "About 30%", "About 50%", "About 70%"],
    correct_answer: "About 70%",
    explanation:
      "Approximately 70% of the world's cocoa beans come from four West African countries: Ivory Coast, Ghana, Nigeria and Cameroon, with Ivory Coast and Ghana being the two largest producers.",
    topic: "Agriculture",
  },
  {
    question: "Which African country has the most pyramids?",
    options: ["Egypt", "Sudan", "Libya", "Algeria"],
    correct_answer: "Sudan",
    explanation:
      "While Egypt is famous for its pyramids, Sudan actually has more! Sudan has around 220 pyramids, more than twice the number in Egypt. They were built by the rulers of the ancient Kushite kingdoms.",
    topic: "Ancient History",
  },
]

// This code only runs on the server
export async function GET(request: Request) {
  // Check if we should return the daily challenge or a random one
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get("mode") || "daily"

  if (mode === "daily") {
    // Get today's date to ensure the same question is returned all day
    const today = new Date()
    const dateString = today.toISOString().split("T")[0] // YYYY-MM-DD format

    // Use the date to select a question (ensures the same question all day)
    // But changes day to day
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))

    // Select question based on day of year
    const questionIndex = dayOfYear % funDailyChallengeQuestions.length
    const dailyQuestion = funDailyChallengeQuestions[questionIndex]

    // If we have a question for today, return it
    if (dailyQuestion) {
      return NextResponse.json({
        question: dailyQuestion.question,
        options: dailyQuestion.options,
        correct_answer: dailyQuestion.correct_answer,
        explanation: dailyQuestion.explanation,
        topic: dailyQuestion.topic,
        date: dateString,
        isDaily: true,
      })
    }
  } else {
    // Return a random question from our collection
    const randomIndex = Math.floor(Math.random() * funDailyChallengeQuestions.length)
    const randomQuestion = funDailyChallengeQuestions[randomIndex]

    if (randomQuestion) {
      return NextResponse.json({
        question: randomQuestion.question,
        options: randomQuestion.options,
        correct_answer: randomQuestion.correct_answer,
        explanation: randomQuestion.explanation,
        topic: randomQuestion.topic,
        isDaily: false,
      })
    }
  }

  // If no question is available (shouldn't happen with our setup), try to generate one
  try {
    // Generate a random topic for variety
    const topics = ["Wildlife", "Geography", "History", "Culture", "Fun Facts"]
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]

    const aiQuestion = await generateQuizQuestion(randomTopic)

    return NextResponse.json({
      question: aiQuestion.question,
      options: aiQuestion.options,
      correct_answer: aiQuestion.correctAnswer,
      explanation: aiQuestion.explanation,
      topic: aiQuestion.topic,
      isDaily: false,
    })
  } catch (e) {
    // Just log and continue to fallback
    console.log("Caught error in daily challenge API, using fallback:", e)
  }

  // Use fallback if AI generation fails or is skipped
  console.log("Using fallback question for daily challenge")
  const fallbackQuestion = await getRandomFallbackQuestion()
  return NextResponse.json({
    question: fallbackQuestion.question,
    options: fallbackQuestion.options,
    correct_answer: fallbackQuestion.correctAnswer,
    explanation: fallbackQuestion.explanation,
    topic: fallbackQuestion.topic,
    isDaily: false,
  })
}

