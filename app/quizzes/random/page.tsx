import type { Metadata } from "next"
import { Header } from "@/app/components/layout/header"
import { Footer } from "@/app/components/layout/footer"
import { QuizInterface } from "@/app/components/quiz/quiz-interface"

export const metadata: Metadata = {
  title: "Random Quiz - Green Safari Guide",
  description: "Test your knowledge with a random selection of questions about Africa",
}

export default function RandomQuizPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Random Quiz Challenge</h1>
            <p className="text-muted-foreground">
              Test your knowledge across various African topics with this random selection of questions.
            </p>
          </div>

          <QuizInterface category="random" />
        </div>
      </main>
      <Footer />
    </div>
  )
}

