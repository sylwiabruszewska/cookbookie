const { db } = require("@vercel/postgres");

async function createCategoriesTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        key VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "categories" table`);

    return createTable;
  } catch (error) {
    console.error("Error creating categories table:", error);
    throw error;
  }
}

async function createIngredientsTable(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS ingredients (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        key VARCHAR(255) NOT NULL UNIQUE
      );
    `;

    console.log(`Created "ingredients" table`);

    return createTable;
  } catch (error) {
    console.error("Error creating ingredients table:", error);
    throw error;
  }
}

async function createUsersTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
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
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          images JSONB NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          category_id UUID NOT NULL REFERENCES categories(id),
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

async function createUserFavoritesTable(client) {
  try {
    const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS UserFavorites (
          userId UUID NOT NULL,
          recipeId UUID NOT NULL,
          addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          PRIMARY KEY (userId, recipeId),
          FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
          FOREIGN KEY (recipeId) REFERENCES Recipes(id) ON DELETE CASCADE
    );
      `;

    console.log(`Created "userFavorites" table`);

    return createTable;
  } catch (error) {
    console.error("Error creating userFavorites table:", error);
    throw error;
  }
}

async function createUserShoppingListTable(client) {
  try {
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS UserShoppingList (
      user_id UUID NOT NULL,
      recipe_id UUID NOT NULL,
      id UUID NOT NULL,
      ingredient VARCHAR(255) NOT NULL,
      quantity VARCHAR(255) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
      FOREIGN KEY (recipe_id) REFERENCES Recipes(id) ON DELETE CASCADE
    )
    `;

    console.log(`Created "UserShoppingList" table`);

    return createTable;
  } catch (error) {
    console.error("Error creating UserShoppingList table:", error);
    throw error;
  }
}

async function createSubscribersTable(client) {
  try {
    const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS Subscribers (
          email VARCHAR(255) UNIQUE NOT NULL
    );
      `;

    console.log(`Created "Subscribers" table`);

    return createTable;
  } catch (error) {
    console.error("Error creating Subscribers table:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await createCategoriesTable(client);
  await createUserShoppingListTable(client);
  await createIngredientsTable(client);
  await createUsersTable(client);
  await createRecipesTable(client);
  await createUserFavoritesTable(client);
  await createSubscribersTable(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to create the database tables:",
    err
  );
});
