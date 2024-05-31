"use client";

import Image from "next/image";
import SearchForm from "@/ui/components/dashboard/search-form";
import Background from "@/ui/components/dashboard/background";

const HeroImage = () => {
  return (
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
  );
};

const HeroSection = () => {
  return (
    <div className="h-[90vh] md:min-h-[500px] md:h-[50%] lg:h-[90vh] py-12 md:py-8 lg:px-14 ">
      <Background />

      <div className="flex flex-col md:flex-row gap-14 md:gap-8 justify-between items-center">
        <div className="w-full md:w-1/2">
          <h1 className="text-[52px] md:text-[52px] ld:text-[100px] text-center md:text-left">
            <span className="text-[--primary-color]">Cook</span>
            <span className="text-[--gray-dark]">Bookie</span>
          </h1>
          <p className="md:text-base lg:text-xl text-center md:text-left">
            &ldquo;What to cook?&rdquo; is not only a recipe app, it is, in
            fact, your cookbook. You can add your own recipes to save them for
            the future.
          </p>
          <SearchForm />
        </div>
        <HeroImage />
      </div>
    </div>
  );
};

export default HeroSection;
