import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/landing',
  '/sign-in',
  '/sign-up',
  '/auth/login(.*)',
  '/auth/signup(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // If it's not a public route, protect it
  if (!isPublicRoute(req)) {
    await auth.protect({
      // Redirect unauthenticated users to the sign-in page
      unauthenticatedUrl: '/sign-in',
    });
  }
}, {
  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};