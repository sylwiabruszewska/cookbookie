import { Metadata } from "next";
import { Suspense } from "react";

import initTranslations from "@utils/i18n";
import { fetchUserShoppingList } from "@lib/data";

import { Loader } from "@ui/components/common/loader";
import { ShoppingList } from "@ui/components/pages/shopping-list";

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = params.locale;
  const { t } = await initTranslations(locale, ["dashboard"]);

  const pageTitle = t("shopping_list");

  return {
    title: `${pageTitle}`,
  };
}

export default async function Page({ params }: PageProps) {
  const locale = params.locale;
  const { t } = await initTranslations(locale, ["dashboard"]);

  const userShoppingList = await fetchUserShoppingList();

  return (
    <div className="w-full flex flex-col">
      <h2 className="heading-l">{t("shopping_list")}</h2>

      {userShoppingList.length > 0 ? (
        <Suspense fallback={<Loader />}>
          <ShoppingList userShoppingList={userShoppingList} />
        </Suspense>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <p>{t("no_shopping_list")}</p>
          {/* add form with inputs */}
        </div>
      )}
    </div>
  );
}
