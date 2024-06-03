import { fetchUserFavorites } from "@lib/data";
import { MyFavorites } from "@ui/components/favorites/my-favorites";
import Pagination from "@/ui/components/pagination";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const { recipes, totalPages } = await fetchUserFavorites(currentPage);

  return (
    <div>
      <h2 className="heading-l">Favorites</h2>

      {recipes && recipes.length > 0 ? (
        <>
          <MyFavorites recipes={recipes} />

          {totalPages > 1 && (
            <div className="mt-20 flex justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          )}
        </>
      ) : (
        <p>Add some recipes to favorites!</p>
      )}
    </div>
  );
}
