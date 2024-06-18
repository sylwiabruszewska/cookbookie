import { Suspense } from "react";
import { notFound } from "next/navigation";

import RecipeCardLarge from "@ui/components/recipes/recipe-card-large";
import {
  fetchRecipeById,
  fetchrecipeIngredientsFromShoppingList,
} from "@lib/data";
import { Loader } from "@ui/components/loader";

export default async function Page({
  params,
}: {
  params: { recipeId: string };
}) {
  const [recipe, userShoppingList] = await Promise.all([
    fetchRecipeById(params.recipeId),
    fetchrecipeIngredientsFromShoppingList(params.recipeId),
  ]);

  if (!recipe) {
    notFound();
  }

  const keyString = `recipe-id-${params.recipeId}`;

  return (
    <Suspense key={keyString} fallback={<Loader />}>
      <RecipeCardLarge recipe={recipe} userShoppingList={userShoppingList} />
    </Suspense>
  );
}
