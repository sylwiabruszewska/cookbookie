import { Suspense } from "react";

import { CategoryButtons } from "@ui/components/categories/category-buttons";
import { CategoryRecipesContent } from "@ui/components/categories/category-recipes-content";
import { Loader } from "@ui/components/loader";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    category?: string;
    page?: string;
  };
}) {
  const categoryName = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;

  const keyString = `search=${searchParams?.category}${searchParams?.page}`;

  return (
    <div>
      <h2 className="heading-l">Categories</h2>
      <Suspense fallback={""}>
        <CategoryButtons />
      </Suspense>
      <Suspense key={keyString} fallback={<Loader />}>
        <CategoryRecipesContent category={categoryName} page={currentPage} />
      </Suspense>
    </div>
  );
}
