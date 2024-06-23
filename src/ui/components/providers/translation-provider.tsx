"use client";

import { I18nextProvider } from "react-i18next";
import { createInstance, i18n, Resource } from "i18next";

import initTranslations from "@utils/i18n";

interface TranslationsProviderProps {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
  resources?: Resource;
}

export function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProviderProps) {
  const i18nInstance: i18n = createInstance();

  initTranslations(locale, namespaces, i18nInstance, resources);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
