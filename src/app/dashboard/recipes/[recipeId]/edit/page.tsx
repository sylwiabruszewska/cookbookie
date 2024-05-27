import { notFound } from "next/navigation";

import { fetchCategories, fetchRecipeById } from "@lib/data";
import EditForm from "@ui/components/recipes/edit-form";

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
    <>
      <EditForm recipe={recipe} categories={categories} />
    </>
  );
}
