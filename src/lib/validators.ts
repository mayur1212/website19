// src/lib/validators.ts

import type { User } from "./session";

/**
 * Type guard to validate a full User object
 */
export function isValidUser(data: unknown): data is User {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const user = data as Record<string, unknown>;

  return (
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string"
  );
}

/* ---------- Compatibility exports ---------- */

export { isValidUser as validateUser };

/**
 * Partial user validator (safe)
 */
export function validatePartialUser(data: unknown): data is Partial<User> {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const user = data as Record<string, unknown>;

  if ("id" in user && typeof user.id !== "string") return false;
  if ("name" in user && typeof user.name !== "string") return false;
  if ("email" in user && typeof user.email !== "string") return false;

  return true;
}
