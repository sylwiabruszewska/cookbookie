"use client";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { Button } from "@ui/components/button";
import { truncateDescription } from "@utils/recipes";
import { deleteRecipe } from "@lib/actions";
import useDropdown from "@/hooks/useDropdown";
import { motion } from "framer-motion";

interface RecipeCardMediumProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  cookingTime: string;
}

export const RecipeCardMedium: React.FC<RecipeCardMediumProps> = ({
  id,
  title,
  description,
  images,
  cookingTime,
}) => {
  const { isDropdownOpen, dropdownRef, buttonRef, toggleDropdown } =
    useDropdown();

  const handleDeleteRecipe = async () => {
    try {
      await deleteRecipe(id);
      toast.success(`${title} has been removed from your recipes.`);
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again soon.");
    }
  };

  return (
    <div className="relative flex flex-col h-30 rounded-lg h-full border border-[--gray-light] shadow-sm lg:shadow-md bg-white overflow-hidden h-[300px]">
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
              <Link href={`/dashboard/recipes/${id}/edit`}>
                <Button variant="icon" className="h-6 w-6">
                  <FontAwesomeIcon
                    icon={faPencil}
                    aria-label="Edit"
                    className="h-4 w-4"
                  />
                </Button>
              </Link>
              <Button
                onClick={handleDeleteRecipe}
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
        <div className="relative flex-shrink-0 w-full h-[170px] md:h-[220px] lg:h-[300px] rounded-t-lg overflow-hidden">
          <Image
            src={images[0]}
            fill
            className="object-cover md:group-hover:scale-105 transform duration-300 transition-transform"
            alt={title}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        </div>
        <div className="flex flex-col justify-between px-2 md:px-4 py-2 h-full gap-2">
          <div className="flex flex-col flex-grow">
            <h2 className="font-semibold text-base mb-2">{title}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};
