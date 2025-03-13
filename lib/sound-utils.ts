"use client"

// Sound utility for quiz interactions
export type SoundType = "correct" | "incorrect" | "click" | "success" | "hint" | "countdown"

// Map of sound types to their file paths
const SOUND_PATHS: Record<SoundType, string> = {
  correct: "/sounds/correct.mp3",
  incorrect: "/sounds/incorrect.mp3",
  click: "/sounds/click.mp3",
  success: "/sounds/success.mp3",
  hint: "/sounds/hint.mp3",
  countdown: "/sounds/countdown.mp3",
}

// Class to manage sound playback
class SoundManager {
  private sounds: Map<SoundType, HTMLAudioElement> = new Map()
  private muted = false

  constructor() {
    // Only initialize in browser environment
    if (typeof window !== "undefined") {
      this.initSounds()
    }
  }

  private initSounds() {
    // Preload all sounds
    Object.entries(SOUND_PATHS).forEach(([type, path]) => {
      const audio = new Audio(path)
      audio.preload = "auto"
      this.sounds.set(type as SoundType, audio)
    })
  }

  // Play a sound
  play(type: SoundType) {
    if (this.muted || typeof window === "undefined") return

    const sound = this.sounds.get(type)
    if (sound) {
      // Reset the audio to the beginning if it's already playing
      sound.currentTime = 0
      sound.play().catch((err) => {
        // Silently catch errors - often due to user not interacting with page yet
        console.debug("Sound play error (likely needs user interaction):", err)
      })
    }
  }

  // Toggle mute state
  toggleMute() {
    this.muted = !this.muted
    return this.muted
  }

  // Set mute state
  setMuted(muted: boolean) {
    this.muted = muted
    return this.muted
  }

  // Get current mute state
  isMuted() {
    return this.muted
  }
}

// Create a singleton instance
export const soundManager = new SoundManager()

// React hook for using sounds in components
export function useSound() {
  return {
    play: (type: SoundType) => soundManager.play(type),
    toggleMute: () => soundManager.toggleMute(),
    setMuted: (muted: boolean) => soundManager.setMuted(muted),
    isMuted: () => soundManager.isMuted(),
  }
}

