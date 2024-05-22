const { db } = require("@vercel/postgres");

async function createUsersTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
          image TEXT NOT NULL
        );
      `;

    console.log(`Created "users" table`);

    return createTable;
  } catch (error) {
    console.error("Error creating users table:", error);
    throw error;
  }
}

async function createRecipesTable(client) {
  try {
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS recipes (
          id UUID PRIMARY KEY,
          images JSONB NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          category JSONB NOT NULL,
          cooking_time VARCHAR(255) NOT NULL,
          ingredients JSONB NOT NULL,
          steps JSONB NOT NULL,
          is_public BOOLEAN NOT NULL,
          owner_id UUID NOT NULL REFERENCES users(id),
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
      `;

    console.log(`Created "recipes" table`);

    return createTable;
  } catch (error) {
    console.error("Error creating recipes table:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await createRecipesTable(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to create the database tables:",
    err
  );
});
