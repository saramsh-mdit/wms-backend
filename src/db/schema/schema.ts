import { sql } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

// relate weapon and waeapon type
// make user_inventory

export const users = mysqlTable("users", {
  user_id: varchar("id", { length: 36 })
    .default(sql`(uuid())`)
    .primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
  email: varchar("email", { length: 30 }).unique().notNull(),
  password: varchar("password", { length: 200 }).notNull(),
});

export const admin = mysqlTable("admin", {
  admin_id: varchar("id", { length: 36 })
    .default(sql`(uuid())`)
    .primaryKey(),
  name: varchar("name", { length: 20 }),
  email: varchar("email", { length: 30 }).unique().notNull(),
  password: varchar("password", { length: 200 }).notNull(),
});

export const weapon_types = mysqlTable("weapon_type", {
  wtype_id: varchar("id", { length: 36 })
    .default(sql`(uuid())`)
    .primaryKey(),
  name: text("name"),
  created_date: timestamp("created_date").defaultNow(),
});

export const weapons = mysqlTable("weapon", {
  weapon_id: varchar("id", { length: 36 })
    .default(sql`(uuid())`)
    .primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  quantity: int("quantity").notNull(),
  maintainable: boolean("maintainable").default(false),
  created_date: timestamp("created_date").defaultNow(),
  wtype_id_fk: varchar("weapon_type", { length: 36 })
    .notNull()
    .references(() => weapon_types.wtype_id),
});

export const inventory = mysqlTable("inventory", {
  inventory_id: varchar("inventory_id", { length: 36 })
    .default(sql`(uuid())`)
    .primaryKey(),
  user_id: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.user_id),
  weapon_id: varchar("weapon_id", { length: 36 })
    .notNull()
    .references(() => weapons.weapon_id),
  quantity: int("quantity").notNull(),
});

// relations

// a single weapon type can have many weapons eg: assult rifles -> akm, beryl, m416
// export const weapon_typeRelations = relations(weapon_types, ({ many }) => ({
//   weapons: many(weapons),
// }));

// export const weaponRelations = relations(weapons, ({ one }) => ({
//   weapon_type: one(weapon_types, {
//     fields: [weapons.wtype_id_fk],
//     references: [weapon_types.wtype_id],
//   }),
// }));

// a single user can have many inventory weapons eg: user -> akm, beryl, m16
// export const inventoryRelations = relations(inventory, ({ one }) => ({
//   user: one(users, {
//     fields: [inventory.user_id],
//     references: [users.user_id],
//   }),
//   weapon: one(weapons, {
//     fields: [inventory.weapon_id],
//     references: [weapons.weapon_id],
//   }),
// }));

// export const userRelations = relations(users, ({ many }) => ({
//   inventory: many(inventory),
// }));

// export const IweaponRelations = relations(weapons, ({ many }) => ({
//   inventory: many(inventory),
// }));
