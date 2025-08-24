"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { SignUp } from "@clerk/nextjs"

export default function SignupPage() {

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground mb-4">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold">InfluenceTracker</h1>
          <p className="text-muted-foreground mt-1">Create your account</p>
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
              signInUrl="/auth/login"
              afterSignUpUrl="/dashboard"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}