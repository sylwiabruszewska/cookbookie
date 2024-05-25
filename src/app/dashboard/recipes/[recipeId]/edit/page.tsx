import { notFound } from "next/navigation";

import { fetchCategories, fetchRecipeById } from "@lib/data";

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

  console.log(recipe);
  return (
    <>
      <p>edit recipe {recipe?.title}</p>
    </>
  );
}
