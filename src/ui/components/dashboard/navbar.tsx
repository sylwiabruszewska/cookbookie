"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MobileMenu from "@/ui/components/dashboard/mobile-menu";
import { Button } from "@/ui/components/button";

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const closeMenu = () => {
    setIsNavOpen(false);
  };

  return (
    <header className="text-gray-800 py-4 w-full">
      <div className="content-container flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-4">
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
                <Button variant="crazyRounded">Add recipe</Button>
              </Link>
            </li>
          </ul>
        </nav>

        {isNavOpen && <MobileMenu closeMenu={closeMenu} />}

        <div className="relative flex items-center justify-end space-x-4 w-[300px]">
          {session && (
            <div className="flex items-center gap-2">
              <div
                className="w-[44px] h-[44px] flex-shrink-0"
                onClick={() => setToggleDropdown((prev) => !prev)}
              >
                <Image
                  src={session.user?.image || "/salad.png"}
                  alt="User avatar"
                  className="object-cover rounded-full cursor-pointer"
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

          {toggleDropdown && (
            <div className="dropdown">
              <Link href="/profile" onClick={() => setToggleDropdown(false)}>
                Profile
              </Link>

              <Button
                variant="dark"
                className="group hover:bg-black"
                onClick={() => signOut()}
              >
                Log out
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </Button>
            </div>
          )}

          <button
            type="button"
            className="lg:hidden w-[28px] h-[28px]"
            onClick={() => setIsNavOpen((prevState) => !prevState)}
          >
            <FontAwesomeIcon
              icon={faBars}
              aria-label="Menu"
              className="w-[28px] h-[28px]"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
