import { Suspense } from "react";

import { fetchUserShoppingList } from "@lib/data";
import { ShoppingList } from "@ui/components/shopping-list/shopping-list";
import { Loader } from "@ui/components/loader";
import initTranslations from "@utils/i18n";
import { getLocale } from "@lib/getLocal";

export async function ShoppingListContent() {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  const userShoppingList = await fetchUserShoppingList();
  return (
    <>
      {userShoppingList.length > 0 ? (
        <Suspense fallback={<Loader />}>
          <ShoppingList userShoppingList={userShoppingList} />
        </Suspense>
      ) : (
        <p>{t("no_shopping_list")}</p>
      )}
    </>
  );
}
