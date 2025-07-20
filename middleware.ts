import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/pricing", 
    "/contact",
    "/docs",
    "/privacy",
    "/terms",
    "/legal",
    "/sitemap",
    "/api/webhooks/stripe"
  ],
  ignoredRoutes: ["/api/webhooks/stripe"]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};