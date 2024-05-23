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
      category_id: category,
      cooking_time: cookingTime,
      ingredients,
      steps,
      is_public: isPublic,
      owner_id: userId,
    };

    const result = await sql`
        INSERT INTO recipes(
          id, images, title, description, category_id, cooking_time, ingredients, steps, is_public, owner_id
        ) VALUES (
          ${newRecipe.id}, ${JSON.stringify(newRecipe.images)}, ${
      newRecipe.title
    }, ${newRecipe.description}, ${newRecipe.category_id}, ${
      newRecipe.cooking_time
    }, ${JSON.stringify(newRecipe.ingredients)}, ${JSON.stringify(
      newRecipe.steps
    )}, ${newRecipe.is_public}, ${newRecipe.owner_id}
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
