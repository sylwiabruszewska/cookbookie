import Image from "next/image";

import { Button } from "./button";

import image from "../../../../public/pancakes.png";

export default function RecipeCardLarge() {
  return (
    <div>
      <h2>Title</h2>
      <p>Description</p>
      <Button>Add to favorite recipes</Button>
      <span>Time</span>

      <Image
        src={image}
        width={undefined}
        height={undefined}
        alt="Description"
        className="w-full h-auto mb-10"
      />

      <div className="mb-10">
        <div className="flex justify-between space-x-2 mb-4 bg-[--primary-color] text-white p-2 rounded-lg">
          <div className="w-1/2">Ingredients</div>
          <div className="w-1/4 flex justify-center">Quantity</div>
          <div className="w-1/4 flex justify-center">Add to list</div>
        </div>
        <ul className="px-2">
          <li className="flex justify-between space-x-2 items-center pb-2 border-b border-gray-300">
            <div className="w-1/2">Salmon</div>
            <div className="w-1/4 flex justify-center">2</div>
            <input type="checkbox" className="w-1/4 flex justify-center" />
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-l font-semibold">Recipe Preparation</h3>
        <ul>
          <li>Season the salmon, then rub with oil.</li>
        </ul>
      </div>
    </div>
  );
}
