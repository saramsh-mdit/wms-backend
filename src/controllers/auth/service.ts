import { eq } from "drizzle-orm";
import { db } from "../../db/database";
import { admin, users } from "../../db/schema/schema";
import { hash_password } from "../../utils/password_hashing";

// register user
export async function user_register(
  name: string,
  email: string,
  plain_password: string
) {
  try {
    return await db?.insert(users).values({
      name: name,
      email: email,
      // hashing the password before saving it
      password: await hash_password(plain_password),
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// get user by their user_id
export async function find_user_by_email(email: string) {
  try {
    return await db.select().from(users).where(eq(users.email, email));
  } catch (error) {
    throw error;
  }
}

// delete user account
export async function user_delete(user_id: string) {
  try {
    return await db.delete(users).where(eq(users.user_id, user_id));
  } catch (err) {
    throw err;
  }
}

// ------------------------------------------------->
// admin routes

// register admin
export async function admin_register(
  name: string,
  email: string,
  plain_password: string
) {
  try {
    return await db?.insert(admin).values({
      name: name,
      email: email,
      // hashing the password before saving it
      password: await hash_password(plain_password),
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// get admin by their admin_id
export async function find_admin_by_email(email: string) {
  try {
    return await db.select().from(admin).where(eq(admin.email, email));
  } catch (error) {
    throw error;
  }
}

// get admin by their admin_id
export async function find_admin_by_id(id: string) {
  try {
    return await db.select().from(admin).where(eq(admin.admin_id, id));
  } catch (error) {
    throw error;
  }
}

// get user
export async function find_user_by_id(id: string) {
  try {
    return await db.select().from(users).where(eq(users.user_id, id));
  } catch (error) {
    throw error;
  }
}
