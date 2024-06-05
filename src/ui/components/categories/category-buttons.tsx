import { fetchCategories } from "@lib/data";
import CategoryList from "@ui/components/categories/category-list";

export async function CategoryButtons() {
  const categories = await fetchCategories();

  return <CategoryList categories={categories} />;
}
