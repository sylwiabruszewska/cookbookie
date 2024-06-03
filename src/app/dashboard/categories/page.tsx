import { fetchCategories } from "@lib/data";
import CategoryList from "@ui/components/categories/category-list";
import { CategoryTable } from "@ui/components/categories/category-table";

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
  const categories = await fetchCategories();

  return (
    <div>
      <h2 className="heading-l">Categories</h2>
      <CategoryList categories={categories} page={currentPage} />
      <CategoryTable category={categoryName} page={currentPage} />
    </div>
  );
}
