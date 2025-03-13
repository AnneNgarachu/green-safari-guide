import type { Metadata } from "next"
import { Header } from "@/app/components/layout/header"
import { Footer } from "@/app/components/layout/footer"
import { DailyStreakCard } from "@/app/components/daily-streak-card"
import { getRandomFallbackQuestion } from "@/lib/server/ai-service"
import { Breadcrumbs } from "@/app/components/ui/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Bell, Share2 } from "lucide-react"
import { CountryParticipationMap } from "@/app/components/country-participation-map"
import { DailyChallengeLeaderboard } from "@/app/components/daily-challenge-leaderboard"
import { WeeklyLeaderboard } from "@/app/components/weekly-leaderboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import the DailyChallengeSet component
import { DailyChallengeSet } from "@/app/components/daily-challenge-set"

export const metadata: Metadata = {
  title: "Quiz of the Day - Green Safari Guide",
  description: "Test your knowledge with today's African quiz challenge and explore more fun facts about Africa",
}

export default async function DailyChallengePageStandalone() {
  // Get the daily challenge with error handling
  let dailyChallenge

  try {
    const response = await fetch("/api/daily-challenge", {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    dailyChallenge = await response.json()
  } catch (error) {
    console.log("Error fetching daily challenge, using fallback:", error)
    const fallbackQuestion = getRandomFallbackQuestion()
    dailyChallenge = {
      question: fallbackQuestion.question,
      options: fallbackQuestion.options,
      correct_answer: fallbackQuestion.correctAnswer,
      explanation: fallbackQuestion.explanation,
      topic: fallbackQuestion.topic,
    }
  }

  // Get today's date
  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Orange gradient section - only for the challenge */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-12">
        <div className="container max-w-6xl">
          <Breadcrumbs
            containerClasses="py-4 flex text-white"
            listClasses="flex items-center space-x-2 text-sm text-white/80"
            activeClasses="font-medium text-white"
            inactiveClasses="hover:text-white transition-colors"
          />

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Quiz of the Day</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Test your knowledge with today's featured quiz question about Africa. Come back every day for a new
              challenge and learn fascinating facts!
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                {formattedDate}
              </div>
              <Button variant="secondary" size="sm" className="bg-white text-amber-600 hover:bg-white/90 gap-2">
                <Share2 className="h-4 w-4" />
                Share Challenge
              </Button>
              <Button variant="secondary" size="sm" className="bg-white text-amber-600 hover:bg-white/90 gap-2">
                <Bell className="h-4 w-4" />
                Get Reminders
              </Button>
            </div>
          </div>

          {/* Daily Challenge */}
          <div className="max-w-3xl mx-auto">
            <DailyChallengeSet
              challenges={Array.isArray(dailyChallenge) ? dailyChallenge : [dailyChallenge]}
              date={formattedDate}
            />
            <DailyStreakCard />
          </div>

          {/* Past Challenges */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Previous Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  date: "May 12, 2023",
                  question: "Which African country has the most pyramids?",
                  topic: "Ancient History",
                },
                {
                  date: "May 11, 2023",
                  question: "What percentage of the world's chocolate comes from Africa?",
                  topic: "Agriculture",
                },
                {
                  date: "May 10, 2023",
                  question: "Which African animal can sleep standing up?",
                  topic: "Wildlife Fun Facts",
                },
              ].map((challenge, i) => (
                <Card
                  key={i}
                  className="bg-white/10 border-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="text-xs text-white/70 mb-1">{challenge.date}</div>
                    <div className="font-medium mb-1">{challenge.question}</div>
                    <div className="text-xs inline-flex items-center rounded-full bg-white/20 px-2 py-1">
                      {challenge.topic}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats section - outside the orange gradient */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-6xl">
          <Tabs defaultValue="leaderboards" className="mb-8">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
              <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
              <TabsTrigger value="global">Global Participation</TabsTrigger>
            </TabsList>

            <TabsContent value="leaderboards" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DailyChallengeLeaderboard />
                <WeeklyLeaderboard isLoggedIn={false} />
              </div>
            </TabsContent>

            <TabsContent value="global" className="mt-6">
              <div className="max-w-3xl mx-auto">
                <CountryParticipationMap />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}

