import { fetchFilteredRecipes } from "@/lib/data";
import { RecipeCardSmall } from "@/ui/components/cards/recipe-card-small";

export async function SearchTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  if (!query.trim()) {
    return null;
  }

  const recipes = await fetchFilteredRecipes(query, currentPage);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {recipes.length > 0 &&
        recipes.map((recipe) => (
          <li key={recipe.id} className="w-full">
            <RecipeCardSmall recipe={recipe} />
          </li>
        ))}
    </ul>
  );
}
