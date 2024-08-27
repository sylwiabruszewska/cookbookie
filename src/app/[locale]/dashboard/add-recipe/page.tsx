import { Metadata } from "next";
import { Suspense } from "react";

import initTranslations from "@/utils/i18n";
import translateCategories from "@/utils/translateData";
import { fetchCategories, fetchIngredients } from "@/lib/data";

import { Loader } from "@/ui/components/common/loader";
import { AddRecipeForm } from "@/ui/components/recipe-forms/add-recipe-form";

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = params.locale;
  const { t } = await initTranslations(locale, ["dashboard"]);

  const pageTitle = t("add_recipe");

  return {
    title: `${pageTitle}`,
  };
}

export default async function Page({ params }: PageProps) {
  const locale = params.locale;
  const { t } = await initTranslations(locale, ["dashboard"]);

  const [ingredients, categoriesData] = await Promise.all([
    fetchIngredients(),
    fetchCategories(),
  ]);

  const categories = translateCategories(categoriesData, t);

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
