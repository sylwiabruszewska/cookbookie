"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Category } from "@lib/definitions";
import { Button } from "@ui/components/common/button";

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCategoryBtnClick = (categoryKey: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", categoryKey);
    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  };

  const activeCategory = searchParams.get("category");

  return (
    <ul className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-10 mb-12">
      {categories.map((category) => (
        <li key={category.id} className="mb-4">
          <Button
            onClick={() => handleCategoryBtnClick(category.key)}
            className={
              activeCategory === category.key
                ? "btn-dark hover:bg-[--gray-dark] rounded-lg text-base dark:bg-[--gray-medium]"
                : "btn-transparent text-base px-2"
            }
          >
            {category.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};
