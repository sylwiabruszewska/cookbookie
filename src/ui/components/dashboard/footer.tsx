import Image from "next/image";
import Link from "next/link";

import NewsletterForm from "@/ui/components/newsletter-form";

const Footer = () => {
  return (
    <footer className="relative w-full mt-28">
      <div className="bg-[--gray-dark] text-white py-12 font-thin relative">
        <div className="content-container">
          <div className="page-container flex flex-col items-center gap-y-8 md:flex-wrap md:gap-y-12 md:flex-row md:items-start lg:flex-nowrap lg:justify-between lg:items-start lg:gap-x-12">
            <div className="md:space-y-4 md:w-1/2 lg:w-1/3">
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
                <h3 className="heading-brand text-white font-bold">
                  CookBookie
                </h3>
              </div>
              <ul className="hidden md:block space-y-2 list-disc pl-5">
                <li>Database of recipes that can be replenished </li>
                <li>Flexible search for desired and unwanted ingredients</li>
                <li>Ability to add your own recipes with photos</li>
                <li>Convenient and easy to use</li>
              </ul>
            </div>

            <ul className="flex flex-col items-center space-y-2 md:w-1/2 md:items-end lg:w-1/3 lg:items-center">
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

            <div className="md:mx-auto md:w-2/3 lg:w-1/3">
              <div className="hidden lg:block">
                <h3 className="mb-2 font-semibold">
                  Subscribe to our Newsletter
                </h3>
                <p className="mb-6">
                  Subscribe up to our newsletter. Be in touch with latest news
                  and special offers, etc.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="absolute top-[-70%] left-0 lg:top-[-100%] w-[315px] h-[486px] bg-cover bg-no-repeat negative-z-index bg-footer-left"></div>
      </div>
      <div className="py-4 text-[--gray-dark] relative h-[66px] md:h-[78px] lg:h-[114px] flex items-center overflow-hidden">
        <div className="content-container">
          <div className="page-container flex justify-center space-x-4 text-xs">
            <span>© 2024 All Rights Reserved.</span>
            <span>Terms of Service</span>
          </div>
        </div>
        <div className="absolute bottom-[-100%] lg:bottom-[-50%] right-0 w-[260px] h-[320px] bg-cover bg-no-repeat negative-z-index bg-footer-right"></div>
      </div>
    </footer>
  );
};

export default Footer;
