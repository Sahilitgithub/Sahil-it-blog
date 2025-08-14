import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse, userAgent } from "next/server"

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);
const isAdminRoute = createRouteMatcher(["/dashboard(.*)"])


export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const url = req.nextUrl.pathname;

  // Protect all routes starting with "/dashboard"
  if(isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== "admin"){
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  const shouldTrack =
    isPublicRoute(req) ||
    (!!userId && !url.startsWith("/api") && !url.startsWith("/_next"))

  if (shouldTrack) {
    const ua = userAgent(req)
    const isBot = ua.ua.toLowerCase().includes("bot")

    if (!isBot) {
      const device = ua.device.type === "mobile" ? "mobile" : "desktop"

      // Call API route to log visit
      await fetch(`${req.nextUrl.origin}/api/log-visit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAgent: ua.ua,
          device,
          userId: userId || null,
        }),
      })
    }
    
  }
})
