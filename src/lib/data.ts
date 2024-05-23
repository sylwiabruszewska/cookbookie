import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

import { Category, Recipe } from "./definitions";
import { getUserEmail } from "@utils/getUser";

// ***** CATEGORIES *****
export async function fetchCategories() {
  noStore();

  try {
    const data = await sql<Category>`SELECT * FROM categories`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest categories.");
  }
}

// ***** RECIPES *****
export async function fetchRecipes() {
  noStore();

  try {
    const data =
      await sql<Recipe>`SELECT * FROM recipes WHERE is_public = true`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest categories.");
  }
}

export async function getUserIdByEmail(email: string): Promise<string | null> {
  try {
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (userResult.rowCount === 0) {
      return null;
    }

    return userResult.rows[0].id;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user ID from database.");
  }
}

// ***** USER RECIPES *****
export async function fetchUserRecipes(): Promise<Recipe[]> {
  noStore();

  try {
    const userEmail = await getUserEmail();

    const data = await sql<Recipe[]>`
      SELECT recipes.*
      FROM recipes
      JOIN users ON recipes.owner_id = users.id
      WHERE users.email = ${userEmail}
      ORDER BY created_at DESC
    `;

    const recipes: Recipe[] = data.rows.flat();
    return recipes;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user recipes.");
  }
}

// ***** CATEGORY - 3 RECENT RECIPES *****
export async function fetchRecentRecipes(categoryId: string) {
  try {
    const data = await sql<Recipe>`
    SELECT *
    FROM recipes
    JOIN categories ON recipes.category_id = categories.id
    WHERE is_public = true and recipes.category_id = ${categoryId}
    ORDER BY created_at DESC 
    LIMIT 3;
    
    
    `;
    return data.rows;
  } catch (error) {
    console.error("Error fetching recent recipes:", error);
    throw new Error("Failed to fetch recent recipes for the category.");
  }
}
