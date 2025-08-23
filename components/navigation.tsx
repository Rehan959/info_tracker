import { Button } from "@/components/ui/button"
import { TrendingUp, Bell, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"

interface NavigationProps {
  showAuth?: boolean
  showBack?: boolean
  backUrl?: string
  pageTitle?: string
  showNotifications?: boolean
  showAddInfluencer?: boolean
  children?: React.ReactNode
}

export function Navigation({
  showAuth = false,
  showBack = false,
  backUrl = "/landing",
  pageTitle,
  showNotifications = false,
  showAddInfluencer = false,
  children
}: NavigationProps) {
  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
            </div>
            <h1 className="text-xl font-semibold">InfluenceTracker</h1>
          </Link>
          {pageTitle && (
            <>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm font-medium">{pageTitle}</span>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {children}
          
          {showNotifications && (
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
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
          
          {showAuth && (
            <>
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
            </>
          )}
          
          {showBack && (
            <Link href={backUrl}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          )}
          
          {!showAuth && !showBack && <UserButton afterSignOutUrl="/landing" />}
        </div>
      </div>
    </header>
  )
}
