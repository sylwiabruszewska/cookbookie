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
import { parseRecipeUrl } from "@utils/parseRecipeUrl";

type PageProps = {
  params: { recipeUrl: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const recipeId = parseRecipeUrl(params.recipeUrl);
  const recipeTitle = await fetchRecipeTitleById(recipeId);

  return {
    title: `${recipeTitle}`,
  };
}

export default async function Page({ params }: PageProps) {
  const recipeId = parseRecipeUrl(params.recipeUrl);

  const [recipe, userShoppingList] = await Promise.all([
    fetchRecipeById(recipeId),
    fetchRecipeIngredientsFromShoppingList(recipeId),
  ]);

  if (!recipe) {
    notFound();
  }

  const keyString = `recipe-id-${params.recipeUrl}`;

  return (
    <Suspense key={keyString} fallback={<Loader />}>
      <RecipeCardLarge recipe={recipe} userShoppingList={userShoppingList} />
    </Suspense>
  );
}
