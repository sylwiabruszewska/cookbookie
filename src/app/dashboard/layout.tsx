"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import MobileMenu from "../ui/components/dashboard/mobile-menu";
import { Button } from "../ui/components/button";
import Input from "../ui/components/input";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeMenu = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <>
        <header className="text-gray-800 py-4 w-full">
          <div className="container mx-auto flex items-center justify-between w-[343px] md:w-[704px] lg:w-[1240px]">
            <Link href="/dashboard">
              <Image
                src="/logo.svg"
                alt="CookBookie Logo"
                className="dark:invert"
                width={44}
                height={44}
                priority
              />
            </Link>

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

            <div className="flex items-center">
              <div className="mr-6">User</div>

              <button
                className="lg:hidden"
                onClick={() => setIsNavOpen(!isNavOpen)}
              >
                {isNavOpen ? "Close" : "Menu"}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto w-full">
          <div className="container mx-auto w-[343px] md:w-[704px] lg:w-[1240px]">
            {children}
          </div>
        </main>

        <footer className="w-full">
          <div className="bg-[--gray-dark] text-white py-12">
            <div className="container mx-auto w-[343px] md:w-[704px] lg:w-[1240px]">
              <div className="flex flex-col items-center space-y-8">
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard">
                    <Image
                      src="/logo-dark.svg"
                      alt="CookBookie Logo"
                      className="dark:invert"
                      width={44}
                      height={44}
                      priority
                    />
                  </Link>
                  <h3 className="text-xl tracking-wider">CookBookie</h3>
                </div>
                <div>
                  <ul className="flex flex-col items-center space-y-2">
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
                </div>
                <div className="space-y-2">
                  <label className="sr-only ">Enter your email address</label>
                  <Input
                    id="newsletter"
                    name="newsletter"
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />

                  <Button type="submit" className="w-60">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 text-[--gray-dark]">
            <div className="container mx-auto w-[343px] md:w-[704px] lg:w-[1240px]">
              <div className="flex justify-center space-x-4 text-xs">
                <span>© 2023 All Rights Reserved.</span>
                <span>Terms of Service</span>
              </div>
            </div>
          </div>
        </footer>
      </>
    </div>
  );
}
