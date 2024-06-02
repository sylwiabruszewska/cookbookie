"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import { Button } from "@ui/components/button";
import { truncateDescription } from "@utils/recipes";
import { removeFromFavorites } from "@lib/actions";
import useDropdown from "@/hooks/useDropdown";
import { motion } from "framer-motion";
// import Icon from "./icon";

interface RecipeCardFavoriteProps {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export const RecipeCardFavorite: React.FC<RecipeCardFavoriteProps> = ({
  id,
  title,
  description,
  images,
}) => {
  const { isDropdownOpen, dropdownRef, buttonRef, toggleDropdown } =
    useDropdown();

  const handleRemoveFromFavorites = async () => {
    try {
      await removeFromFavorites(id);
      toast.success(`${title} has been removed from your favorites.`);
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again soon.");
    }
  };

  return (
    <div className="relative flex flex-col h-30 h-full overflow-hidden">
      <div className="absolute top-2 right-2 z-40" ref={buttonRef}>
        <Button
          className="bg-[--gray-light] w-7 h-7 rounded-lg flex justify-center items-center"
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon
            icon={faEllipsisH}
            aria-label="Options"
            className="h-4 w-4"
          />
        </Button>

        {isDropdownOpen && (
          <motion.div
            ref={dropdownRef}
            className="dropdown p-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-start justify-center gap-4">
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
          </motion.div>
        )}
      </div>

      <Link
        href={`/dashboard/recipes/${id}`}
        className="group flex flex-col w-full h-full"
      >
        <div className="relative flex-shrink-0 w-full h-[170px] md:h-[220px] lg:h-[300px] rounded-lg overflow-hidden">
          <Image
            src={images[0]}
            fill
            // className="object-cover"
            className="object-cover transform duration-500 transition-transform group-hover:scale-105"
            alt={title}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          {/* <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden transition duration-300 bg-black opacity-0 group-hover:opacity-10"></div> */}
        </div>
        <div className="flex flex-col flex-grow justify-between w-[100%] h-full gap-2 shadow-none md:group-hover:-translate-y-6 transition-all duration-500 md:bg-white rounded-b-lg py-2 md:py-4 px-0 md:group-hover:px-4 md:group-hover:shadow-md md:group-hover:bg-[--gray-dark] mx-auto md:group-hover:text-white">
          <h2 className="font-semibold md:text-base z-30">{title}</h2>
          {/* <p className="text-xs hidden md:block overflow-hidden flex-grow z-30">
          {truncateDescription(description, 10)}
        </p> */}
        </div>
      </Link>
    </div>
  );
};
