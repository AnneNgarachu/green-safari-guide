"use server"

import OpenAI from "openai"

// Check for API key
const apiKey = process.env.OPENAI_API_KEY
if (!apiKey) {
  console.warn("OpenAI API key is missing")
}

// Create OpenAI client - only used in server components and server actions
let openaiInstance: OpenAI | null = null

// Lazy initialization to ensure it only happens on the server
export async function getOpenAIClient() {
  if (!openaiInstance && apiKey) {
    openaiInstance = new OpenAI({
      apiKey: apiKey,
    })
  }
  return openaiInstance
}

// Fallback questions to use when API fails
export const fallbackQuestions = [
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

// Helper function to check if OpenAI is available
export async function checkOpenAIConnection() {
  if (!apiKey) return { connected: false, error: "API key missing" }

  const openai = await getOpenAIClient()
  if (!openai) return { connected: false, error: "Failed to initialize OpenAI client" }

  try {
    const completion = await openai.chat.completions.create({
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

export async function generateQuizQuestion(topic: string): Promise<{
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  topic: string
}> {
  // First check if OpenAI is available
  const { connected } = await checkOpenAIConnection()

  if (!connected) {
    console.log("Using fallback question due to OpenAI connection issue")
    // Return a random fallback question that matches the topic if possible
    const topicQuestions = fallbackQuestions.filter((q) => q.topic.toLowerCase() === topic.toLowerCase())

    const randomQuestion =
      topicQuestions.length > 0
        ? topicQuestions[Math.floor(Math.random() * topicQuestions.length)]
        : fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]

    return {
      ...randomQuestion,
      topic: randomQuestion.topic,
    }
  }

  try {
    const openai = await getOpenAIClient()
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
    console.error("Error generating quiz question:", error)
    // Return a random fallback question
    const randomQuestion = fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]
    return {
      ...randomQuestion,
      topic: randomQuestion.topic,
    }
  }
}

