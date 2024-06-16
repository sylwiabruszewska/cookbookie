import { Suspense } from "react";

import AddRecipeForm from "@/ui/components/add-recipe/add-recipe-form";
import { fetchCategories, fetchIngredients } from "@/lib/data";
import { Loader } from "@ui/components/loader";
import initTranslations from "@utils/i18n";
import { getLocale } from "@lib/getLocal";
import { translateCategories } from "@/utils/translateData";

export default async function Page() {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  const categoriesData = await fetchCategories();
  const categories = translateCategories(categoriesData, t);
  const ingredients = await fetchIngredients();

  return (
    <div>
      <h2 className="heading-l">{t("add_recipe")}</h2>
      <Suspense fallback={<Loader />}>
        <AddRecipeForm
          categories={categories}
          ingredientsFromDb={ingredients}
        />
      </Suspense>
    </div>
  );
}
