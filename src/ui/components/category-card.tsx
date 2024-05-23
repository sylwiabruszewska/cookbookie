import RecipeCardSmall from "./recipe-card-small";
import { Button } from "./button";
import { Recipe } from "@lib/definitions";

interface CategoryCardProps {
  title: string;
  recentRecipes: Recipe[];
}

export default function CategoryCard({
  title,
  recentRecipes,
}: CategoryCardProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul>
        {recentRecipes.length > 0 ? (
          recentRecipes.map((recipe) => (
            <RecipeCardSmall key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p>No recent recipes found.</p>
        )}
      </ul>
      {recentRecipes.length > 0 && <Button className="ml-auto">See all</Button>}
    </div>
  );
}
