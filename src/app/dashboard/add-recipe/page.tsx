import { Suspense } from "react";

import AddRecipeForm from "@/ui/components/add-recipe/add-recipe-form";
import { fetchCategories } from "@/lib/data";
import { Loader } from "@ui/components/loader";

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <Suspense fallback={<Loader />}>
      <AddRecipeForm categories={categories} />
    </Suspense>
  );
}
