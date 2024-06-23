import Link from "next/link";
import { Suspense } from "react";

import getLocale from "@utils/getLocale";
import initTranslations from "@utils/i18n";
import { fetchUserRecipes } from "@lib/data";

import { Loader } from "@ui/components/common/loader";
import { Button } from "@ui/components/common/button";
import { MyRecipes } from "@ui/components/pages/my-recipes";
import { Pagination } from "@ui/components/dashboard/pagination";

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
          <div className="flex flex-col gap-4 items-center">
            <p>{t("add_some_recipes")}</p>

            <Link href="/dashboard/add-recipe">
              <Button className="btn-green">{t("add_recipe")}</Button>
            </Link>
          </div>
        )}
      </Suspense>
    </div>
  );
}
