import initTranslations from "@utils/i18n";

import { ShoppingListContent } from "@ui/components/shopping-list/shopping-list-content";
import { getLocale } from "@lib/getLocal";

export default async function Page() {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  return (
    <div className="w-full flex flex-col">
      <h2 className="heading-l">{t("shopping_list")}</h2>

      <ShoppingListContent />
    </div>
  );
}
