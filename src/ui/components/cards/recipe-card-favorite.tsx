"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeFromFavorites } from "@/lib/actions";
import truncateDescription from "@/utils/truncateDescription";

import { Button } from "@/ui/components/common/button";

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
  const { t } = useTranslation(["dashboard"]);

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
      toast.error(t("toast_error"));
    }
  };

  return (
    <div className="flex justify-between gap-2 lg:gap-6 h-30">
      <Link href={`/dashboard/recipes/${id}`} className="group flex flex-grow">
        <div className="flex gap-4 flex-grow">
          <div className="flex-shrink-0 w-[124px] h-[124px] lg:w-[224px] lg:h-[224px] relative rounded-lg overflow-hidden">
            <Image
              src={images[0] || "/placeholder.png"}
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
              <FontAwesomeIcon
                icon={["far", "clock"]}
                aria-hidden="true"
                className="h-5 w-5 flex justify-center items-center text-[--font]"
              />
              <span className="text-xs font-semibold">{cookingTime}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="relative flex items-start">
        <Button
          className="btn-icon-menu w-7 h-7 lg:w-10 lg:h-10"
          onClick={handleRemoveFromFavorites}
          ariaLabel={t("delete_from_favorites")}
        >
          <motion.div whileTap={{ scale: 1.3 }} className="inline-block">
            <FontAwesomeIcon
              icon={["fas", "heart"]}
              className="h-5 w-5 flex justify-center items-center text-red-500"
            />
          </motion.div>
        </Button>
      </div>
    </div>
  );
};
