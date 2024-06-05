import { Suspense } from "react";

import { fetchUserFavorites } from "@lib/data";
import { MyFavorites } from "@ui/components/favorites/my-favorites";
import { Loader } from "@ui/components/loader";
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

  const keyString = `search=${searchParams?.page}`;

  return (
    <div>
      <h2 className="heading-l">Favorites</h2>

      <Suspense key={keyString} fallback={<Loader />}>
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
      </Suspense>
    </div>
  );
}
