import RecipeCardLarge from "@/ui/components/recipe-card-large";
import { fetchRecipeById } from "@lib/data";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { recipeId: string };
}) {
  const recipe = await fetchRecipeById(params.recipeId);

  if (!recipe) {
    notFound();
  }

  return (
    <div>
      <RecipeCardLarge recipe={recipe} />
    </div>
  );
}
