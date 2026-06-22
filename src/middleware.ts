import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

// Public routes that should never be redirected
const isPublicRoute = createRouteMatcher([
  "/",
  "/unauthorized",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)",
]);

// Create matchers for each route and its allowed roles
const matchers = Object.entries(routeAccessMap).map(([route, allowedRoles]) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles,
}));

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Never apply role checks to public routes — breaks the redirect loop
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  const authObject = await auth();
  const sessionClaims = authObject.sessionClaims;

  // Clerk puts publicMetadata under 'metadata' key in sessionClaims
  // when the session token is customized via Clerk dashboard
  const role =
    (sessionClaims?.metadata as any)?.role ||
    (sessionClaims as any)?.publicMetadata?.role ||
    (sessionClaims as any)?.public_metadata?.role ||
    (sessionClaims as any)?.role ||
    undefined;

  const isApiRoute = pathname.startsWith("/api");

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req)) {
      if (!role || !allowedRoles.includes(role)) {
        // Guard: never redirect to /unauthorized if already there
        if (pathname === "/unauthorized") {
          return NextResponse.next();
        }

        if (isApiRoute) {
          return new NextResponse(
            JSON.stringify({ error: "Access denied" }),
            { status: 403, headers: { "Content-Type": "application/json" } }
          );
        }

        return NextResponse.redirect(new URL("/unauthorized", req.nextUrl.origin));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|favicon.ico).*)"],
};
