"use client"

import type React from "react"

import { BookOpen, Globe2, Users, Clock, Leaf, Utensils, Sparkles, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SubscriptionForm } from "@/app/components/subscription-form"
import { useSound } from "@/lib/sound-utils"

// Update the QuizCategoryCard to include ad-supported hints
function QuizCategoryCard({
  icon,
  title,
  description,
  color,
  questions,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  questions: string[]
}) {
  const { play } = useSound()

  return (
    <div className="relative group overflow-hidden rounded-xl border bg-background p-6 hover:shadow-md transition-all">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div className={`h-12 w-12 rounded-lg ${color} text-white flex items-center justify-center`}>{icon}</div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => play("click")}
          >
            View All
          </Button>
        </div>
        <h3 className="text-xl font-bold mt-4">{title}</h3>
        <p className="text-muted-foreground mt-2">{description}</p>
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium mb-3">Sample Questions:</h4>
          <ul className="space-y-2">
            {questions.map((question, i) => (
              <li key={i} className="text-sm bg-muted/50 p-2 rounded flex justify-between items-center">
                {question}
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => play("hint")}>
                  <Sparkles className="h-3 w-3 mr-1" />
                  Get Hint
                </Button>
              </li>
            ))}
          </ul>
          <Button
            className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
            onClick={() => {
              play("click")
              setTimeout(() => play("success"), 300)
            }}
          >
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}

function Trophy(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

export function QuizCategoriesSection() {
  const { play } = useSound()

  return (
    <section id="quizzes" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border bg-muted px-3 py-1 text-sm font-medium mb-4">
            Quiz Categories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Explore Our Interactive Quizzes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your knowledge across a variety of African topics with our engaging quiz categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuizCategoryCard
            icon={<BookOpen className="h-8 w-8" />}
            title="General Knowledge"
            description="Test your overall knowledge about Africa"
            color="bg-purple-500"
            questions={["Which is the largest country in Africa?", "How many countries are in Africa?"]}
          />
          <QuizCategoryCard
            icon={<Globe2 className="h-8 w-8" />}
            title="Geography"
            description="Mountains, rivers, deserts, and countries of Africa"
            color="bg-blue-500"
            questions={["What is the highest mountain in Africa?", "Which desert covers much of North Africa?"]}
          />
          <QuizCategoryCard
            icon={<Users className="h-8 w-8" />}
            title="Culture & People"
            description="Traditions, languages, and diverse peoples of Africa"
            color="bg-pink-500"
            questions={[
              "Which African music genre originated in Nigeria?",
              "What is the traditional storyteller called in West Africa?",
            ]}
          />
          <QuizCategoryCard
            icon={<Clock className="h-8 w-8" />}
            title="History & Heritage"
            description="Ancient civilizations to modern African history"
            color="bg-amber-600"
            questions={[
              "Which ancient civilization built the pyramids in Sudan?",
              "Who was the first president of Ghana?",
            ]}
          />
          <QuizCategoryCard
            icon={<Leaf className="h-8 w-8" />}
            title="Wildlife & Nature"
            description="Animals, plants, and natural wonders of Africa"
            color="bg-green-500"
            questions={["Which African country has the most elephants?", "What is the largest lake in Africa?"]}
          />
          <QuizCategoryCard
            icon={<Utensils className="h-8 w-8" />}
            title="Food & Cuisine"
            description="Traditional dishes and culinary practices across the continent"
            color="bg-orange-500"
            questions={["Which grain is a staple in Ethiopian cuisine?", "What is the national dish of Morocco?"]}
          />
        </div>

        {/* Coming Soon / Mailing List Section */}
        <div className="mt-12 pt-12 border-t">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-900/20 rounded-xl border p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
                  Coming Soon
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Challenge Mode</h3>
                <p className="text-muted-foreground mb-6">
                  Test your knowledge across all categories with timed challenges and compete on the leaderboard. Be the
                  first to know when we launch this exciting new feature!
                </p>
                <SubscriptionForm />
              </div>
              <div className="relative hidden md:block">
                <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-xl opacity-30"></div>
                <div className="relative h-64 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Award className="h-16 w-16 text-amber-600" />
                  </div>
                  <div className="absolute top-0 right-0 h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-amber-600" />
                  </div>
                  <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

