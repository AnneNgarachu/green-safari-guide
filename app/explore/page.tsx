import type { Metadata } from "next"
import { Header } from "@/app/components/layout/header"
import { Footer } from "@/app/components/layout/footer"
import { Breadcrumbs } from "@/app/components/ui/breadcrumbs"
import { AfricaMap } from "@/app/components/maps/africa-map"
import { RegionSelector } from "@/app/components/maps/region-selector"

export const metadata: Metadata = {
  title: "Explore Africa - Green Safari Guide",
  description: "Explore the diverse regions of Africa through our interactive map",
}

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container">
          <Breadcrumbs />

          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Explore Africa</h1>
            <p className="text-lg text-muted-foreground">
              Discover the diverse regions of Africa through our interactive map. Click on regions to learn more about
              their geography, culture, and history.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <AfricaMap />
            </div>
            <div className="lg:col-span-1">
              <RegionSelector />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

