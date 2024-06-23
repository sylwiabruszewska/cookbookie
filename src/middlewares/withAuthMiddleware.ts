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
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (isOnDashboard && !token) {
      if (isOnDashboard) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    return middleware(request, event, response);
  };
}
