"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@ui/components/button";
import { truncateDescription } from "@utils/recipes";
// import Icon from "./icon";

interface RecipeCardFavoriteProps {
  title: string;
  description: string;
  images: string[];
  cookingTime: string;
}

export const RecipeCardFavorite: React.FC<RecipeCardFavoriteProps> = ({
  title,
  description,
  images,
  cookingTime,
}) => {
  return (
    <div className="flex justify-between space-x-4 h-30">
      <div className="flex-shrink-0 w-[124px] h-[124px] relative rounded-lg">
        <Image
          src={images[0]}
          fill
          object-fit="cover"
          alt={title}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex space-x-2 flex-shrink-1">
          <div className="flex flex-col flex-grow">
            <h2 className="font-semibold text-[#3E4462] mb-2">{title}</h2>
            <p className="text-xs overflow-hidden">
              {truncateDescription(description, 10)}
            </p>
          </div>
          <div>
            <Button variant="icon" className="h-6 w-6">
              <FontAwesomeIcon
                icon={faTrash}
                aria-label="Remove"
                className="h-4 w-4"
              />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-[#3E4462] text-xs font-semibold">
            {cookingTime}
          </span>
          <Button className="h-6">See recipe</Button>
        </div>
      </div>
    </div>
  );
};
