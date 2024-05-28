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

// ***** UPDATE RECIPE *****
export async function updateRecipe(recipeId: string, formData: Recipe) {
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
      UPDATE recipes
      SET
        images = ${JSON.stringify(images)},
        title = ${title},
        description = ${description},
        category_id = ${category_id},
        cooking_time = ${cooking_time},
        ingredients = ${JSON.stringify(ingredients)},
        steps = ${JSON.stringify(steps)},
        is_public = ${is_public}
      WHERE
        id = ${recipeId} AND owner_id = ${userId}
      RETURNING *
    `;

    console.log("Recipe updated successfully");
    revalidatePath(`/dashboard/recipes/${recipeId}`);
    return result;
  } catch (error) {
    console.error("Failed to update recipe:", error);
    throw new Error("Failed to update recipe.");
  }
}

// ***** DELETE RECIPE *****
export async function deleteRecipe(recipeId: string) {
  try {
    const userId = await getUserId();

    await sql`DELETE FROM recipes WHERE owner_id = ${userId} AND id = ${recipeId}`;

    console.log("Recipe has been deleted");
    revalidatePath("/dashboard/my-recipes");
  } catch (error) {
    console.error("Failed to delete recipe:", error);
    throw new Error("Failed to delete recipe.");
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
