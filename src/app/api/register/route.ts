import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import { sql } from "@vercel/postgres";
import gravatar from "gravatar";

import { getUser } from "@lib/data";
import { registrationValidationSchemaBackend } from "@utils/validationSchemas";

export async function POST(request: NextRequest) {
  try {
    const registerFormData = await request.json();

    const validatedFields = registrationValidationSchemaBackend.safeParse({
      name: registerFormData.name,
      email: registerFormData.email,
      password: registerFormData.password,
      confirmPassword: registerFormData.confirmPassword,
    });

    if (!validatedFields.success) {
      throw new Error("Register validation failed");
    }

    const { name, email, password } = validatedFields.data;

    const user = await getUser(email);

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const id = uuidv4();
    const avatarURL = `https:${gravatar.url(email, {
      s: "250",
      d: "identicon",
    })}`;

    try {
      await sql`
        INSERT INTO users (id, name, email, password, image)
        VALUES (${id}, ${name}, ${email}, ${hashedPassword}, ${avatarURL})
      `;
    } catch (error) {
      return NextResponse.json(
        { error: "Database Error: Failed to Create Account" },
        { status: 500 }
      );
    }

    const newUser = {
      id: id,
      name: name,
      email: email,
      image: avatarURL,
    };

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
