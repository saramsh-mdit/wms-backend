import { relations, sql } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  user_id: varchar("id", { length: 36 })
    .default(sql`(uuid())`)
    .primaryKey(),
  name: varchar("name", { length: 10 }),
  email: varchar("email", { length: 20 }).unique().notNull(),
  password: varchar("password", { length: 30 }).notNull(),
});

export const admin = mysqlTable("admin", {
  admin_id: varchar("id", { length: 36 })
    .default(sql`(uuid())`)
    .primaryKey(),
  name: varchar("name", { length: 10 }),
  email: varchar("email", { length: 20 }).unique().notNull(),
  password: varchar("password", { length: 30 }).notNull(),
});

export const weapon_types = mysqlTable("weapon_type", {
  wtype_id: varchar("id", { length: 36 })
    .default(sql`(uuid())`)
    .primaryKey(),
  name: text("name"),
});

export const weapons = mysqlTable("weapon", {
  weapon_id: varchar("id", { length: 36 })
    .default(sql`(uuid())`)
    .primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  image: text("image").notNull(),
  quantity: int("quantity").notNull(),
  maintainable: boolean("maintainable").default(true),
  created_date: timestamp("created_date").defaultNow(),
  owner_id: varchar("owner", { length: 36 }).default(sql`(uuid())`),
});

// relations

export const userRelations = relations(users, ({ many }) => ({
  weapons: many(weapons),
}));

export const weaponRelations = relations(weapons, ({ one }) => ({
  owner: one(users, {
    fields: [weapons.owner_id],
    references: [users.user_id],
  }),
}));
