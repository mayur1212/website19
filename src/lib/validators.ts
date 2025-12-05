// src/lib/validators.ts

import type { User } from "./session";

export function isValidUser(user: User | null): user is User {
  return (
    !!user &&
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string"
  );
}
