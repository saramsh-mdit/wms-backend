import { eq } from "drizzle-orm";
import { db } from "../../db/database";
import { inventory, weapons } from "../../db/schema/schema";

export async function get_weapons() {
  try {
    return await db.query.weapons.findMany();
    // return await db
    //   .select()
    //   .from(weapons)
    //   .innerJoin(weapon_types, eq(weapon_types.wtype_id, weapons.wtype_id_fk));
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
  description: string;
  weapon_type_id: string;
}) {
  try {
    return await db?.insert(weapons).values({
      name: weapon_data.name,
      description: weapon_data.description,
      image: weapon_data.image,
      quantity: weapon_data.quantity,
      wtype_id_fk: weapon_data.weapon_type_id,
    });
  } catch (err) {
    throw err;
  }
}

export async function delete_weapon(weapon_id: string) {
  try {
    const inventory_items = await db.query.inventory.findMany({
      where: eq(inventory.weapon_id, weapon_id),
    });
    if (inventory_items.length > 0) {
      inventory_items.forEach(async (item) => {
        await db
          .delete(inventory)
          .where(eq(inventory.inventory_id, item.inventory_id));
      });
    }
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
    description: string;
    weapon_type_id: string;
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
        description: weapon.description ?? db_weapon[0].description,
        wtype_id_fk: weapon.weapon_type_id ?? db_weapon[0].wtype_id_fk,
      })
      .where(eq(weapons.weapon_id, weapon_id));
  } catch (err) {
    throw err;
  }
}
