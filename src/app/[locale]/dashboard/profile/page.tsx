import { Metadata } from "next";

import initTranslations from "@utils/i18n";
import { UserProfile } from "@ui/components/pages/profile";

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = params.locale;
  const { t } = await initTranslations(locale, ["dashboard"]);

  const pageTitle = t("profile");

  return {
    title: `${pageTitle}`,
  };
}

export default async function Page({ params }: PageProps) {
  const locale = params.locale;
  const { t } = await initTranslations(locale, ["dashboard"]);

  return (
    <div>
      <h2 className="heading-l">{t("profile")}</h2>

      <UserProfile />
    </div>
  );
}
