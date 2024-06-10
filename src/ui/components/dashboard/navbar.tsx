"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileMenu from "@/ui/components/dashboard/mobile-menu";
import { Button } from "@/ui/components/button";
import useDropdown from "@/hooks/useDropdown";
import { ModeToggle } from "@/ui/components/mode-toggle";

const NavBar = () => {
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
      <div className="content-container flex items-center justify-between">
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
        <nav className="hidden lg:flex flex-grow justify-center">
          <ul className="flex gap-10 items-center">
            <li>
              <Link href="/dashboard/categories">Categories</Link>
            </li>

            <li>
              <Link href="/dashboard/my-recipes">My recipes</Link>
            </li>
            <li>
              <Link href="/dashboard/favorites">Favorites</Link>
            </li>
            <li>
              <Link href="/dashboard/shopping-list">Shopping list</Link>
            </li>
            <li>
              <Link href="/dashboard/add-recipe">
                <Button className="btn-rounded">Add recipe</Button>
              </Link>
            </li>
          </ul>
        </nav>

        {isNavOpen && <MobileMenu closeMenu={closeMenu} />}

        <div className="relative flex items-center justify-end space-x-4 w-[300px]">
          {session && (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleDropdownClick}
              ref={buttonRef}
            >
              <div className="w-[44px] h-[44px] flex-shrink-0">
                <Image
                  src={session.user?.image || "/salad.png"}
                  alt="User avatar"
                  className="object-cover rounded-full"
                  width={578}
                  height={539}
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
                Profile
              </Link>
              <Button
                className="group mt-8 btn-logout px-5"
                onClick={() => signOut()}
              >
                Log out
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </Button>
            </motion.div>
          )}

          <button
            type="button"
            className="lg:hidden w-[28px] h-[28px]"
            onClick={handleNavOpen}
          >
            <FontAwesomeIcon
              icon={faBars}
              aria-label="Menu"
              className="w-[28px] h-[28px]"
            />
          </button>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
