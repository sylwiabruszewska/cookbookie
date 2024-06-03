import SearchForm from "@/ui/components/dashboard/search-form";
import { fetchRecipesPages } from "@lib/data";

import { SearchTable } from "@ui/components/search/searchTable";
import Pagination from "@ui/pagination";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchRecipesPages(query);

  return (
    <div className="flex flex-col justify-center">
      <h2 className="heading-l">Search</h2>

      <SearchForm className="mx-auto mb-12" />
      <SearchTable query={query} currentPage={currentPage} />

      {totalPages > 1 && (
        <div className="mt-20 flex justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
