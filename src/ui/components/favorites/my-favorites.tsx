import { Recipe } from "@lib/definitions";
import { RecipeCardFavorite } from "@ui/components/favorites/recipe-card-favorite";

interface MyFavoritesComponentProps {
  recipes: Recipe[];
}

export const MyFavorites: React.FC<MyFavoritesComponentProps> = ({
  recipes,
}) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="mb-4">
          <RecipeCardFavorite
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            images={recipe.images}
          />
        </li>
      ))}
    </ul>
  );
};
