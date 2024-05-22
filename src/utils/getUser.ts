import { getServerSession } from "next-auth";

export async function getUserEmail(): Promise<string> {
  try {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }
    return session.user.email;
  } catch (error) {
    console.error("Failed to get user email:", error);
    throw new Error("Unauthorized");
  }
}
