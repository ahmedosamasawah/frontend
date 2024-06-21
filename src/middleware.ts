import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const token = req.cookies.get("token");
  const adminProtectedRoutes = ["/admin", "/admin/sending", "/admin/case"];

  const userToken = req.cookies.get("userToken");
  const userProtectedRoutes = [
    "/profile",
    "/chats",
    "/my-requests",
    "/verify",
    "/notifications",
    "/admin",
    "/lawyer",
  ];

  if (adminProtectedRoutes.some(route => url.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (userProtectedRoutes.some(route => url.pathname.startsWith(route))) {
    if (!userToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/admin/:path*",
    "/profile",
    "/chats",
    "/my-requests",
    "/verify",
    "/notifications",
  ],
};
