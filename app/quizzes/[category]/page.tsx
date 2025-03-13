import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/app/components/layout/header"
import { Footer } from "@/app/components/layout/footer"
import { QuizInterface } from "@/app/components/quiz/quiz-interface"
import { Breadcrumbs } from "@/app/components/ui/breadcrumbs"

type Props = {
  params: { category: string }
}

// Define valid categories
const validCategories = ["geography", "culture", "history", "wildlife", "cuisine", "random"]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = params

  if (!validCategories.includes(category)) {
    return {
      title: "Quiz Not Found - Green Safari Guide",
    }
  }

  // Format category name for display
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${categoryName} Quiz - Green Safari Guide`,
    description: `Test your knowledge of African ${category} with our interactive quiz`,
  }
}

export default function QuizPage({ params }: Props) {
  const { category } = params

  // Validate category
  if (!validCategories.includes(category)) {
    notFound()
  }

  // Format category name for display
  const categoryName = category === "random" ? "Random" : category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container max-w-4xl">
          <Breadcrumbs />

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{categoryName} Quiz</h1>
            <p className="text-muted-foreground">
              {category === "random"
                ? "Test your knowledge across various African topics with this random quiz."
                : `Test your knowledge of African ${category} with these challenging questions.`}
            </p>
          </div>

          <QuizInterface category={category} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

