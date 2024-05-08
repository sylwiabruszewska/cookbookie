import { sql } from "@vercel/postgres";
import { Category } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchCategories() {
  noStore();

  try {
    const data = await sql<Category>`SELECT * FROM categories`;
    // console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest categories.");
  }
}
