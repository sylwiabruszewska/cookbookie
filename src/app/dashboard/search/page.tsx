import { Suspense } from "react";

import SearchForm from "@/ui/components/dashboard/search-form";
import { fetchRecipesPages } from "@lib/data";
import { SearchTable } from "@ui/components/search/searchTable";
import Pagination from "@/ui/components/pagination";
import { Loader } from "@ui/components/loader";

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

  const keyString = `search=${searchParams?.query}${searchParams?.page}`;

  const totalPages = await fetchRecipesPages(query);

  return (
    <div className="flex flex-col justify-center">
      <h2 className="heading-l">Search</h2>

      <Suspense fallback={<div className="h-16 lg:h-18 min-w-[300px]"></div>}>
        <SearchForm className="mx-auto mb-12" />
      </Suspense>

      <Suspense key={keyString} fallback={<Loader />}>
        <SearchTable query={query} currentPage={currentPage} />

        {query !== "" && totalPages > 1 && (
          <div className="mt-20 flex justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        )}
      </Suspense>
    </div>
  );
}
