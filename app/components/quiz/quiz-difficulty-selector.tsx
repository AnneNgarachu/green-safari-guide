"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Brain, Sparkles, Target } from "lucide-react"
import { useSound } from "@/lib/sound-utils"

export type QuizDifficulty = "beginner" | "intermediate" | "advanced"

const difficultyLevels = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Perfect for those starting to learn about Africa",
    icon: Sparkles,
    color: "bg-green-500",
    features: ["Basic geography and facts", "Simple multiple choice", "Helpful hints available"],
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "For those with some knowledge of Africa",
    icon: Brain,
    color: "bg-amber-500",
    features: ["Detailed history and culture", "More challenging questions", "Limited hints"],
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Test your expert knowledge",
    icon: Target,
    color: "bg-red-500",
    features: ["Complex topics and details", "Timed challenges", "No hints available"],
  },
]

export function QuizDifficultySelector() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty | null>(null)
  const { play } = useSound()

  const handleDifficultySelect = (difficulty: QuizDifficulty) => {
    setSelectedDifficulty(difficulty)
    play("click")
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Difficulty Level</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {difficultyLevels.map((level) => {
          const Icon = level.icon
          const isSelected = selectedDifficulty === level.id

          return (
            <Card
              key={level.id}
              className={`relative cursor-pointer transition-all ${
                isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:shadow-md hover:-translate-y-1"
              }`}
              onClick={() => handleDifficultySelect(level.id as QuizDifficulty)}
            >
              <div className="p-6">
                <div className={`h-12 w-12 rounded-lg ${level.color} text-white flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{level.name}</h3>
                <p className="text-muted-foreground mb-4">{level.description}</p>
                <ul className="space-y-2">
                  {level.features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${level.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

