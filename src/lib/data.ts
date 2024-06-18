"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

import {
  User,
  Category,
  Recipe,
  RecipeWithFavoriteStatus,
  IngredientSelect,
} from "@/lib/definitions";
import { getUserEmail, getUserId } from "@utils/getUser";

// ***** GET USER *****
export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User | undefined;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

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

// ***** FETCH ALL RECIPES *****
export async function fetchRecipes(currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const userId = await getUserId();

    const data = await sql<RecipeWithFavoriteStatus>`
      SELECT recipes.*, 
        CASE 
          WHEN UserFavorites.recipeId IS NOT NULL THEN TRUE 
          ELSE FALSE 
        END AS is_favorite
      FROM recipes
      LEFT JOIN UserFavorites 
        ON recipes.id = UserFavorites.recipeId 
        AND UserFavorites.userId = ${userId}
      WHERE recipes.is_public = true
      ORDER BY created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    const count = await sql`
      SELECT COUNT(*) AS count
      FROM recipes
      WHERE recipes.is_public = true
    `;

    const recipes = data.rows;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    return { recipes, totalPages };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all recipes.");
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
export async function fetchUserRecipes(currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const userId = await getUserId();

    const data = await sql<Recipe[]>`
      SELECT recipes.*
      FROM recipes
      JOIN users ON recipes.owner_id = users.id
      WHERE users.id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    const count = await sql`
    SELECT COUNT(*) as count
    FROM recipes
    WHERE owner_id = ${userId}
  `;

    const recipes = data.rows.flat();

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return { recipes, totalPages };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user recipes.");
  }
}

// ***** CATEGORY - 4 RECENT RECIPES *****
export async function fetchRecentRecipes(categoryId: string) {
  noStore();

  try {
    const userId = await getUserId();

    const recentRecipes = await sql<RecipeWithFavoriteStatus>`
    SELECT recipes.*, 
        CASE 
          WHEN UserFavorites.recipeId IS NOT NULL THEN TRUE 
          ELSE FALSE 
        END AS is_favorite
      FROM recipes
      LEFT JOIN UserFavorites 
        ON recipes.id = UserFavorites.recipeId 
        AND UserFavorites.userId = ${userId}
      JOIN categories ON recipes.category_id = categories.id
      WHERE recipes.is_public = true AND recipes.category_id = ${categoryId}
      ORDER BY recipes.created_at DESC 
      LIMIT 4;
    `;

    const totalRecipesResult = await sql`
    SELECT COUNT(*) FROM recipes 
    WHERE recipes.is_public = true AND recipes.category_id = ${categoryId}
  `;
    const totalRecipes = totalRecipesResult.rows[0].count;

    return { recentRecipes: recentRecipes.rows, totalRecipes };
  } catch (error) {
    console.error("Error fetching recent recipes:", error);
    throw new Error("Failed to fetch recent recipes for the category.");
  }
}

