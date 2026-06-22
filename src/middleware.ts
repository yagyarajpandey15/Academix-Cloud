import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

// These routes are always public — never apply auth or role checks
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/unauthorized",
]);

// Create matchers for each protected route and its allowed roles
const matchers = Object.entries(routeAccessMap).map(([route, allowedRoles]) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles,
}));

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Always allow public routes through — prevents redirect loops
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  const authObject = await auth();
  const sessionClaims = authObject.sessionClaims;

  // Read role from all possible locations in session claims
  const role =
    (sessionClaims?.metadata as any)?.role ||
    (sessionClaims as any)?.publicMetadata?.role ||
    (sessionClaims as any)?.public_metadata?.role ||
    undefined;

  const isApiRoute = pathname.startsWith("/api");

  // Apply role-based access control
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req)) {
      if (!role || !allowedRoles.includes(role)) {
        if (isApiRoute) {
          return new NextResponse(
            JSON.stringify({ error: "Access denied" }),
            { status: 403, headers: { "Content-Type": "application/json" } }
          );
        }
        // Redirect to unauthorized — safe because /unauthorized is a public route
        return NextResponse.redirect(new URL("/unauthorized", req.nextUrl.origin));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|favicon.ico).*)"],
};
