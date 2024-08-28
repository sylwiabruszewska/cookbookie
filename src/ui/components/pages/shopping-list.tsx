"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeFromShoppingList } from "@/lib/actions";
import { IngredientInShoppingList } from "@/lib/definitions";
import { generateRecipeUrl } from "@/utils/generateRecipeUrl";

import { Button } from "@/ui/components/common/button";

interface ShoppingListProps {
  userShoppingList: IngredientInShoppingList[];
}

// save shopping list items in state management

export const ShoppingList: React.FC<ShoppingListProps> = ({
  userShoppingList,
}) => {
  const { t } = useTranslation(["dashboard"]);

  const handleRemoveFromShoppingList = async (
    ingredient: IngredientInShoppingList
  ) => {
    try {
      const recipeId = ingredient.recipe_id!;

      await removeFromShoppingList(ingredient, recipeId);
      toast(t("toast_remove_from_shopping_list"));
    } catch (error) {
      toast.error(t("toast_error"));
    }
  };

  return (
    <>
      <div className="flex justify-between space-x-2 bg-[--primary-color] text-white p-2 rounded-lg">
        <div className="w-1/2">{t("product")}</div>
        <div className="w-1/4 flex justify-center">{t("quantity")}</div>
        <div className="w-1/4 flex justify-center"></div>
      </div>
      <ul className="px-2">
        {userShoppingList.map(async (ingredient: IngredientInShoppingList) => {
          let recipeTitle: string = "";
          if (ingredient.recipe_id) {
            recipeTitle = generateRecipeUrl(ingredient.recipe_title!);
          }

          return (
            <li
              key={ingredient.id}
              className="flex justify-between space-x-2 items-center border-b border-gray-300"
            >
              <div className="w-1/2">{ingredient.ingredient}</div>
              <div className="w-1/4 flex justify-center text-center">{`${ingredient.quantity}`}</div>
              <div className="w-1/4 flex justify-end">
                {ingredient.recipe_id ? (
                  <Link
                    href={`/dashboard/recipes/${recipeTitle}/${ingredient.recipe_id}`}
                  >
                    <Button className="btn-icon" ariaLabel={t("go_to_recipe")}>
                      <FontAwesomeIcon
                        icon="arrow-up-right-from-square"
                        className="h-4 w-4"
                      />
                    </Button>
                  </Link>
                ) : null}

                <Button
                  className="btn-icon"
                  onClick={() => handleRemoveFromShoppingList(ingredient)}
                  ariaLabel={t("remove")}
                >
                  <FontAwesomeIcon icon="xmark" className="h-4 w-4" />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
