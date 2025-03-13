"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe2 } from "lucide-react"
import { useSound } from "@/lib/sound-utils"

export function Header() {
  const { play } = useSound()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => play("click")}>
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full opacity-80"></div>
            <Globe2 className="absolute inset-0 h-8 w-8 text-white p-1.5" />
          </div>
          <div>
            <span className="text-xl font-bold">Green Safari Guide</span>
            <p className="text-xs text-muted-foreground">Interactive Learning Platform</p>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/quizzes"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => play("click")}
          >
            Quizzes
          </Link>
          <Link
            href="/explore"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => play("click")}
          >
            Explore Map
          </Link>
          <Link
            href="/daily-challenge"
            className="text-sm font-medium transition-colors hover:text-primary relative group"
            onClick={() => play("click")}
          >
            Daily Challenge
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </Link>
          <Link
            href="/leaderboard"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => play("click")}
          >
            Leaderboard
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" onClick={() => play("click")}>
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
              onClick={() => play("click")}
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

