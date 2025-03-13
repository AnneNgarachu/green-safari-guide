/**
 * This is an example of how the refactored page.tsx would look
 * after implementing the refactoring plan.
 */

import { HeroSection } from "@/app/components/sections/hero-section"
import { DailyChallengeSection } from "@/app/components/sections/daily-challenge-section"
import { StatsSection } from "@/app/components/sections/stats-section"
import { DidYouKnowSection } from "@/app/components/features/did-you-know"
import { QuizCategoriesSection } from "@/app/components/sections/quiz-categories-section"
import { FeaturesSection } from "@/app/components/sections/features-section"
import { MapSection } from "@/app/components/sections/map-section"
import { TestimonialsSection } from "@/app/components/sections/testimonials-section"
import { CtaSection } from "@/app/components/sections/cta-section"
import { Header } from "@/app/components/layout/header"
import { Footer } from "@/app/components/layout/footer"
import { getDailyChallenge } from "@/lib/api/daily-challenge"

export default async function LandingPage() {
  // Get the daily challenge with error handling
  let dailyChallenge
  try {
    dailyChallenge = await getDailyChallenge()
  } catch (error) {
    console.error("Error fetching daily challenge:", error)
    // Provide a fallback challenge
    dailyChallenge = {
      question: "Which African country is known as the 'Land of a Thousand Hills'?",
      options: ["Kenya", "Rwanda", "Ethiopia", "Tanzania"],
      correct_answer: "Rwanda",
      explanation:
        "Rwanda is called the 'Land of a Thousand Hills' due to its mountainous terrain. The country's landscape is characterized by rolling hills, valleys, and lakes, creating a unique and beautiful geography that has shaped its culture and history.",
      topic: "Geography",
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DailyChallengeSection challenge={dailyChallenge} />
        <StatsSection />
        <DidYouKnowSection />
        <QuizCategoriesSection />
        <FeaturesSection />
        <MapSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

