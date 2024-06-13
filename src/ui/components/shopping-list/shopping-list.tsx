"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { Button } from "@/ui/components/button";
import { Ingredient } from "@lib/definitions";
import { removeFromShoppingList } from "@lib/actions";

interface ShoppingListProps {
  userShoppingList: Ingredient[];
}

export const ShoppingList: React.FC<ShoppingListProps> = ({
  userShoppingList,
}) => {
  const { t } = useTranslation(["dashboard"]);

  const handleRemoveFromShoppingList = async (ingredientId: string) => {
    try {
      await removeFromShoppingList(ingredientId);
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
        <div className="w-1/4 flex justify-center">{t("remove")}</div>
      </div>
      <ul className="px-2">
        {userShoppingList.map((ingredient: Ingredient) => (
          <li
            key={ingredient.id}
            className="flex justify-between space-x-2 items-center border-b border-gray-300"
          >
            <div className="w-1/2">{ingredient.ingredient}</div>
            <div className="w-1/4 flex justify-center">{`${ingredient.quantity} ${ingredient.quantityUnit}`}</div>
            <div className="w-1/4 flex justify-center">
              <Button
                className="btn-icon"
                onClick={() => handleRemoveFromShoppingList(ingredient.id)}
                ariaLabel={t("remove")}
              >
                <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
