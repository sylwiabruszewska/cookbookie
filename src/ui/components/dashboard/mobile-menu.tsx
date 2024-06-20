"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@ui/components/button";
import { ModeToggle } from "../mode-toggle";

interface MobileMenuProps {
  closeMenu: () => void;
}

const MobileMenu = ({ closeMenu }: MobileMenuProps) => {
  const { t } = useTranslation(["dashboard"]);

  const handleLinkClick = () => {
    closeMenu();
  };

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <nav className="fixed inset-0 w-[100vw] h-[100vh] bg-[--green-light] dark:bg-[--gray-dark] z-50">
      <div className="absolute bottom-0 right-0 w-[321px] h-[343px] bg-cover bg-no-repeat bg-mobile-menu-bg"></div>

      <div className="relative content-container h-full mx-auto flex flex-col items-center justify-center">
        <div className="absolute top-4 left-0">
          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="flex items-center space-x-4"
          >
            <Image
              src="/logo.svg"
              alt="CookBookie Logo"
              width={44}
              height={44}
              priority
            />
            <p className="max-md:hidden heading-brand font-semibold text-[--font]">
              CookBookie
            </p>
          </Link>
        </div>
        <div className="absolute top-6 right-0">
          <button onClick={closeMenu} aria-label={t("close")}>
            <FontAwesomeIcon icon="xmark" className="w-[28px] h-[28px]" />
          </button>
        </div>

        <ul className="flex flex-col items-center justify-center text-l space-y-4 mb-32">
          <li onClick={handleLinkClick}>
            <Link href="/dashboard/add-recipe">
              <Button className="btn-rounded text-l mb-4">
                {t("add_recipe")}
              </Button>
            </Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/dashboard/categories">{t("categories")}</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/dashboard/my-recipes">{t("my_recipes")}</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/dashboard/favorites">{t("favorites")}</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/dashboard/shopping-list">{t("shopping_list")}</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link
              href="/dashboard/search"
              className="flex items-center space-x-2"
            >
              <FontAwesomeIcon
                icon="search"
                className="text-sm w-[20px] h-[20px]"
              />
              <span>{t("search")}</span>
            </Link>
          </li>
        </ul>

        <ModeToggle />
      </div>
    </nav>
  );
};

export default MobileMenu;
