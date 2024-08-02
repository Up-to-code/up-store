import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "./lib/db";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/forum(.*)",
  "/admin(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth(); // Get the userId from the authenticated session

  // Check if the route is protected
  if (isProtectedRoute(req)) {
    if (isProtectedRoute(req)) auth().protect()
    // If the user is not authenticated or not authorized
    if (!userId || userId !== "user_2k6V3aKXH4NFPqBOMHHad7BQEFn") {
      // Redirect to the home page
      return NextResponse.redirect(new URL(req.nextUrl.origin + "/").toString());
    }
  }

  // If everything is fine, allow the request to continue
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
