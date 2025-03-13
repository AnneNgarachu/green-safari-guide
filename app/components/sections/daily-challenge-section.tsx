"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { DailyChallenge } from "@/app/components/daily-challenge"
import type { DailyChallenge as DailyChallengeType } from "@/lib/services/supabase-service"
import { useSound } from "@/lib/sound-utils"

type DailyChallengeProps = {
  challenge: DailyChallengeType
}

export function DailyChallengeSection({ challenge }: DailyChallengeProps) {
  const { play } = useSound()

  return (
    <section id="daily-challenge" className="py-16 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Daily Challenge</h2>
            <p className="text-lg text-white/90 mb-6">
              Test your knowledge with today's featured quiz! No sign-up required - jump right in and see how much you
              know about Africa.
            </p>
            <DailyChallenge
              question={challenge.question}
              options={challenge.options}
              correctAnswer={challenge.correct_answer}
              explanation={challenge.explanation}
              topic={challenge.topic}
            />
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-white/20 rounded-3xl blur-xl opacity-30"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Daily Challenge Benefits</h3>
                <ul className="space-y-4">
                  {[
                    "Test your knowledge with a new question every day",
                    "Learn interesting facts about Africa",
                    "Track your progress over time",
                    "Compete with friends and other players",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-3 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-white/20 text-white flex items-center justify-center">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-80">Current Streak</div>
                      <div className="text-2xl font-bold">0 Days</div>
                    </div>
                    <Button className="bg-white text-amber-600 hover:bg-white/90" onClick={() => play("click")}>
                      Sign Up to Save Progress
                    </Button>
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

