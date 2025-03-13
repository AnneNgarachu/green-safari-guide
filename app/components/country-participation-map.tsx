"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Users, Award, Info } from "lucide-react"
import Image from "next/image"

// Country data with ISO codes for flags and participation stats
const COUNTRIES_DATA = {
  Kenya: { code: "KE", region: "East Africa", participants: 1245, avgStreak: 8 },
  Nigeria: { code: "NG", region: "West Africa", participants: 1876, avgStreak: 7 },
  Ghana: { code: "GH", region: "West Africa", participants: 943, avgStreak: 9 },
  "South Africa": { code: "ZA", region: "Southern Africa", participants: 1532, avgStreak: 6 },
  Morocco: { code: "MA", region: "North Africa", participants: 876, avgStreak: 5 },
  Tanzania: { code: "TZ", region: "East Africa", participants: 654, avgStreak: 7 },
  Egypt: { code: "EG", region: "North Africa", participants: 1123, avgStreak: 4 },
  Uganda: { code: "UG", region: "East Africa", participants: 432, avgStreak: 6 },
  Algeria: { code: "DZ", region: "North Africa", participants: 567, avgStreak: 5 },
  Ethiopia: { code: "ET", region: "East Africa", participants: 789, avgStreak: 7 },
  Zimbabwe: { code: "ZW", region: "Southern Africa", participants: 345, avgStreak: 8 },
  Senegal: { code: "SN", region: "West Africa", participants: 456, avgStreak: 6 },
  Cameroon: { code: "CM", region: "Central Africa", participants: 321, avgStreak: 5 },
  Rwanda: { code: "RW", region: "East Africa", participants: 234, avgStreak: 9 },
  Botswana: { code: "BW", region: "Southern Africa", participants: 178, avgStreak: 7 },
}

// Group countries by region
const REGIONS = {
  "North Africa": ["Morocco", "Algeria", "Egypt", "Tunisia", "Libya"],
  "West Africa": ["Nigeria", "Ghana", "Senegal", "Côte d'Ivoire", "Mali"],
  "East Africa": ["Kenya", "Tanzania", "Uganda", "Ethiopia", "Rwanda"],
  "Central Africa": ["Cameroon", "DR Congo", "Chad", "Central African Republic", "Gabon"],
  "Southern Africa": ["South Africa", "Zimbabwe", "Botswana", "Namibia", "Mozambique"],
}

