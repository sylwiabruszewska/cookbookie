import Image from "next/image";
import Link from "next/link";

export default function RecipeCardSmall() {
  return (
    <li className="mb-8">
      <Link href="/">
        <div className="relative h-323 rounded-lg">
          <Image
            src="/pancakes.png"
            width={343}
            height={323}
            className="object-cover"
            alt="Description"
          />
          <div className="absolute bottom-0 left-0 right-0 m-4 bg-white rounded-lg p-4">
            Description
          </div>
        </div>
      </Link>
    </li>
  );
}
