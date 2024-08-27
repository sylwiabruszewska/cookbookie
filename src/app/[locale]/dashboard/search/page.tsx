import { Metadata } from "next";
import { Suspense } from "react";

import initTranslations from "@/utils/i18n";
import { fetchRecipesPages } from "@/lib/data";

import { Loader } from "@/ui/components/common/loader";
import { SearchTable } from "@/ui/components/pages/search";
import { Pagination } from "@/ui/components/dashboard/pagination";
import { SearchForm } from "@/ui/components/dashboard/search-form";

type PageProps = {
  params: { locale: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = params.locale;
  const { t } = await initTranslations(locale, ["dashboard"]);

  const pageTitle = t("search");

  return {
    title: `${pageTitle}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const locale = params.locale;
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
