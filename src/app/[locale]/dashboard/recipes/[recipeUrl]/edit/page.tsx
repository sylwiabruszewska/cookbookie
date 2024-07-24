import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import initTranslations from "@utils/i18n";
import { parseRecipeUrl } from "@utils/parseRecipeUrl";
import translateCategories from "@/utils/translateData";
import { fetchCategories, fetchIngredients, fetchRecipeById } from "@lib/data";

import { Loader } from "@ui/components/common/loader";
import { EditForm } from "@ui/components/recipe-forms/edit-form";

type PageProps = {
  params: { recipeUrl: string; locale: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = params.locale;
  const { t } = await initTranslations(locale, ["dashboard"]);

  const pageTitle = t("edit_recipe");

  return {
    title: `${pageTitle}`,
  };
}

export default async function Page({ params }: PageProps) {
  const recipeId = parseRecipeUrl(params.recipeUrl);
  const locale = params.locale;
  const { t } = await initTranslations(locale, ["dashboard"]);

  const [recipe, categoriesData] = await Promise.all([
    fetchRecipeById(recipeId),
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
