"use client";

import "@/lib/faIcons";
import { setLocale } from "@lib/actions";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  // set cookie for server components
  useEffect(() => {
    const browserLanguage = navigator.language || navigator.languages[0];
    const defaultLocale = browserLanguage.split("-")[0];
    setLocale(defaultLocale);
  }, []);

  return children;
}
