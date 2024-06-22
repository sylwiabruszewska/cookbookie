import Link from "next/link";
import { Suspense } from "react";
import initTranslations from "@utils/i18n";

import { fetchUserFavorites } from "@lib/data";
import { MyFavorites } from "@ui/components/favorites/my-favorites";
import { Loader } from "@ui/components/loader";
import Pagination from "@/ui/components/pagination";
import { getLocale } from "@lib/getLocal";
import { Button } from "@ui/components/button";

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
  const { recipes, totalPages } = await fetchUserFavorites(currentPage);

  const keyString = `search=${searchParams?.page}`;

  return (
    <div>
      <h2 className="heading-l">{t("favorites")}</h2>

      <Suspense key={keyString} fallback={<Loader />}>
        {recipes && recipes.length > 0 ? (
          <>
            <MyFavorites recipes={recipes} />

            {totalPages > 1 && (
              <div className="mt-20 flex justify-center">
                <Pagination totalPages={totalPages} />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-4 items-center">
            <p>{t("add_some_recipes_to_favorites")}</p>
            <Link href="/dashboard/add-recipe">
              <Button className="btn-green">{t("see_recipes")}</Button>
            </Link>
          </div>
        )}
      </Suspense>
    </div>
  );
}
