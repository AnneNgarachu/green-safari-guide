"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Info, ArrowRight, Loader2 } from "lucide-react"
import { useSound } from "@/lib/sound-utils"
import { QuizResults } from "./quiz-results"

type QuizQuestion = {
  id?: string // Add ID for tracking
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  topic: string
}

export function QuizInterface({ category }: { category: string }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const { play } = useSound()
  const router = useRouter()

  // Get user ID from localStorage or generate one
  const getUserId = () => {
    if (typeof window === "undefined") return null

    let userId = localStorage.getItem("quiz_user_id")
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      localStorage.setItem("quiz_user_id", userId)
    }
    return userId
  }

  // Load questions from API
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setIsLoading(true)
        setError(null)

        // Get user ID for tracking shown questions
        const userId = getUserId()

        // Add userId to request if available
        const userParam = userId ? `&userId=${userId}` : ""
        const response = await fetch(`/api/quiz-questions?category=${category}&count=5${userParam}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch questions (${response.status})`)
        }

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.message || "Failed to load questions")
        }

        if (!data.questions || data.questions.length === 0) {
          throw new Error("No questions available for this category")
        }

        setQuestions(data.questions)
      } catch (err) {
        console.error("Error fetching questions:", err)
        setError(err instanceof Error ? err.message : "Failed to load questions. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [category])

  const currentQuestion = questions[currentQuestionIndex]

  const handleOptionClick = (option: string) => {
    if (!isSubmitted && !isLoading) {
      play("click")
      setSelectedAnswer(option)
    }
  }

  const handleSubmit = () => {
    if (!selectedAnswer || isSubmitted) return

    play("click")
    setIsSubmitted(true)

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    if (isCorrect) {
      play("correct")
      setScore(score + 1)
    } else {
      play("incorrect")
    }

    // Store user's answer
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestionIndex] = selectedAnswer
    setUserAnswers(newUserAnswers)
  }

  const handleNext = () => {
    play("click")

    if (currentQuestionIndex >= questions.length - 1) {
      // Quiz completed
      setQuizCompleted(true)
      play("success")
    } else {
      // Move to next question
      setSelectedAnswer(null)
      setIsSubmitted(false)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleRetry = () => {
    play("click")
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsSubmitted(false)
    setScore(0)
    setQuizCompleted(false)
    setUserAnswers([])
  }

  const handleNewQuiz = () => {
    play("click")
    router.push("/quizzes")
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-amber-600 mb-4" />
            <p className="text-muted-foreground">Loading quiz questions...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-2">Error</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-2">No Questions Available</h3>
            <p className="text-muted-foreground mb-4">
              We couldn't find any questions for this category. Please try another category.
            </p>
            <Button onClick={() => router.push("/quizzes")}>Back to Quizzes</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (quizCompleted) {
    return (
      <QuizResults
        score={score}
        totalQuestions={questions.length}
        questions={questions}
        userAnswers={userAnswers}
        onRetry={handleRetry}
        onNewQuiz={handleNewQuiz}
      />
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="text-sm font-medium">
              Score: {score}/{currentQuestionIndex}
            </div>
          </div>
          <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
        </div>

        <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>

        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, i) => (
            <div
              key={i}
              className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-colors ${
                isSubmitted
                  ? option === currentQuestion.correctAnswer
                    ? "bg-green-100 dark:bg-green-900/20 border border-green-500"
                    : selectedAnswer === option && option !== currentQuestion.correctAnswer
                      ? "bg-red-100 dark:bg-red-900/20 border border-red-500"
                      : "bg-muted/50 hover:bg-muted"
                  : selectedAnswer === option
                    ? "bg-amber-100 dark:bg-amber-900/20 border border-amber-500"
                    : "bg-muted/50 hover:bg-muted"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <div
                className={`h-5 w-5 rounded-full flex-shrink-0 flex items-center justify-center ${
                  isSubmitted
                    ? option === currentQuestion.correctAnswer
                      ? "bg-green-500 text-white"
                      : selectedAnswer === option && option !== currentQuestion.correctAnswer
                        ? "bg-red-500 text-white"
                        : "border-2 border-muted-foreground"
                    : selectedAnswer === option
                      ? "bg-amber-500 text-white"
                      : "border-2 border-muted-foreground"
                }`}
              >
                {isSubmitted && option === currentQuestion.correctAnswer && <CheckCircle2 className="h-3 w-3" />}
                {isSubmitted && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                  <XCircle className="h-3 w-3" />
                )}
              </div>
              <span>{option}</span>
            </div>
          ))}
        </div>

        {isSubmitted ? (
          <div>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 mt-0.5 text-amber-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Explanation:</h4>
                  <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              {currentQuestionIndex >= questions.length - 1 ? (
                "See Results"
              ) : (
                <>
                  Next Question <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
          >
            Submit Answer
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

