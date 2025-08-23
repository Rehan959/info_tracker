"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowLeft } from "lucide-react"
import { SignUp } from "@clerk/nextjs"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation showBack={true} backUrl="/landing" />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Get started</h2>
            <p className="text-muted-foreground">
              Create your InfluenceTracker account
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none",
                    formButtonPrimary: "bg-primary hover:bg-primary/90"
                  }
                }}
                redirectUrl="/dashboard"
                signInUrl="/sign-in"
              />
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
