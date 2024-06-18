import initTranslations from "@utils/i18n";
import { getLocale } from "@lib/getLocal";

export default async function Page() {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  return (
    <div>
      <h2 className="heading-l">{t("profile")}</h2>
    </div>
  );
}
