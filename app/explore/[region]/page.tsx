import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/app/components/layout/header"
import { Footer } from "@/app/components/layout/footer"
import { Breadcrumbs } from "@/app/components/ui/breadcrumbs"
import { RegionDetail } from "@/app/components/maps/region-detail"

type Props = {
  params: { region: string }
}

// Define valid regions
const validRegions = ["north", "west", "central", "east", "southern"]

// Region metadata for SEO
const regionMetadata = {
  north: {
    title: "North Africa - Green Safari Guide",
    description: "Explore North Africa's rich history, desert landscapes, and Mediterranean coastlines",
  },
  west: {
    title: "West Africa - Green Safari Guide",
    description: "Discover West Africa's vibrant cultures, historical empires, and diverse ecosystems",
  },
  central: {
    title: "Central Africa - Green Safari Guide",
    description: "Journey through Central Africa's vast rainforests, wildlife, and the Congo River Basin",
  },
  east: {
    title: "East Africa - Green Safari Guide",
    description: "Experience East Africa's Great Rift Valley, savannas, and ancient human origins",
  },
  southern: {
    title: "Southern Africa - Green Safari Guide",
    description: "Explore Southern Africa's diverse landscapes from deserts to coastlines and rich biodiversity",
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = params

  if (!validRegions.includes(region)) {
    return {
      title: "Region Not Found - Green Safari Guide",
    }
  }

  return {
    title: regionMetadata[region as keyof typeof regionMetadata].title,
    description: regionMetadata[region as keyof typeof regionMetadata].description,
  }
}

export default function RegionPage({ params }: Props) {
  const { region } = params

  // Validate region
  if (!validRegions.includes(region)) {
    notFound()
  }

  // Format region name for display
  const regionName = region.charAt(0).toUpperCase() + region.slice(1)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container">
          <Breadcrumbs />

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{regionName} Africa</h1>
            <p className="text-muted-foreground">
              Explore the countries, landmarks, and unique features of {regionName} Africa.
            </p>
          </div>

          <RegionDetail region={region} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

