import CategoryCard from "@/ui/components/category-card";
import { fetchRecentRecipes, fetchCategories } from "@lib/data";

export async function DashboardContent() {
  const categories = await fetchCategories();

  const recentRecipesPromises = categories.map(async (category) => {
    const { recentRecipes, totalRecipes } = await fetchRecentRecipes(
      category.id
    );
    return { categoryId: category.id, recentRecipes, totalRecipes };
  });

  const recentRecipesForCategories = await Promise.all(recentRecipesPromises);

  return (
    <div>
      {categories && categories.length > 0 ? (
        <ul className="list-none">
          {categories.map((category) => {
            const matchingCategory = recentRecipesForCategories.find(
              (item) => item.categoryId === category.id
            );

            const recentRecipes = matchingCategory
              ? matchingCategory.recentRecipes
              : [];
            const totalRecipes = matchingCategory
              ? matchingCategory.totalRecipes
              : 0;

            return (
              <li key={category.id} className="mb-8">
                <CategoryCard
                  title={category.name}
                  recentRecipes={recentRecipes}
                  totalRecipes={totalRecipes}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
}
