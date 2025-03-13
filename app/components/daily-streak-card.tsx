"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, CheckCircle2, Trophy, XCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useSound } from "@/lib/sound-utils"

export function DailyStreakCard() {
  const { play } = useSound()
  const [isLoggedIn] = useState(false) // This would be replaced with actual auth state

  // Mock data - in a real app, this would come from the user's profile
  const streakData = {
    currentStreak: 0,
    longestStreak: 0,
    lastWeek: [false, false, false, false, false, false, false],
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-amber-300" />
          <h3 className="text-xl font-bold">Your Challenge Streak</h3>
        </div>

        {isLoggedIn ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-sm opacity-80">Current Streak</div>
                <div className="text-3xl font-bold flex items-center gap-2">
                  <span>{streakData.currentStreak}</span>
                  <span className="text-sm font-normal">days</span>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-sm opacity-80">Longest Streak</div>
                <div className="text-3xl font-bold flex items-center gap-2">
                  <span>{streakData.longestStreak}</span>
                  <span className="text-sm font-normal">days</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" />
                <h4 className="font-medium">Last 7 Days</h4>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {streakData.lastWeek.map((completed, i) => (
                  <div
                    key={i}
                    className={`h-10 w-full rounded-md flex items-center justify-center ${
                      completed ? "bg-green-500/50" : "bg-white/10"
                    }`}
                  >
                    {completed ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5 opacity-50" />}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white/10 rounded-lg p-6 mb-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-amber-500/20 mb-3">
                <Calendar className="h-8 w-8 text-amber-300" />
              </div>
              <h4 className="text-lg font-bold mb-1">Track Your Progress</h4>
              <p className="text-sm text-white/80 mb-4">
                Sign up to track your daily streak and compete on the leaderboard!
              </p>
            </div>
            <Link href="/signup">
              <Button className="w-full bg-white text-amber-600 hover:bg-white/90" onClick={() => play("click")}>
                Sign Up Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        <div className="bg-white/10 rounded-lg p-4">
          <h4 className="font-medium mb-3">Challenge Benefits</h4>
          <ul className="space-y-2">
            {[
              "Build knowledge consistently",
              "Earn streak achievements",
              "Compete on the leaderboard",
              "Unlock special content",
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <div className="mr-3 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-white/20 text-white flex items-center justify-center">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}

