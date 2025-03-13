"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { useSound } from "@/lib/sound-utils"
import Image from "next/image"

// Define the regions of Africa
type Region = "north" | "west" | "central" | "east" | "southern" | "all"

// Define region data
const regionData = {
  north: {
    name: "North Africa",
    description: "Includes countries like Egypt, Morocco, Tunisia, Algeria, and Libya.",
    color: "#F59E0B", // amber-500
    countries: ["Egypt", "Morocco", "Tunisia", "Algeria", "Libya", "Sudan", "Western Sahara"],
    facts: [
      "The Sahara Desert, the largest hot desert in the world, spans most of North Africa.",
      "Ancient Egypt, one of the world's oldest civilizations, flourished along the Nile River.",
      "The Atlas Mountains run through Morocco, Algeria, and Tunisia.",
    ],
  },
  west: {
    name: "West Africa",
    description: "Includes countries like Nigeria, Ghana, Senegal, and Côte d'Ivoire.",
    color: "#10B981", // emerald-500
    countries: [
      "Nigeria",
      "Ghana",
      "Senegal",
      "Côte d'Ivoire",
      "Mali",
      "Niger",
      "Burkina Faso",
      "Guinea",
      "Benin",
      "Togo",
      "Sierra Leone",
      "Liberia",
      "Guinea-Bissau",
      "Gambia",
      "Cape Verde",
    ],
    facts: [
      "Nigeria is Africa's most populous country with over 200 million people.",
      "The region was home to powerful empires like Ghana, Mali, and Songhai.",
      "West African music has influenced global genres like jazz, blues, and reggae.",
    ],
  },
  central: {
    name: "Central Africa",
    description: "Includes countries like DR Congo, Cameroon, and Central African Republic.",
    color: "#3B82F6", // blue-500
    countries: [
      "Democratic Republic of the Congo",
      "Cameroon",
      "Central African Republic",
      "Chad",
      "Republic of the Congo",
      "Gabon",
      "Equatorial Guinea",
      "São Tomé and Príncipe",
    ],
    facts: [
      "The Congo Basin contains the world's second-largest rainforest after the Amazon.",
      "The region is home to diverse wildlife including gorillas, chimpanzees, and forest elephants.",
      "The Congo River is the deepest river in the world, reaching depths of over 720 feet.",
    ],
  },
  east: {
    name: "East Africa",
    description: "Includes countries like Kenya, Tanzania, Ethiopia, and Uganda.",
    color: "#EC4899", // pink-500
    countries: [
      "Kenya",
      "Tanzania",
      "Ethiopia",
      "Uganda",
      "Rwanda",
      "Burundi",
      "South Sudan",
      "Somalia",
      "Djibouti",
      "Eritrea",
    ],
    facts: [
      "The Great Rift Valley runs through East Africa, creating stunning landscapes and lakes.",
      "Mount Kilimanjaro in Tanzania is Africa's highest peak.",
      "The region is known as the 'Cradle of Humanity' due to important fossil discoveries.",
    ],
  },
  southern: {
    name: "Southern Africa",
    description: "Includes countries like South Africa, Namibia, Botswana, and Zimbabwe.",
    color: "#8B5CF6", // violet-500
    countries: [
      "South Africa",
      "Namibia",
      "Botswana",
      "Zimbabwe",
      "Zambia",
      "Malawi",
      "Mozambique",
      "Angola",
      "Lesotho",
      "Eswatini",
      "Madagascar",
      "Mauritius",
      "Comoros",
      "Seychelles",
    ],
    facts: [
      "The region contains the Kalahari Desert and the Namib Desert, one of the oldest deserts in the world.",
      "Victoria Falls, located between Zambia and Zimbabwe, is one of the world's largest waterfalls.",
      "South Africa has three capital cities: Pretoria (administrative), Cape Town (legislative), and Bloemfontein (judicial).",
    ],
  },
  all: {
    name: "All Africa",
    description: "The entire African continent with 54 recognized countries.",
    color: "#6B7280", // gray-500
    countries: ["All 54 recognized countries"],
    facts: [
      "Africa is the second-largest continent, covering about 20% of the Earth's land area.",
      "The continent is home to over 1.3 billion people speaking over 2,000 different languages.",
      "Africa contains the world's longest river (the Nile) and largest hot desert (the Sahara).",
    ],
  },
}

export function AfricaMap() {
  const [selectedRegion, setSelectedRegion] = useState<Region>("all")
  const [zoomLevel, setZoomLevel] = useState(1)
  const { play } = useSound()

  const handleRegionClick = (region: Region) => {
    play("click")
    setSelectedRegion(region)
  }

  const handleZoomIn = () => {
    play("click")
    setZoomLevel(Math.min(zoomLevel + 0.2, 2))
  }

  const handleZoomOut = () => {
    play("click")
    setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))
  }

  const handleReset = () => {
    play("click")
    setSelectedRegion("all")
    setZoomLevel(1)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Map controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 bg-background/80 backdrop-blur-sm"
              onClick={handleZoomIn}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 bg-background/80 backdrop-blur-sm"
              onClick={handleZoomOut}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 bg-background/80 backdrop-blur-sm"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Map container */}
          <div
            className="relative aspect-[4/3] overflow-hidden bg-blue-50 dark:bg-blue-950/30"
            style={{
              transform: `scale(${zoomLevel})`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Base map image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Map of Africa"
                width={800}
                height={600}
                className="w-full h-auto"
              />

              {/* Interactive region overlays */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 800 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* North Africa */}
                <path
                  d="M400 150 L200 200 L300 250 L500 220 Z"
                  fill={selectedRegion === "north" ? regionData.north.color : "rgba(245, 158, 11, 0.3)"}
                  stroke={regionData.north.color}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("north")}
                />

                {/* West Africa */}
                <path
                  d="M200 250 L250 350 L350 320 L300 250 Z"
                  fill={selectedRegion === "west" ? regionData.west.color : "rgba(16, 185, 129, 0.3)"}
                  stroke={regionData.west.color}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("west")}
                />

                {/* Central Africa */}
                <path
                  d="M350 320 L450 350 L400 250 L300 250 Z"
                  fill={selectedRegion === "central" ? regionData.central.color : "rgba(59, 130, 246, 0.3)"}
                  stroke={regionData.central.color}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("central")}
                />

                {/* East Africa */}
                <path
                  d="M450 250 L550 300 L500 350 L400 250 Z"
                  fill={selectedRegion === "east" ? regionData.east.color : "rgba(236, 72, 153, 0.3)"}
                  stroke={regionData.east.color}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("east")}
                />

                {/* Southern Africa */}
                <path
                  d="M350 400 L450 450 L500 350 L400 350 Z"
                  fill={selectedRegion === "southern" ? regionData.southern.color : "rgba(139, 92, 246, 0.3)"}
                  stroke={regionData.southern.color}
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("southern")}
                />
              </svg>
            </div>
          </div>

          {/* Region information overlay */}
          <div className="p-6">
            <div className="flex items-start gap-3">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                style={{ backgroundColor: regionData[selectedRegion].color }}
              >
                <Info className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{regionData[selectedRegion].name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{regionData[selectedRegion].description}</p>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Key Facts:</h4>
                  <ul className="text-sm space-y-1">
                    {regionData[selectedRegion].facts.map((fact, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="h-4 w-4 rounded-full bg-muted flex-shrink-0 mt-1"></span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

