import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register") || req.nextUrl.pathname === "/"

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/articles", req.url))
  }

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url))
  }
})

export const config = {
  matcher: ["/topics/:path*", "/articles/:path*", "/profile/:path*", "/login", "/register", "/"],
}