"use client"

import { Button } from "@/components/ui/button"
import { useSound } from "@/lib/sound-utils"
import Link from "next/link"

export function CtaSection() {
  const { play } = useSound()

  return (
    <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ready to Begin Your African Adventure?</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Join our community of explorers and start your journey through the diverse landscapes, rich cultures, and
          fascinating history of Africa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quizzes">
            <Button
              size="lg"
              className="bg-white text-amber-600 hover:bg-white/90 h-12 px-6"
              onClick={() => {
                play("click")
                setTimeout(() => play("success"), 300)
              }}
            >
              Start Exploring
            </Button>
          </Link>
          <Link href="/explore">
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10 h-12 px-6"
              onClick={() => play("click")}
            >
              View Map
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

