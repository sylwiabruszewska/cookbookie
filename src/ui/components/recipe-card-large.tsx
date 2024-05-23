"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/ui/components/button";
import { Recipe } from "@lib/definitions";

interface RecipeProps {
  recipe: Recipe;
}

export default function RecipeCardLarge({ recipe }: RecipeProps) {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <h2 className="text-xl text-[--primary-color] font-semibold mt-4 mb-4 text-center">
        {recipe.title}
      </h2>
      <p className="text-center text-base">{recipe.description}</p>

      <Button variant="crazyRounded" className="self-center">
        Add to favorite recipes
      </Button>
      <div className="flex justify-center items-center gap-2">
        <Image
          src="/clock.svg"
          width={20}
          height={20}
          alt="Clock"
          className="object-cover"
        />
        <span className="text-center">{recipe.cooking_time}</span>
      </div>

      <div className="relative w-[343px] h-[343px]">
        <Image
          src={recipe.images[0]}
          fill
          alt={recipe.title}
          className="object-cover"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between space-x-2 mb-4 bg-[--primary-color] text-white p-2 rounded-lg">
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
              <input type="checkbox" className="w-1/4 flex justify-center" />
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
