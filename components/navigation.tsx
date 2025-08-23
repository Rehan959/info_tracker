"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowLeft, Bell, Plus } from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"
import dynamic from "next/dynamic"

// Dynamically import UserButton to avoid hydration issues
const DynamicUserButton = dynamic(() => Promise.resolve(UserButton), {
  ssr: false,
  loading: () => <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
})

interface NavigationProps {
  showAuth?: boolean
  showBack?: boolean
  backUrl?: string
  showNotifications?: boolean
  showAddInfluencer?: boolean
  title?: string
}

export function Navigation({ 
  showAuth = false, 
  showBack = false, 
  backUrl = "/landing",
  showNotifications = false,
  showAddInfluencer = false,
  title
}: NavigationProps) {
  const { isLoaded, isSignedIn } = useUser()

  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          {showBack ? (
            <Link href={backUrl}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          ) : (
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h1 className="text-xl font-semibold">InfluenceTracker</h1>
            </Link>
          )}
          
          {title && (
            <div className="ml-4">
              <h2 className="text-lg font-medium">{title}</h2>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {showNotifications && (
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          )}
          
          {showAddInfluencer && (
            <Link href="/influencers">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Influencer
              </Button>
            </Link>
          )}

          {showAuth && !isSignedIn && (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {isLoaded && isSignedIn && (
            <DynamicUserButton afterSignOutUrl="/landing" />
          )}
        </div>
      </div>
    </header>
  )
}
