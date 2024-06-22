import type { Metadata } from "next";
import { poppins } from "@/ui/fonts";
import "@/ui/styles/globals.css";
import Provider from "@ui/components/provider";
import { Toaster } from "react-hot-toast";
import { toasterConfig } from "@config/toaster";
import { EdgeStoreProvider } from "@lib/edgestore";
import { ThemeProvider } from "@ui/components/theme-provider";
import TranslationsProvider from "@ui/components/translation-provider";
import initTranslations from "@utils/i18n";

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
        <Provider>
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
        </Provider>
      </body>
    </html>
  );
}
