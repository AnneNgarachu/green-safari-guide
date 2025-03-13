"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MapPin, Globe2, Landmark, Users, BookOpen } from "lucide-react"
import { useSound } from "@/lib/sound-utils"
import Image from "next/image"
import Link from "next/link"

// Define region data
const regionData = {
  north: {
    name: "North Africa",
    description:
      "North Africa is characterized by its Mediterranean coastline, the Sahara Desert, and ancient civilizations. The region has a rich history of trade, conquest, and cultural exchange.",
    color: "#F59E0B", // amber-500
    countries: [
      { name: "Egypt", capital: "Cairo", population: "104 million", landmark: "Pyramids of Giza" },
      { name: "Morocco", capital: "Rabat", population: "37 million", landmark: "Medina of Fez" },
      { name: "Algeria", capital: "Algiers", population: "44 million", landmark: "Casbah of Algiers" },
      { name: "Tunisia", capital: "Tunis", population: "12 million", landmark: "Carthage Ruins" },
      { name: "Libya", capital: "Tripoli", population: "7 million", landmark: "Leptis Magna" },
      { name: "Sudan", capital: "Khartoum", population: "44 million", landmark: "Pyramids of Meroë" },
    ],
    landmarks: [
      { name: "Pyramids of Giza", location: "Egypt", description: "Ancient Egyptian tombs built over 4,500 years ago" },
      {
        name: "Atlas Mountains",
        location: "Morocco/Algeria/Tunisia",
        description: "Mountain range stretching across northwestern Africa",
      },
      {
        name: "Nile River",
        location: "Egypt/Sudan",
        description: "World's longest river, flowing northward through eastern Africa",
      },
      {
        name: "Sahara Desert",
        location: "Spans across North Africa",
        description: "World's largest hot desert covering over 9 million square kilometers",
      },
      {
        name: "Medina of Marrakech",
        location: "Morocco",
        description: "Historic city center with markets, palaces, and gardens",
      },
    ],
    facts: [
      "The Sahara Desert is expanding southward at a rate of up to 30 miles per year in some places.",
      "Ancient Egypt was one of the world's first great civilizations, with a unified kingdom established around 3150 BCE.",
      "The Great Library of Alexandria in Egypt was one of the largest and most significant libraries of the ancient world.",
      "The Berber people are the indigenous inhabitants of North Africa, with a history dating back thousands of years.",
    ],
  },
  west: {
    name: "West Africa",
    description:
      "West Africa is known for its cultural diversity, historical trading empires, and vibrant music and art traditions. The region spans from the Sahel to the Atlantic coast.",
    color: "#10B981", // emerald-500
    countries: [
      { name: "Nigeria", capital: "Abuja", population: "211 million", landmark: "Zuma Rock" },
      { name: "Ghana", capital: "Accra", population: "31 million", landmark: "Cape Coast Castle" },
      { name: "Senegal", capital: "Dakar", population: "17 million", landmark: "Gorée Island" },
      {
        name: "Côte d'Ivoire",
        capital: "Yamoussoukro",
        population: "27 million",
        landmark: "Basilica of Our Lady of Peace",
      },
      { name: "Mali", capital: "Bamako", population: "20 million", landmark: "Great Mosque of Djenné" },
      { name: "Benin", capital: "Porto-Novo", population: "12 million", landmark: "Royal Palaces of Abomey" },
    ],
    landmarks: [
      {
        name: "Great Mosque of Djenné",
        location: "Mali",
        description: "World's largest mud-brick building, a UNESCO World Heritage site",
      },
      { name: "Gorée Island", location: "Senegal", description: "Historic site of the Atlantic slave trade" },
      {
        name: "Niger River",
        location: "Guinea/Mali/Niger/Nigeria",
        description: "West Africa's main river and an important transportation route",
      },
      {
        name: "Bandiagara Escarpment",
        location: "Mali",
        description: "Sandstone cliff with ancient Dogon villages built into the rock face",
      },
      {
        name: "Cape Coast Castle",
        location: "Ghana",
        description: "Historic fortress that played a significant role in the slave trade",
      },
    ],
    facts: [
      "The Mali Empire, which flourished from the 13th to 16th century, was one of the wealthiest empires in world history.",
      "Nigeria is Africa's most populous country and has the continent's largest economy.",
      "West African music has influenced global genres including jazz, blues, reggae, and hip-hop.",
      "The region was home to several powerful pre-colonial states and empires, including Ghana, Mali, Songhai, and Benin.",
    ],
  },
  central: {
    name: "Central Africa",
    description:
      "Central Africa is dominated by the Congo Basin rainforest, the second-largest tropical forest in the world. The region is known for its incredible biodiversity and cultural diversity.",
    color: "#3B82F6", // blue-500
    countries: [
      {
        name: "Democratic Republic of Congo",
        capital: "Kinshasa",
        population: "92 million",
        landmark: "Virunga National Park",
      },
      { name: "Cameroon", capital: "Yaoundé", population: "27 million", landmark: "Mount Cameroon" },
      {
        name: "Central African Republic",
        capital: "Bangui",
        population: "5 million",
        landmark: "Dzanga-Sangha Reserve",
      },
      { name: "Gabon", capital: "Libreville", population: "2.2 million", landmark: "Lopé National Park" },
      {
        name: "Republic of Congo",
        capital: "Brazzaville",
        population: "5.5 million",
        landmark: "Nouabalé-Ndoki National Park",
      },
      { name: "Chad", capital: "N'Djamena", population: "16 million", landmark: "Lakes of Ounianga" },
    ],
    landmarks: [
      {
        name: "Congo River",
        location: "DRC/Republic of Congo",
        description: "Second largest river in Africa by volume, with the deepest recorded river point",
      },
      {
        name: "Virunga National Park",
        location: "DRC",
        description: "Africa's oldest national park and home to endangered mountain gorillas",
      },
      {
        name: "Dzanga-Sangha Reserve",
        location: "Central African Republic",
        description: "Protected area known for forest elephants and western lowland gorillas",
      },
      {
        name: "Mount Cameroon",
        location: "Cameroon",
        description: "Active volcano and the highest point in West Africa",
      },
      {
        name: "Lopé National Park",
        location: "Gabon",
        description: "UNESCO World Heritage site with diverse ecosystems and ancient rock art",
      },
    ],
    facts: [
      "The Congo Basin rainforest is home to over 10,000 species of tropical plants, 1,000 bird species, and 400 mammal species.",
      "The Congo River is the deepest river in the world, with depths exceeding 220 meters in some places.",
      "Central Africa is home to the world's largest population of great apes, including gorillas, chimpanzees, and bonobos.",
      "The Pygmy peoples of Central Africa are among the oldest inhabitants of the region, with a unique hunter-gatherer lifestyle.",
    ],
  },
  east: {
    name: "East Africa",
    description:
      "East Africa is known for its stunning landscapes, including the Great Rift Valley, savannas, and mountains. It's often called the 'Cradle of Humanity' due to important fossil discoveries.",
    color: "#EC4899", // pink-500
    countries: [
      { name: "Kenya", capital: "Nairobi", population: "54 million", landmark: "Maasai Mara" },
      { name: "Tanzania", capital: "Dodoma", population: "61 million", landmark: "Mount Kilimanjaro" },
      {
        name: "Ethiopia",
        capital: "Addis Ababa",
        population: "118 million",
        landmark: "Rock-Hewn Churches of Lalibela",
      },
      { name: "Uganda", capital: "Kampala", population: "46 million", landmark: "Bwindi Impenetrable Forest" },
      { name: "Rwanda", capital: "Kigali", population: "13 million", landmark: "Volcanoes National Park" },
      { name: "Somalia", capital: "Mogadishu", population: "16 million", landmark: "Laas Geel Cave Paintings" },
    ],
    landmarks: [
      {
        name: "Mount Kilimanjaro",
        location: "Tanzania",
        description: "Africa's highest mountain and the world's tallest free-standing mountain",
      },
      {
        name: "Serengeti",
        location: "Tanzania",
        description: "Famous for its annual migration of over 1.5 million wildebeest and 250,000 zebra",
      },
      {
        name: "Great Rift Valley",
        location: "Spans across East Africa",
        description: "Vast geographical feature visible from space, with lakes, volcanoes, and diverse ecosystems",
      },
      {
        name: "Lake Victoria",
        location: "Tanzania/Uganda/Kenya",
        description: "Africa's largest lake by area and the world's largest tropical lake",
      },
      {
        name: "Olduvai Gorge",
        location: "Tanzania",
        description: "Archaeological site where some of the earliest evidence of human evolution was discovered",
      },
    ],
    facts: [
      "East Africa is where some of the oldest human fossils have been found, including 'Lucy' (Australopithecus afarensis) in Ethiopia.",
      "The Great Migration in the Serengeti-Mara ecosystem is one of the world's most spectacular wildlife events.",
      "Ethiopia is the only African country that was never formally colonized, maintaining its independence throughout the colonial era.",
      "The region is home to the source of the Nile River, the world's longest river.",
    ],
  },
  southern: {
    name: "Southern Africa",
    description:
      "Southern Africa features diverse landscapes from deserts to savannas and coastlines. The region is known for its mineral wealth, wildlife conservation efforts, and cultural diversity.",
    color: "#8B5CF6", // violet-500
    countries: [
      {
        name: "South Africa",
        capital: "Pretoria/Cape Town/Bloemfontein",
        population: "60 million",
        landmark: "Table Mountain",
      },
      { name: "Namibia", capital: "Windhoek", population: "2.5 million", landmark: "Namib Desert" },
      { name: "Botswana", capital: "Gaborone", population: "2.4 million", landmark: "Okavango Delta" },
      { name: "Zimbabwe", capital: "Harare", population: "15 million", landmark: "Victoria Falls" },
      { name: "Mozambique", capital: "Maputo", population: "31 million", landmark: "Bazaruto Archipelago" },
      { name: "Zambia", capital: "Lusaka", population: "19 million", landmark: "Victoria Falls" },
    ],
    landmarks: [
      {
        name: "Victoria Falls",
        location: "Zimbabwe/Zambia",
        description: "One of the world's largest waterfalls, known locally as 'The Smoke That Thunders'",
      },
      {
        name: "Table Mountain",
        location: "South Africa",
        description: "Flat-topped mountain overlooking Cape Town, with unique biodiversity",
      },
      {
        name: "Okavango Delta",
        location: "Botswana",
        description: "Vast inland delta where the Okavango River empties into the Kalahari Desert",
      },
      {
        name: "Namib Desert",
        location: "Namibia",
        description: "Coastal desert with some of the world's tallest sand dunes",
      },
      {
        name: "Kruger National Park",
        location: "South Africa",
        description: "One of Africa's largest game reserves, home to the 'Big Five'",
      },
    ],
    facts: [
      "South Africa has three capital cities: Pretoria (administrative), Cape Town (legislative), and Bloemfontein (judicial).",
      "The Namib Desert is considered the oldest desert in the world, having existed for at least 55 million years.",
      "The region contains vast mineral resources, including diamonds, gold, platinum, and uranium.",
      "The San people of Southern Africa are among the world's oldest cultures, with a history dating back over 20,000 years.",
    ],
  },
}

