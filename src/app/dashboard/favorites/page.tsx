import { fetchUserFavorites } from "@lib/data";
import { MyFavorites } from "@ui/components/favorites/my-favorites";

export default async function Page() {
  const recipes = await fetchUserFavorites();

  return (
    <div>
      <h2 className="heading-l">Favorites</h2>

      {recipes && recipes.length > 0 ? (
        <MyFavorites recipes={recipes} />
      ) : (
        <p>Add some recipes to favorites!</p>
      )}
    </div>
  );
}
