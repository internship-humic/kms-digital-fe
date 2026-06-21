import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const path = request.nextUrl.pathname;

  const isPublicRoute =
    path === "/" ||
    path.startsWith("/login") ||
    path.startsWith("/register") ||
    path.startsWith("/admin/login") ||
    path.startsWith("/admin/register") ||
    path.startsWith("/kader/login") ||
    path.startsWith("/kader/onboarding");

  if (isPublicRoute) {
    if (token && role) {
      if (role === "admin")
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      if (role === "kader")
        return NextResponse.redirect(new URL("/kader/dashboard", request.url));
      if (role === "parent")
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!token || !role) {
    if (path.startsWith("/admin"))
      return NextResponse.redirect(new URL("/admin/login", request.url));
    if (path.startsWith("/kader"))
      return NextResponse.redirect(new URL("/kader/login", request.url));
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL(getFallbackRoute(role), request.url));
  }

  if (path.startsWith("/kader") && role !== "kader") {
    return NextResponse.redirect(new URL(getFallbackRoute(role), request.url));
  }

  const isParentRoute =
    path.startsWith("/dashboard") ||
    path.startsWith("/growth") ||
    path.startsWith("/insights") ||
    path.startsWith("/profile");
  if (isParentRoute && role !== "parent") {
    return NextResponse.redirect(new URL(getFallbackRoute(role), request.url));
  }

  return NextResponse.next();
}

function getFallbackRoute(role: string) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "kader") return "/kader/dashboard";
  return "/dashboard";
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (public images)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
