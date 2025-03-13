"use client"

import { useState } from "react"
import { Shield, Gift, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useSound } from "@/lib/sound-utils"
import Link from "next/link"

type StreakProtectionProps = {
  streakCount: number
  streakFreezes: number
  onUseStreakFreeze?: () => void
  isLoggedIn?: boolean
}

export function StreakProtection({
  streakCount = 0,
  streakFreezes = 0,
  onUseStreakFreeze,
  isLoggedIn = false,
}: StreakProtectionProps) {
  const [showRewardDialog, setShowRewardDialog] = useState(false)
  const { play } = useSound()

  // Determine if user should get a reward (every 5 days)
  const hasReward = streakCount > 0 && streakCount % 5 === 0

  const handleUseStreakFreeze = () => {
    play("click")
    if (onUseStreakFreeze) {
      onUseStreakFreeze()
    }
  }

  const handleClaimReward = () => {
    play("success")
    setShowRewardDialog(false)
    // In a real app, this would call an API to give the user their reward
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium mb-1">Protect Your Streak</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Sign up to protect your daily streak and earn rewards for consistent learning!
            </p>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                onClick={() => play("click")}
              >
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="flex justify-between items-start">
              <h4 className="font-medium mb-1">Streak Protection</h4>
              {hasReward && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 border-amber-300 text-amber-700 bg-amber-100"
                  onClick={() => {
                    play("click")
                    setShowRewardDialog(true)
                  }}
                >
                  <Gift className="h-3.5 w-3.5" />
                  <span className="text-xs">Claim Reward</span>
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              You have {streakFreezes} streak freeze{streakFreezes !== 1 ? "s" : ""}. Use one to protect your streak if
              you miss a day.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium">{streakCount} day streak</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                disabled={streakFreezes <= 0}
                onClick={handleUseStreakFreeze}
              >
                Use Streak Freeze
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reward Dialog */}
      <Dialog open={showRewardDialog} onOpenChange={setShowRewardDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Streak Reward! 🎉</DialogTitle>
            <DialogDescription className="text-center">
              Congratulations on maintaining a {streakCount} day streak!
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center py-6">
            <div className="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">You've earned:</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                  <Shield className="h-3 w-3 text-amber-600" />
                </div>
                <span>2 Streak Freezes</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Gift className="h-3 w-3 text-green-600" />
                </div>
                <span>100 XP Bonus</span>
              </li>
            </ul>
          </div>

          <DialogFooter>
            <Button
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              onClick={handleClaimReward}
            >
              Claim Reward
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

