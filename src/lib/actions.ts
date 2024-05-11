"use server";

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}
export async function register(values: RegisterFormValues) {
  const { name, email, password } = values;

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
  redirect("/login");
}
