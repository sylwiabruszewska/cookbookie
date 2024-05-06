"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Category } from "@/app/lib/definitions";
import { Button } from "@/app/ui/components/button";
import { Input } from "@/app/ui/components/recipe-form-components";
import { Select } from "@/app/ui/components/recipe-form-components";
import { TextArea } from "@/app/ui/components/recipe-form-components";
import { TimePicker } from "@/app/ui/components/recipe-form-components";
import {
  handleDecrement,
  handleIncrement,
  formatTime,
} from "@/app/utils/timePickerHelpers";

interface CategoriesProps {
  categories: Category[];
}

export default function AddRecipeForm({ categories }: CategoriesProps) {
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");

  // HANDLE ADD ITEM
  const addStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSteps([...steps, ""]);
  };

  const addIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIngredients([...ingredients, ""]);
  };

  // HANDLE REMOVE ITEM
  const handleRemoveItem = (
    indexToRemove: number,
    originalArray: string[],
    setUpdatedArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const copiedArray = [...originalArray];
    copiedArray.splice(indexToRemove, 1);
    setUpdatedArray(copiedArray);
  };

  const handleRemoveIngredient = (index: number) => {
    handleRemoveItem(index, ingredients, setIngredients);
  };

  const handleRemoveStep = (index: number) => {
    handleRemoveItem(index, steps, setSteps);
  };

  // HANDLE UPDATE ITEM
  const handleUpdateItem = (
    indexToUpdate: number,
    newValue: string,
    originalArray: string[],
    setUpdatedArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setUpdatedArray(() => {
      const newArray = [...originalArray];
      newArray[indexToUpdate] = newValue;
      return newArray;
    });
  };

  const updateIngredient = (index: number, value: string) => {
    handleUpdateItem(index, value, ingredients, setIngredients);
    console.log(ingredients);
  };

  const updateStep = (index: number, value: string) => {
    handleUpdateItem(index, value, steps, setSteps);
    console.log(steps);
  };

  // HANDLE SUBMIT
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // FORMAT COOKING TIME
  useEffect(() => {
    if (hours !== 0 || minutes !== 0) {
      formatTime(hours, minutes, setFormattedTime);
    }
  }, [hours, minutes]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-8">Add recipe</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <Image
          src="/add.png"
          alt="Add recipe"
          className="dark:invert mx-auto rounded-lg mb-8"
          width={279}
          height={268}
        />

        <Input
          id="title"
          name="title"
          type="text"
          label="Enter item title"
          placeholder="Enter item title"
        />

        <Input
          id="about"
          name="about"
          type="text"
          label="Enter about recipe"
          placeholder="Enter about recipe"
        />

        {categories && (
          <Select
            id="category"
            name="category"
            label="Category"
            options={categories.map((category: Category) => ({
              value: category.name,
              label: category.name,
            }))}
          />
        )}

        <TimePicker
          id="cookingTime"
          name="cookingTime"
          label="Cooking Time"
          placeholder="Cooking Time"
          value={formattedTime}
          onChange={(e) => {}}
          onDecrement={(mins, hrs, setHrs, setMins) =>
            handleDecrement(mins, hrs, setHrs, setMins)
          }
          onIncrement={(mins, setHrs, setMins) =>
            handleIncrement(mins, setHrs, setMins)
          }
          hours={hours}
          minutes={minutes}
          setHours={setHours}
          setMinutes={setMinutes}
        />

        <h3 className="text-l font-semibold mb-2">Ingredients</h3>

        {ingredients.map((ingredient, index) => (
          <div
            className="flex justify-between space-x-2 align-center"
            key={index}
          >
            <div className="flex-grow">
              <Input
                id={`ingredient-${index}`}
                name={`ingredient-name-${index}`}
                type="text"
                label="Ingredient"
                placeholder="Ingredient"
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
              />
            </div>

            <div className="w-1/3 flex items-center space-x-2">
              <Input
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                type="text"
                label="Quantity"
                placeholder="Quantity"
              />
              <Select
                id={`quantityUnit-${index}`}
                name={`quantityUnit-${index}`}
                label="Unit"
                options={[
                  { value: "tbs", label: "tbs" },
                  { value: "tsp", label: "tsp" },
                  { value: "kg", label: "kg" },
                  { value: "g", label: "g" },
                  { value: "piece", label: "piece" },
                ]}
              />
            </div>

            <button
              className="h-10"
              type="button"
              onClick={() => handleRemoveIngredient(index)}
            >
              <FontAwesomeIcon icon={faTrash} aria-label="Remove" />
            </button>
          </div>
        ))}

        <Button
          variant="secondary"
          className="mb-4 ml-auto h-10 w-10"
          onClick={addIngredient}
        >
          +
        </Button>

        <h3 className="text-l font-semibold mb-2">Recipe Preparation</h3>

        {steps.map((step, index) => (
          <div
            className="flex justify-between space-x-2 align-center"
            key={index}
          >
            <TextArea
              key={index}
              id={`step-${index}`}
              placeholder={`Step ${index + 1}`}
              value={step}
              onChange={(e) => updateStep(index, e.target.value)}
              className="mb-2"
            />
            <button
              className="h-10"
              type="button"
              onClick={() => handleRemoveStep(index)}
            >
              <FontAwesomeIcon icon={faTrash} aria-label="Remove" />
            </button>
          </div>
        ))}

        <Button
          variant="secondary"
          className="mb-4 ml-auto h-10 w-10"
          onClick={addStep}
        >
          +
        </Button>

        <Button className="mx-auto px-4" variant="secondary" type="submit">
          Add recipe
        </Button>
      </form>
    </div>
  );
}
