import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import {
  fetchRecipeById,
  fetchRecipeIngredientsFromShoppingList,
} from "@lib/data";
import { fetchRecipeTitleById } from "@lib/data";

import { Loader } from "@ui/components/common/loader";
import { RecipeCardLarge } from "@ui/components/cards/recipe-card-large";

type PageProps = {
  params: { recipeId: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = params.recipeId;
  const recipeTitle = await fetchRecipeTitleById(id);

  return {
    title: `${recipeTitle}`,
  };
}

export default async function Page({ params }: PageProps) {
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
