import { Suspense } from "react";
import initTranslations from "@utils/i18n";

import SearchForm from "@/ui/components/dashboard/search-form";
import { fetchRecipesPages } from "@lib/data";
import { SearchTable } from "@ui/components/search/searchTable";
import Pagination from "@/ui/components/pagination";
import { Loader } from "@ui/components/loader";
import { getLocale } from "@lib/getLocal";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const keyString = `search=${searchParams?.query}${searchParams?.page}`;

  const totalPages = await fetchRecipesPages(query);

  return (
    <div className="flex flex-col justify-center">
      <h2 className="heading-l">{t("search")}</h2>

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