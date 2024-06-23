import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "@/ui/styles/globals.css";
import { poppins } from "@/ui/fonts";
import initTranslations from "@utils/i18n";
import { toasterConfig } from "@config/toaster";

import { AuthProvider } from "@ui/components/providers/provider";
import { EdgeStoreProvider } from "@ui/components/providers/edgestore";
import { ThemeProvider } from "@ui/components/providers/theme-provider";
import { TranslationsProvider } from "@ui/components/providers/translation-provider";

export const metadata: Metadata = {
  title: "CookBookie",
  description: "Your own digital cookbook",
};

const i18nNamespaces = ["home", "dashboard"];

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale}>
      <body className={poppins.className}>
        <AuthProvider>
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            <ThemeProvider>
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
              <Toaster {...toasterConfig} />
            </ThemeProvider>
          </TranslationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
