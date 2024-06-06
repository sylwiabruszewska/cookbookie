"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import { Button } from "@ui/components/button";
import { truncateDescription } from "@utils/recipes";
import { removeFromFavorites } from "@lib/actions";

interface RecipeCardMediumProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  cookingTime: string;
}

export const RecipeCardFavorite: React.FC<RecipeCardMediumProps> = ({
  id,
  title,
  description,
  images,
  cookingTime,
}) => {
  const [isLgScreen, setIsLgScreen] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setIsLgScreen(true);
      } else {
        setIsLgScreen(false);
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const handleRemoveFromFavorites = async () => {
    try {
      await removeFromFavorites(id);
      toast(`${title} has been removed from your favorites.`);
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again soon.");
    }
  };

  return (
    <div className="flex justify-between gap-2 lg:gap-6 h-30">
      <Link href={`/dashboard/recipes/${id}`} className="group flex flex-grow">
        <div className="flex gap-4 flex-grow">
          <div className="flex-shrink-0 w-[124px] h-[124px] lg:w-[224px] lg:h-[224px] relative rounded-lg overflow-hidden">
            <Image
              src={images[0]}
              fill
              className="object-cover duration-500 transition-transform group-hover:scale-105"
              alt={title}
              sizes="(max-width: 480px) 50vw, (max-width: 768px) 25vw, 25vw"
            />
          </div>
          <div className="flex flex-col justify-between flex-grow gap-2">
            <div className="flex space-x-2 flex-shrink-1">
              <div className="flex flex-col flex-grow overflow-hidden">
                <h2 className="font-semibold text-base lg:text-xl mb-2 group-hover:text-[--primary-color] duration-500 transition-colors">
                  {title}
                </h2>
                <p className="lg:text-sm overflow-hidden">
                  {isLgScreen && truncateDescription(description, 30)}
                </p>
              </div>
            </div>

            <div className="flex justify-start items-end gap-2">
              <Image
                src="/icons/clock.svg"
                width={20}
                height={20}
                alt="Clock"
                className="object-cover"
              />
              <span className="text-xs font-semibold">{cookingTime}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="relative flex items-start">
        <Button
          className="btn-icon bg-[--gray-light] w-7 h-7 lg:w-10 lg:h-10"
          onClick={handleRemoveFromFavorites}
        >
          <FontAwesomeIcon
            icon={faTrash}
            aria-label="Options"
            className="h-4 w-4"
          />
        </Button>
      </div>
    </div>
  );
};
