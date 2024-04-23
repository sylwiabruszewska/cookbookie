import Image from "next/image";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Button } from "./button";
import Icon from "./icon";

export default function RecipeCardMedium() {
  return (
    <div className="flex p-2 justify-between space-x-4 h-30">
      <div className="flex-shrink-0 w-[124px] h-[124px] relative rounded-lg">
        <Image
          src="/pancakes.png"
          fill={true}
          object-fit="cover"
          alt="Description"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      </div>
      <div className="flex flex-col justify-between flex-shrink-1">
        <div className="flex space-x-2 ">
          <div className="flex flex-col">
            <h2 className="font-semibold text-[#3E4462] mb-2">Recipe title</h2>
            <p className="text-xs overflow-hidden h-12">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta,
              delectus. Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Dicta, delectus.
            </p>
          </div>
          <div>
            <Button variant="secondary" className="h-6 w-6 px-0 text-black">
              <Icon icon={faTrash} aria-label="Remove" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-[#3E4462] text-xs font-semibold">Time</span>
          <Button className="h-7 px-2">See recipe</Button>
        </div>
      </div>
    </div>
  );
}
