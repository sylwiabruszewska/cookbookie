import Image from "next/image";
import Link from "next/link";

import HomepageLayout from "./ui/layouts/homepage";
import { Button } from "./ui/button";
import { poppins } from "@/app/ui/fonts";

export default function Home() {
  return (
    <HomepageLayout>
      <div className="z-10 text-white flex flex-col items-center gap-4">
        <Image
          src="/logo.svg"
          alt="CookBookie Logo"
          className="dark:invert lg:mb-10"
          width={68}
          height={68}
          priority
        />

        <h1 className="text-3xl font-bold text-center">
          Welcome to the CookBookie App!
        </h1>

        <p
          className={`text-center text-regular mb-10 w-3/4 lg:w-1/2 ${poppins.className}`}
        >
          This app offers more than just a collection of recipes - it is
          designed to be your very own digital cookbook. You can easily save and
          retrieve your own recipes at any time.
        </p>

        <div className="flex flex-col gap-4 lg:flex-row">
          <Link href="/register">
            <Button className="group ">
              Registration{" "}
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </Button>
          </Link>

          <Link href="/login">
            <Button className="group ">
              Sign in{" "}
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </HomepageLayout>
  );
}
