"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Calendar, CheckCircle2, Clock, Globe2, Leaf, Loader2, Users } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { DailyChallenge } from "@/app/components/daily-challenge"
import { getDailyChallenge } from "@/app/actions/quiz-actions"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const [dailyChallenge, setDailyChallenge] = useState<any>(null)
  const [userStats, setUserStats] = useState({
    totalQuizzes: 0,
    completedQuizzes: 0,
    correctAnswers: 0,
    streak: 0,
  })
  const [loadingStats, setLoadingStats] = useState(true)
  const [loadingChallenge, setLoadingChallenge] = useState(true)
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  // Fetch daily challenge
  useEffect(() => {
    const fetchDailyChallenge = async () => {
      try {
        const challenge = await getDailyChallenge()
        setDailyChallenge(challenge)
      } catch (error) {
        console.error("Error fetching daily challenge:", error)
      } finally {
        setLoadingChallenge(false)
      }
    }

    fetchDailyChallenge()
  }, [])

  // Fetch user stats
  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return

      try {
        // Get completed quizzes
        const { data: userProgress, error: progressError } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id)

        if (progressError) throw progressError

        // Get daily challenge streak
        const { data: dailyChallenges, error: challengesError } = await supabase
          .from("user_daily_challenges")
          .select("*")
          .eq("user_id", user.id)
          .order("date", { ascending: false })
          .limit(30)

        if (challengesError) throw challengesError

        // Calculate streak
        let streak = 0
        if (dailyChallenges && dailyChallenges.length > 0) {
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          const yesterday = new Date(today)
          yesterday.setDate(yesterday.getDate() - 1)

          // Check if user completed today's challenge
          const todayCompleted = dailyChallenges.some((challenge) => {
            const challengeDate = new Date(challenge.date)
            challengeDate.setHours(0, 0, 0, 0)
            return challengeDate.getTime() === today.getTime()
          })

          if (todayCompleted) {
            streak = 1

            // Check previous days
            const currentDate = yesterday
            let i = 0

            while (i < dailyChallenges.length) {
              const challengeDate = new Date(dailyChallenges[i].date)
              challengeDate.setHours(0, 0, 0, 0)

              if (challengeDate.getTime() === currentDate.getTime()) {
                streak++
                currentDate.setDate(currentDate.getDate() - 1)
              } else if (challengeDate.getTime() < currentDate.getTime()) {
                // Skip this date and check the next challenge
                i++
              } else {
                // There's a gap in the streak
                break
              }
            }
          }
        }

        // Calculate correct answers
        const correctAnswers = dailyChallenges?.filter((challenge) => challenge.correct).length || 0

        setUserStats({
          totalQuizzes: userProgress?.length || 0,
          completedQuizzes: userProgress?.filter((quiz) => quiz.completed).length || 0,
          correctAnswers,
          streak,
        })
      } catch (error) {
        console.error("Error fetching user stats:", error)
      } finally {
        setLoadingStats(false)
      }
    }

    if (user) {
      fetchUserStats()
    }
  }, [user])

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full opacity-80"></div>
              <Globe2 className="absolute inset-0 h-8 w-8 text-white p-1.5" />
            </div>
            <span className="text-xl font-bold">Green Safari Guide</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Quizzes
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Explore Map
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Achievements
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="gap-2" onClick={() => router.push("/profile")}>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold">
                {user.user_metadata?.full_name?.[0] || user.email[0]}
              </div>
              <span className="hidden md:inline-block">{user.user_metadata?.full_name || user.email}</span>
            </Button>
            <Button variant="outline" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.user_metadata?.full_name?.split(" ")[0] || "Explorer"}!
          </h1>
          <p className="text-muted-foreground">Continue your journey exploring Africa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Daily Streak</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{loadingStats ? "-" : userStats.streak} days</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Quizzes Completed</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">
                  {loadingStats ? "-" : userStats.completedQuizzes}/{loadingStats ? "-" : userStats.totalQuizzes}
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Correct Answers</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{loadingStats ? "-" : userStats.correctAnswers}</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Time Spent</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">3.5 hrs</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="daily" className="mb-8">
          <TabsList>
            <TabsTrigger value="daily">Daily Challenge</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="progress">Your Progress</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Today's Challenge</h2>
                <p className="text-muted-foreground mb-6">
                  Test your knowledge with today's featured quiz! Complete daily challenges to build your streak.
                </p>
                {loadingChallenge ? (
                  <div className="flex justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                  </div>
                ) : dailyChallenge ? (
                  <DailyChallenge
                    question={dailyChallenge.question}
                    options={dailyChallenge.options}
                    correctAnswer={dailyChallenge.correct_answer}
                    explanation={dailyChallenge.explanation}
                    topic={dailyChallenge.topic}
                  />
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <p>Failed to load daily challenge. Please try again later.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Your Challenge Stats</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-sm opacity-80">Current Streak</div>
                      <div className="text-3xl font-bold">{loadingStats ? "-" : userStats.streak} Days</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-sm opacity-80">Longest Streak</div>
                      <div className="text-3xl font-bold">7 Days</div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Recent Activity</h4>
                    <div className="flex gap-1">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div
                          key={i}
                          className={`  => (
                        <div 
                          key={i} 
                          className={\`h-8 w-8 rounded-md flex items-center justify-center ${
                            i < 3 ? "bg-green-500/80" : i === 3 ? "bg-red-500/80" : "bg-white/20"
                          }`}
                        >
                          {i < 3 && <CheckCircle2 className="h-4 w-4" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Challenge Benefits</h4>
                    <ul className="space-y-2">
                      {["Build knowledge consistently", "Earn streak achievements", "Unlock special content"].map(
                        (item, i) => (
                          <li key={i} className="flex items-start">
                            <div className="mr-3 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-white/20 text-white flex items-center justify-center">
                              <CheckCircle2 className="h-3 w-3" />
                            </div>
                            <span className="text-sm">{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="recommended" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Recommended Quizzes</h2>
            <p className="text-muted-foreground mb-6">
              Based on your interests and progress, we recommend these quizzes to expand your knowledge of Africa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "East African Wildlife",
                  description: "Learn about the diverse wildlife in East Africa's national parks",
                  icon: <Leaf className="h-6 w-6" />,
                  color: "bg-green-500",
                  questions: 10,
                  difficulty: "Medium",
                },
                {
                  title: "West African Cultures",
                  description: "Explore the rich cultural traditions of West African countries",
                  icon: <Users className="h-6 w-6" />,
                  color: "bg-pink-500",
                  questions: 12,
                  difficulty: "Hard",
                },
                {
                  title: "African Independence",
                  description: "Test your knowledge about African independence movements",
                  icon: <Award className="h-6 w-6" />,
                  color: "bg-amber-600",
                  questions: 8,
                  difficulty: "Easy",
                },
              ].map((quiz, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className={`${quiz.color} h-2 w-full`}></div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className={`h-10 w-10 rounded-lg ${quiz.color} text-white flex items-center justify-center`}>
                        {quiz.icon}
                      </div>
                      <div className="text-xs font-medium px-2 py-1 bg-muted rounded-full">{quiz.difficulty}</div>
                    </div>
                    <CardTitle className="mt-3">{quiz.title}</CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">{quiz.questions} questions</div>
                      <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0">
                        Start Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="progress" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Your Learning Progress</h2>
            <p className="text-muted-foreground mb-6">
              Track your journey through Africa's geography, culture, history, and wildlife.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Categories Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Geography", progress: 65, color: "bg-blue-500" },
                      { name: "Culture & People", progress: 40, color: "bg-pink-500" },
                      { name: "History & Heritage", progress: 25, color: "bg-amber-600" },
                      { name: "Wildlife & Nature", progress: 80, color: "bg-green-500" },
                      { name: "Food & Cuisine", progress: 10, color: "bg-orange-500" },
                    ].map((category, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-sm text-muted-foreground">{category.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${category.color}`} style={{ width: `${category.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Exploration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "North Africa", progress: 45, color: "bg-red-500" },
                      { name: "West Africa", progress: 30, color: "bg-yellow-500" },
                      { name: "East Africa", progress: 70, color: "bg-green-500" },
                      { name: "Central Africa", progress: 15, color: "bg-blue-500" },
                      { name: "Southern Africa", progress: 50, color: "bg-purple-500" },
                    ].map((region, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{region.name}</span>
                          <span className="text-sm text-muted-foreground">{region.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${region.color}`} style={{ width: `${region.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Continue Exploring</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800/30">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <Globe2 className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                <p className="text-muted-foreground mb-4">
                  Explore the African continent through our interactive map. Click on countries to learn more.
                </p>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 w-full">
                  Open Map
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800/30">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Achievements</h3>
                <p className="text-muted-foreground mb-4">
                  View your earned badges and unlock new achievements as you learn about Africa.
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 w-full">
                  View Achievements
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800/30">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
                <p className="text-muted-foreground mb-4">
                  See how you rank against other explorers and compete for the top positions.
                </p>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 w-full">
                  View Leaderboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

