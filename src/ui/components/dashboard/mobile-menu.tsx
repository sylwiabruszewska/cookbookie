"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

interface MobileMenuProps {
  closeMenu: () => void;
}

const MobileMenu = ({ closeMenu }: MobileMenuProps) => {
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
    <nav className="fixed inset-0 w-[100vw] h-[100vh] bg-[--green-light] z-50">
      <div className="relative content-container h-full mx-auto flex items-center justify-center">
        <div className="absolute top-4 left-0">
          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="flex items-center space-x-4"
          >
            <Image
              src="/logo.svg"
              alt="CookBookie Logo"
              className="dark:invert"
              width={44}
              height={44}
              priority
            />
            <p className="max-md:hidden heading-brand font-semibold text-black">
              CookBookie
            </p>
          </Link>
        </div>
        <div className="absolute top-6 right-0">
          <button onClick={closeMenu}>
            <FontAwesomeIcon
              icon={faXmark}
              aria-label="Close"
              className="w-[28px] h-[28px]"
            />
          </button>
        </div>

        <ul className="flex flex-col items-center justify-center text-[18px] space-y-4 font-semibold">
          <li onClick={handleLinkClick}>
            <Link href="/dashboard/add-recipe">Add recipes</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/dashboard/my-recipes">My recipes</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/dashboard/favorites">Favorites</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/dashboard/shopping-list">Shopping list</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link
              href="/dashboard/search"
              className="flex items-center space-x-2"
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="text-sm w-[20px] h-[20px]"
              />
              <span>Search</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileMenu;
