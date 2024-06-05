import RecipeCardSmall from "@/ui/components/recipe-card-small";
import { fetchCategoryRecipes, fetchRecipes } from "@lib/data";
import Pagination from "@/ui/components/pagination";

export async function CategoryRecipesContent({
  category,
  page,
}: {
  category: string;
  page: number;
}) {
  let recipes = [];
  let totalPages = 0;

  if (category) {
    const categoryRecipes = await fetchCategoryRecipes(category, page);
    recipes = categoryRecipes.recipes;
    totalPages = categoryRecipes.totalPages;
  } else {
    const { recipes: allRecipes, totalPages: allTotalPages } =
      await fetchRecipes(page);
    recipes = allRecipes;
    totalPages = allTotalPages;
  }

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <li key={recipe.id} className="w-full">
              <RecipeCardSmall recipe={recipe} />
            </li>
          ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-20 flex justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
