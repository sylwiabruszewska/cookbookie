import RecipeCardSmall from "./recipe-card-small";
import { Button } from "@/ui/components/button";
import { RecipeWithFavoriteStatus } from "@lib/definitions";

interface CategoryCardProps {
  title: string;
  recentRecipes: RecipeWithFavoriteStatus[];
  totalRecipes: number;
}

export default function CategoryCard({
  title,
  recentRecipes,
  totalRecipes,
}: CategoryCardProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="overflow-hidden">
        <ul className="flex gap-4 overflow-x-auto md:overflow-x-scroll scrollbar-hide snap-x snap-mandatory custom-scroll">
          {recentRecipes.length > 0 ? (
            recentRecipes.map((recipe) => (
              <li
                key={recipe.id}
                className="mb-8 flex-shrink-0 w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] snap-center"
              >
                <RecipeCardSmall recipe={recipe} />
              </li>
            ))
          ) : (
            <p>No recent recipes found.</p>
          )}
        </ul>
      </div>
      {totalRecipes > 4 && (
        <Button className="btn-green ml-auto">See all</Button>
      )}
    </div>
  );
}
