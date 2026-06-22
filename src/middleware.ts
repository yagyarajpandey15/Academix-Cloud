import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

// Create matchers for each route and its allowed roles
const matchers = Object.entries(routeAccessMap).map(([route, allowedRoles]) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles,
}));

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();
  const sessionClaims = authObject.sessionClaims;

  // Clerk v6: publicMetadata is available directly on sessionClaims
  // Try all possible locations where role might be stored
  const role = 
    (sessionClaims?.metadata as any)?.role ||
    (sessionClaims as any)?.publicMetadata?.role ||
    (sessionClaims as any)?.public_metadata?.role ||
    (sessionClaims as any)?.role ||
    undefined;

  // Check if the request is for an API route
  const isApiRoute = req.nextUrl.pathname.startsWith('/api');

  // Iterate through matchers to check access permissions
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req)) {
      if (!role || !allowedRoles.includes(role)) {
        if (isApiRoute) {
          return new NextResponse(
            JSON.stringify({ error: 'Access denied' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
          );
        } else {
          const baseUrl = req.nextUrl.origin;
          return NextResponse.redirect(new URL(`/${role ?? "unauthorized"}`, baseUrl));
        }
      }
    }
  }
});

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // Match all API routes
    "/api/:path*",
    // Match all list routes
    "/list/:path*",
    // Match all dashboard routes
    "/(dashboard)/:path*"
  ],
};