export function CountryParticipationMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  // Calculate total participants
  const totalParticipants = Object.values(COUNTRIES_DATA).reduce((sum, country) => sum + country.participants, 0)

  // Calculate region stats
  const regionStats = Object.entries(REGIONS)
    .map(([region, countries]) => {
      const regionCountries = countries.filter((country) => COUNTRIES_DATA[country])
      const participants = regionCountries.reduce(
        (sum, country) => sum + (COUNTRIES_DATA[country]?.participants || 0),
        0,
      )
      const avgStreak =
        regionCountries.length > 0
          ? regionCountries.reduce((sum, country) => sum + (COUNTRIES_DATA[country]?.avgStreak || 0), 0) /
            regionCountries.length
          : 0

      return { region, participants, avgStreak }
    })
    .sort((a, b) => b.participants - a.participants)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-amber-600" />
          Global Participation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">Total Participants</div>
            <div className="text-lg font-bold">{totalParticipants.toLocaleString()}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Countries Represented</div>
            <div className="text-lg font-bold">{Object.keys(COUNTRIES_DATA).length}</div>
          </div>
        </div>

        <div className="relative aspect-[4/3] bg-muted/30 rounded-lg overflow-hidden mb-4">
          {/* Simplified Africa map with regions */}
          <svg viewBox="0 0 800 600" className="w-full h-full">
            {/* North Africa */}
            <path
              d="M400 150 L200 200 L300 250 L500 220 Z"
              fill={selectedRegion === "North Africa" ? "rgba(245, 158, 11, 0.6)" : "rgba(245, 158, 11, 0.3)"}
              stroke="rgba(245, 158, 11, 0.8)"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setSelectedRegion(selectedRegion === "North Africa" ? null : "North Africa")}
            />

            {/* West Africa */}
            <path
              d="M200 250 L250 350 L350 320 L300 250 Z"
              fill={selectedRegion === "West Africa" ? "rgba(16, 185, 129, 0.6)" : "rgba(16, 185, 129, 0.3)"}
              stroke="rgba(16, 185, 129, 0.8)"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setSelectedRegion(selectedRegion === "West Africa" ? null : "West Africa")}
            />

            {/* Central Africa */}
            <path
              d="M350 320 L450 350 L400 250 L300 250 Z"
              fill={selectedRegion === "Central Africa" ? "rgba(59, 130, 246, 0.6)" : "rgba(59, 130, 246, 0.3)"}
              stroke="rgba(59, 130, 246, 0.8)"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setSelectedRegion(selectedRegion === "Central Africa" ? null : "Central Africa")}
            />

            {/* East Africa */}
            <path
              d="M450 250 L550 300 L500 350 L400 250 Z"
              fill={selectedRegion === "East Africa" ? "rgba(236, 72, 153, 0.6)" : "rgba(236, 72, 153, 0.3)"}
              stroke="rgba(236, 72, 153, 0.8)"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setSelectedRegion(selectedRegion === "East Africa" ? null : "East Africa")}
            />

            {/* Southern Africa */}
            <path
              d="M350 400 L450 450 L500 350 L400 350 Z"
              fill={selectedRegion === "Southern Africa" ? "rgba(139, 92, 246, 0.6)" : "rgba(139, 92, 246, 0.3)"}
              stroke="rgba(139, 92, 246, 0.8)"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setSelectedRegion(selectedRegion === "Southern Africa" ? null : "Southern Africa")}
            />
          </svg>

          {/* Overlay with instructions */}
          {!selectedRegion && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              <div className="bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg p-3 text-center">
                <p className="text-sm">Click on a region to see participation details</p>
              </div>
            </div>
          )}
        </div>

        {selectedRegion ? (
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">{selectedRegion}</h3>
              <div className="text-xs text-muted-foreground">Click map to change region</div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-background rounded-lg p-3 text-center">
                <div className="text-xs text-muted-foreground">Participants</div>
                <div className="text-xl font-bold">
                  {regionStats.find((r) => r.region === selectedRegion)?.participants.toLocaleString() || 0}
                </div>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <div className="text-xs text-muted-foreground">Avg. Streak</div>
                <div className="text-xl font-bold">
                  {regionStats.find((r) => r.region === selectedRegion)?.avgStreak.toFixed(1) || 0}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium mb-1">Top Countries:</div>
              {REGIONS[selectedRegion as keyof typeof REGIONS]
                .filter((country) => COUNTRIES_DATA[country])
                .sort((a, b) => (COUNTRIES_DATA[b]?.participants || 0) - (COUNTRIES_DATA[a]?.participants || 0))
                .slice(0, 3)
                .map((country, index) => (
                  <div key={index} className="flex items-center justify-between bg-background rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <div className="relative h-5 w-7 overflow-hidden rounded-sm border border-gray-200 shadow-sm flex-shrink-0">
                        {COUNTRIES_DATA[country] && (
                          <Image
                            src={`https://flagcdn.com/w80/${COUNTRIES_DATA[country].code.toLowerCase()}.png`}
                            alt={country}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <span className="text-sm">{country}</span>
                    </div>
                    <div className="text-sm font-medium">
                      {COUNTRIES_DATA[country]?.participants.toLocaleString() || 0}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-sm font-medium mb-1">Participation by Region:</div>
            {regionStats.map((region, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted/30 rounded-lg p-2 cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedRegion(region.region)}
              >
                <span className="text-sm">{region.region}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs">{region.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-xs">{region.avgStreak.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
          <Info className="h-3 w-3" />
          <span>Data updated daily</span>
        </div>
      </CardContent>
    </Card>
  )
}

