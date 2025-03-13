"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Globe2, Users, Leaf, Clock } from "lucide-react"
import Image from "next/image"
import { useSound } from "@/lib/sound-utils"

export function AfricaFactsModal() {
  const [open, setOpen] = useState(false)
  const { play } = useSound()

  const facts = {
    geography: [
      {
        title: "The Sahara Desert",
        description:
          "The Sahara is the largest hot desert in the world, covering over 9.2 million square kilometers across North Africa.",
        image: "https://images.unsplash.com/photo-1509042239860-f0ca3bf6d889?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Mount Kilimanjaro",
        description:
          "Africa's highest peak at 5,895 meters, located in Tanzania, is the highest free-standing mountain in the world.",
        image: "https://images.unsplash.com/photo-1621414050345-4d6745899a37?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "The Great Rift Valley",
        description:
          "This geological wonder stretches 6,000 km from Lebanon to Mozambique, with lakes, mountains, and diverse ecosystems.",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600&auto=format&fit=crop",
      },
    ],
    culture: [
      {
        title: "Linguistic Diversity",
        description: "Africa has over 2,000 distinct languages, representing nearly a third of the world's languages.",
        image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Ancient Civilizations",
        description:
          "Africa is home to some of the world's oldest civilizations, including Ancient Egypt, Nubia, and the Kingdom of Kush.",
        image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Traditional Music",
        description:
          "African music is incredibly diverse, with instruments like the djembe drum, kora, and mbira being central to cultural expression.",
        image: "https://images.unsplash.com/photo-1516685125522-3c528b8046ee?q=80&w=600&auto=format&fit=crop",
      },
    ],
    wildlife: [
      {
        title: "The Big Five",
        description:
          "Africa is home to the 'Big Five': lion, leopard, rhinoceros, elephant, and Cape buffalo, named for being the most difficult animals to hunt on foot.",
        image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Biodiversity Hotspots",
        description:
          "Africa contains several biodiversity hotspots with thousands of endemic plant and animal species found nowhere else on Earth.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Great Migration",
        description:
          "The annual wildebeest migration between Tanzania and Kenya is one of the most spectacular wildlife events on the planet.",
        image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?q=80&w=600&auto=format&fit=crop",
      },
    ],
    history: [
      {
        title: "Cradle of Humanity",
        description:
          "The oldest human fossils have been found in Africa, with evidence suggesting that modern humans originated in East Africa around 200,000 years ago.",
        image: "https://images.unsplash.com/photo-1627483262769-04d0a1401487?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Ancient Kingdoms",
        description:
          "Africa had powerful kingdoms like Mali, Ghana, Songhai, and Great Zimbabwe that were centers of trade, learning, and culture.",
        image: "https://images.unsplash.com/photo-1590845947676-fa9300b4c1fb?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Independence Movements",
        description:
          "The 1950s-1970s saw most African nations gain independence from European colonial powers, reshaping the continent's political landscape.",
        image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=600&auto=format&fit=crop",
      },
    ],
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen) {
      play("click")
    }
  }

  const handleTabChange = () => {
    play("click")
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="h-12 px-6 group" onClick={() => play("click")}>
          <Play className="mr-2 h-4 w-4 text-amber-600 group-hover:text-amber-700" />
          Explore Africa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Discover Africa</DialogTitle>
          <DialogDescription>Explore fascinating facts about the African continent</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="geography" className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="geography" className="flex items-center gap-2" onClick={handleTabChange}>
              <Globe2 className="h-4 w-4" /> Geography
            </TabsTrigger>
            <TabsTrigger value="culture" className="flex items-center gap-2" onClick={handleTabChange}>
              <Users className="h-4 w-4" /> Culture
            </TabsTrigger>
            <TabsTrigger value="wildlife" className="flex items-center gap-2" onClick={handleTabChange}>
              <Leaf className="h-4 w-4" /> Wildlife
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2" onClick={handleTabChange}>
              <Clock className="h-4 w-4" /> History
            </TabsTrigger>
          </TabsList>

          {Object.entries(facts).map(([category, categoryFacts]) => (
            <TabsContent key={category} value={category} className="space-y-6">
              {categoryFacts.map((fact, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 bg-muted/30 rounded-lg p-4">
                  <div className="md:w-1/3 h-48 relative rounded-lg overflow-hidden">
                    <Image src={fact.image || "/placeholder.svg"} alt={fact.title} fill className="object-cover" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-2">{fact.title}</h3>
                    <p className="text-muted-foreground">{fact.description}</p>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

