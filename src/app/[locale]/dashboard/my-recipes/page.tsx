import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";

import initTranslations from "@utils/i18n";
import { fetchUserRecipes } from "@lib/data";

import { Loader } from "@ui/components/common/loader";
import { Button } from "@ui/components/common/button";
import { MyRecipes } from "@ui/components/pages/my-recipes";
import { Pagination } from "@ui/components/dashboard/pagination";

type PageProps = {
  params: { locale: string };
  searchParams?: {
    category?: string;
    page?: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = params.locale;
  const { t } = await initTranslations(locale, ["dashboard"]);

  const pageTitle = t("my_recipes");

  return {
    title: `${pageTitle}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const locale = params.locale;
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
