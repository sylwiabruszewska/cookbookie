import { fetchUserRecipes } from "@lib/data";
import { MyRecipes } from "@ui/components/my-recipes/my-recipes";
import Pagination from "@/ui/components/pagination";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const { recipes, totalPages } = await fetchUserRecipes(currentPage);

  return (
    <div>
      <h2 className="heading-l">My recipes</h2>
      {recipes && recipes.length > 0 ? (
        <>
          <MyRecipes recipes={recipes} />

          {totalPages > 1 && (
            <div className="mt-20 flex justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          )}
        </>
      ) : (
        <p>Add some recipes!</p>
      )}
    </div>
  );
}
