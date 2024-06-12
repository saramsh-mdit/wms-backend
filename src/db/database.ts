import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import AllSchemas from "./schemas";

export async function getConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "weapon",
    port: 3306,
  });
}

export async function getDB() {
  const connection = await getConnection();
  return drizzle(connection, { schema: AllSchemas, mode: "default" });
}

export const poolConnection = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "weapon",
  port: 3306,
});

export const db = drizzle(poolConnection, {
  schema: AllSchemas,
  mode: "default",
});
