"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@/ui/components/button";
import { Ingredient } from "@lib/definitions";

interface ShoppingListProps {
  userShoppingList: Ingredient[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({ userShoppingList }) => {
  return (
    <>
      <div className="flex justify-between space-x-2 mb-4 bg-[--primary-color] text-white p-2 rounded-lg">
        <div className="w-1/2">Product</div>
        <div className="w-1/4 flex justify-center">Quantity</div>
        <div className="w-1/4 flex justify-center">Remove</div>
      </div>
      <ul className="px-2">
        {userShoppingList.map((ingredient: Ingredient) => (
          <li
            key={ingredient.id}
            className="flex justify-between space-x-2 items-center pb-2 border-b border-gray-300"
          >
            <div className="w-1/2">{ingredient.ingredient}</div>
            <div className="w-1/4 flex justify-center">{`${ingredient.quantity} ${ingredient.quantityUnit}`}</div>
            <div className="w-1/4 flex justify-center">
              <Button variant="icon">
                <FontAwesomeIcon
                  icon={faXmark}
                  aria-label="Remove"
                  className="h-4 w-4"
                />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ShoppingList;