// ***** FETCH RECIPES FROM CATEGORY *****
export async function fetchCategoryRecipes(
  categoryName: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const categoryIdResult = await sql`
      SELECT id FROM categories WHERE name = ${categoryName}
    `;

    if (categoryIdResult.rows.length === 0) {
      throw new Error("Category not found");
    }

    const categoryId = categoryIdResult.rows[0].id;

    const data = await sql<RecipeWithFavoriteStatus>`
      SELECT recipes.id, recipes.title, recipes.description, recipes.images,
        EXISTS (
          SELECT 1 FROM UserFavorites 
          WHERE UserFavorites.recipeId = recipes.id
        ) AS is_favorite
      FROM recipes
      JOIN categories ON recipes.category_id = categories.id
      WHERE recipes.is_public = true AND recipes.category_id = ${categoryId}
      ORDER BY recipes.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

    const count = await sql`
    SELECT COUNT(*) AS count
    FROM recipes
    WHERE recipes.is_public = true AND recipes.category_id = ${categoryId}
  `;

    const recipes = data.rows.flat();
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    return { recipes, totalPages };
  } catch (error) {
    console.error("Error fetching recent recipes:", error);
    throw new Error("Failed to fetch recipes for the category.");
  }
}

// ***** FETCH RECIPE BY ID *****
export async function fetchRecipeById(
  id: string
): Promise<RecipeWithFavoriteStatus | null> {
  noStore();

  try {
    const userId = await getUserId();

    const result = await sql`
      SELECT recipes.*, 
        CASE 
          WHEN UserFavorites.recipeId IS NOT NULL THEN TRUE 
          ELSE FALSE 
        END AS is_favorite
      FROM recipes
      LEFT JOIN UserFavorites 
        ON recipes.id = UserFavorites.recipeId 
        AND UserFavorites.userId = ${userId}
      WHERE recipes.id = ${id}
    `;

    if (result.rows.length === 0) {
      return null;
    }

    const data = result.rows[0];

    const recipe: RecipeWithFavoriteStatus = {
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
      is_favorite: data.is_favorite,
    };

    return recipe;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}

export async function fetchUserFavorites(currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const userId = await getUserId();

    const data = await sql<Recipe[]>`
    SELECT recipes.*
    FROM recipes
    JOIN UserFavorites ON recipes.id = UserFavorites.recipeId
    WHERE UserFavorites.userId = ${userId}
      AND (recipes.owner_id = ${userId} OR recipes.is_public = true)
    ORDER BY UserFavorites.addedAt DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

    const count = await sql`
      SELECT COUNT(*) AS count
      FROM UserFavorites
      WHERE userId = ${userId}
    `;

    const recipes = data.rows.flat();

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    return { recipes, totalPages };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user recipes.");
  }
}

// ***** FETCH USER SHOPPING LIST ***** - FIRST VERSION - COLUMN INGREDIENTS
// export async function fetchUserShoppingList() {
//   noStore();

//   try {
//     const userId = await getUserId();

//     const data =
//       await sql`SELECT ingredients FROM userShoppingList WHERE user_id = ${userId}`;

//     const ingredients = data.rows.map((row) => row.ingredients).flat();
//     return ingredients;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to add ingredients to shopping list.");
//   }
// }

// ***** FETCH USER SHOPPING LIST ***** - SECOND VERSION - MORE COLUMNS
export async function fetchUserShoppingList() {
  noStore();

  try {
    const userId = await getUserId();

    const data = await sql`
      SELECT ingredient_id, name, quantity, recipe_id
      FROM UserShoppingList
      WHERE user_id = ${userId}
      ORDER BY name ASC
    `;

    const ingredients = data.rows.map((row) => ({
      id: row.ingredient_id,
      ingredient: row.name,
      quantity: row.quantity,
      recipe_id: row.recipe_id,
    }));

    return ingredients;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch ingredients from shopping list.");
  }
}

// ***** FETCH RECIPE INGREDIENTS FROM SHOPPING LIST *****
export async function fetchrecipeIngredientsFromShoppingList(recipeId: string) {
  noStore();

  try {
    const userId = await getUserId();

    const data = await sql`
      SELECT ingredient_id, name, quantity, recipe_id
      FROM UserShoppingList
      WHERE user_id = ${userId} AND recipe_id = ${recipeId}
    `;

    const ingredients = data.rows.map((row) => ({
      id: row.ingredient_id,
      ingredient: row.name,
      quantity: row.quantity,
      recipe_id: row.recipe_id,
    }));

    return ingredients;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch ingredients from shopping list.");
  }
}

// FETCH FILTERED RECIPES
const ITEMS_PER_PAGE = 8;

export async function fetchFilteredRecipes(query: string, currentPage: number) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const recipes = await sql<RecipeWithFavoriteStatus>`
    SELECT recipes.*
    FROM recipes
      WHERE
      recipes.title ILIKE ${`%${query}%`} OR
      recipes.description ILIKE ${`%${query}%`}
      ORDER BY recipes.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return recipes.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recipes.");
  }
}

// FETCH TOTAL PAGES
export async function fetchRecipesPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM RECIPES
    WHERE
    recipes.title ILIKE ${`%${query}%`} OR
    recipes.description ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of recipes.");
  }
}

// FETCH INGREDIENTS
export async function fetchIngredients() {
  try {
    const data = await sql<IngredientSelect[]>`
      SELECT *
      FROM ingredients
    `;

    const ingredients = data.rows.flat();
    return ingredients;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch ingredients.");
  }
}
