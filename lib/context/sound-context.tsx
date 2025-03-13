"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { soundManager } from "@/lib/sound-utils"

type SoundContextType = {
  isMuted: boolean
  toggleMute: () => void
  setMuted: (muted: boolean) => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)

  // Initialize from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMuted = localStorage.getItem("sound-muted")
      if (savedMuted !== null) {
        const muted = savedMuted === "true"
        setIsMuted(muted)
        soundManager.setMuted(muted)
      }
    }
  }, [])

  const toggleMute = () => {
    const newMuted = soundManager.toggleMute()
    setIsMuted(newMuted)
    if (typeof window !== "undefined") {
      localStorage.setItem("sound-muted", String(newMuted))
    }
  }

  const setMuted = (muted: boolean) => {
    soundManager.setMuted(muted)
    setIsMuted(muted)
    if (typeof window !== "undefined") {
      localStorage.setItem("sound-muted", String(muted))
    }
  }

  return <SoundContext.Provider value={{ isMuted, toggleMute, setMuted }}>{children}</SoundContext.Provider>
}

export function useSound() {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider")
  }
  return context
}

