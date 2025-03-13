"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Twitter, Facebook, Linkedin, Mail, Copy, Check, MessageSquare, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useSound } from "@/lib/sound-utils"
import { useToast } from "@/hooks/use-toast"

type SocialShareProps = {
  title?: string
  text?: string
  url?: string
  hashtags?: string[]
  variant?: "icon" | "button" | "dropdown"
  size?: "sm" | "md" | "lg"
  showChallengeFriends?: boolean
}

export function SocialShare({
  title = "Test your knowledge of Africa with this daily challenge!",
  text = "I just completed today's Africa quiz challenge. Can you beat my score?",
  url = typeof window !== "undefined" ? window.location.href : "https://greensafariguide.com",
  hashtags = ["Africa", "Quiz", "Learning"],
  variant = "dropdown",
  size = "md",
  showChallengeFriends = true,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [showChallengeDialog, setShowChallengeDialog] = useState(false)
  const [friendEmail, setFriendEmail] = useState("")
  const [message, setMessage] = useState("Hey! I challenge you to take this Africa quiz. Let's see who knows more!")
  const { play } = useSound()
  const { toast } = useToast()

  const encodedText = encodeURIComponent(text)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedHashtags = hashtags.join(",")

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodedHashtags}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
  }

  const handleCopyLink = () => {
    play("click")
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard.",
    })
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    play("click")
    window.open(shareLinks[platform], "_blank", "noopener,noreferrer")
  }

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    play("success")
    toast({
      title: "Challenge sent!",
      description: `Your challenge has been sent to ${friendEmail}.`,
    })
    setShowChallengeDialog(false)
    // In a real app, this would call an API to send the challenge
  }

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => {
          play("click")
          if (navigator.share) {
            navigator.share({
              title,
              text,
              url,
            })
          } else {
            handleCopyLink()
          }
        }}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    )
  }

  if (variant === "button") {
    return (
      <Button
        variant="outline"
        size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
        className="gap-2"
        onClick={() => {
          play("click")
          if (navigator.share) {
            navigator.share({
              title,
              text,
              url,
            })
          } else {
            handleCopyLink()
          }
        }}
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    )
  }

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
            className="gap-2"
            onClick={() => play("click")}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleShare("twitter")} className="gap-2 cursor-pointer">
            <Twitter className="h-4 w-4 text-blue-400" />
            <span>Twitter</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("facebook")} className="gap-2 cursor-pointer">
            <Facebook className="h-4 w-4 text-blue-600" />
            <span>Facebook</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("linkedin")} className="gap-2 cursor-pointer">
            <Linkedin className="h-4 w-4 text-blue-700" />
            <span>LinkedIn</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("email")} className="gap-2 cursor-pointer">
            <Mail className="h-4 w-4 text-gray-600" />
            <span>Email</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </DropdownMenuItem>

          {showChallengeFriends && (
            <DropdownMenuItem
              onClick={() => {
                play("click")
                setShowChallengeDialog(true)
              }}
              className="gap-2 cursor-pointer"
            >
              <Users className="h-4 w-4 text-amber-600" />
              <span>Challenge Friends</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Challenge Friends Dialog */}
      <Dialog open={showChallengeDialog} onOpenChange={setShowChallengeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Challenge Friends</DialogTitle>
            <DialogDescription>Send a challenge to your friends and see who scores better!</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleChallengeSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Friend's Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="friend@example.com"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <div className="relative">
                  <textarea
                    id="message"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Add a personal message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="absolute bottom-2 right-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              >
                Send Challenge
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

