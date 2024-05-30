"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import { Button } from "@ui/components/button";
import { truncateDescription } from "@utils/recipes";
import { removeFromFavorites } from "@lib/actions";
// import Icon from "./icon";

interface RecipeCardFavoriteProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  cookingTime: string;
}

export const RecipeCardFavorite: React.FC<RecipeCardFavoriteProps> = ({
  id,
  title,
  description,
  images,
  cookingTime,
}) => {
  const handleRemoveFromFavorites = async () => {
    try {
      await removeFromFavorites(id);
      toast.success(`${title} has been removed from your favorites.`);
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again soon.");
    }
  };

  return (
    <div className="flex justify-between gap-2 h-30">
      <Link href={`/dashboard/recipes/${id}`} className="flex flex-grow">
        <div className="flex gap-4 flex-grow">
          <div className="flex-shrink-0 w-[124px] h-[124px] relative rounded-lg overflow-hidden">
            <Image
              src={images[0]}
              fill
              className="object-cover"
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
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[#3E4462] text-xs font-semibold">
                {cookingTime}
              </span>
              <Button className="h-6">See recipe</Button>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-start">
        <Button
          onClick={handleRemoveFromFavorites}
          variant="icon"
          className="h-6 w-6"
        >
          <FontAwesomeIcon
            icon={faTrash}
            aria-label="Remove"
            className="h-4 w-4"
          />
        </Button>
      </div>
    </div>
  );
};
