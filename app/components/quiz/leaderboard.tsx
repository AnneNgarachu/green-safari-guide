"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award } from "lucide-react"

type LeaderboardEntry = {
  name: string
  score: number
  category: string
  date: string
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { name: "Sarah K.", score: 95, category: "Geography", date: "2023-10-15" },
    { name: "Michael T.", score: 90, category: "Wildlife", date: "2023-10-14" },
    { name: "Amara O.", score: 85, category: "Culture", date: "2023-10-16" },
    { name: "David L.", score: 80, category: "History", date: "2023-10-13" },
    { name: "Fatima M.", score: 75, category: "Geography", date: "2023-10-12" },
    { name: "James W.", score: 70, category: "Wildlife", date: "2023-10-11" },
    { name: "Zainab A.", score: 65, category: "Culture", date: "2023-10-10" },
    { name: "Robert C.", score: 60, category: "History", date: "2023-10-09" },
  ])

  const [activeTab, setActiveTab] = useState("all")

  const filteredLeaderboard =
    activeTab === "all" ? leaderboard : leaderboard.filter((entry) => entry.category.toLowerCase() === activeTab)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-600" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
            <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="pt-4">
            <div className="space-y-2">
              {filteredLeaderboard.map((entry, index) => (
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
                    <div>
                      <div className="font-medium">{entry.name}</div>
                      <div className="text-xs text-muted-foreground">{entry.category}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold">{entry.score}%</div>
                </div>
              ))}

              {filteredLeaderboard.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No entries found for this category</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

