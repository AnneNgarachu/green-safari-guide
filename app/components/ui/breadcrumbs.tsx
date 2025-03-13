"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { useSound } from "@/lib/sound-utils"

type BreadcrumbsProps = {
  homeElement?: React.ReactNode
  separator?: React.ReactNode
  containerClasses?: string
  listClasses?: string
  activeClasses?: string
  inactiveClasses?: string
}

export function Breadcrumbs({
  homeElement = <Home className="h-4 w-4" />,
  separator = <ChevronRight className="h-4 w-4" />,
  containerClasses = "py-4 flex",
  listClasses = "flex items-center space-x-2 text-sm text-muted-foreground",
  activeClasses = "font-medium text-foreground",
  inactiveClasses = "hover:text-foreground transition-colors",
}: BreadcrumbsProps) {
  const paths = usePathname()
  const { play } = useSound()

  const pathNames = paths.split("/").filter((path) => path)

  // Create breadcrumb mapping for better display names
  const breadcrumbMap: Record<string, string> = {
    quizzes: "Quizzes",
    geography: "Geography",
    culture: "Culture",
    history: "History",
    wildlife: "Wildlife",
    cuisine: "Cuisine",
    random: "Random Quiz",
    "daily-challenge": "Daily Challenge",
    leaderboard: "Leaderboard",
    login: "Login",
    signup: "Sign Up",
    profile: "Profile",
    dashboard: "Dashboard",
  }

  return (
    <div className={containerClasses}>
      <ul className={listClasses}>
        <li className="flex items-center">
          <Link href="/" className={inactiveClasses} onClick={() => play("click")}>
            {homeElement}
          </Link>
        </li>

        {pathNames.length > 0 && <li className="flex items-center">{separator}</li>}

        {pathNames.map((name, index) => {
          const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`
          const isLast = index === pathNames.length - 1

          return (
            <li key={name} className="flex items-center">
              {isLast ? (
                <span className={activeClasses}>
                  {breadcrumbMap[name] || name.charAt(0).toUpperCase() + name.slice(1)}
                </span>
              ) : (
                <>
                  <Link href={routeTo} className={inactiveClasses} onClick={() => play("click")}>
                    {breadcrumbMap[name] || name.charAt(0).toUpperCase() + name.slice(1)}
                  </Link>
                  <span className="mx-2">{separator}</span>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

