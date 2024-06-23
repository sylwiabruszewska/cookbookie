import { Suspense } from "react";
import { notFound } from "next/navigation";

import {
  fetchRecipeById,
  fetchRecipeIngredientsFromShoppingList,
} from "@lib/data";

import { Loader } from "@ui/components/common/loader";
import { RecipeCardLarge } from "@ui/components/cards/recipe-card-large";

export default async function Page({
  params,
}: {
  params: { recipeId: string };
}) {
  const [recipe, userShoppingList] = await Promise.all([
    fetchRecipeById(params.recipeId),
    fetchRecipeIngredientsFromShoppingList(params.recipeId),
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
