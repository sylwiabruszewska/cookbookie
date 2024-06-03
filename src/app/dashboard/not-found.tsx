import Image from "next/image";
import Link from "next/link";

import { Button } from "@ui/components/button";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
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
      <Link href="/dashboard" className="mt-4">
        <Button className="btn-green">Go back to dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFound;
