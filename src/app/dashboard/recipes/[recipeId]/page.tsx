import RecipeCardLarge from "@ui/components/recipes/recipe-card-large";
import { fetchRecipeById, fetchUserShoppingList } from "@lib/data";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { recipeId: string };
}) {
  const [recipe, userShoppingList] = await Promise.all([
    fetchRecipeById(params.recipeId),
    fetchUserShoppingList(),
  ]);

  if (!recipe) {
    notFound();
  }

  return (
    <div>
      <RecipeCardLarge recipe={recipe} userShoppingList={userShoppingList} />
    </div>
  );
}
