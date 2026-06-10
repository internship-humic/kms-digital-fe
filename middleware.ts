import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const { pathname } = request.nextUrl;

  const isKaderOnboardingPage = pathname.startsWith("/kader/onboarding");

  const isPublicPage =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/kader/login" ||
    pathname === "/admin/login" ||
    pathname === "/admin/register" ||
    isKaderOnboardingPage;

  const isKaderPage = pathname.startsWith("/kader");
  const isAdminPage = pathname.startsWith("/admin");

  if (!token) {
    if (!isPublicPage) {
      if (isKaderPage)
        return NextResponse.redirect(new URL("/kader/login", request.url));
      if (isAdminPage)
        return NextResponse.redirect(new URL("/admin/login", request.url));
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (isPublicPage) {
    if (role === "kader")
      return NextResponse.redirect(new URL("/kader/dashboard", request.url));
    if (role === "admin")
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (role === "parent" && (isKaderPage || isAdminPage)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.svg$).*)",
  ],
};