export function RegionDetail({ region }: { region: string }) {
  const { play } = useSound()
  const regionInfo = regionData[region as keyof typeof regionData]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="mb-8">
          <CardContent className="p-0">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt={`Map of ${regionInfo.name}`}
                width={800}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 opacity-50" style={{ backgroundColor: regionInfo.color }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">{regionInfo.name}</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">{regionInfo.description}</p>

              <h3 className="text-lg font-bold mb-2">Key Facts</h3>
              <ul className="space-y-2 mb-6">
                {regionInfo.facts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div
                      className="h-5 w-5 rounded-full flex-shrink-0 mt-1 flex items-center justify-center"
                      style={{ backgroundColor: regionInfo.color }}
                    >
                      <span className="text-white text-xs">•</span>
                    </div>
                    <span className="text-sm">{fact}</span>
                  </li>
                ))}
              </ul>

              <Link href="/quizzes">
                <Button
                  className="w-full"
                  style={{
                    background: regionInfo.color,
                    color: "white",
                  }}
                  onClick={() => play("click")}
                >
                  Test Your Knowledge About {regionInfo.name}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="countries" onValueChange={() => play("click")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="countries" className="flex items-center gap-2">
              <Globe2 className="h-4 w-4" />
              Countries
            </TabsTrigger>
            <TabsTrigger value="landmarks" className="flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              Landmarks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="countries" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regionInfo.countries.map((country, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                          style={{ backgroundColor: regionInfo.color }}
                        >
                          <Globe2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold">{country.name}</h4>
                          <div className="text-sm text-muted-foreground">
                            <p>Capital: {country.capital}</p>
                            <p>Population: {country.population}</p>
                            <p>Notable Landmark: {country.landmark}</p>
                          </div>
                        </div>
                      </div>

                      {/* Add country map */}
                      {country.name === "Kenya" && (
                        <div className="relative aspect-[4/3] w-full bg-muted rounded-lg overflow-hidden group">
                          <svg
                            viewBox="0 0 800 600"
                            className="w-full h-full"
                            style={{
                              fill: regionInfo.color,
                              fillOpacity: 0.2,
                              stroke: regionInfo.color,
                              strokeWidth: 2,
                            }}
                          >
                            {/* Simplified map of Kenya */}
                            <path d="M400,100 L500,150 L550,250 L500,350 L450,400 L350,450 L300,400 L250,300 L300,200 L350,150 Z">
                              <title>Kenya</title>
                            </path>
                            {/* Major cities */}
                            <circle cx="400" cy="250" r="5" fill={regionInfo.color} className="animate-pulse">
                              <title>Nairobi</title>
                            </circle>
                            <circle cx="450" cy="350" r="4" fill={regionInfo.color}>
                              <title>Mombasa</title>
                            </circle>
                            <circle cx="350" cy="200" r="4" fill={regionInfo.color}>
                              <title>Kisumu</title>
                            </circle>
                          </svg>
                          {/* Overlay with information */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white p-4">
                            <div className="text-center">
                              <h5 className="font-bold mb-2">Key Features:</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Mount Kenya</li>
                                <li>• Great Rift Valley</li>
                                <li>• Lake Victoria</li>
                                <li>• Maasai Mara</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="landmarks" className="mt-6">
            <div className="space-y-4">
              {regionInfo.landmarks.map((landmark, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                          style={{ backgroundColor: regionInfo.color }}
                        >
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold">{landmark.name}</h4>
                          <p className="text-sm text-muted-foreground">Location: {landmark.location}</p>
                          <p className="text-sm">{landmark.description}</p>
                        </div>
                      </div>

                      {/* Add mini map preview */}
                      <div className="relative aspect-[16/9] w-full bg-muted rounded-lg overflow-hidden group">
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{ backgroundColor: regionInfo.color }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <MapPin className="h-8 w-8" style={{ color: regionInfo.color }} />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <p className="text-sm font-medium">Click to view on map</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="lg:col-span-1">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              People & Culture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="aspect-video relative rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt={`Cultural image from ${regionInfo.name}`}
                  width={400}
                  height={200}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {regionInfo.name} is home to diverse ethnic groups with rich cultural traditions, including music,
                dance, art, and cuisine that reflect the region's history and environment.
              </p>
              <Button variant="outline" className="w-full" onClick={() => play("click")}>
                Learn More About the Culture
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Related Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                <h4 className="font-medium">{regionInfo.name} Geography Quiz</h4>
                <p className="text-xs text-muted-foreground">10 questions • Intermediate</p>
              </div>
              <div className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                <h4 className="font-medium">{regionInfo.name} History & Heritage</h4>
                <p className="text-xs text-muted-foreground">8 questions • Beginner</p>
              </div>
              <div className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                <h4 className="font-medium">Famous Landmarks of {regionInfo.name}</h4>
                <p className="text-xs text-muted-foreground">12 questions • Advanced</p>
              </div>
              <Link href="/quizzes">
                <Button className="w-full mt-2" onClick={() => play("click")}>
                  View All Quizzes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

