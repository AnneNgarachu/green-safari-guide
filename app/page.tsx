import { HeroSection } from "@/app/components/sections/hero-section"
import { DailyChallengeSection } from "@/app/components/sections/daily-challenge-section"
import { StatsSection } from "@/app/components/sections/stats-section"
import { QuizCategoriesSection } from "@/app/components/sections/quiz-categories-section"
import { FeaturesSection } from "@/app/components/sections/features-section"
import { MapSection } from "@/app/components/sections/map-section"
import { TestimonialsSection } from "@/app/components/sections/testimonials-section"
import { CtaSection } from "@/app/components/sections/cta-section"
import { Header } from "@/app/components/layout/header"
import { Footer } from "@/app/components/layout/footer"
import { DidYouKnowBanner } from "@/app/components/sections/did-you-know-banner"
import { getRandomFallbackQuestion } from "@/lib/server/ai-service"

export default async function LandingPage() {
  // Get the daily challenge with error handling
  let dailyChallenge

  try {
    // Use a relative URL instead of constructing an absolute URL
    const response = await fetch("/api/daily-challenge", {
      cache: "no-store", // Ensure we get a fresh challenge
      next: { revalidate: 86400 }, // Revalidate once per day (optional)
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    dailyChallenge = await response.json()
  } catch (error) {
    console.log("Error fetching daily challenge in page component, using fallback:", error)
    // Provide a fallback challenge
    const fallbackQuestion = getRandomFallbackQuestion()
    dailyChallenge = {
      question: fallbackQuestion.question,
      options: fallbackQuestion.options,
      correct_answer: fallbackQuestion.correctAnswer,
      explanation: fallbackQuestion.explanation,
      topic: fallbackQuestion.topic,
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DailyChallengeSection challenge={dailyChallenge} />
        <StatsSection />
        <DidYouKnowBanner />
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

