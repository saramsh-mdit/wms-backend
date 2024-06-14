import { and, eq } from "drizzle-orm";
import { db } from "../../db/database";
import { inventory, weapon_types, weapons } from "../../db/schema/schema";
import { find_weapon_by_id } from "../weapons/weaponService";

export async function buy_weapon(
  weapon_id: string,
  user_id: string,
  quantity: number
) {
  try {
    // check if item already exists in the inventory
    const existing_order = await db.query.inventory.findFirst({
      where: and(
        eq(inventory.user_id, user_id),
        eq(inventory.weapon_id, weapon_id)
      ),
    });
    if (existing_order) {
      // if exists, update the order quantity
      await db.update(inventory).set({
        quantity: existing_order.quantity + quantity,
      });
    } else {
      // if not, place the order
      await db
        .insert(inventory)
        .values({ weapon_id: weapon_id, user_id: user_id, quantity: quantity });
    }
    // reduce the number from weapons quantity
    const weapon = await find_weapon_by_id(weapon_id);
    await db
      .update(weapons)
      .set({
        quantity: weapon[0].quantity - quantity,
      })
      .where(eq(weapons.weapon_id, weapon_id));
    return;
  } catch (err) {
    throw err;
  }
}

export async function user_inventory(user_id: string) {
  try {
    return await db
      .select()
      .from(inventory)
      .innerJoin(weapons, eq(inventory.weapon_id, weapons.weapon_id))
      .innerJoin(weapon_types, eq(weapon_types.wtype_id, weapons.wtype_id_fk))
      .where(eq(inventory.user_id, user_id));
  } catch (err) {
    throw err;
  }
}

// export async function user_relation_inventory(user_id: string) {
//   try {
//     return await db.query.inventory.findMany({
//       with: {
//         weapon: true,
//         user: true,
//       },
//       //   where: eq(inventory.user_id, user_id),
//     });
//   } catch (err) {
//     throw err;
//   }
// }
