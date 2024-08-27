import Link from "next/link";
import getLocale from "@/utils/getLocale";
import initTranslations from "@/utils/i18n";
import { fetchCategoryRecipes, fetchRecipes } from "@/lib/data";

import { Button } from "@/ui/components/common/button";
import { Pagination } from "@/ui/components/dashboard/pagination";
import { RecipeCardSmall } from "@/ui/components/cards/recipe-card-small";

export async function CategoryRecipes({
  category,
  page,
}: {
  category: string;
  page: number;
}) {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  let recipes = [];
  let totalPages = 0;

  if (category) {
    const categoryRecipes = await fetchCategoryRecipes(category, page);
    recipes = categoryRecipes.recipes;
    totalPages = categoryRecipes.totalPages;
  } else {
    const { recipes: allRecipes, totalPages: allTotalPages } =
      await fetchRecipes(page);
    recipes = allRecipes;
    totalPages = allTotalPages;
  }

  return (
    <div>
      {recipes.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="w-full">
              <RecipeCardSmall recipe={recipe} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <div>{t("no_recipes_found")}</div>
          <Link href="/dashboard/add-recipe">
            <Button className="btn-green">{t("add_recipe")}</Button>
          </Link>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-20 flex justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
