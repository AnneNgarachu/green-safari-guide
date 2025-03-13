"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSound } from "@/lib/sound-utils"
import Link from "next/link"

// Define the regions of Africa with their details
const regions = [
  {
    id: "north",
    name: "North Africa",
    description: "Sahara Desert, ancient civilizations, and Mediterranean coastlines",
    color: "bg-amber-500",
    countries: 7,
    landmarks: ["Pyramids of Giza", "Atlas Mountains", "Nile River"],
  },
  {
    id: "west",
    name: "West Africa",
    description: "Rich cultural heritage, historical empires, and diverse ecosystems",
    color: "bg-emerald-500",
    countries: 15,
    landmarks: ["Niger River", "Bandiagara Escarpment", "Bijagós Archipelago"],
  },
  {
    id: "central",
    name: "Central Africa",
    description: "Vast rainforests, diverse wildlife, and the Congo River Basin",
    color: "bg-blue-500",
    countries: 8,
    landmarks: ["Congo River", "Virunga Mountains", "Dzanga-Sangha Reserve"],
  },
  {
    id: "east",
    name: "East Africa",
    description: "Great Rift Valley, savannas, and the cradle of humanity",
    color: "bg-pink-500",
    countries: 10,
    landmarks: ["Mount Kilimanjaro", "Serengeti", "Lake Victoria"],
  },
  {
    id: "southern",
    name: "Southern Africa",
    description: "Diverse landscapes from deserts to coastlines and rich biodiversity",
    color: "bg-violet-500",
    countries: 14,
    landmarks: ["Victoria Falls", "Table Mountain", "Okavango Delta"],
  },
]

export function RegionSelector() {
  const { play } = useSound()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Explore by Region</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {regions.map((region) => (
          <div
            key={region.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => play("click")}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`h-8 w-8 rounded-full ${region.color}`}></div>
              <h3 className="font-bold">{region.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{region.description}</p>
            <div className="flex justify-between text-xs text-muted-foreground mb-3">
              <span>{region.countries} countries</span>
              <span>{region.landmarks.length} major landmarks</span>
            </div>
            <Link href={`/explore/${region.id}`}>
              <Button variant="outline" className="w-full" onClick={() => play("click")}>
                Explore {region.name}
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

