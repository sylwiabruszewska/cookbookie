"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEdgeStore } from "@/ui/components/providers/edgestore";

import useModal from "@/hooks/useModal";
import { deleteRecipe } from "@/lib/actions";
import useDropdown from "@/hooks/useDropdown";
import truncateDescription from "@/utils/truncateDescription";

import { Button } from "@/ui/components/common/button";
import { Modal } from "@/ui/components/dashboard/modal";

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
  const [isLgScreen, setIsLgScreen] = useState(false);
  const { isOpen, openModal, closeModal, modalRef } = useModal();
  const { edgestore } = useEdgeStore();
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

  const handleDeleteRecipe = async () => {
    try {
      await deleteRecipe(id);
      toast(`${t("toast_remove_from_recipes", { title })}`);
      if (images && images.length > 0) {
        for (const imageUrl of images) {
          await edgestore.publicFiles.delete({ url: imageUrl });
        }
      }
    } catch (error) {
      toast.error(t("toast_error"));
    }
  };

  const handleOpenModal = () => {
    toggleDropdown();
    openModal();
  };

  return (
    <div>
      <div className="flex justify-between gap-2 lg:gap-6 h-30">
        <Link
          href={`/dashboard/recipes/${id}`}
          className="group flex flex-grow"
        >
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

        <div className="relative flex items-start" ref={buttonRef}>
          <Button
            className="btn-icon-menu w-7 h-7 lg:w-10 lg:h-10"
            onClick={toggleDropdown}
            ariaLabel={t("options")}
          >
            <FontAwesomeIcon icon="ellipsis" className="h-4 w-4" />
          </Button>

          {isDropdownOpen && (
            <motion.div
              ref={dropdownRef}
              className="dropdown p-2 top-5 lg:top-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-start justify-center gap-4">
                <Link href={`/dashboard/recipes/${id}/edit`}>
                  <Button className="btn-icon h-6 w-6" ariaLabel={t("edit")}>
                    <FontAwesomeIcon icon="pencil" className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  onClick={handleOpenModal}
                  className="btn-icon h-6 w-6"
                  ariaLabel={t("remove")}
                >
                  <FontAwesomeIcon icon="trash" className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {isOpen && (
        <Modal onClose={closeModal} modalRef={modalRef}>
          <div className="flex flex-col gap-8 justify-center items-center">
            <span className="text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{title}</span>?
            </span>
            <div className="flex gap-8">
              <Button
                onClick={closeModal}
                className="btn-green bg-[--gray-medium]"
                ariaLabel={t("close")}
              >
                Cancel
              </Button>

              <Button
                className="btn-green bg-red-500"
                onClick={handleDeleteRecipe}
                ariaLabel={t("delete_recipe")}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
