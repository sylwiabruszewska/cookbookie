"use client";

import Image from "next/image";
import SearchForm from "@/ui/components/dashboard/search-form";

const HeroSection = () => {
  return (
    <div className="flex justify-center items-center lg:h-[40vh]">
      {/* <div
        style={{
          backgroundImage: "url(/blob.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "500px",
          height: "500px",
          position: "absolute",
          top: "0",
          right: "0",
          zIndex: "-100",
        }}
      ></div> */}

      <div className="text-center ">
        <h1 className="text-4xl font-bold">CookBookie</h1>
        <SearchForm />
      </div>
    </div>
  );
};

export default HeroSection;
