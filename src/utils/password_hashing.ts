import argon2 from "argon2";

export async function hash_password(password: string) {
  try {
    return await argon2.hash(password);
  } catch (err) {
    throw err;
  }
}

export async function verify_password(hash: string, plain_password: string) {
  try {
    return await argon2.verify(hash, plain_password);
  } catch (err) {
    throw err;
  }
}
