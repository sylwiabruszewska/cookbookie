import { Recipe } from "@/lib/definitions";
import { RecipeCardMedium } from "@ui/components/cards/recipe-card-medium";

interface MyRecipesComponentProps {
  recipes: Recipe[];
}

export const MyRecipes: React.FC<MyRecipesComponentProps> = ({ recipes }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="mb-4">
          <RecipeCardMedium
            id={recipe.id}
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
