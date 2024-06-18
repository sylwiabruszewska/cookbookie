"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { revalidatePath } from "next/cache";

import { getUserId } from "@utils/getUser";
import {
  Ingredient,
  IngredientDb,
  IngredientSelect,
  Recipe,
  RecipeFormProps,
} from "@/lib/definitions";

// ***** ADD RECIPE *****
export async function addRecipe(formData: RecipeFormProps) {
  const {
    images,
    title,
    description,
    category,
    cookingTime,
    ingredients,
    steps,
    isPublic,
  } = formData;

  try {
    const userId = await getUserId();

    const result = await sql`
    INSERT INTO recipes (
      images, title, description, category_id, cooking_time, ingredients, steps, is_public, owner_id
    ) VALUES (
      ${JSON.stringify(
        images
      )}, ${title}, ${description}, ${category}, ${cookingTime}, ${JSON.stringify(
      ingredients
    )}, ${JSON.stringify(steps)}, ${isPublic}, ${userId}
    ) RETURNING *`;

    console.log("Recipe added successfully");
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
  const {
    images,
    title,
    description,
    category,
    cookingTime,
    ingredients,
    steps,
    isPublic,
  } = formData;

  try {
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

// ***** ADD INGREDIENT TO SHOPPING LIST ***** FIRST VERSION - COLUMN INGREDIENTS
// export async function addToShoppingList(ingredient: any) {
//   noStore();

//   try {
//     const userId = await getUserId();

//     const currentList =
//       await sql`SELECT ingredients FROM UserShoppingList WHERE user_id = ${userId}`;

//     const newIngredient = {
//       id: ingredient.id,
//       name: ingredient.name,
//       quantity: ingredient.quantity,
//       checked: ingredient.checked,
//     };

//     let newList = [];
//     if (currentList.rows.length > 0) {
//       const existingIngredientIndex = currentList.rows[0].ingredients.findIndex(
//         (i: { id: string }) => i.id === newIngredient.id
//       );

//       if (existingIngredientIndex !== -1) {
//         newList = [...currentList.rows[0].ingredients];
//         newList[existingIngredientIndex].quantity =
//           parseFloat(newList[existingIngredientIndex].quantity) +
//           parseFloat(newIngredient.quantity);
//       } else {
//         newList = [...currentList.rows[0].ingredients, newIngredient];
//       }
//       await sql`UPDATE UserShoppingList SET ingredients = ${JSON.stringify(
//         newList
//       )} WHERE user_id = ${userId}`;
//     } else {
//       newList = [newIngredient];
//       await sql`INSERT INTO UserShoppingList (user_id, ingredients) VALUES (${userId}, ${JSON.stringify(
//         newList
//       )})`;
//     }

//     console.log("added actions", newIngredient);
//     console.log("Ingredient added to shopping list");
//     revalidatePath("/dashboard/shopping-list");
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to add ingredient to shopping list.");
//   }
// }

// ***** ADD INGREDIENT TO SHOPPING LIST ***** FIRST VERSION - COLUMN INGREDIENTS
// export async function removeFromShoppingList(id: string) {
//   noStore();

//   try {
//     const userId = await getUserId();

//     const currentList =
//       await sql`SELECT ingredients FROM UserShoppingList WHERE user_id = ${userId}`;

//     if (currentList.rows.length > 0) {
//       const newList = currentList.rows[0].ingredients.filter(
//         (ingredient: any) => ingredient.id !== id
//       );

//       await sql`UPDATE UserShoppingList SET ingredients = ${JSON.stringify(
//         newList
//       )} WHERE user_id = ${userId}`;

//       console.log("removed actions", currentList.rows[0]);
//       console.log("Ingredient removed from shopping list");
//       revalidatePath("/dashboard/shopping-list");
//     }
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to remove ingredient from shopping list.");
//   }
// }

// ***** ADD INGREDIENT TO SHOPPING LIST ***** SECOND VERSION - MORE COLUMNS
export async function addToShoppingList(
  ingredient: Ingredient,
  recipeId: string
) {
  noStore();

  try {
    const userId = await getUserId();

    const ingredientObj = await sql`
        INSERT INTO UserShoppingList (user_id, recipe_id, ingredient_id, name, quantity)
        VALUES (${userId}, ${recipeId}, ${ingredient.id}, ${ingredient.ingredient}, ${ingredient.quantity}) RETURNING*
      `;

    console.log("Ingredient added to shopping list", ingredientObj);
    revalidatePath("/dashboard/shopping-list");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add ingredient to shopping list.");
  }
}

// ***** REMOVE INGREDIENT FROM SHOPPING LIST ***** SECOND VERSION - MORE COLUMNS
export async function removeFromShoppingList(
  ingredient: Ingredient,
  recipeId: string
) {
  noStore();

  try {
    const userId = await getUserId();

    const ingredientToDelete = await sql`
      DELETE FROM UserShoppingList 
      WHERE 
        user_id = ${userId} AND 
        recipe_id = ${recipeId} AND 
        ingredient_id = ${ingredient.id} AND 
        quantity = ${ingredient.quantity} 
      RETURNING *
    `;

    console.log("Ingredient removed from shopping list", ingredientToDelete);
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
    const result = await sql`
      INSERT INTO subscribers (email)
      SELECT ${email}
      WHERE NOT EXISTS (
        SELECT 1 FROM subscribers WHERE email = ${email}
      )`;

    if (result.rowCount === 1) {
      console.log("Email added successfully to subscribers list");
      return true;
    } else {
      console.log("Email already exists in subscribers list");
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

    const newIngredient = existingIngredient.rows[0];

    return newIngredient;
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    throw new Error("Failed to get ingredient");
  }
}

// ***** UPDATE USER PROFILE IMAGE *****

export async function updateUserProfileImage(imageUrl: string) {
  try {
    const userId = await getUserId();

    const result = await sql`
      UPDATE users
      SET
        image = ${imageUrl}
      WHERE
        id = ${userId}
      RETURNING *
    `;

    console.log("User image updated successfully");
    revalidatePath("/dashboard/profile");
    return result;
  } catch (error) {
    console.error("Error updating user image:", error);
    throw new Error("Failed to update user image");
  }
}
