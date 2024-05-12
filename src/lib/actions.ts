"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
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

interface LoginFormValues {
  email: string;
  password: string;
}

export async function authenticate(values: LoginFormValues) {
  const { email, password } = values;

  try {
    await signIn("credentials", values);
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
