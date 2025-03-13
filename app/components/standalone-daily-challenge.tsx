"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Info, Volume2, VolumeX, Loader2 } from "lucide-react"
import { submitDailyChallenge } from "@/app/actions/quiz-actions"
import { useSound } from "@/lib/sound-utils"

type DailyChallengeProps = {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  topic: string
  initialChallenge?: {
    question: string
    options: string[]
    correct_answer: string
    explanation: string
    topic: string
  }
  onQuestionAnswered?: (isCorrect: boolean) => void
  forceHideCompletion?: boolean
}

export function StandaloneDailyChallenge({
  question: initialQuestion,
  options: initialOptions,
  correctAnswer: initialCorrectAnswer,
  explanation: initialExplanation,
  topic: initialTopic,
  initialChallenge,
  onQuestionAnswered,
  forceHideCompletion = false,
}: DailyChallengeProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [result, setResult] = useState<{ isCorrect: boolean } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { play, isMuted, toggleMute } = useSound()

  const [question, setQuestion] = useState(initialChallenge?.question || initialQuestion)
  const [options, setOptions] = useState(initialChallenge?.options || initialOptions)
  const [correctAnswer, setCorrectAnswer] = useState(initialChallenge?.correct_answer || initialCorrectAnswer)
  const [explanation, setExplanation] = useState(initialChallenge?.explanation || initialExplanation)
  const [topic, setTopic] = useState(initialChallenge?.topic || initialTopic)
  const [isLoadingNew, setIsLoadingNew] = useState(false)

  // If initialChallenge changes, update the state
  useEffect(() => {
    if (initialChallenge) {
      setQuestion(initialChallenge.question)
      setOptions(initialChallenge.options)
      setCorrectAnswer(initialChallenge.correct_answer)
      setExplanation(initialChallenge.explanation)
      setTopic(initialChallenge.topic)
      // Reset state for new challenge
      setSelectedAnswer(null)
      setIsSubmitted(false)
      setResult(null)
    }
  }, [initialChallenge])

  const handleSubmit = async () => {
    if (!selectedAnswer) return

    try {
      setIsLoading(true)
      setError(null)

      // Play click sound
      play("click")

      const formData = new FormData()
      formData.append("answer", selectedAnswer)
      formData.append("correctAnswer", correctAnswer)

      const response = await submitDailyChallenge(formData)
      setResult(response)
      setIsSubmitted(true)

      // Notify parent component
      if (onQuestionAnswered) {
        onQuestionAnswered(response.isCorrect)
      }

      // Play sound based on result
      if (response.isCorrect) {
        play("correct")
        setTimeout(() => play("success"), 700) // Play success sound after a delay
      } else {
        play("incorrect")
      }
    } catch (err) {
      setError("Failed to submit answer. Please try again.")
      console.error("Error submitting answer:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOptionClick = (option: string) => {
    if (!isSubmitted && !isLoading) {
      play("click")
      setSelectedAnswer(option)
    }
  }

  // Update the handleTryAnother function to redirect to the main page
  // const handleTryAnother = async () => {
  //   play("click")

  //   // Instead of loading a new question, redirect to the main page
  //   window.location.href = "/"
  // }

  // Display today's date
  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  if (isLoadingNew) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6 flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-12 w-12 animate-spin text-white mb-4" />
        <p className="text-white/90">Loading new challenge...</p>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1 text-sm font-medium">
          {topic}
        </div>
        <div className="text-sm text-white/70 mt-1">{formattedDate}</div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            toggleMute()
          }}
          title={isMuted() ? "Unmute sounds" : "Mute sounds"}
        >
          {isMuted() ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
      <h3 className="font-bold mb-3">Today's Question:</h3>
      <p className="mb-4">{question}</p>

      {error && <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 text-sm">{error}</div>}

      <div className="space-y-2">
        {options.map((option, i) => (
          <div
            key={i}
            className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-colors ${
              isSubmitted
                ? option === correctAnswer
                  ? "bg-green-100/20 border border-green-500/50"
                  : selectedAnswer === option && option !== correctAnswer
                    ? "bg-red-100/20 border border-red-500/50"
                    : "bg-white/5 hover:bg-white/10"
                : selectedAnswer === option
                  ? "bg-white/20"
                  : "bg-white/5 hover:bg-white/10"
            }`}
            onClick={() => handleOptionClick(option)}
          >
            <div
              className={`h-5 w-5 rounded-full flex-shrink-0 flex items-center justify-center ${
                isSubmitted
                  ? option === correctAnswer
                    ? "bg-green-500 text-white"
                    : selectedAnswer === option && option !== correctAnswer
                      ? "bg-red-500 text-white"
                      : "border-2 border-white"
                  : selectedAnswer === option
                    ? "bg-white text-amber-600"
                    : "border-2 border-white"
              }`}
            >
              {isSubmitted && option === correctAnswer && <CheckCircle2 className="h-3 w-3" />}
              {isSubmitted && selectedAnswer === option && option !== correctAnswer && <XCircle className="h-3 w-3" />}
            </div>
            <span>{option}</span>
          </div>
        ))}
      </div>

      {!isSubmitted ? (
        <Button
          onClick={handleSubmit}
          disabled={!selectedAnswer || isLoading}
          className="mt-6 bg-white text-amber-700 hover:bg-white/90 w-full"
        >
          {isLoading ? "Submitting..." : "Submit Answer"}
        </Button>
      ) : (
        <div className="mt-6">
          <div className={`text-lg font-bold mb-2 ${result?.isCorrect ? "text-green-400" : "text-red-400"}`}>
            {result?.isCorrect ? "Correct!" : "Incorrect!"}
          </div>
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 mt-0.5 text-amber-400 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">Learn More:</h4>
                <p className="text-sm text-white/90">{explanation}</p>
              </div>
            </div>
          </div>

          {/* Only show the Try Another button if not forced to hide completion */}
          {!forceHideCompletion && false}
        </div>
      )}
    </div>
  )
}

