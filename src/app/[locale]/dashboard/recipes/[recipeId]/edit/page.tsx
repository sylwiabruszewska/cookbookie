import { notFound } from "next/navigation";
import { Suspense } from "react";
import initTranslations from "@utils/i18n";

import { fetchCategories, fetchRecipeById } from "@lib/data";
import EditForm from "@ui/components/recipes/edit-form";
import { Loader } from "@ui/components/loader";
import { getLocale } from "@lib/getLocal";

export default async function Page({
  params,
}: {
  params: { recipeId: string };
}) {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);
  const id = params.recipeId;

  const [recipe, categories] = await Promise.all([
    fetchRecipeById(id),
    fetchCategories(),
  ]);

  if (!recipe) {
    notFound();
  }

  return (
    <div>
      <h2 className="heading-l">{t("edit_recipe")}</h2>
      <Suspense fallback={<Loader />}>
        <EditForm recipe={recipe} categories={categories} />
      </Suspense>
    </div>
  );
}
