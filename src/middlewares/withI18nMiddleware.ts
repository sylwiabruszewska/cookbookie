import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { i18nConfig } from "@config/i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { CustomMiddleware } from "./chain";
import { i18nRouter } from "next-i18n-router";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18nConfig.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18nConfig.defaultLocale);
  return locale;
}

export function withI18nMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const pathname = request.nextUrl.pathname;
    const locale = getLocale(request);
    const pathnameIsMissingLocale =
      !locale || !pathname.startsWith(`/${locale}`);

    if (pathnameIsMissingLocale) {
      const i18nRedirect = i18nRouter(request, i18nConfig);
      if (i18nRedirect) {
        return i18nRedirect;
      }

      const redirectURL = new URL(request.url);
      if (locale) {
        redirectURL.pathname = `/${locale}${
          pathname.startsWith("/") ? "" : "/"
        }${pathname}`;
      }
      redirectURL.search = request.nextUrl.search;
      return NextResponse.redirect(redirectURL.toString());
    }
    return middleware(request, event, response);
  };
}
