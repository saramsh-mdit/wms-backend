import { eq } from "drizzle-orm";
import { db } from "../../db/database";
import { weapon_types } from "../../db/schema/schema";

export async function get_weapon_types() {
  try {
    return await db.query.weapon_types.findMany();
  } catch (err) {
    throw err;
  }
}

export async function find_wtype_by_id(wtype_id: string) {
  try {
    return await db
      .select()
      .from(weapon_types)
      .where(eq(weapon_types.wtype_id, wtype_id));
  } catch (err) {
    throw err;
  }
}

export async function add_weapon_type(name: string) {
  try {
    return await db?.insert(weapon_types).values({
      name: name,
    });
  } catch (err) {
    throw err;
  }
}

export async function delete_weapon_type(wtype_id: string) {
  try {
    return await db
      .delete(weapon_types)
      .where(eq(weapon_types.wtype_id, wtype_id));
  } catch (err) {
    throw err;
  }
}

export async function update_weapon_type(wtype_id: string, name: string) {
  try {
    const db_wtype = await find_wtype_by_id(wtype_id);
    await db
      .update(weapon_types)
      .set({
        name: name ?? db_wtype[0].name,
      })
      .where(eq(weapon_types.wtype_id, wtype_id));
  } catch (err) {
    throw err;
  }
}
