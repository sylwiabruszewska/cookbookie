import { notFound } from "next/navigation";
import { Suspense } from "react";
import initTranslations from "@utils/i18n";

import { fetchCategories, fetchIngredients, fetchRecipeById } from "@lib/data";
import EditForm from "@ui/components/recipes/edit-form";
import { Loader } from "@ui/components/loader";
import { getLocale } from "@lib/getLocal";
import { translateCategories } from "@/utils/translateData";

export default async function Page({
  params,
}: {
  params: { recipeId: string };
}) {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);
  const id = params.recipeId;

  const [recipe, categoriesData] = await Promise.all([
    fetchRecipeById(id),
    fetchCategories(),
  ]);

  const categories = translateCategories(categoriesData, t);
  const ingredients = await fetchIngredients();

  if (!recipe) {
    notFound();
  }

  return (
    <div>
      <h2 className="heading-l">{t("edit_recipe")}</h2>
      <Suspense fallback={<Loader />}>
        <EditForm
          recipe={recipe}
          categories={categories}
          ingredientsFromDb={ingredients}
        />
      </Suspense>
    </div>
  );
}
