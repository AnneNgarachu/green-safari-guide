"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { subscribeToMailingList } from "@/app/actions/quiz-actions"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { useSound } from "@/lib/sound-utils"

export function SubscriptionForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const { play } = useSound()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setResult({ success: false, message: "Please enter a valid email address" })
      play("incorrect")
      return
    }

    try {
      setIsLoading(true)
      play("click")

      const formData = new FormData()
      formData.append("email", email)

      const response = await subscribeToMailingList(formData)
      setResult(response)

      if (response.success) {
        setEmail("")
        play("success")
      } else {
        play("incorrect")
      }
    } catch (error) {
      setResult({ success: false, message: "An error occurred. Please try again later." })
      play("incorrect")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {result && (
        <div
          className={`p-3 rounded-lg text-sm flex items-start gap-2 ${
            result.success ? "bg-green-100/20 text-green-400" : "bg-red-100/20 text-red-400"
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <span>{result.message}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-12 px-4 rounded-lg border bg-background"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white h-12"
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Get Notified"}
        </Button>
      </div>
    </form>
  )
}

