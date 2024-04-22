import Image from "next/image";

import { Button } from "./button";

export default function RecipeCardLarge() {
  return (
    <div>
      <h2>Title</h2>
      <p>Description</p>
      <Button>Add to favorite recipes</Button>
      <span>Time</span>
      <Image
        src="/pancakes.png"
        layout="fill"
        objectFit="contain"
        alt="Description"
        objectPosition="top"
        className="t-0 l-0 z-[-1]"
      />
    </div>
  );
}
