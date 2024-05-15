import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isOnDashboard = path.startsWith("/dashboard");
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!isOnDashboard && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  if (isOnDashboard && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|logo.svg|logo-dark.svg).*)"],
};
