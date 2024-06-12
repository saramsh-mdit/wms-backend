import { eq } from "drizzle-orm";
import { db } from "../../db/database";
import { weapons } from "../../db/schema/schema";

export async function get_weapons() {
  try {
    return await db.query.weapons.findMany();
  } catch (err) {
    throw err;
  }
}

export async function find_weapon_by_id(weapon_id: string) {
  try {
    return await db
      .select()
      .from(weapons)
      .where(eq(weapons.weapon_id, weapon_id));
  } catch (err) {
    throw err;
  }
}

export async function add_weapon(weapon_data: {
  name: string;
  image: string;
  quantity: number;
}) {
  try {
    return await db?.insert(weapons).values({
      name: weapon_data.name,
      image: weapon_data.image,
      quantity: weapon_data.quantity,
    });
  } catch (err) {
    throw err;
  }
}

export async function delete_weapon(weapon_id: string) {
  try {
    return await db.delete(weapons).where(eq(weapons.weapon_id, weapon_id));
  } catch (err) {
    throw err;
  }
}

export async function update_weapon(
  weapon_id: string,
  weapon: {
    name: string;
    quantity: number;
    image: string;
    maintainable: boolean;
  }
) {
  try {
    const db_weapon = await find_weapon_by_id(weapon_id);
    await db
      .update(weapons)
      .set({
        name: weapon.name ?? db_weapon[0].name,
        image: weapon.image ?? db_weapon[0].image,
        maintainable: weapon.maintainable ?? db_weapon[0].maintainable,
        quantity: weapon.quantity ?? db_weapon[0].quantity,
      })
      .where(eq(weapons.weapon_id, weapon_id));
  } catch (err) {
    throw err;
  }
}
