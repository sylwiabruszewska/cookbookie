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
    SELECT recipes.id, recipes.title, recipes.description, recipes.images
    FROM recipes
    JOIN categories ON recipes.category_id = categories.id
    WHERE recipes.is_public = true AND recipes.category_id = ${categoryId}
    ORDER BY recipes.created_at DESC 
    LIMIT 3;
    
    
    
    `;
    return data.rows;
  } catch (error) {
    console.error("Error fetching recent recipes:", error);
    throw new Error("Failed to fetch recent recipes for the category.");
  }
}

// ***** FETCH RECIPE BY ID *****
export async function fetchRecipeById(id: string): Promise<Recipe | null> {
  try {
    const result = await sql`SELECT * FROM recipes WHERE id = ${id}`;

    const data = result.rows[0];

    const recipe: Recipe = {
      id: data.id,
      images: data.images,
      title: data.title,
      description: data.description,
      category_id: data.category_id,
      cooking_time: data.cooking_time,
      ingredients: data.ingredients,
      steps: data.steps,
      is_public: data.is_public,
      owner_id: data.owner_id,
    };

    return recipe;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}
