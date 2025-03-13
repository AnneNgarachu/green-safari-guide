"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe2, Users, Clock, Leaf, Utensils, Sparkles } from "lucide-react"
import { useSound } from "@/lib/sound-utils"
import Link from "next/link"

// Define quiz category data
const categories = [
  {
    id: "geography",
    name: "Geography",
    description: "Mountains, rivers, deserts, and countries of Africa",
    icon: Globe2,
    color: "bg-blue-500",
    questions: ["Which is the largest country in Africa?", "How many countries are in Africa?"],
  },
  {
    id: "culture",
    name: "Culture & People",
    description: "Traditions, languages, and diverse peoples of Africa",
    icon: Users,
    color: "bg-pink-500",
    questions: [
      "Which African music genre originated in Nigeria?",
      "What is the traditional storyteller called in West Africa?",
    ],
  },
  {
    id: "history",
    name: "History & Heritage",
    description: "Ancient civilizations to modern African history",
    icon: Clock,
    color: "bg-amber-600",
    questions: ["Which ancient civilization built the pyramids in Sudan?", "Who was the first president of Ghana?"],
  },
  {
    id: "wildlife",
    name: "Wildlife & Nature",
    description: "Animals, plants, and natural wonders of Africa",
    icon: Leaf,
    color: "bg-green-500",
    questions: ["Which African country has the most elephants?", "What is the largest lake in Africa?"],
  },
  {
    id: "cuisine",
    name: "Food & Cuisine",
    description: "Traditional dishes and culinary practices",
    icon: Utensils,
    color: "bg-orange-500",
    questions: ["Which grain is a staple in Ethiopian cuisine?", "What is the national dish of Morocco?"],
  },
]

function QuizCategoryCard({
  icon: Icon,
  title,
  description,
  color,
  questions,
  id,
}: {
  icon: React.ElementType
  title: string
  description: string
  color: string
  questions: string[]
  id: string
}) {
  const { play } = useSound()

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-all">
      <div className={`h-2 w-full ${color}`} />
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className={`h-12 w-12 rounded-lg ${color} text-white flex items-center justify-center`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="text-sm text-muted-foreground">{questions.length} questions</div>
        </div>

        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 flex-grow">{description}</p>

        <div className="space-y-4 mb-6">
          <h4 className="text-sm font-medium">Sample Questions:</h4>
          <div className="space-y-2">
            {questions.map((question, i) => (
              <div key={i} className="text-sm bg-muted/50 p-3 rounded flex justify-between items-center">
                <span className="flex-grow pr-2">{question}</span>
                <Button variant="ghost" size="sm" className="h-8 shrink-0" onClick={() => play("hint")}>
                  <Sparkles className="h-3 w-3 mr-1" />
                  Get Hint
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Link href={`/quizzes/${id}`} className="mt-auto">
          <Button
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            onClick={() => play("click")}
          >
            Start Quiz
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export function QuizCategories() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quiz Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <QuizCategoryCard
            key={category.id}
            id={category.id}
            icon={category.icon}
            title={category.name}
            description={category.description}
            color={category.color}
            questions={category.questions}
          />
        ))}
      </div>
    </div>
  )
}

