"use server";

import { auth } from "@/config/auth";

export async function getUserEmail(): Promise<string> {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }
    return session.user.email;
  } catch (error) {
    console.error("Failed to get user email:", error);
    throw new Error("Unauthorized");
  }
}

export async function getUserId(): Promise<string> {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Unauthorized");
    }
    return session.user.id;
  } catch (error) {
    console.error("Failed to get user id:", error);
    throw new Error("Unauthorized");
  }
}
