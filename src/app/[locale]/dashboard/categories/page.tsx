import { Suspense } from "react";

import getLocale from "@utils/getLocale";
import initTranslations from "@utils/i18n";
import { fetchCategories } from "@lib/data";
import translateCategories from "@/utils/translateData";

import { Loader } from "@ui/components/common/loader";
import { CategoryList } from "@ui/components/categories/category-list";
import { CategoryRecipes } from "@ui/components/categories/category-recipes";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    category?: string;
    page?: string;
  };
}) {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  // for category recipes
  const categoryName = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;

  // for category list
  const categoriesData = await fetchCategories();
  const categories = translateCategories(categoriesData, t);

  const keyString = `search=${searchParams?.category}${searchParams?.page}`;

  return (
    <div>
      <h2 className="heading-l">{t("categories")}</h2>

      <Suspense fallback={""}>
        <CategoryList categories={categories} />
      </Suspense>

      <Suspense key={keyString} fallback={<Loader />}>
        <CategoryRecipes category={categoryName} page={currentPage} />
      </Suspense>
    </div>
  );
}
