import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/landing",
    "/demo",
    "/demo-analytics",
    "/demo-dashboard", 
    "/demo-influencers",
    "/demo-campaigns",
    "/analytics",
    "/add-influencer",
    "/api/influencers/fetch-profile",
    "/api/demo-social-media",
    "/api/demo-dashboard",
    "/api/demo-influencers",
    "/api/influencers",
    "/api/dashboard",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};