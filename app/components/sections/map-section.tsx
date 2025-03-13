"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronRight, MapPin } from "lucide-react"
import { useSound } from "@/lib/sound-utils"

export function MapSection() {
  const { play } = useSound()

  return (
    <section id="explore" className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border bg-muted px-3 py-1 text-sm font-medium mb-4">
              Interactive Exploration
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Explore Africa Region by Region</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our interactive map allows you to explore Africa's diverse regions. Click on countries to learn about
              their geography, culture, and history. Take quizzes specific to each region.
            </p>
            <div className="space-y-4 mb-8">
              {[
                "Detailed information on all 54 recognized African countries",
                "Learn about major geographical features and landmarks",
                "Discover cultural highlights and historical events of each region",
                "Track your learning progress with visual indicators",
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="mr-3 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <span className="text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
            <Button
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
              onClick={() => play("click")}
            >
              Explore the Map
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-600/20 rounded-3xl blur-xl opacity-50"></div>
            <div className="relative bg-background rounded-xl border shadow-lg overflow-hidden">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Interactive map interface"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold">Kenya</h4>
                        <p className="text-xs text-muted-foreground">East Africa</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      Home to the Maasai Mara National Reserve and Mount Kenya, the second-highest mountain in Africa.
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-xs text-muted-foreground">Tap to learn more</div>
                      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => play("click")}>
                        Take Quiz
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-background rounded-lg border shadow-lg p-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-amber-600" />
                </div>
                <div className="text-sm">
                  <span className="font-medium">12/54</span> countries explored
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

