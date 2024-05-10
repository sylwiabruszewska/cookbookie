import RecipeCardSmall from "./recipe-card-small";
import { Button } from "./button";

export default function CategoryCard() {
  return (
    <li>
      <h3 className="text-xl font-semibold mb-4">Title</h3>
      <ul>
        <RecipeCardSmall />
      </ul>
      <Button variant="secondary" className="ml-auto">
        See all
      </Button>
    </li>
  );
}
