"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StandaloneDailyChallenge } from "@/app/components/standalone-daily-challenge"
import { ChevronLeft, ChevronRight, CheckCircle, Trophy } from "lucide-react"
import Link from "next/link"
import { useSound } from "@/lib/sound-utils"

type DailyChallengeSetProps = {
  challenges: any[]
  date: string
}

export function DailyChallengeSet({ challenges, date }: DailyChallengeSetProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(Array(challenges.length).fill(false))
  const [allCompleted, setAllCompleted] = useState(false)
  const { play } = useSound()

  const currentChallenge = challenges[currentIndex]
  const totalAnswered = answeredQuestions.filter(Boolean).length

  const goToNext = () => {
    play("click")
    setCurrentIndex((prev) => (prev + 1) % challenges.length)
  }

  const goToPrevious = () => {
    play("click")
    setCurrentIndex((prev) => (prev - 1 + challenges.length) % challenges.length)
  }

  const handleQuestionAnswered = (isCorrect: boolean) => {
    // Mark the current question as answered
    const newAnsweredQuestions = [...answeredQuestions]
    newAnsweredQuestions[currentIndex] = true
    setAnsweredQuestions(newAnsweredQuestions)

    // Check if all questions are now answered
    const completed = newAnsweredQuestions.every(Boolean)
    if (completed && !allCompleted) {
      setAllCompleted(true)
      // Play success sound when all questions are completed
      setTimeout(() => play("success"), 1000)
    } else if (!completed) {
      // Find the next unanswered question
      let nextIndex = (currentIndex + 1) % challenges.length
      // Keep looking until we find an unanswered question or come back to current
      while (newAnsweredQuestions[nextIndex] && nextIndex !== currentIndex) {
        nextIndex = (nextIndex + 1) % challenges.length
      }

      // If we found an unanswered question, go to it after a short delay
      if (!newAnsweredQuestions[nextIndex]) {
        setTimeout(() => {
          setCurrentIndex(nextIndex)
        }, 1500) // Wait 1.5s before moving to next question
      }
    }
  }

  return (
    <div className="relative">
      {!allCompleted && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              Question {currentIndex + 1} of {challenges.length}
            </h3>
            <div className="text-sm text-white/70">{date}</div>
          </div>

          {/* Question navigation dots */}
          <div className="mb-4 flex justify-center">
            <div className="flex space-x-2">
              {challenges.map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center h-8 w-8 rounded-full cursor-pointer
                ${
                  i === currentIndex
                    ? "bg-white text-amber-600 border-2 border-white"
                    : answeredQuestions[i]
                      ? "bg-green-500/80 text-white"
                      : "bg-white/30 text-white/70"
                }`}
                  onClick={() => {
                    play("click")
                    setCurrentIndex(i)
                  }}
                >
                  {answeredQuestions[i] ? <CheckCircle className="h-4 w-4" /> : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Current question */}
          <StandaloneDailyChallenge
            initialChallenge={currentChallenge}
            onQuestionAnswered={handleQuestionAnswered}
            forceHideCompletion={true} // Always hide individual completion messages
          />

          {/* Only show navigation if not all questions are answered */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 gap-2"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>

            <Button
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 gap-2"
              onClick={goToNext}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="mt-4 text-center text-sm text-white/70">
            {totalAnswered}/{challenges.length} questions answered
          </div>
        </>
      )}

      {/* Final completion message - only shown when all questions are answered */}
      {allCompleted && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">You've completed today's challenge! 🎉</h3>
            <p className="mb-4">
              Sign up to save your progress and maintain your daily streak. Check back tomorrow for a new challenge!
            </p>
            <p className="text-sm bg-white/10 rounded-lg p-3 mb-4">
              🏆 Join thousands of learners competing for the longest daily streak! Current record: 42 days
            </p>
            <div className="flex justify-center">
              <Link href="/signup">
                <Button className="w-full bg-white text-amber-600 hover:bg-white/90">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

