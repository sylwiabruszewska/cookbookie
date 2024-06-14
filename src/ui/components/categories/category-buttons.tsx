import { fetchCategories } from "@lib/data";
import CategoryList from "@ui/components/categories/category-list";
import initTranslations from "@utils/i18n";
import { getLocale } from "@lib/getLocal";
import { translateCategories } from "@/utils/translateData";

export async function CategoryButtons() {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  const categoriesData = await fetchCategories();
  const categories = translateCategories(categoriesData, t);

  return <CategoryList categories={categories} />;
}
