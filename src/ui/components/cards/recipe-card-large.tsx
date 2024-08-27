"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Ingredient,
  IngredientInShoppingList,
  RecipeWithFavoriteStatus,
} from "@/lib/definitions";
import {
  addToFavorites,
  addToShoppingList,
  removeFromFavorites,
  removeFromShoppingList,
} from "@/lib/actions";
import { Button } from "@/ui/components/common/button";

interface RecipeCardLargeProps {
  recipe: RecipeWithFavoriteStatus;
  userShoppingList: IngredientInShoppingList[];
}

export function RecipeCardLarge({
  recipe,
  userShoppingList,
}: RecipeCardLargeProps) {
  const {
    id,
    title,
    description,
    is_favorite,
    images,
    cooking_time,
    ingredients,
    steps,
  } = recipe;
  const [isFavorite, setIsFavorite] = useState(is_favorite);

  const mainPhoto = images.length > 0 ? images[0] : "/placeholder.png";
  let recipeGallery;
  const { t } = useTranslation(["dashboard"]);

  if (!id) {
    notFound();
  }

  if (images.length > 1) {
    const recipeImagesWithoutMainPhoto = images.slice(1);

    recipeGallery = recipeImagesWithoutMainPhoto.map((image, index) => {
      return (
        <Image
          key={index}
          src={image}
          style={{
            width: "100%",
            height: "auto",
          }}
          width={500}
          height={500}
          alt={title}
          className="object-cover mb-8 rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      );
    });
  }

  useEffect(() => {
    setIsFavorite(is_favorite);
  }, [is_favorite]);

  const handleToggleCheckbox = async (ingredient: Ingredient) => {
    const isInShoppingList = userShoppingList.some(
      (item) => item.id === ingredient.id
    );

    if (isInShoppingList) {
      await handleRemoveFromShoppingList(ingredient);
    } else {
      await handleAddToShoppingList(ingredient);
    }
  };

  const handleAddToShoppingList = async (ingredient: Ingredient) => {
    try {
      await addToShoppingList(
        {
          id: ingredient.id,
          ingredient: ingredient.ingredient,
          quantity: ingredient.quantity,
        },
        id,
        title
      );
      toast.success(
        `${t("toast_add_shopping_list", {
          ingredient: ingredient.ingredient,
        })}`
      );
    } catch (error) {
      toast.error(t("toast_error"));
    }
  };

  const handleRemoveFromShoppingList = async (ingredient: Ingredient) => {
    try {
      await removeFromShoppingList(ingredient, id);
      toast(t("toast_remove_from_shopping_list"));
    } catch (error) {
      toast.error(t("toast_error"));
    }
  };

  // HANDLER FAVORITES
  const handleToggleFavorites = async () => {
    if (!isFavorite) {
      try {
        await addToFavorites(id);
        setIsFavorite(true);
        toast.success(`${t("toast_add_to_favorites", { title })}`);
      } catch (error) {
        toast.error(t("toast_error"));
      }
    } else {
      try {
        await removeFromFavorites(id);
        setIsFavorite(false);
        toast(`${t("toast_remove_from_favorites", { title })}`);
      } catch (error) {
        toast.error(t("toast_error"));
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center md:gap-12 lg:w-1/2 lg:mx-auto md:my-12">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="heading-l text-[32px] text-[--primary-color] mt-4 mb-4 text-center">
          {title}
        </h1>
        <p className="text-center">{description}</p>

        <Button
          onClick={handleToggleFavorites}
          className="self-center btn-rounded"
          ariaLabel={t("delete_from_favorites")}
        >
          <FontAwesomeIcon icon="heart" className="h-4 w-4 mr-4" />
          {isFavorite ? t("delete_from_favorites") : t("add_to_favorites")}
        </Button>
        <div className="flex justify-center items-center gap-2">
          <FontAwesomeIcon
            icon={["far", "clock"]}
            aria-hidden="true"
            className="h-5 w-5 flex justify-center items-center text-[--font]"
          />
          <span className="text-center">{cooking_time}</span>
        </div>
      </div>

      <div className="relative w-[343px] rounded-lg overflow-hidden md:mx-auto md:w-full">
        <Image
          src={mainPhoto}
          style={{
            width: "100%",
            height: "auto",
          }}
          width={500}
          height={500}
          alt={title}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center space-x-2 bg-[--primary-color] text-white p-2 rounded-lg">
          <div className="w-1/2">{t("ingredients")}</div>
          <div className="w-1/4 flex justify-center">{t("quantity")}</div>
          <div className="w-1/4 flex justify-center text-center">
            {t("add_to_shopping_list")}
          </div>
        </div>
        <ul className="px-2">
          {ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex justify-between space-x-2 items-center pt-2 pb-2 border-b border-gray-300"
            >
              <div className="w-1/2">{ingredient.ingredient}</div>
              <div className="w-1/4 flex justify-center">
                {ingredient.quantity}
              </div>
              <input
                type="checkbox"
                checked={userShoppingList.some(
                  (item) => item.id === ingredient.id
                )}
                className="w-1/4 flex justify-center"
                onChange={() => handleToggleCheckbox(ingredient)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">
          {t("recipe_preparation")}
        </h3>
        <ul>
          {steps.map((step, index) => (
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

      {recipeGallery && (
        <div className="md:mx-auto md:w-full">{recipeGallery}</div>
      )}
    </div>
  );
}
