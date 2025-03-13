"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, ArrowUp, ArrowDown, Flame, Users } from "lucide-react"
import { useSound } from "@/lib/sound-utils"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// League tiers from lowest to highest
const LEAGUES = [
  { name: "Bronze", color: "bg-amber-700", textColor: "text-amber-700" },
  { name: "Silver", color: "bg-gray-400", textColor: "text-gray-400" },
  { name: "Gold", color: "bg-amber-400", textColor: "text-amber-400" },
  { name: "Sapphire", color: "bg-blue-500", textColor: "text-blue-500" },
  { name: "Ruby", color: "bg-red-500", textColor: "text-red-500" },
  { name: "Emerald", color: "bg-emerald-500", textColor: "text-emerald-500" },
  { name: "Diamond", color: "bg-indigo-400", textColor: "text-indigo-400" },
]

// Country data with ISO codes for flags
const COUNTRIES = {
  Kenya: { code: "KE", region: "East Africa" },
  Nigeria: { code: "NG", region: "West Africa" },
  Ghana: { code: "GH", region: "West Africa" },
  "South Africa": { code: "ZA", region: "Southern Africa" },
  Morocco: { code: "MA", region: "North Africa" },
  Tanzania: { code: "TZ", region: "East Africa" },
  Egypt: { code: "EG", region: "North Africa" },
  Uganda: { code: "UG", region: "East Africa" },
  Algeria: { code: "DZ", region: "North Africa" },
  Ethiopia: { code: "ET", region: "East Africa" },
  Zimbabwe: { code: "ZW", region: "Southern Africa" },
  Senegal: { code: "SN", region: "West Africa" },
  Cameroon: { code: "CM", region: "Central Africa" },
  Rwanda: { code: "RW", region: "East Africa" },
  Botswana: { code: "BW", region: "Southern Africa" },
}

type LeaderboardEntry = {
  name: string
  streak: number
  xp: number
  country: string
  change: "up" | "down" | "same"
}

type WeeklyLeaderboardProps = {
  isLoggedIn?: boolean
  currentLeague?: number
  userRank?: number
}

