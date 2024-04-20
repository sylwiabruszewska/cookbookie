import Image from "next/image";

import TextInput from "@/app/ui/components/input";
import { Button } from "@/app/ui/components/button";

export default function Page() {
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

        <TextInput
          id="title"
          name="title"
          type="text"
          label="Enter item title"
          placeholder="Enter item title"
        />

        <TextInput
          id="about"
          name="about"
          type="text"
          label="Enter about recipe"
          placeholder="Enter about recipe"
        />

        <TextInput
          id="category"
          name="category"
          type="text"
          label="Category"
          placeholder="Category"
        />

        <TextInput
          id="time"
          name="time"
          type="text"
          label="Cooking time"
          placeholder="Cooking time"
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

        <div className="flex space-x-2 align-center">
          <div className="w-2/3">
            <TextInput
              id="ingredientID"
              name="ingredient-name"
              type="text"
              label="Ingredient"
              placeholder="Ingredient"
            />
          </div>

          <div className="w-1/3">
            <TextInput
              id="measureID"
              name="measure-name"
              type="text"
              label="Measure"
              placeholder="Measure"
            />
          </div>

          <button className="mb-4" type="button">
            X
          </button>
        </div>

        <h3 className="text-l font-semibold">Recipe Preparation</h3>

        <textarea
          className="w-full p-2 bg-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-[--gray]"
          placeholder="Enter recipe"
        ></textarea>

        <Button variant="secondary">Add</Button>
      </form>
    </div>
  );
}
