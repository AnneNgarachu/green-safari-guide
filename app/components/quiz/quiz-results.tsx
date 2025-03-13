"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, Trophy, ArrowRight, RotateCcw } from "lucide-react"
import { useSound } from "@/lib/sound-utils"
import confetti from "canvas-confetti"

type QuizQuestion = {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  topic: string
}

type QuizResultsProps = {
  score: number
  totalQuestions: number
  questions: QuizQuestion[]
  userAnswers: string[]
  onRetry: () => void
  onNewQuiz: () => void
}

export function QuizResults({ score, totalQuestions, questions, userAnswers, onRetry, onNewQuiz }: QuizResultsProps) {
  const [activeTab, setActiveTab] = useState("summary")
  const { play } = useSound()
  const percentage = Math.round((score / totalQuestions) * 100)

  // Trigger confetti on first render if score is good
  useState(() => {
    if (percentage >= 80) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
        play("success")
      }, 500)
    }
  })

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    play("click")
  }

  const getFeedback = () => {
    if (percentage >= 90) return "Excellent! You're an Africa expert!"
    if (percentage >= 80) return "Great job! You know Africa well!"
    if (percentage >= 70) return "Good work! You have solid knowledge of Africa."
    if (percentage >= 60) return "Not bad! You're learning about Africa."
    if (percentage >= 50) return "You're on your way to learning more about Africa."
    return "Keep learning! Africa has so much more to discover."
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="summary" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Results Summary</TabsTrigger>
            <TabsTrigger value="review">Review Answers</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="pt-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-3xl font-bold mb-4">
                {percentage}%
              </div>

              <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
              <p className="text-muted-foreground mb-6">
                You scored {score} out of {totalQuestions} questions correctly.
              </p>

              <div className="bg-muted p-4 rounded-lg mb-6 flex items-start gap-3">
                <Trophy className="h-5 w-5 mt-0.5 text-amber-600 flex-shrink-0" />
                <p>{getFeedback()}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={onRetry} variant="outline" className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button
                  onClick={onNewQuiz}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 flex items-center gap-2"
                >
                  New Quiz
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="review" className="pt-6">
            <h3 className="text-xl font-bold mb-4">Review Your Answers</h3>
            <div className="space-y-6">
              {questions.map((question, qIndex) => (
                <div key={qIndex} className="border rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <div
                      className={`h-6 w-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                        userAnswers[qIndex] === question.correctAnswer
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {userAnswers[qIndex] === question.correctAnswer ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                    </div>
                    <h4 className="font-medium">{question.question}</h4>
                  </div>

                  <div className="ml-8 space-y-2 mb-3">
                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        className={`p-2 rounded-md text-sm ${
                          option === question.correctAnswer
                            ? "bg-green-100 dark:bg-green-900/20 border border-green-500"
                            : option === userAnswers[qIndex] && option !== question.correctAnswer
                              ? "bg-red-100 dark:bg-red-900/20 border border-red-500"
                              : "bg-muted/50"
                        }`}
                      >
                        {option}
                        {option === question.correctAnswer && " ✓"}
                        {option === userAnswers[qIndex] && option !== question.correctAnswer && " ✗"}
                      </div>
                    ))}
                  </div>

                  <div className="ml-8 bg-muted/50 p-3 rounded-md text-sm">
                    <span className="font-medium">Explanation: </span>
                    {question.explanation}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onRetry} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
              <Button
                onClick={onNewQuiz}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 flex items-center gap-2"
              >
                New Quiz
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

