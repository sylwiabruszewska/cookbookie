"use client";

import Image from "next/image";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

import { Background } from "@/ui/components/dashboard/background";
import { SearchForm } from "@/ui/components/dashboard/search-form";

export const HeroSection = () => {
  const { t } = useTranslation(["dashboard"]);

  return (
    <div className="h-[90vh] md:min-h-[500px] md:h-[50%] lg:h-[90vh] py-4 md:py-8 lg:px-14 md:mb-12 lg:max-h-[700px]">
      <Background />

      <div className="flex flex-col md:flex-row gap-8 lg:gap-20 justify-between items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h1 className="text-[52px] md:text-[52px] lg:text-[82px]">
            <span className="text-[--primary-color]">Cook</span>
            <span className="text-[--font]">Bookie</span>
          </h1>
          <p className="md:text-base lg:text-xl text-center md:text-left mb-8 lg:mb-20">
            {t("hero_text")}
          </p>
          <Suspense
            fallback={<div className="h-16 lg:h-18 min-w-[300px]"></div>}
          >
            <SearchForm className="mx-auto mb-12" />
          </Suspense>
        </div>
        <div className="relative w-[320px] h-[296px] md:w-[378px] md:h-[351px] lg:w-[578px] lg:h-[539px]">
          <Image
            src="/hero/salad.png"
            alt="Salad"
            fill
            className="object-cover"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
};
