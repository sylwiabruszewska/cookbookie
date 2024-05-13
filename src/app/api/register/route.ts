import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";

import { getUser } from "@lib/actions";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    const user = await getUser(email);

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    try {
      await sql`
            INSERT INTO users (id, name, email, password)
            VALUES (${id}, ${name}, ${email}, ${hashedPassword})
          `;
    } catch (error) {
      return "Database Error: Failed to Create Account.";
    }

    const newUser = {
      id: id,
      name: name,
      email: email,
      password: hashedPassword,
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
