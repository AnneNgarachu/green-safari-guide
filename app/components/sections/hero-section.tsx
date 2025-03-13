"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AfricaFactsModal } from "@/app/components/africa-facts-modal"
import { useSound } from "@/lib/sound-utils"
import Link from "next/link"

export function HeroSection() {
  const { play } = useSound()

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0_Africa-flags-map_iStock-613541574-emgAdJx8e88PD0MRNZT61XrFruA5Hx.webp"
          alt="Map of Africa showing flags of all African nations"
          fill
          className="object-contain opacity-40 dark:opacity-30 scale-100 md:scale-110"
          priority
        />
      </div>
      <div className="container relative">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter">
                Discover{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                  Africa
                </span>{" "}
                Through Interactive Quizzes
              </h1>
            </div>
            <p className="text-lg text-muted-foreground md:text-xl max-w-[600px] mx-auto">
              Embark on a journey across the African continent. Learn about its diverse cultures, rich history, stunning
              geography, and incredible wildlife.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quizzes">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 h-12 px-6"
                  onClick={() => play("click")}
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <AfricaFactsModal />
            </div>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center"
                  >
                    <span className="font-medium text-xs">{i === 4 ? "+5k" : ""}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold">5,000+</span> learners exploring Africa
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

