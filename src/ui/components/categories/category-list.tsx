"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Category } from "@lib/definitions";
import { Button } from "@ui/components/button";

interface CategoryListProps {
  categories: Category[];
  page: number;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, page }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCategoryBtnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    categoryName: string
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("category", categoryName);
    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  };

  const activeCategory = searchParams.get("category");

  return (
    <ul className="flex flex-wrap gap-4 mb-12">
      {categories.map((category) => (
        <li key={category.id} className="mb-4">
          <Button
            onClick={(e) => handleCategoryBtnClick(e, category.name)}
            className={
              activeCategory === category.name
                ? "btn-dark hover:bg-[--gray-dark] rounded-lg text-base"
                : "btn-transparent text-base"
            }
          >
            {category.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
