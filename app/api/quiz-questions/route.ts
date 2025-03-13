import { NextResponse } from "next/server"
import { generateQuizQuestion, getRandomFallbackQuestion } from "@/lib/services/ai-service-server"

// Define timeout for API requests
const API_TIMEOUT = 8000 // 8 seconds

// Define category-specific fallback questions to ensure uniqueness
const categoryFallbackQuestions = {
  geography: [
    {
      question: "Which is the largest country in Africa by land area?",
      options: ["Nigeria", "Egypt", "Algeria", "South Africa"],
      correctAnswer: "Algeria",
      explanation:
        "Algeria is the largest country in Africa by land area, covering approximately 2.38 million square kilometers after South Sudan's independence from Sudan in 2011.",
      topic: "Geography",
    },
    {
      question: "Which African mountain is the highest peak on the continent?",
      options: ["Mount Kenya", "Mount Kilimanjaro", "Atlas Mountains", "Mount Meru"],
      correctAnswer: "Mount Kilimanjaro",
      explanation:
        "Mount Kilimanjaro in Tanzania is the highest mountain in Africa, standing at 5,895 meters (19,341 feet) above sea level.",
      topic: "Geography",
    },
    {
      question: "Which desert covers much of Northern Africa?",
      options: ["Kalahari Desert", "Namib Desert", "Sahara Desert", "Danakil Desert"],
      correctAnswer: "Sahara Desert",
      explanation:
        "The Sahara Desert is the largest hot desert in the world and covers most of Northern Africa, spanning 11 countries.",
      topic: "Geography",
    },
    {
      question: "Which African country is completely surrounded by South Africa?",
      options: ["Zimbabwe", "Botswana", "Lesotho", "Eswatini (Swaziland)"],
      correctAnswer: "Lesotho",
      explanation:
        "Lesotho is a unique country that is completely surrounded by South Africa, making it an enclave state.",
      topic: "Geography",
    },
    {
      question: "Which is the longest river in Africa?",
      options: ["Congo River", "Niger River", "Zambezi River", "Nile River"],
      correctAnswer: "Nile River",
      explanation:
        "The Nile River is the longest river in Africa and is often considered the longest river in the world, stretching approximately 6,650 kilometers.",
      topic: "Geography",
    },
  ],
  culture: [
    {
      question: "Which African music genre originated in Nigeria in the 1970s?",
      options: ["Highlife", "Afrobeat", "Soukous", "Mbalax"],
      correctAnswer: "Afrobeat",
      explanation:
        "Afrobeat was pioneered by Fela Kuti in Nigeria in the 1970s, combining West African musical styles with American jazz, funk, and soul.",
      topic: "Culture",
    },
    {
      question: "What is the traditional storyteller called in West African culture?",
      options: ["Griot", "Sangoma", "Djeli", "Imbongi"],
      correctAnswer: "Griot",
      explanation:
        "A Griot (also known as Djeli in some regions) is a West African historian, storyteller, praise singer, and musician who preserves and shares oral history through music and poetry.",
      topic: "Culture",
    },
    {
      question: "Which colorful cloth from Ghana is known for its distinctive patterns?",
      options: ["Kente", "Kitenge", "Adire", "Bogolanfini"],
      correctAnswer: "Kente",
      explanation:
        "Kente is a type of silk and cotton fabric made of interwoven cloth strips, native to Ghana and worn by Akan royalty during ceremonial events.",
      topic: "Culture",
    },
    {
      question: "Which African language has the most native speakers?",
      options: ["Swahili", "Amharic", "Arabic", "Hausa"],
      correctAnswer: "Arabic",
      explanation:
        "Arabic is the most widely spoken language in Africa by native speakers, particularly in North Africa where it is the official language in several countries.",
      topic: "Culture",
    },
    {
      question: "What is Ubuntu?",
      options: ["A type of dance", "A philosophy of community", "A traditional dish", "A religious ceremony"],
      correctAnswer: "A philosophy of community",
      explanation:
        "Ubuntu is a Nguni Bantu term meaning 'humanity' and often translated as 'I am because we are' or 'humanity towards others'. It's a philosophy emphasizing community, sharing, and interconnectedness.",
      topic: "Culture",
    },
  ],
  history: [
    {
      question: "Which ancient African civilization built the pyramids of Meroe?",
      options: ["Ancient Egyptians", "Kingdom of Kush", "Aksumite Empire", "Carthaginians"],
      correctAnswer: "Kingdom of Kush",
      explanation:
        "The Kingdom of Kush (located in modern-day Sudan) built the pyramids of Meroe, which are steeper and smaller than Egyptian pyramids but more numerous.",
      topic: "History",
    },
    {
      question: "Who was the first president of Ghana after independence?",
      options: ["Jomo Kenyatta", "Nelson Mandela", "Kwame Nkrumah", "Julius Nyerere"],
      correctAnswer: "Kwame Nkrumah",
      explanation:
        "Kwame Nkrumah became the first president of Ghana when it gained independence from British colonial rule in 1957, making it the first sub-Saharan African country to achieve independence.",
      topic: "History",
    },
    {
      question: "Which African empire was known for its salt and gold trade in the 13th-16th centuries?",
      options: ["Songhai Empire", "Mali Empire", "Ghana Empire", "Benin Empire"],
      correctAnswer: "Mali Empire",
      explanation:
        "The Mali Empire was known for its wealth from gold and salt trade. Under Mansa Musa, who is often cited as one of the wealthiest people in history, the empire reached its peak in the 14th century.",
      topic: "History",
    },
    {
      question: "Which African country was never colonized by European powers?",
      options: ["Ethiopia", "South Africa", "Nigeria", "Kenya"],
      correctAnswer: "Ethiopia",
      explanation:
        "Ethiopia successfully resisted Italian colonization attempts, most notably at the Battle of Adwa in 1896, making it the only African country to maintain its independence during the Scramble for Africa.",
      topic: "History",
    },
    {
      question: "Who was the leader of South Africa's anti-apartheid movement and later became president?",
      options: ["Desmond Tutu", "Steve Biko", "Nelson Mandela", "Thabo Mbeki"],
      correctAnswer: "Nelson Mandela",
      explanation:
        "Nelson Mandela was a key leader in the anti-apartheid movement, spent 27 years in prison, and became South Africa's first Black president in 1994 after the end of apartheid.",
      topic: "History",
    },
  ],
  wildlife: [
    {
      question: "Which African country has the largest elephant population?",
      options: ["Kenya", "Tanzania", "South Africa", "Botswana"],
      correctAnswer: "Botswana",
      explanation:
        "Botswana is home to the largest elephant population in Africa, with an estimated 130,000 elephants, primarily in the northern part of the country.",
      topic: "Wildlife",
    },
    {
      question: "Which of these animals is NOT part of Africa's 'Big Five'?",
      options: ["Lion", "Elephant", "Cheetah", "Rhinoceros"],
      correctAnswer: "Cheetah",
      explanation:
        "Africa's 'Big Five' game animals are the lion, elephant, buffalo, leopard, and rhinoceros. The cheetah, despite being an iconic African predator, is not included in this group.",
      topic: "Wildlife",
    },
    {
      question: "Which African animal is the fastest land mammal?",
      options: ["Lion", "Wildebeest", "Cheetah", "Thomson's Gazelle"],
      correctAnswer: "Cheetah",
      explanation:
        "The cheetah is the fastest land animal, capable of reaching speeds up to 70 mph (112 km/h) in short bursts, making it perfectly adapted for high-speed hunting on the African savanna.",
      topic: "Wildlife",
    },
    {
      question: "Which African great ape is the most endangered?",
      options: ["Chimpanzee", "Mountain Gorilla", "Bonobo", "Western Lowland Gorilla"],
      correctAnswer: "Mountain Gorilla",
      explanation:
        "Mountain gorillas are critically endangered with only about 1,000 individuals remaining in the wild, found in the mountains of Rwanda, Uganda, and the Democratic Republic of Congo.",
      topic: "Wildlife",
    },
    {
      question: "Which unique animal can only be found in Madagascar?",
      options: ["Aardvark", "Lemur", "Pangolin", "Okapi"],
      correctAnswer: "Lemur",
      explanation:
        "Lemurs are found only on the island of Madagascar. Due to the island's isolation, these primates evolved separately from monkeys and apes, resulting in unique characteristics.",
      topic: "Wildlife",
    },
  ],
  cuisine: [
    {
      question: "Which grain is a staple in Ethiopian cuisine?",
      options: ["Rice", "Millet", "Teff", "Wheat"],
      correctAnswer: "Teff",
      explanation:
        "Teff is a tiny grain that's ground into flour to make injera, a sourdough flatbread that serves as both plate and utensil in Ethiopian cuisine.",
      topic: "Cuisine",
    },
    {
      question: "What is the national dish of Morocco?",
      options: ["Couscous", "Tagine", "Pastilla", "Harira"],
      correctAnswer: "Tagine",
      explanation:
        "Tagine, a slow-cooked stew named after the conical earthenware pot it's cooked in, is considered Morocco's national dish. It typically contains meat, vegetables, and aromatic spices.",
      topic: "Cuisine",
    },
    {
      question: "Which West African dish consists of jollof rice?",
      options: ["Fufu", "Mafe", "Jollof Rice", "Egusi Soup"],
      correctAnswer: "Jollof Rice",
      explanation:
        "Jollof Rice is a one-pot rice dish popular throughout West Africa, particularly in Nigeria, Ghana, and Senegal, with each country claiming to make the best version.",
      topic: "Cuisine",
    },
    {
      question: "Which spice blend is essential to North African cuisine?",
      options: ["Berbere", "Ras el Hanout", "Piri Piri", "Dukkah"],
      correctAnswer: "Ras el Hanout",
      explanation:
        "Ras el Hanout, meaning 'head of the shop' in Arabic, is a complex spice blend used throughout North Africa, particularly in Moroccan cuisine. It can contain up to 30 different spices.",
      topic: "Cuisine",
    },
    {
      question: "What is Biltong?",
      options: ["A fermented milk drink", "A type of bread", "Dried, cured meat", "A vegetable stew"],
      correctAnswer: "Dried, cured meat",
      explanation:
        "Biltong is a form of dried, cured meat that originated in South Africa. It's similar to beef jerky but is cured with vinegar and spices, then air-dried rather than smoked.",
      topic: "Cuisine",
    },
  ],
  random: [], // Will be populated from other categories
}

