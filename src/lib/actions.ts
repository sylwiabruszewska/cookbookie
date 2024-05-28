"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { revalidatePath } from "next/cache";

import { getUserId } from "@utils/getUser";
import { Recipe } from "@/lib/definitions";

// ***** ADD RECIPE *****
export async function addRecipe(formData: Recipe) {
  const {
    images,
    title,
    description,
    category_id,
    cooking_time,
    ingredients,
    steps,
    is_public,
  } = formData;

  try {
    const userId = await getUserId();

    const result = await sql`
    INSERT INTO recipes (
      images, title, description, category_id, cooking_time, ingredients, steps, is_public, owner_id
    ) VALUES (
      ${JSON.stringify(
        images
      )}, ${title}, ${description}, ${category_id}, ${cooking_time}, ${JSON.stringify(
      ingredients
    )}, ${JSON.stringify(steps)}, ${is_public}, ${userId}
    ) RETURNING *`;

    console.log("Recipe added successfully");
    return result;
  } catch (error) {
    console.error("Failed to add recipe:", error);
    throw new Error("Failed to add recipe.");
  }
}

// ***** ADD RECIPE TO FAVORITES *****
export async function addToFavorites(recipeId: string) {
  noStore();

  try {
    const userId = await getUserId();

    await sql`INSERT INTO UserFavorites (userId, recipeId) VALUES (${userId}, ${recipeId})
    `;

    console.log("Recipe added to favorites");
    revalidatePath("/dashboard/favorites");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add recipe to favorites.");
  }
}

// ***** REMOVE RECIPE FROM FAVORITES *****
export async function removeFromFavorites(recipeId: string) {
  noStore();

  try {
    const userId = await getUserId();

    await sql`DELETE FROM UserFavorites WHERE userId = ${userId} AND recipeId = ${recipeId}`;

    console.log("Recipe removed from favorites");
    revalidatePath("/dashboard/favorites");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to remove recipe from favorites.");
  }
}
