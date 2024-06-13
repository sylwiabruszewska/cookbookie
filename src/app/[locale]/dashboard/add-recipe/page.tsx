import { Suspense } from "react";
import initTranslations from "@utils/i18n";

import AddRecipeForm from "@/ui/components/add-recipe/add-recipe-form";
import { fetchCategories } from "@/lib/data";
import { Loader } from "@ui/components/loader";
import { getLocale } from "@lib/getLocal";

export default async function Page() {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

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
