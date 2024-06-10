"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { faHeart as favoriteHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as notFavoriteHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@/ui/components/button";
import { RecipeWithFavoriteStatus } from "@lib/definitions";
import { addToFavorites, removeFromFavorites } from "@lib/actions";
import { motion } from "framer-motion";

interface RecipeCardSmallProps {
  recipe: RecipeWithFavoriteStatus;
}

export default function RecipeCardSmall({ recipe }: RecipeCardSmallProps) {
  const [isFavorite, setIsFavorite] = useState(recipe.is_favorite);

  useEffect(() => {
    setIsFavorite(recipe.is_favorite);
  }, [recipe, recipe.is_favorite]);

  // HANDLER FAVORITES
  const handleToggleFavorites = async () => {
    if (!isFavorite) {
      try {
        await addToFavorites(recipe.id);
        setIsFavorite(true);
        toast.success(`${recipe.title} is now in your favorites.`);
      } catch (error) {
        toast.error("Oops! Something went wrong. Please try again soon.");
      }
    } else {
      try {
        await removeFromFavorites(recipe.id);
        setIsFavorite(false);
        toast(`${recipe.title} has been removed from your favorites.`);
      } catch (error) {
        toast.error("Oops! Something went wrong. Please try again soon.");
      }
    }
  };

  return (
    <div className="relative w-full h-[340px] rounded-lg overflow-hidden">
      <Link href={`/dashboard/recipes/${recipe.id}`} className="group">
        <Image
          src={recipe.images[0] || "/placeholder.png"}
          fill
          className="object-cover transform duration-500 transition-transform group-hover:scale-105"
          alt={recipe.title}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        <div className="absolute bottom-0 left-0 right-0 m-4 bg-[--background] rounded-lg p-4 shadow-sm">
          <h3 className="relative">{recipe.title}</h3>
        </div>
      </Link>
      <div className="absolute top-2 right-2 w-10 h-10 rounded-full z-40">
        <Button
          className="btn-icon-menu w-7 h-7 lg:w-10 lg:h-10"
          onClick={handleToggleFavorites}
        >
          <motion.div whileTap={{ scale: 1.3 }} className="inline-block">
            {isFavorite ? (
              <FontAwesomeIcon
                icon={favoriteHeart}
                aria-label="Options"
                className="h-5 w-5 flex justify-center items-center"
              />
            ) : (
              <FontAwesomeIcon
                icon={notFavoriteHeart}
                aria-label="Options"
                className="h-5 w-5 flex justify-center items-center"
              />
            )}
          </motion.div>
        </Button>
      </div>
    </div>
  );
}
