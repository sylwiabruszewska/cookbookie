import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { NewsletterForm } from "@/ui/components/dashboard/newsletter-form";

export const Footer = () => {
  const { t } = useTranslation(["dashboard"]);

  return (
    <footer className="relative w-full mt-28">
      <div className="relative bg-[--gray-dark] dark:bg-[--primary-color] text-white py-12 font-thin">
        <div className="content-container">
          <div className="page-container flex flex-col items-center gap-y-8 md:flex-wrap md:gap-y-12 md:flex-row md:items-start lg:flex-nowrap lg:justify-between lg:items-start lg:gap-x-12">
            <div className="md:space-y-4 md:w-1/2 lg:w-1/3">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Image
                    src="/logo-light.svg"
                    alt="CookBookie Logo"
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
                <li>{t("footer_l1")}</li>
                <li>{t("footer_l2")}</li>
                <li>{t("footer_l3")}</li>
              </ul>
            </div>

            <ul className="flex flex-col items-center space-y-2 md:w-1/2 md:items-end lg:w-1/3 lg:items-center">
              <li>
                <Link href="/dashboard/categories">{t("categories")}</Link>
              </li>
              <li>
                <Link href="/dashboard/add-recipe">{t("add_recipe")}</Link>
              </li>
              <li>
                <Link href="/dashboard/my-recipes">{t("my_recipes")}</Link>
              </li>
              <li>
                <Link href="/dashboard/favorites">{t("favorites")}</Link>
              </li>
              <li>
                <Link href="/dashboard/shopping-list">
                  {t("shopping_list")}
                </Link>
              </li>
              <li>
                <Link href="/dashboard/search">{t("search")}</Link>
              </li>
            </ul>

            <div className="md:mx-auto md:w-2/3 lg:w-1/3">
              <div className="hidden lg:block">
                <h3 className="mb-2 font-semibold">{t("subscribe_h")}</h3>
                <p className="mb-6">{t("subscribe_p")}</p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="absolute top-[-70%] left-0 lg:top-[-100%] w-[315px] h-[486px] bg-cover bg-no-repeat negative-z-index bg-footer-left"></div>
      </div>
      <div className="py-4 text-font relative h-[66px] md:h-[78px] lg:h-[114px] flex items-center overflow-hidden">
        <div className="content-container">
          <div className="page-container flex justify-center space-x-4 text-xs text-center">
            <span>{t("copywright")}</span>
            <span>{t("terms")}</span>
          </div>
        </div>
        <div className="absolute bottom-[-100%] lg:bottom-[-50%] right-0 w-[260px] h-[320px] bg-cover bg-no-repeat negative-z-index bg-footer-right"></div>
      </div>
    </footer>
  );
};
