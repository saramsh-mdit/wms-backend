import "dotenv/config";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { getDB, getConnection } from "./src/db/database";

async function migration() {
  const db = await getDB();
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: "./drizzle" });

  // Don't forget to close the connection, otherwise the script will hang
  const connection = await getConnection();
  await connection.end();
}

migration();
