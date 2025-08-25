import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES: RegExp[] = [
  /^\/$/,
  /^\/landing$/,
  /^\/demo(?:$|\/)/,
  /^\/demo-analytics$/,
  /^\/demo-dashboard$/,
  /^\/demo-influencers$/,
  /^\/demo-campaigns$/,
  /^\/analytics$/,
  /^\/add-influencer$/,
  /^\/api\/influencers\/fetch-profile$/,
  /^\/api\/demo-social-media$/,
  /^\/api\/demo-dashboard$/,
  /^\/api\/demo-influencers$/,
  /^\/api\/auth\/(login|register|logout|me)$/,
  /^\/auth\/(login|signup)(?:$|\/)/,
  // Public read-only APIs so the site works for all visitors
  /^\/api\/(influencers|dashboard)(?:$|\/)/,
]

function isPublic(pathname: string): boolean {
  return PUBLIC_ROUTES.some((re) => re.test(pathname))
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (isPublic(pathname)) {
    return NextResponse.next()
  }

  const token = req.cookies.get('auth_token')?.value
  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirect_url', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}