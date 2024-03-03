import Image from "next/image";

import { Button } from "./ui/button";
import { poppins } from "@/app/ui/fonts";

export default function Home() {
  return (
    <main className="relative flex min-h-screen min-w-screen flex-col justify-center main-background bg-center bg-cover">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="z-10 text-white flex flex-col items-center gap-4">
        <Image
          src="/logo.svg"
          alt="CookBookie Logo"
          className="dark:invert mb-10"
          width={68}
          height={68}
          priority
        />

        <h1 className="text-3xl font-bold ">Welcome to the CookBookie App!</h1>

        <p
          className={`text-center text-regular mb-10 lg:w-1/2 ${poppins.className}`}
        >
          This app offers more than just a collection of recipes - it is
          designed to be your very own digital cookbook. You can easily save and
          retrieve your own recipes at any time.
        </p>

        <div className="flex flex-col gap-4 lg:flex-row">
          <Button className="group ">
            Registration{" "}
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </Button>

          <Button className="group ">
            Sign in{" "}
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </Button>
        </div>
      </div>
    </main>
  );
}
