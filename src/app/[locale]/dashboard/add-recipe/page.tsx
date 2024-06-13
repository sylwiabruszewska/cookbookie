import { Suspense } from "react";
import initTranslations from "@utils/i18n";

import AddRecipeForm from "@/ui/components/add-recipe/add-recipe-form";
import { fetchCategories } from "@/lib/data";
import { Loader } from "@ui/components/loader";

export default async function Page() {
  const { t } = await initTranslations(["dashboard"]);
  const categories = await fetchCategories();

  return (
    <div>
      <h2 className="heading-l">{t("add_recipe")}</h2>
      <Suspense fallback={<Loader />}>
        <AddRecipeForm categories={categories} />
      </Suspense>
    </div>
  );
}
