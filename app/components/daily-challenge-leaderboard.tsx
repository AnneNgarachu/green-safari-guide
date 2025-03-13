"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, Flame } from "lucide-react"
import { useSound } from "@/lib/sound-utils"
import Image from "next/image"

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
  country: string
  lastActive: string
}

export function DailyChallengeLeaderboard() {
  const { play } = useSound()
  const [activeTab, setActiveTab] = useState("all-time")

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { name: "Sarah K.", streak: 42, country: "Kenya", lastActive: "Today" },
    { name: "Michael T.", streak: 36, country: "Nigeria", lastActive: "Today" },
    { name: "Amara O.", streak: 29, country: "Ghana", lastActive: "Today" },
    { name: "David L.", streak: 25, country: "South Africa", lastActive: "Today" },
    { name: "Fatima M.", streak: 21, country: "Morocco", lastActive: "Today" },
    { name: "James W.", streak: 18, country: "Tanzania", lastActive: "Today" },
    { name: "Zainab A.", streak: 15, country: "Egypt", lastActive: "Yesterday" },
    { name: "Robert C.", streak: 14, country: "Uganda", lastActive: "Today" },
    { name: "Chioma N.", streak: 12, country: "Nigeria", lastActive: "Today" },
    { name: "Hassan M.", streak: 10, country: "Algeria", lastActive: "Yesterday" },
  ])

  // Calculate country stats
  const countryStats = Object.entries(
    leaderboard.reduce(
      (acc, entry) => {
        if (!acc[entry.country]) {
          acc[entry.country] = { totalStreak: 0, participants: 0 }
        }
        acc[entry.country].totalStreak += entry.streak
        acc[entry.country].participants += 1
        return acc
      },
      {} as Record<string, { totalStreak: number; participants: number }>,
    ),
  )
    .map(([country, data]) => ({
      country,
      totalStreak: data.totalStreak,
      participants: data.participants,
      avgStreak: Math.round(data.totalStreak / data.participants),
    }))
    .sort((a, b) => b.avgStreak - a.avgStreak)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-amber-600" />
          Daily Challenge Streaks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="all-time"
          onValueChange={(value) => {
            setActiveTab(value)
            play("click")
          }}
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all-time">All Time</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="countries">By Country</TabsTrigger>
          </TabsList>

          <TabsContent value="all-time" className="space-y-2">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  index < 3 ? "bg-amber-50 dark:bg-amber-900/20" : "bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 text-center">
                    {index === 0 ? (
                      <Trophy className="h-5 w-5 text-amber-600 mx-auto" />
                    ) : index === 1 ? (
                      <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                    ) : index === 2 ? (
                      <Award className="h-5 w-5 text-amber-800 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">{index + 1}</span>
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
                      <div className="font-medium">{entry.name}</div>
                      <div className="text-xs text-muted-foreground">{entry.country}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-lg font-bold flex items-center">
                    <Flame className="h-4 w-4 text-amber-600 mr-1" />
                    {entry.streak}
                  </div>
                  <div className="text-xs text-muted-foreground">{entry.lastActive}</div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="monthly" className="space-y-2">
            {/* Monthly leaderboard - for simplicity, using the same data but filtered */}
            {leaderboard
              .filter((entry) => entry.lastActive === "Today")
              .map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    index < 3 ? "bg-amber-50 dark:bg-amber-900/20" : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 text-center">
                      {index === 0 ? (
                        <Trophy className="h-5 w-5 text-amber-600 mx-auto" />
                      ) : index === 1 ? (
                        <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                      ) : index === 2 ? (
                        <Award className="h-5 w-5 text-amber-800 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">{index + 1}</span>
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
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-xs text-muted-foreground">{entry.country}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-lg font-bold flex items-center">
                      <Flame className="h-4 w-4 text-amber-600 mr-1" />
                      {entry.streak}
                    </div>
                    <div className="text-xs text-muted-foreground">{entry.lastActive}</div>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="countries" className="space-y-2">
            {countryStats.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  index < 3 ? "bg-amber-50 dark:bg-amber-900/20" : "bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 text-center">
                    {index === 0 ? (
                      <Trophy className="h-5 w-5 text-amber-600 mx-auto" />
                    ) : index === 1 ? (
                      <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                    ) : index === 2 ? (
                      <Award className="h-5 w-5 text-amber-800 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Country flag */}
                    <div className="relative h-6 w-9 overflow-hidden rounded-sm border border-gray-200 shadow-sm flex-shrink-0">
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
                      <div className="font-medium">{entry.country}</div>
                      <div className="text-xs text-muted-foreground">{entry.participants} participants</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-lg font-bold flex items-center">
                    <Flame className="h-4 w-4 text-amber-600 mr-1" />
                    {entry.avgStreak}
                  </div>
                  <div className="text-xs text-muted-foreground">Avg. streak</div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

