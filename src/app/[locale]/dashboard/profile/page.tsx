import { Suspense } from "react";

import initTranslations from "@utils/i18n";
import { Loader } from "@ui/components/loader";
import { getLocale } from "@lib/getLocal";
import UserProfile from "@ui/components/profile/user-profile";

export default async function Page() {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  return (
    <div>
      <h2 className="heading-l">{t("profile")}</h2>

      <Suspense fallback={<Loader />}>
        <UserProfile />
      </Suspense>
    </div>
  );
}
