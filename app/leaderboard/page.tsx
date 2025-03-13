import type { Metadata } from "next"
import { Header } from "@/app/components/layout/header"
import { Footer } from "@/app/components/layout/footer"
import { Leaderboard } from "@/app/components/quiz/leaderboard"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/app/components/ui/breadcrumbs"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Leaderboard - Green Safari Guide",
  description: "See how you rank against other explorers in our African knowledge quizzes",
}

export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container max-w-4xl">
          <Breadcrumbs />

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Quiz Leaderboard</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how you rank against other explorers. Take quizzes to earn your place on the leaderboard!
            </p>
          </div>

          <Leaderboard />

          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">Ready to test your knowledge and climb the leaderboard?</p>
            <Link href="/quizzes">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                Take a Quiz
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

