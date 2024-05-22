import { v4 as uuidv4 } from "uuid";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { Recipe } from "@/lib/definitions";
import { getUserIdByEmail } from "@lib/data";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (req.method !== "POST") {
    return NextResponse.json(
      { error: `Method ${req.method} Not Allowed` },
      { status: 405 }
    );
  }

  try {
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 401 }
      );
    }

    const userId = await getUserIdByEmail(userEmail);

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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
    } = body;

    const id = uuidv4();

    const newRecipe: Recipe = {
      id,
      images,
      title,
      description,
      category,
      cookingTime,
      ingredients,
      steps,
      isPublic,
      owner: userId,
    };

    const result = await sql`
        INSERT INTO recipes(
          id, images, title, description, category, cooking_time, is_public, owner_id, ingredients, steps
        ) VALUES (
          ${newRecipe.id}, ${JSON.stringify(newRecipe.images)}, ${
      newRecipe.title
    }, ${newRecipe.description}, ${JSON.stringify(newRecipe.category)}, ${
      newRecipe.cookingTime
    }, ${newRecipe.isPublic}, ${newRecipe.owner}, ${JSON.stringify(
      newRecipe.ingredients
    )}, ${JSON.stringify(newRecipe.steps)}
        ) RETURNING *`;

    return NextResponse.json(
      { recipe: result.rows[0], message: "Recipe added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to add recipe", error);
    return NextResponse.json(
      { error: "Failed to add recipe" },
      { status: 500 }
    );
  }
}
