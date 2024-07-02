"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useDropdown from "@/hooks/useDropdown";

import { Button } from "@ui/components/common/button";
import { Languages } from "@ui/components/common/languages";
import { ModeToggle } from "@ui/components/dashboard/mode-toggle";
import { MobileMenu } from "@/ui/components/dashboard/mobile-menu";

export const NavBar = () => {
  const { t } = useTranslation(["dashboard"]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { data: session } = useSession();
  const {
    isDropdownOpen,
    dropdownRef,
    buttonRef,
    closeDropdown,
    toggleDropdown,
  } = useDropdown();

  const closeMenu = () => {
    closeDropdown();
    setIsNavOpen(false);
  };
  const handleDropdownClick = () => {
    toggleDropdown();
  };
  const handleNavOpen = () => {
    closeDropdown();
    setIsNavOpen((prevState) => !prevState);
  };

  return (
    <header className="text-font py-4 w-full">
      <div className="content-container flex items-center justify-between lg:justify-start lg:gap-8">
        <Link href="/dashboard" className="flex items-center space-x-4">
          <Image
            src="/logo.svg"
            alt="CookBookie Logo"
            width={44}
            height={44}
            priority
          />
          <p className="max-md:hidden heading-brand font-semibold text-font">
            CookBookie
          </p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-center">
          <ul className="flex gap-10 items-center">
            <li>
              <Link href="/dashboard/categories">{t("categories")}</Link>
            </li>

            <li>
              <Link href="/dashboard/my-recipes">{t("my_recipes")}</Link>
            </li>
            <li>
              <Link href="/dashboard/favorites">{t("favorites")}</Link>
            </li>
            <li>
              <Link href="/dashboard/shopping-list">{t("shopping_list")}</Link>
            </li>
            <li>
              <Link href="/dashboard/add-recipe">
                <Button className="btn-rounded">{t("add_recipe")}</Button>
              </Link>
            </li>
          </ul>
        </nav>

        {isNavOpen && <MobileMenu closeMenu={closeMenu} />}

        <div className="flex gap-4 items-center lg:ml-auto">
          <div className="relative flex items-center justify-end space-x-4 w-[200px]">
            {session && (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleDropdownClick}
                ref={buttonRef}
              >
                <div className="w-[44px] h-[44px] flex-shrink-0">
                  <Image
                    src={session.user?.image}
                    alt="User avatar"
                    className="object-cover rounded-full"
                    style={{ width: "44px", height: "44px" }}
                    width={228}
                    height={228}
                    priority
                  />
                </div>

                <span className="font-semibold md:max-w-[200px] max-md:hidden">
                  {session.user?.name}
                </span>
              </div>
            )}

            {isDropdownOpen && (
              <motion.div
                ref={dropdownRef}
                className="dropdown"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/dashboard/profile"
                  className="link-hover-underline"
                  onClick={() => toggleDropdown()}
                >
                  {t("profile")}
                </Link>
                <Button
                  className="group mt-8 btn-logout px-5"
                  onClick={() => signOut()}
                >
                  {t("logout")}
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    &gt;
                  </span>
                </Button>

                <div className="mx-auto mt-4">
                  <Languages />
                </div>
              </motion.div>
            )}

            <button
              type="button"
              className="lg:hidden w-[28px] h-[28px]"
              onClick={handleNavOpen}
              aria-label="Menu"
            >
              <FontAwesomeIcon icon="bars" className="w-[28px] h-[28px]" />
            </button>
          </div>

          <div className="hidden lg:block">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
