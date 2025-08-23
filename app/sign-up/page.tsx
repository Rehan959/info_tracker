"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowLeft, UserPlus, Zap, Shield, Star } from "lucide-react"
import { SignUp } from "@clerk/nextjs"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation showBack={true} backUrl="/landing" />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <UserPlus className="h-6 w-6" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Get started
            </h2>
            <p className="text-muted-foreground text-lg">
              Create your InfluenceTracker account
            </p>
          </div>

          {/* Sign Up Card */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription className="text-base">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none bg-transparent",
                    formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-all duration-200",
                    formButtonSecondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium py-3 px-6 rounded-lg transition-all duration-200",
                    formFieldInput: "border border-input bg-background text-foreground rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200",
                    formFieldLabel: "text-foreground font-medium",
                    headerTitle: "text-foreground font-bold text-xl",
                    headerSubtitle: "text-muted-foreground",
                    dividerLine: "bg-border",
                    dividerText: "text-muted-foreground",
                    socialButtonsBlockButton: "border border-input bg-background hover:bg-muted text-foreground font-medium py-3 px-6 rounded-lg transition-all duration-200",
                    footerActionLink: "text-primary hover:text-primary/80 font-medium",
                    formFieldLabelRow: "mb-2",
                    formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground",
                    formFieldInputShowPasswordIcon: "text-muted-foreground",
                    formFieldInputShowPasswordButtonHover: "text-foreground",
                    formFieldInputShowPasswordButtonFocus: "text-foreground",
                    formFieldInputShowPasswordButtonActive: "text-foreground"
                  }
                }}
                redirectUrl="/dashboard"
                signInUrl="/sign-in"
                afterSignUpUrl="/dashboard"
              />
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 space-y-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:text-primary/80 font-medium underline underline-offset-4">
                Sign in here
              </Link>
            </p>
            
            {/* Features */}
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                <span>Fast</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                <span>Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
