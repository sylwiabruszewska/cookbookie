"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import MobileMenu from "@/ui/components/dashboard/mobile-menu";

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const closeMenu = () => {
    setIsNavOpen(false);
  };

  return (
    <header className="text-gray-800 py-4 w-full">
      <div className="container mx-auto flex items-center justify-between w-[343px] md:w-[704px] lg:w-[1240px]">
        <Link href="/dashboard" className="flex items-center space-x-4">
          <Image
            src="/logo.svg"
            alt="CookBookie Logo"
            className="dark:invert"
            width={44}
            height={44}
            priority
          />
          <p className="max-sm:hidden font-semibold text-lg text-black tracking-wide">
            CookBookie
          </p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-grow justify-center">
          <ul className="flex space-x-10">
            <li>
              <Link href="/dashboard/add-recipe">Add recipes</Link>
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
          </ul>
        </nav>

        {isNavOpen && <MobileMenu closeMenu={closeMenu} />}

        <div className="flex items-center space-x-4">
          <div className="w-[44px] h-[44px]">
            <Image
              src="/salad.png"
              alt="User avatar"
              className="object-contain"
              width={578}
              height={539}
              priority
            />
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsNavOpen((prevState) => !prevState)}
          >
            {isNavOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
