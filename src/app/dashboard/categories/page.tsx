import { fetchCategories } from "@lib/data";
import { Button } from "@ui/components/button";

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <div>
      <h2 className="heading-l">Categories</h2>

      <ul className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <li key={category.id} className="mb-4">
            <Button>{category.name}</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
