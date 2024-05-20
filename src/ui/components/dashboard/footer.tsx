import Image from "next/image";
import Link from "next/link";

import NewsletterForm from "@/ui/components/newsletter-form";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="bg-[--gray-dark] text-white py-12">
        <div className="content-container">
          <div className="page-container flex flex-col items-center space-y-8">
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
              <h3 className="heading-brand text-white">CookBookie</h3>
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
            <NewsletterForm />
          </div>
        </div>
      </div>
      <div className="py-4 text-[--gray-dark]">
        <div className="content-container ">
          <div className="page-container flex justify-center space-x-4 text-xs">
            <span>© 2024 All Rights Reserved.</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
