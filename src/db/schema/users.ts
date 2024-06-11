import { sql } from "drizzle-orm";
import { mysqlTable, text } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users",{
    id:text("id").default(sql`(uuid())`),
    name:text("name"),
    email:text("name"),
    password:text("name"),
})