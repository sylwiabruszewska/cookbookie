import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";

function stripLocaleFromPath(path: string): string {
  return path.replace(/^\/[a-zA-Z]{2}(\/|$)/, "/");
}

export function withAuthMiddleware(
  middleware: CustomMiddleware
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const path = stripLocaleFromPath(request.nextUrl.pathname);
    const isOnDashboard = path.startsWith("/dashboard");
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!isOnDashboard && token) {
      const locale = request.nextUrl.pathname.split("/")[1];
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.nextUrl)
      );
    }
    if (isOnDashboard && !token) {
      const locale = request.nextUrl.pathname.split("/")[1];
      return NextResponse.redirect(
        new URL(`/${locale}/login`, request.nextUrl)
      );
    }

    return middleware(request, event, response);
  };
}
