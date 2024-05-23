import { Recipe } from "@lib/definitions";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardSmallProps {
  recipe: Recipe;
}

export default function RecipeCardSmall({ recipe }: RecipeCardSmallProps) {
  return (
    <li className="mb-8">
      <Link href="/">
        <div className="relative w-[343px] h-[343px] rounded-lg overflow-hidden">
          <Image
            src={recipe.images[0]}
            fill
            className="object-cover"
            alt={recipe.title}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          <div className="absolute bottom-0 left-0 right-0 m-4 bg-white rounded-lg p-4">
            {recipe.title}
          </div>
        </div>
      </Link>
    </li>
  );
}
