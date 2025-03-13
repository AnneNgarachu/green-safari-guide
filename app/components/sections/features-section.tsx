"use client"

import { BookOpen, Globe2, Users, CheckCircle2, Leaf, Bot } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium mb-4">
            Key Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Learn About Africa in an Engaging Way</h2>
          <p className="text-lg text-muted-foreground">
            Our platform combines interactive quizzes, rich content, and gamification to make learning about Africa fun
            and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen className="h-6 w-6 text-amber-600" />,
              title: "Interactive Quizzes",
              description: "Test your knowledge with quizzes on geography, culture, history, wildlife, and cuisine.",
            },
            {
              icon: <Bot className="h-6 w-6 text-amber-600" />,
              title: "AI-Powered Learning",
              description:
                "Advanced AI technology ensures accurate, culturally sensitive content and personalized learning experiences.",
            },
            {
              icon: <Globe2 className="h-6 w-6 text-amber-600" />,
              title: "Interactive Map",
              description: "Explore the African continent through an interactive map with detailed information.",
            },
            {
              icon: <Users className="h-6 w-6 text-amber-600" />,
              title: "Community Learning",
              description: "Connect with other learners, share insights, and participate in group challenges.",
            },
            {
              icon: <CheckCircle2 className="h-6 w-6 text-amber-600" />,
              title: "Progress Tracking",
              description: "Monitor your learning journey with detailed statistics and improvement metrics.",
            },
            {
              icon: <Leaf className="h-6 w-6 text-amber-600" />,
              title: "Rich Content",
              description: "Access detailed articles, images, and videos about African topics.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative bg-background rounded-xl border p-6 hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-amber-500 to-orange-600 group-hover:w-full transition-all duration-300"></div>
              <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

