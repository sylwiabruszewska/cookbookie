import AddRecipeForm from "@/ui/components/add-recipe/add-recipe-form";
import { fetchCategories } from "@/lib/data";

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <div>
      <AddRecipeForm categories={categories} />
    </div>
  );
}
