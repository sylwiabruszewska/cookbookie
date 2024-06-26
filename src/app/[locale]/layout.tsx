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

type PageProps = {
  params: { locale: string };
  children?: React.ReactNode;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = params.locale;
  const { t } = await initTranslations(locale, ["home"]);

  const pageTitle = t("page_title");
  const pageDescription = t("page_description");

  return {
    title: {
      template: `%s | CookBookie`,
      default: `${pageTitle}`,
    },
    description: pageDescription,
  };
}

const i18nNamespaces = ["home", "dashboard"];

export default async function Page({ params, children }: PageProps) {
  const locale = params.locale;
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
