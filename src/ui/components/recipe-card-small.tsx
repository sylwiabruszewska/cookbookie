import { RecipeWithFavoriteStatus } from "@lib/definitions";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardSmallProps {
  recipe: RecipeWithFavoriteStatus;
}

export default function RecipeCardSmall({ recipe }: RecipeCardSmallProps) {
  return (
    <Link href={`/dashboard/recipes/${recipe.id}`} className="group">
      <div className="relative w-full h-[340px] rounded-lg overflow-hidden">
        <Image
          src={recipe.images[0]}
          fill
          className="object-cover transform duration-500 transition-transform group-hover:scale-105"
          alt={recipe.title}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        <div className="absolute bottom-0 left-0 right-0 m-4 bg-white rounded-lg p-4 shadow-sm">
          <h3 className="relative">{recipe.title}</h3>
        </div>
      </div>
    </Link>
  );
}
