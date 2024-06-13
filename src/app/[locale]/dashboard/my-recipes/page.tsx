import { Suspense } from "react";
import initTranslations from "@utils/i18n";

import { fetchUserRecipes } from "@lib/data";
import { MyRecipes } from "@ui/components/my-recipes/my-recipes";
import { Loader } from "@ui/components/loader";
import Pagination from "@/ui/components/pagination";
import { getLocale } from "@lib/getLocal";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);
  const currentPage = Number(searchParams?.page) || 1;
  const { recipes, totalPages } = await fetchUserRecipes(currentPage);

  const keyString = `search=${searchParams?.page}`;

  return (
    <div>
      <h2 className="heading-l">{t("my_recipes")}</h2>

      <Suspense key={keyString} fallback={<Loader />}>
        {recipes && recipes.length > 0 ? (
          <>
            <MyRecipes recipes={recipes} />

            {totalPages > 1 && (
              <div className="mt-20 flex justify-center">
                <Pagination totalPages={totalPages} />
              </div>
            )}
          </>
        ) : (
          <p>Add some recipes!</p>
        )}
      </Suspense>
    </div>
  );
}
