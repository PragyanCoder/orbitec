import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/pricing", 
    "/contact",
    "/api/webhooks/stripe"
  ],
  ignoredRoutes: ["/api/webhooks/stripe"]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};