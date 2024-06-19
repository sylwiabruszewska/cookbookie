import initTranslations from "@utils/i18n";
import { getLocale } from "@lib/getLocal";
import UserProfile from "@ui/components/profile/user-profile";

export default async function Page() {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  return (
    <div>
      <h2 className="heading-l">{t("profile")}</h2>
      <UserProfile />
    </div>
  );
}
