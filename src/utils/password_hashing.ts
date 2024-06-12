import argon2 from "argon2";

export async function hash_password(password: string) {
  try {
    return await argon2.hash(password);
  } catch (err) {
    throw err;
  }
}

export async function verify_password(password: string, hash: string) {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    throw err;
  }
}
