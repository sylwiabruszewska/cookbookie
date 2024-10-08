import Link from "next/link";

import getLocale from "@/utils/getLocale";
import initTranslations from "@/utils/i18n";
import { RecipeWithFavoriteStatus } from "@/lib/definitions";

import { Button } from "@/ui/components/common/button";
import { RecipeCardSmall } from "@/ui/components/cards/recipe-card-small";

interface CategoryCardProps {
  name: string;
  categoryKey: string;
  recentRecipes: RecipeWithFavoriteStatus[];
  totalRecipes: number;
}

export async function CategoryCard({
  name,
  categoryKey,
  recentRecipes,
  totalRecipes,
}: CategoryCardProps) {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{name}</h3>
      <div className="overflow-hidden">
        <ul className="flex gap-4 overflow-x-auto md:overflow-x-scroll scrollbar-hide snap-x snap-mandatory custom-scroll">
          {recentRecipes.length > 0 ? (
            recentRecipes.map((recipe) => (
              <li
                key={recipe.id}
                className="mb-8 flex-shrink-0 w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] snap-center"
              >
                <RecipeCardSmall recipe={recipe} />
              </li>
            ))
          ) : (
            <p>No recent recipes found.</p>
          )}
        </ul>
      </div>
      {totalRecipes > 4 && (
        <Link href={`/dashboard/categories?category=${categoryKey}&page=1`}>
          <Button className="btn-green ml-auto">{t("see_all")}</Button>
        </Link>
      )}
    </div>
  );
}
