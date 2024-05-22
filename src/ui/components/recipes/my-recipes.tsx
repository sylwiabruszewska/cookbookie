import { Recipe } from "@lib/definitions";
import { RecipeCardMedium } from "@/ui/components/recipe-card-medium";

interface MyRecipesComponentProps {
  recipes: Recipe[];
}

export const MyRecipes: React.FC<MyRecipesComponentProps> = ({ recipes }) => {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id} className="mb-4">
          <RecipeCardMedium
            title={recipe.title}
            description={recipe.description}
            images={recipe.images}
            cookingTime={recipe.cookingTime}
          />
        </li>
      ))}
    </ul>
  );
};
