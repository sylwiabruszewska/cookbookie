import RecipeCard from "./recipe-card";
import { Button } from "./button";

export default function CategoryCard() {
  return (
    <li>
      <h3 className="text-xl font-semibold mb-4">Title</h3>
      <RecipeCard />
      <Button className="ml-auto">See all</Button>
    </li>
  );
}
