import { notFound } from "next/navigation";
import { Suspense } from "react";

import { fetchCategories, fetchRecipeById } from "@lib/data";
import EditForm from "@ui/components/recipes/edit-form";
import { Loader } from "@ui/components/loader";

export default async function Page({
  params,
}: {
  params: { recipeId: string };
}) {
  const id = params.recipeId;

  const [recipe, categories] = await Promise.all([
    fetchRecipeById(id),
    fetchCategories(),
  ]);

  if (!recipe) {
    notFound();
  }

  return (
    <Suspense fallback={<Loader />}>
      <EditForm recipe={recipe} categories={categories} />
    </Suspense>
  );
}
