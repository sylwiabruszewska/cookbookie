import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";

import initTranslations from "@/utils/i18n";
import { fetchUserFavorites } from "@/lib/data";

import { Loader } from "@/ui/components/common/loader";
import { Button } from "@/ui/components/common/button";
import { MyFavorites } from "@/ui/components/pages/favorites";
import { Pagination } from "@/ui/components/dashboard/pagination";

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

  const pageTitle = t("favorites");

  return {
    title: `${pageTitle}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const locale = params.locale;
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

            <Link href="/dashboard/categories">
              <Button className="btn-green">{t("see_recipes")}</Button>
            </Link>
          </div>
        )}
      </Suspense>
    </div>
  );
}
