import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";

import { i18nConfig } from "@/config/i18n.config";
import { CustomMiddleware } from "@/middlewares/chain";

function getLocaleFromCookies(request: NextRequest): string {
  return request.cookies.get("NEXT_LOCALE")?.value || "";
}

function getLocale(request: NextRequest): string {
  const localeFromCookie = getLocaleFromCookies(request);
  if (localeFromCookie) return localeFromCookie;

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18nConfig.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = matchLocale(languages, locales, i18nConfig.defaultLocale);
  return locale;
}

function stripLocaleFromPath(path: string): string {
  return path.replace(/^\/[a-zA-Z]{2}(\/|$)/, "/");
}

export function withI18nMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const pathname = request.nextUrl.pathname;
    const locale = getLocale(request);
    const isDefaultLocale = locale === i18nConfig.defaultLocale;
    const pathnameIsMissingLocale =
      !locale || !pathname.startsWith(`/${locale}`) || pathname === "/";

    if (pathnameIsMissingLocale) {
      const redirectURL = new URL(request.url);

      if (
        isDefaultLocale &&
        /^\/[a-zA-Z]{2}(\/|$)/.test(redirectURL.pathname)
      ) {
        redirectURL.pathname = stripLocaleFromPath(redirectURL.pathname);
      } else {
        redirectURL.pathname = `/${locale}${pathname}`;
      }

      redirectURL.search = request.nextUrl.search;

      return NextResponse.redirect(redirectURL.toString());
    }
    return middleware(request, event, response);
  };
}
