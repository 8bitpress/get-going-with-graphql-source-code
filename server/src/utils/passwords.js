import { promisify } from "util";
import { randomBytes, scrypt, timingSafeEqual } from "crypto";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt, 64);
  return salt + ":" + derivedKey.toString("hex");
}

export async function verifyPassword(password, hash) {
  const [salt, key] = hash.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = await scryptAsync(password, salt, 64);
  return timingSafeEqual(keyBuffer, derivedKey);
}
