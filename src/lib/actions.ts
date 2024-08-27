"use server";

import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

import {
  newsletterValidationSchemaBackend,
  recipeValidationSchemaBackend,
  shoppingListValidationSchemaBackend,
} from "@/utils/validationSchemas";
import { getUserId } from "@/utils/getUser";
import { Ingredient, IngredientDb, RecipeFormProps } from "@/lib/definitions";

// ***** ADD RECIPE *****
export async function addRecipe(formData: RecipeFormProps) {
  try {
    const validatedFields = recipeValidationSchemaBackend.safeParse({
      images: formData.images,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      cookingTime: formData.cookingTime,
      ingredients: formData.ingredients,
      steps: formData.steps,
      isPublic: formData.isPublic,
    });

    if (!validatedFields.success) {
      throw new Error("Recipe validation failed.");
    }

    const {
      images,
      title,
      description,
      category,
      cookingTime,
      ingredients,
      steps,
      isPublic,
    } = validatedFields.data;

    const userId = await getUserId();

    const result = await sql`
    INSERT INTO recipes (
      images, title, description, category_id, cooking_time, ingredients, steps, is_public, owner_id
    ) VALUES (
      ${JSON.stringify(images)}, 
      ${title}, 
      ${description}, 
      ${category}, 
      ${cookingTime}, 
      ${JSON.stringify(ingredients)}, 
      ${JSON.stringify(steps)}, 
      ${isPublic}, 
      ${userId}
    ) RETURNING *`;

    revalidatePath("/dashboard/my-recipes");

    return result;
  } catch (error) {
    console.error("Failed to add recipe:", error);
    throw new Error("Failed to add recipe.");
  }
}

// ***** UPDATE RECIPE *****
export async function updateRecipe(
  recipeId: string,
  formData: RecipeFormProps
) {
  try {
    const validatedFields = recipeValidationSchemaBackend.safeParse({
      images: formData.images,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      cookingTime: formData.cookingTime,
      ingredients: formData.ingredients,
      steps: formData.steps,
      isPublic: formData.isPublic,
    });

    if (!validatedFields.success) {
      throw new Error("Recipe validation failed.");
    }

    const {
      images,
      title,
      description,
      category,
      cookingTime,
      ingredients,
      steps,
      isPublic,
    } = validatedFields.data;

    const userId = await getUserId();

    const result = await sql`
      UPDATE recipes
      SET
        images = ${JSON.stringify(images)},
        title = ${title},
        description = ${description},
        category_id = ${category},
        cooking_time = ${cookingTime},
        ingredients = ${JSON.stringify(ingredients)},
        steps = ${JSON.stringify(steps)},
        is_public = ${isPublic}
      WHERE
        id = ${recipeId} AND owner_id = ${userId}
      RETURNING *
    `;

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

    revalidatePath("/dashboard/favorites");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to remove recipe from favorites.");
  }
}

// ***** ADD NEW INGREDIENT TO SHOPPING LIST *****
export async function addNewIngredientToShoppingList(
  ingredientId: string,
  ingredientName: string,
  ingredientQuantity: string
) {
  noStore();

  try {
    const userId = await getUserId();

    const validatedFields = shoppingListValidationSchemaBackend.safeParse({
      ingredient: ingredientName,
      quantity: ingredientQuantity,
    });

    if (!validatedFields.success) {
      throw new Error("Shopping list validation failed.");
    }

    const { ingredient, quantity } = validatedFields.data;

    await sql`
        INSERT INTO UserShoppingList (user_id, id, ingredient, quantity)
        VALUES (${userId}, ${ingredientId}, ${ingredientName}, ${ingredientQuantity})
      `;

    revalidatePath("/dashboard/shopping-list");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add ingredient to shopping list.");
  }
}

// ***** ADD INGREDIENT TO SHOPPING LIST *****
export async function addToShoppingList(
  ingredient: Ingredient,
  recipeId: string,
  recipeTitle: string
) {
  noStore();

  try {
    const userId = await getUserId();

    await sql`
        INSERT INTO UserShoppingList (user_id, recipe_id, recipe_title, id, ingredient, quantity)
        VALUES (${userId}, ${recipeId}, ${recipeTitle}, ${ingredient.id}, ${ingredient.ingredient}, ${ingredient.quantity})
      `;

    revalidatePath("/dashboard/shopping-list");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add ingredient to shopping list.");
  }
}

