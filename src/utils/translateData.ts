import { TFunction } from "i18next";
import { Category } from "@/lib/definitions";

export default function translateCategories(
  categories: Category[],
  t: TFunction
) {
  return categories.map((category) => ({
    ...category,
    name: t(`categoriesArray.${category.name}`),
  }));
}