// Track which questions have been shown to each user
// In a real app, this would be stored in a database
const userQuestionHistory = new Map<string, Set<string>>()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "general"
    const count = Number.parseInt(searchParams.get("count") || "5", 10)

    // Get user ID from request (in a real app, this would come from authentication)
    // For now, we'll use IP or a random ID as a simple example
    const userId = searchParams.get("userId") || request.headers.get("x-forwarded-for") || "anonymous"

    // Initialize user history if it doesn't exist
    if (!userQuestionHistory.has(userId)) {
      userQuestionHistory.set(userId, new Set())
    }

    // Get the user's question history
    const userHistory = userQuestionHistory.get(userId)!

    // If random category, populate it with questions from other categories
    if (category === "random" && categoryFallbackQuestions.random.length === 0) {
      // Get questions from each category
      Object.keys(categoryFallbackQuestions).forEach((cat) => {
        if (cat !== "random" && categoryFallbackQuestions[cat as keyof typeof categoryFallbackQuestions].length > 0) {
          categoryFallbackQuestions.random.push(
            ...categoryFallbackQuestions[cat as keyof typeof categoryFallbackQuestions],
          )
        }
      })
    }

    // Create an array to store our questions
    const questions = []

    // Define topics based on category
    const topics = {
      geography: ["African Geography", "Mountains", "Rivers", "Deserts", "Countries"],
      culture: ["African Traditions", "Languages", "Music", "Art", "Festivals"],
      history: ["Ancient Civilizations", "Colonization", "Independence", "Modern History"],
      wildlife: ["Animals", "Conservation", "Ecosystems", "National Parks"],
      cuisine: ["Traditional Foods", "Cooking Methods", "Regional Dishes", "Ingredients"],
      random: ["Geography", "Culture", "History", "Wildlife", "Cuisine"],
    }

    // Get the appropriate topics for the category
    const categoryTopics = topics[category as keyof typeof topics] || topics.random

    // Create a promise for each question with a timeout
    const questionPromises = Array(count)
      .fill(0)
      .map(async (_, index) => {
        // Select a random topic from the category
        const topic = categoryTopics[Math.floor(Math.random() * categoryTopics.length)]

        try {
          // Create a timeout promise
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Request timeout")), API_TIMEOUT)
          })

          // Try to generate a question with AI
          const question = await Promise.race([generateQuizQuestion(topic), timeoutPromise])

          // Add a unique ID to the question for tracking
          const questionId = `${category}-${topic}-${Date.now()}-${index}`
          const questionWithId = {
            ...question,
            id: questionId,
          }

          // Add to user history
          userHistory.add(questionId)

          return questionWithId
        } catch (error) {
          console.log(`Error generating question for ${topic}, using fallback:`, error)

          // Get fallback questions for this category
          const fallbacks =
            categoryFallbackQuestions[category as keyof typeof categoryFallbackQuestions] ||
            categoryFallbackQuestions.random

          if (fallbacks.length > 0) {
            // Find a fallback question that hasn't been shown to this user
            let attempts = 0
            let fallbackQuestion = null

            while (attempts < fallbacks.length && !fallbackQuestion) {
              // Get a random index, but make sure we cycle through all questions
              const fallbackIndex = (index + attempts) % fallbacks.length
              const candidate = fallbacks[fallbackIndex]

              // Create a unique ID for this fallback question
              const questionId = `fallback-${category}-${fallbackIndex}`

              // Check if this question has been shown to the user
              if (!userHistory.has(questionId)) {
                // Add the ID to the question and return it
                fallbackQuestion = {
                  ...candidate,
                  id: questionId,
                }

                // Add to user history
                userHistory.add(questionId)
              }

              attempts++
            }

            // If we found an unused question, return it
            if (fallbackQuestion) {
              return fallbackQuestion
            }

            // If all questions have been shown, reset history and return the first one
            userHistory.clear()
            const questionId = `fallback-${category}-0`
            const resetQuestion = {
              ...fallbacks[0],
              id: questionId,
            }
            userHistory.add(questionId)
            return resetQuestion
          } else {
            // If no category-specific fallbacks, use the general fallback
            const generalFallback = await getRandomFallbackQuestion(category)
            const questionId = `general-fallback-${Date.now()}-${index}`
            const fallbackWithId = {
              ...generalFallback,
              id: questionId,
            }
            userHistory.add(questionId)
            return fallbackWithId
          }
        }
      })

    // Wait for all questions to be generated
    const results = await Promise.all(questionPromises)

    // Filter out any null results and ensure we have questions
    const validQuestions = results.filter((q) => q !== null)

    if (validQuestions.length === 0) {
      // If no questions were generated, use fallback questions
      const fallbackQuestions = Array(count)
        .fill(0)
        .map((_, index) => {
          const fallbacks =
            categoryFallbackQuestions[category as keyof typeof categoryFallbackQuestions] ||
            categoryFallbackQuestions.random

          if (fallbacks.length > 0) {
            const questionId = `emergency-fallback-${category}-${index}`
            const fallbackWithId = {
              ...fallbacks[index % fallbacks.length],
              id: questionId,
            }
            userHistory.add(questionId)
            return fallbackWithId
          } else {
            return getRandomFallbackQuestion(category)
          }
        })

      return NextResponse.json({
        success: true,
        questions: fallbackQuestions,
        note: "Using fallback questions",
      })
    }

    return NextResponse.json({
      success: true,
      questions: validQuestions,
    })
  } catch (error) {
    console.error("Error in quiz questions API:", error)

    // Return fallback questions if everything fails
    const fallbackQuestions = Array(5)
      .fill(0)
      .map((_, index) => {
        const fallbacks = categoryFallbackQuestions.random

        if (fallbacks.length > 0) {
          return fallbacks[index % fallbacks.length]
        } else {
          return getRandomFallbackQuestion()
        }
      })

    return NextResponse.json({
      success: true,
      questions: fallbackQuestions,
      note: "Using fallback questions due to error",
    })
  }
}

