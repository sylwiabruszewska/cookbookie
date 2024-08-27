import getLocale from "@/utils/getLocale";
import initTranslations from "@/utils/i18n";
import translateCategories from "@/utils/translateData";
import { fetchRecentRecipes, fetchCategories } from "@/lib/data";

import { CategoryCard } from "@/ui/components/cards/category-card";

export async function DashboardContent() {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  const categoriesData = await fetchCategories();
  const categories = translateCategories(categoriesData, t);

  const recentRecipesPromises = categories.map(async (category) => {
    const { recentRecipes, totalRecipes } = await fetchRecentRecipes(
      category.id
    );
    return { categoryId: category.id, recentRecipes, totalRecipes };
  });

  const recentRecipesForCategories = await Promise.all(recentRecipesPromises);

  return (
    <div>
      {categories && categories.length > 0 ? (
        <ul className="list-none">
          {categories.map((category) => {
            const matchingCategory = recentRecipesForCategories.find(
              (item) => item.categoryId === category.id
            );

            const recentRecipes = matchingCategory
              ? matchingCategory.recentRecipes
              : [];
            const totalRecipes = matchingCategory
              ? matchingCategory.totalRecipes
              : 0;

            return totalRecipes > 0 ? (
              <li key={category.id} className="mb-8">
                <CategoryCard
                  name={category.name}
                  categoryKey={category.key}
                  recentRecipes={recentRecipes}
                  totalRecipes={totalRecipes}
                />
              </li>
            ) : null;
          })}
        </ul>
      ) : (
        <p>{t("no_categories_found")}</p>
      )}
    </div>
  );
}
