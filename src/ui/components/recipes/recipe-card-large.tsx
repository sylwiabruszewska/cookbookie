"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/ui/components/button";
import { Ingredient, RecipeWithFavoriteStatus } from "@lib/definitions";
import {
  addToFavorites,
  addToShoppingList,
  removeFromFavorites,
  removeFromShoppingList,
} from "@lib/actions";
import { notFound } from "next/navigation";

interface RecipeCardLargeProps {
  recipe: RecipeWithFavoriteStatus;
  userShoppingList: Ingredient[];
}

export default function RecipeCardLarge({
  recipe,
  userShoppingList,
}: RecipeCardLargeProps) {
  const [isFavorite, setIsFavorite] = useState(recipe.is_favorite);
  const [shoppingListIds, setShoppingListIds] = useState<string[]>([]);
  const recipeId = recipe.id;

  if (!recipeId) {
    notFound();
  }

  useEffect(() => {
    setIsFavorite(recipe.is_favorite);
  }, [recipe, recipe.is_favorite]);

  useEffect(() => {
    const shoppingItemIds = userShoppingList.map((item) => item.id);
    setShoppingListIds(shoppingItemIds);
  }, [userShoppingList]);

  // HANDLER SHOPPING LIST
  // second version with serialized data not very helpful
  // not so good UX when clicking on checkbox, too slow response
  // maybe one action for all changes?
  const handleToggleCheckbox = async (ingredient: Ingredient) => {
    const isChecked = shoppingListIds.includes(ingredient.id);

    if (isChecked) {
      await handleRemoveFromShoppingList(ingredient.id);
    } else {
      await handleAddToShoppingList(ingredient);
    }
  };

  const handleAddToShoppingList = async (ingredient: Ingredient) => {
    try {
      await addToShoppingList({
        id: ingredient.id,
        ingredient: ingredient.ingredient,
        quantity: ingredient.quantity,
        quantityUnit: ingredient.quantityUnit,
      });
      toast.success(`${ingredient.ingredient} added to your shopping list.`);
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again soon.");
    }
  };

  const handleRemoveFromShoppingList = async (ingredientId: string) => {
    try {
      await removeFromShoppingList(ingredientId);
      toast.success("Ingredient deleted from your shopping list.");
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again soon.");
    }
  };

  // HANDLER FAVORITES
  const handleToggleFavorites = async () => {
    if (!isFavorite) {
      try {
        await addToFavorites(recipeId);
        setIsFavorite(true);
        toast.success(`${recipe.title} is now in your favorites.`);
      } catch (error) {
        toast.error("Oops! Something went wrong. Please try again soon.");
      }
    } else {
      try {
        await removeFromFavorites(recipeId);
        setIsFavorite(false);
        toast.success(`${recipe.title} has been removed from your favorites.`);
      } catch (error) {
        toast.error("Oops! Something went wrong. Please try again soon.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center md:gap-12 lg:w-1/2 lg:mx-auto md:my-12">
      <div className="flex flex-col justify-center gap-4">
        <h2 className="heading-l text-[32px] text-[--primary-color] mt-4 mb-4 text-center">
          {recipe.title}
        </h2>
        <p className="text-center">{recipe.description}</p>

        <Button
          onClick={handleToggleFavorites}
          className="self-center btn-rounded"
        >
          <FontAwesomeIcon
            icon={faStar}
            aria-label="Add to favorites"
            className="h-4 w-4 mr-4"
          />
          {isFavorite
            ? "Remove from favorite recipes"
            : "Add to favorite recipes"}
        </Button>
        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/clock.svg"
            width={20}
            height={20}
            alt="Clock"
            className="object-cover"
          />
          <span className="text-center">{recipe.cooking_time}</span>
        </div>
      </div>

      <div className="relative w-[343px] h-[343px] rounded-lg overflow-hidden md:mx-auto md:w-full md:h-[600px]">
        <Image
          src={recipe.images[0]}
          fill
          alt={recipe.title}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between space-x-2 bg-[--primary-color] text-white p-2 rounded-lg">
          <div className="w-1/2">Ingredients</div>
          <div className="w-1/4 flex justify-center">Quantity</div>
          <div className="w-1/4 flex justify-center">Add to list</div>
        </div>
        <ul className="px-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex justify-between space-x-2 items-center pt-2 pb-2 border-b border-gray-300"
            >
              <div className="w-1/2">{ingredient.ingredient}</div>
              <div className="w-1/4 flex justify-center">
                {ingredient.quantity} {ingredient.quantityUnit}
              </div>
              <input
                type="checkbox"
                checked={shoppingListIds.includes(ingredient.id)}
                className="w-1/4 flex justify-center"
                onChange={() => handleToggleCheckbox(ingredient)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Recipe Preparation</h3>
        <ul>
          {recipe.steps.map((step, index) => (
            <li
              key={index}
              className="flex gap-4 justify-start items-start mb-4"
            >
              <div className="bg-[--primary-color] rounded-full text-white w-6 h-6 flex justify-center items-center flex-shrink-0">
                <span>{index + 1}</span>
              </div>
              <span className="flex-grow">{step.step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
