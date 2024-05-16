import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

import { Category } from "./definitions";

export async function fetchCategories() {
  noStore();

  try {
    const data = await sql<Category>`SELECT * FROM categories`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest categories.");
  }
}
