"use server"

import { supabaseService, type DailyChallenge } from "./supabase-service"

// Server-only wrapper functions
export async function getDailyChallenge(): Promise<DailyChallenge | null> {
  return supabaseService.getDailyChallenge()
}

export async function storeDailyChallenge(challenge: DailyChallenge): Promise<DailyChallenge | null> {
  return supabaseService.storeDailyChallenge(challenge)
}

export async function submitDailyChallenge(
  userAnswer: string,
  correctAnswer: string,
  userId?: string,
): Promise<{ isCorrect: boolean }> {
  return supabaseService.submitDailyChallenge(userAnswer, correctAnswer, userId)
}

export async function subscribeToMailingList(email: string): Promise<{ success: boolean; message: string }> {
  return supabaseService.subscribeToMailingList(email)
}

export async function getUserStats(userId: string): Promise<{
  totalQuizzes: number
  completedQuizzes: number
  correctAnswers: number
  streak: number
}> {
  return supabaseService.getUserStats(userId)
}