export function WeeklyLeaderboard({ isLoggedIn = false, currentLeague = 0, userRank = 5 }: WeeklyLeaderboardProps) {
  const { play } = useSound()
  const league = LEAGUES[currentLeague]
  const [activeTab, setActiveTab] = useState("individual")

  // Mock leaderboard data
  const [leaderboard] = useState<LeaderboardEntry[]>([
    { name: "Sarah K.", streak: 42, xp: 385, country: "Kenya", change: "up" },
    { name: "Michael T.", streak: 36, xp: 320, country: "Nigeria", change: "same" },
    { name: "Amara O.", streak: 29, xp: 290, country: "Ghana", change: "up" },
    { name: "David L.", streak: 25, xp: 245, country: "South Africa", change: "down" },
    { name: "Fatima M.", streak: 21, xp: 210, country: "Morocco", change: "up" },
    { name: "James W.", streak: 18, xp: 180, country: "Tanzania", change: "down" },
    { name: "Zainab A.", streak: 15, xp: 150, country: "Egypt", change: "same" },
    { name: "Robert C.", streak: 14, xp: 140, country: "Uganda", change: "up" },
    { name: "Chioma N.", streak: 12, xp: 120, country: "Nigeria", change: "down" },
    { name: "Hassan M.", streak: 10, xp: 100, country: "Algeria", change: "same" },
  ])

  // Calculate country leaderboard
  const countryLeaderboard = Object.entries(
    leaderboard.reduce(
      (acc, entry) => {
        if (!acc[entry.country]) {
          acc[entry.country] = { totalXP: 0, participants: 0 }
        }
        acc[entry.country].totalXP += entry.xp
        acc[entry.country].participants += 1
        return acc
      },
      {} as Record<string, { totalXP: number; participants: number }>,
    ),
  )
    .map(([country, data]) => ({
      country,
      totalXP: data.totalXP,
      participants: data.participants,
      avgXP: Math.round(data.totalXP / data.participants),
    }))
    .sort((a, b) => b.totalXP - a.totalXP)

  // Days until the league ends
  const daysLeft = 3

  // Top 3 users advance to next league, bottom 3 are demoted
  const isPromoting = userRank <= 3
  const isDemoting = userRank >= 8

  if (!isLoggedIn) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-amber-500" />
            Weekly Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
              <Users className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="font-bold mb-2">Join the Competition!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sign up to compete with other learners in weekly leagues and win rewards!
            </p>
            <Link href="/signup">
              <Button
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                onClick={() => play("click")}
              >
                Sign Up to Compete
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-amber-500" />
            {league.name} League
          </CardTitle>
          <div className="text-xs text-muted-foreground">
            {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-6 py-3 bg-muted/50 border-y flex justify-between items-center">
          <div className="text-sm font-medium">
            Your rank: {userRank}/{leaderboard.length}
          </div>
          <div className="flex items-center gap-1.5">
            {isPromoting ? (
              <div className="flex items-center text-xs text-green-600 font-medium">
                <ArrowUp className="h-3.5 w-3.5 mr-0.5" />
                Promoting
              </div>
            ) : isDemoting ? (
              <div className="flex items-center text-xs text-red-600 font-medium">
                <ArrowDown className="h-3.5 w-3.5 mr-0.5" />
                Demoting
              </div>
            ) : (
              <div className="text-xs text-muted-foreground font-medium">Staying in {league.name}</div>
            )}
          </div>
        </div>

        <Tabs
          defaultValue="individual"
          onValueChange={(value) => {
            setActiveTab(value)
            play("click")
          }}
        >
          <div className="px-6 pt-3">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="individual" className="text-xs">
                Individual
              </TabsTrigger>
              <TabsTrigger value="countries" className="text-xs">
                Countries
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="individual" className="px-6 py-3">
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    index + 1 === userRank ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-7 text-center">
                      {index === 0 ? (
                        <Trophy className={`h-5 w-5 mx-auto ${league.textColor}`} />
                      ) : index === 1 ? (
                        <Medal className={`h-5 w-5 mx-auto ${league.textColor}`} />
                      ) : index === 2 ? (
                        <Award className={`h-5 w-5 mx-auto ${league.textColor}`} />
                      ) : (
                        <span className="text-sm text-muted-foreground">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Country flag */}
                      <div className="relative h-5 w-7 overflow-hidden rounded-sm border border-gray-200 shadow-sm flex-shrink-0">
                        {COUNTRIES[entry.country] && (
                          <Image
                            src={`https://flagcdn.com/w80/${COUNTRIES[entry.country].code.toLowerCase()}.png`}
                            alt={entry.country}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm flex items-center">
                          {entry.name}
                          {entry.change === "up" && <ArrowUp className="h-3 w-3 text-green-500 ml-1" />}
                          {entry.change === "down" && <ArrowDown className="h-3 w-3 text-red-500 ml-1" />}
                        </div>
                        <div className="text-xs text-muted-foreground">{entry.country}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs">{entry.streak}</span>
                    </div>
                    <div className="text-sm font-bold">{entry.xp} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="countries" className="px-6 py-3">
            <div className="space-y-2">
              {countryLeaderboard.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-7 text-center">
                      {index === 0 ? (
                        <Trophy className={`h-5 w-5 mx-auto ${league.textColor}`} />
                      ) : index === 1 ? (
                        <Medal className={`h-5 w-5 mx-auto ${league.textColor}`} />
                      ) : index === 2 ? (
                        <Award className={`h-5 w-5 mx-auto ${league.textColor}`} />
                      ) : (
                        <span className="text-sm text-muted-foreground">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Country flag */}
                      <div className="relative h-5 w-7 overflow-hidden rounded-sm border border-gray-200 shadow-sm flex-shrink-0">
                        {COUNTRIES[entry.country] && (
                          <Image
                            src={`https://flagcdn.com/w80/${COUNTRIES[entry.country].code.toLowerCase()}.png`}
                            alt={entry.country}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{entry.country}</div>
                        <div className="text-xs text-muted-foreground">{entry.participants} participants</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-bold">{entry.totalXP} XP</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t">
          <Button
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            onClick={() => play("click")}
          >
            Take Daily Challenge
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

