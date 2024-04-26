"use client";

import Image from "next/image";
import { useState } from "react";

import { Input } from "@/app/ui/components/recipe-form-components";
import { Button } from "@/app/ui/components/button";
import { Select } from "@/app/ui/components/recipe-form-components";
import { TextArea } from "@/app/ui/components/recipe-form-components";

import { Category } from "@/app/lib/definitions";

interface CategoriesProps {
  categories: Category[];
}

export default function AddRecipeForm({ categories }: CategoriesProps) {
  const [steps, setSteps] = useState([""]);

  const addStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSteps([...steps, ""]);
  };

  const updateStep = (index: number, value: string) => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[index] = value;
      return newSteps;
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-8">Add recipe</h2>

      <form className="mb-8 space-y-4">
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

        <Select
          id="time"
          name="time"
          label="Cooking time"
          options={[
            { value: "15", label: "15 minutes" },
            { value: "30", label: "30 minutes" },
            { value: "60", label: "1 hour" },
          ]}
        />

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-l font-semibold">Ingredients</h3>
          <div className="flex items-center space-x-2 p-0 border border-[--gray] rounded-[30px]">
            <button className="py-1 px-3" id="decrement" type="button">
              -
            </button>
            <span id="count">0</span>
            <button className="py-1 px-3" id="increment" type="button">
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between space-x-2 align-center">
          <div>
            <Input
              id="ingredientID"
              name="ingredient-name"
              type="text"
              label="Ingredient"
              placeholder="Ingredient"
            />
          </div>

          <div className="w-1/3 flex items-center space-x-2 ">
            <Input
              id="quantity"
              name="quantity"
              type="text"
              label="Quantity"
              placeholder="Quantity"
            />
            <Select
              id="quantityUnit"
              name="quantityUnit"
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

          <button className="mb-4" type="button">
            X
          </button>
        </div>

        <h3 className="text-l font-semibold">Recipe Preparation</h3>

        {steps.map((step, index) => (
          <TextArea
            key={index}
            id={`step-${index}`}
            placeholder={`Step ${index + 1}`}
            value={step}
            onChange={(e) => updateStep(index, e.target.value)}
          />
        ))}

        <Button variant="secondary" onClick={addStep}>
          +
        </Button>

        <Button className="mx-auto" variant="secondary">
          Add
        </Button>
      </form>
    </div>
  );
}
