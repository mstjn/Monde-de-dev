import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register") || req.nextUrl.pathname === "/"

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/feed", req.url))
  }

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url))
  }
})

export const config = {
  matcher: ["/feed/:path*", "/topics/:path*", "/articles/:path*", "/profile/:path*", "/login", "/register", "/"],
}