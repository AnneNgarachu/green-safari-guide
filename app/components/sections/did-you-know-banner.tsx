"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSound } from "@/lib/sound-utils"

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
]

export function DidYouKnowBanner() {
  const [currentFact, setCurrentFact] = useState(africanFacts[Math.floor(Math.random() * africanFacts.length)])
  const [isAnimating, setIsAnimating] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const { play } = useSound()

  const getNewFact = () => {
    if (isAnimating) return

    setIsAnimating(true)
    play("click")

    let newFact
    do {
      newFact = africanFacts[Math.floor(Math.random() * africanFacts.length)]
    } while (newFact === currentFact)

    setTimeout(() => {
      setCurrentFact(newFact)
      setIsAnimating(false)
    }, 300)
  }

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
    <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-900/10">
      <div className="container">
        <div
          onClick={getNewFact}
          className="group cursor-pointer bg-background/80 backdrop-blur-sm rounded-xl border p-6 hover:shadow-md transition-all relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="animate-pulse">Click anywhere for a new fact</span>
            <RefreshCw className="h-3 w-3" />
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-200 transition-colors">
              <Info className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Did You Know?</h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFact}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-lg text-muted-foreground">{currentFact}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setAutoRotate(!autoRotate)
              }}
              className="flex-shrink-0"
            >
              {autoRotate ? "Pause Auto-Rotation" : "Enable Auto-Rotation"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

