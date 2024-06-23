"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RecipeWithFavoriteStatus } from "@lib/definitions";
import { addToFavorites, removeFromFavorites } from "@lib/actions";

import { Button } from "@ui/components/common/button";

interface RecipeCardSmallProps {
  recipe: RecipeWithFavoriteStatus;
}

export function RecipeCardSmall({ recipe }: RecipeCardSmallProps) {
  const { id, title, is_favorite, images } = recipe;
  const [isFavorite, setIsFavorite] = useState(is_favorite);
  const { t } = useTranslation(["dashboard"]);

  useEffect(() => {
    setIsFavorite(is_favorite);
  }, [is_favorite]);

  // HANDLER FAVORITES
  const handleToggleFavorites = async () => {
    if (!isFavorite) {
      try {
        await addToFavorites(id);
        setIsFavorite(true);
        toast.success(`${t("toast_add_to_favorites", { title })}`);
      } catch (error) {
        toast.error(t("toast_error"));
      }
    } else {
      try {
        await removeFromFavorites(id);
        setIsFavorite(false);
        toast(`${t("toast_remove_from_favorites", { title })}`);
      } catch (error) {
        toast.error(t("toast_error"));
      }
    }
  };

  return (
    <div className="relative w-full h-[340px] rounded-lg overflow-hidden">
      <Link href={`/dashboard/recipes/${id}`} className="group">
        <div className="relative w-full h-[340px]">
          <Image
            src={images[0] || "/placeholder.png"}
            fill
            className="object-cover transform duration-500 transition-transform group-hover:scale-105"
            alt={title}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 m-4 bg-[--background] rounded-lg p-4 shadow-sm">
          <h3 className="relative">{title}</h3>
        </div>
      </Link>
      <div className="absolute top-2 right-2 w-10 h-10 rounded-full z-40">
        <Button
          className="btn-icon-menu w-10 h-10"
          onClick={handleToggleFavorites}
          ariaLabel={t("toggle_favorite_status")}
        >
          <motion.div whileTap={{ scale: 1.3 }} className="inline-block">
            {isFavorite ? (
              <FontAwesomeIcon
                icon={["fas", "heart"]}
                aria-label={t("delete_from_favorites")}
                className="h-5 w-5 flex justify-center items-center text-red-500"
              />
            ) : (
              <FontAwesomeIcon
                icon={["far", "heart"]}
                aria-label={t("add_to_favorites")}
                className="h-5 w-5 flex justify-center items-center text-red-500"
              />
            )}
          </motion.div>
        </Button>
      </div>
    </div>
  );
}
