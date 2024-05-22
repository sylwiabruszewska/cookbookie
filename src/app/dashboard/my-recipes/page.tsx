import { fetchUserRecipes } from "@lib/data";
import { MyRecipes } from "@ui/components/recipes/my-recipes";
import { getUserEmail } from "@utils/getUser";

export default async function MyRecipesPage() {
  const userEmail = await getUserEmail();
  const recipes = await fetchUserRecipes(userEmail);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-8">My recipes</h2>
      {recipes ? <MyRecipes recipes={recipes} /> : <p>Add some recipes!</p>}
    </div>
  );
}
