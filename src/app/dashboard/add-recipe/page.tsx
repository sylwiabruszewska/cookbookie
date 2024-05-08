import AddRecipeForm from "@/app/ui/components/add-recipe/add-recipe-form";
import { fetchCategories } from "@/app/lib/data";

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <div>
      <AddRecipeForm categories={categories} />
    </div>
  );
}
