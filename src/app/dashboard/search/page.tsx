import SearchForm from "@/ui/components/dashboard/search-form";

import { SearchTable } from "@ui/components/search/searchTable";

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

  return (
    <div className="flex flex-col justify-center">
      <h2 className="heading-l">Search</h2>

      <SearchForm className="mx-auto mb-12" />

      <SearchTable query={query} currentPage={currentPage} />
    </div>
  );
}
