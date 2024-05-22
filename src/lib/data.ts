import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

import { Category, Recipe } from "./definitions";

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

export async function fetchRecipes() {
  noStore();

  try {
    const data = await sql<Recipe>`SELECT * FROM recipes`;
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
