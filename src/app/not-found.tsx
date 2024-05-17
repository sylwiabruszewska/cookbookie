import Image from "next/image";
import Link from "next/link";

import { Button } from "@ui/components/button";
import HomepageLayout from "@ui/layouts/homepage";

const NotFound = () => {
  return (
    <HomepageLayout>
      <div className="z-10 max-w-md w-[90vw] mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
        <Image
          src="/not-found.svg"
          alt="Not found"
          className="w-261 h-auto object-fit"
          width={261}
          height={170}
          priority
        />
        <h1 className="text-lg font-bold">We are sorry,</h1>
        <span>but the page you were looking for can’t be found.</span>
        <Link href="/" className="mt-4">
          <Button>Go back to home</Button>
        </Link>
      </div>
    </HomepageLayout>
  );
};

export default NotFound;
