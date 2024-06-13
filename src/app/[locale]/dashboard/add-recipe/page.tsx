import { Suspense } from "react";

import AddRecipeForm from "@/ui/components/add-recipe/add-recipe-form";
import { fetchCategories } from "@/lib/data";
import { Loader } from "@ui/components/loader";

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <div>
      <h2 className="heading-l">Add recipe</h2>
      <Suspense fallback={<Loader />}>
        <AddRecipeForm categories={categories} />
      </Suspense>
    </div>
  );
}