// ***** REMOVE INGREDIENT FROM SHOPPING LIST *****
export async function removeFromShoppingList(
  ingredient: Ingredient,
  recipeId: string
) {
  noStore();

  try {
    const userId = await getUserId();

    if (recipeId) {
      await sql`
      DELETE FROM UserShoppingList 
      WHERE 
        user_id = ${userId} AND 
        recipe_id = ${recipeId} AND 
        id = ${ingredient.id} AND 
        quantity = ${ingredient.quantity} 
    `;
    } else {
      await sql`
      DELETE FROM UserShoppingList 
      WHERE 
        user_id = ${userId} AND 
        id = ${ingredient.id} AND 
        quantity = ${ingredient.quantity} 
    `;
    }

    revalidatePath("/dashboard/shopping-list");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to remove ingredient from shopping list.");
  }
}

// ***** ADD USER EMAIL TO SUBSCRIBERS TABLE - NEWSLETTER *****
export async function addEmailToSubscribersTable(email: string) {
  noStore();
  try {
    const validatedFields = newsletterValidationSchemaBackend.safeParse({
      emailNewsletter: email,
    });

    if (!validatedFields.success) {
      throw new Error("Newsletter validation failed.");
    }

    const { emailNewsletter } = validatedFields.data;

    const result = await sql`
      INSERT INTO subscribers (email)
      SELECT ${emailNewsletter}
      WHERE NOT EXISTS (
        SELECT 1 FROM subscribers WHERE email = ${emailNewsletter}
      )`;

    if (result.rowCount === 1) {
      // Email added successfully to subscribers list
      return true;
    } else {
      // Email already exists in subscribers list
      return false;
    }
  } catch (error) {
    console.error("Failed to add email to subscribers list:", error);
    throw new Error("Failed to add email to subscribers list.");
  }
}

// ***** ADD NEW INGREDIENT *****
export async function addNewIngredient(
  ingredientName: string
): Promise<IngredientDb> {
  try {
    const ingredientNameLower = ingredientName.toLowerCase();

    const existingIngredient = await sql<IngredientDb>`
    SELECT * FROM ingredients WHERE LOWER(name) = LOWER(${ingredientNameLower})
  `;

    if (existingIngredient.rows.length > 0) {
      return existingIngredient.rows[0];
    }

    const resultInsert = await sql<IngredientDb>`
        INSERT INTO ingredients (name, key)
        VALUES (${ingredientNameLower}, LOWER(${ingredientNameLower})) RETURNING *
      `;

    const newIngredient = resultInsert.rows[0];

    return newIngredient;
  } catch (error) {
    console.error("Error adding new ingredient:", error);
    throw new Error("Failed to add new ingredient");
  }
}

// ***** GET EXISTING INGREDIENT *****
export async function getExistingIngredient(
  ingredientName: string
): Promise<IngredientDb> {
  try {
    const ingredientNameLower = ingredientName.toLowerCase();

    const existingIngredient = await sql<IngredientDb>`
      SELECT id FROM ingredients WHERE key = ${ingredientNameLower}
    `;

    const ingredient = existingIngredient.rows[0];

    return ingredient;
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    throw new Error("Failed to get ingredient");
  }
}

// ***** UPDATE USER PROFILE IMAGE *****

export async function updateUserProfileImage(imageUrl: string) {
  try {
    const userId = await getUserId();

    await sql`
      UPDATE users
      SET
        image = ${imageUrl}
      WHERE
        id = ${userId}
    `;

    revalidatePath("/dashboard/profile");
  } catch (error) {
    console.error("Error updating user image:", error);
    throw new Error("Failed to update user image");
  }
}

// ***** SET COOKIE *****
export async function setLocale(value: string) {
  const maxAge = 30 * 24 * 60 * 60;

  cookies().set("NEXT_LOCALE", value, { maxAge: maxAge });
}
