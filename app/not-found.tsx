import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation showBack={true} backUrl="/landing" />
      
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-6">
        <div className="text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <Card className="max-w-md mx-auto mb-8">
            <CardHeader>
              <CardTitle>What you can do:</CardTitle>
              <CardDescription>Here are some helpful links to get you back on track</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/landing">
                <Button className="w-full justify-start">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Homepage
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full justify-start">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="text-sm text-muted-foreground">
            <p>If you believe this is an error, please contact our support team.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
