import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe2, Users, Clock, Leaf, Utensils, ArrowRight } from "lucide-react"
import { Header } from "@/app/components/layout/header"
import { Footer } from "@/app/components/layout/footer"
import { Breadcrumbs } from "@/app/components/ui/breadcrumbs"

export const metadata: Metadata = {
  title: "African Quizzes - Green Safari Guide",
  description:
    "Test your knowledge of Africa with our interactive quizzes on geography, culture, history, wildlife, and cuisine",
}

const categories = [
  {
    id: "geography",
    name: "Geography",
    description: "Mountains, rivers, deserts, and countries of Africa",
    icon: Globe2,
    color: "bg-blue-500",
    questionCount: 50,
  },
  {
    id: "culture",
    name: "Culture & People",
    description: "Traditions, languages, and diverse peoples of Africa",
    icon: Users,
    color: "bg-pink-500",
    questionCount: 45,
  },
  {
    id: "history",
    name: "History & Heritage",
    description: "Ancient civilizations to modern African history",
    icon: Clock,
    color: "bg-amber-600",
    questionCount: 40,
  },
  {
    id: "wildlife",
    name: "Wildlife & Nature",
    description: "Animals, plants, and natural wonders of Africa",
    icon: Leaf,
    color: "bg-green-500",
    questionCount: 55,
  },
  {
    id: "cuisine",
    name: "Food & Cuisine",
    description: "Traditional dishes and culinary practices",
    icon: Utensils,
    color: "bg-orange-500",
    questionCount: 35,
  },
]

export default function QuizzesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container">
          <Breadcrumbs />

          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">African Knowledge Quizzes</h1>
            <p className="text-lg text-muted-foreground">
              Test your knowledge of Africa with our interactive quizzes. Choose a category to begin your learning
              journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.id} className="overflow-hidden hover:shadow-md transition-all">
                  <div className={`h-2 w-full ${category.color}`} />
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div
                        className={`h-12 w-12 rounded-lg ${category.color} text-white flex items-center justify-center`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="text-sm text-muted-foreground">{category.questionCount} questions</div>
                    </div>
                    <h3 className="text-xl font-bold mt-4 mb-2">{category.name}</h3>
                    <p className="text-muted-foreground mb-6">{category.description}</p>
                    <Link href={`/quizzes/${category.id}`}>
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                        Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-900/20 rounded-xl border p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Challenge Yourself</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our quizzes are designed to be both educational and entertaining. Learn fascinating facts about Africa
              while testing your knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quizzes/random">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                  Random Quiz
                </Button>
              </Link>
              <Link href="/daily-challenge">
                <Button variant="outline">Daily Challenge</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

