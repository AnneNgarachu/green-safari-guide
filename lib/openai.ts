"use server"

import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateQuizQuestion(topic: string): Promise<{
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}> {
  try {
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
    }
  } catch (error) {
    console.error("Error generating quiz question:", error)
    // Return a fallback question with explanation
    return {
      question: "Which country is known as the 'Rainbow Nation'?",
      options: ["Kenya", "Nigeria", "South Africa", "Egypt"],
      correctAnswer: "South Africa",
      explanation:
        "South Africa is known as the 'Rainbow Nation' because of its multicultural diversity. The term was coined by Archbishop Desmond Tutu after the end of apartheid in 1994, symbolizing the unity of South Africa's different peoples.",
    }
  }
}

