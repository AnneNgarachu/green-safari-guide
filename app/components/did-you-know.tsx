"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Info, RefreshCw, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const africanFacts = [
  "The Sahara Desert covers about 31% of Africa.",
  "Africa has the world's longest river, the Nile.",
  "Africa is home to the world's largest hot desert and the world's longest river.",
  "There are over 1,500 different languages spoken in Africa.",
  "The African continent has the world's largest population of wild lions.",
  "The world's largest frog species, the Goliath frog, is found in Cameroon and Equatorial Guinea.",
  "Africa is the only continent that spans both the northern and southern hemispheres while also crossing the equator.",
  "The world's largest land animal, the African elephant, can weigh up to 7 tons.",
  "Lake Malawi contains more fish species than any other lake on Earth.",
  "The oldest human remains were discovered in Ethiopia, dating back 200,000 years.",
  "Africa has the world's largest reserves of precious metals, with over 40% of global gold reserves.",
  "The fastest land animal, the cheetah, can reach speeds of up to 70 mph (113 km/h).",
  "Mount Kilimanjaro in Tanzania is the highest free-standing mountain in the world.",
  "The African continent is home to the world's largest living land animal (elephant) and the tallest living animal (giraffe).",
  "The Great Pyramids of Giza are the only remaining structures of the Seven Wonders of the Ancient World.",
]

export function DidYouKnowSection() {
  const [currentFact, setCurrentFact] = useState(africanFacts[Math.floor(Math.random() * africanFacts.length)])
  const [isAnimating, setIsAnimating] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)

  const getNewFact = () => {
    if (isAnimating) return

    setIsAnimating(true)

    // Get a new random fact different from the current one
    let newFact
    do {
      newFact = africanFacts[Math.floor(Math.random() * africanFacts.length)]
    } while (newFact === currentFact)

    setTimeout(() => {
      setCurrentFact(newFact)
      setIsAnimating(false)
    }, 300)
  }

  // Auto-rotate facts every 15 seconds if enabled
  useEffect(() => {
    let interval
    if (autoRotate) {
      interval = setInterval(() => {
        getNewFact()
      }, 15000)
    }
    return () => clearInterval(interval)
  }, [autoRotate, currentFact])

  return (
    <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-950/10">
      <div className="container">
        <div
          className="flex flex-col items-start gap-4 bg-background rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group"
          onClick={getNewFact}
        >
          {/* Animated highlight effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          {/* Pulsing indicator to show it's interactive */}
          <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="animate-pulse">Click for a new fact</span>
            <ChevronRight className="h-3 w-3" />
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-200 transition-colors">
                <Info className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold">Did You Know?</h3>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                getNewFact()
              }}
              variant="ghost"
              size="sm"
              className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
              disabled={isAnimating}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isAnimating ? "animate-spin" : ""}`} />
              New Fact
            </Button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentFact}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <p className="text-muted-foreground text-lg">{currentFact}</p>
            </motion.div>
          </AnimatePresence>

          <div className="w-full flex justify-between items-center mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground">Click anywhere to discover more facts</div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setAutoRotate(!autoRotate)
              }}
              className="text-xs"
            >
              {autoRotate ? "Pause Auto-Rotation" : "Enable Auto-Rotation"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

