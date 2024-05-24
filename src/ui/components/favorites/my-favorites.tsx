import { Recipe } from "@lib/definitions";
import { RecipeCardFavorite } from "@ui/components/favorites/recipe-card-favorite";

interface MyFavoritesComponentProps {
  recipes: Recipe[];
}

export const MyFavorites: React.FC<MyFavoritesComponentProps> = ({
  recipes,
}) => {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id} className="mb-4">
          <RecipeCardFavorite
            title={recipe.title}
            description={recipe.description}
            images={recipe.images}
            cookingTime={recipe.cooking_time}
          />
        </li>
      ))}
    </ul>
  );
};
