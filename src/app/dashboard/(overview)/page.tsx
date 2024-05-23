import HeroSection from "@/ui/components/dashboard/hero";
import CategoryCard from "@/ui/components/category-card";
import { fetchRecentRecipes, fetchCategories } from "@lib/data";

export default async function Page() {
  const categories = await fetchCategories();

  const recentRecipesPromises = categories.map(async (category) => {
    const recentRecipes = await fetchRecentRecipes(category.id);
    return { categoryId: category.id, recipes: recentRecipes };
  });

  const recentRecipesForCategories = await Promise.all(recentRecipesPromises);
  return (
    <>
      <HeroSection />

      {categories && categories.length > 0 ? (
        <ul className="list-none">
          {categories.map((category) => {
            const matchingCategory = recentRecipesForCategories.find(
              (item) => item.categoryId === category.id
            );
            const recentRecipes =
              matchingCategory && matchingCategory.recipes
                ? matchingCategory.recipes
                : [];

            return (
              <li key={category.id} className="mb-8">
                <CategoryCard
                  title={category.name}
                  recentRecipes={recentRecipes}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No categories found.</p>
      )}
    </>
  );
}
