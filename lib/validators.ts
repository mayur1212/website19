import { User } from "./session";

/**
 * Type guard to check if an object is a valid User
 */
export function isValidUser(obj: unknown): obj is User {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  const user = obj as Record<string, unknown>;

  return (
    typeof user.id === "string" &&
    user.id.length > 0 &&
    typeof user.email === "string" &&
    user.email.length > 0
  );
}

/**
 * Validates and creates a User object from unknown data
 * @throws Error if the data is invalid
 */
export function validateUser(data: unknown): User {
  if (!isValidUser(data)) {
    throw new Error("Invalid user data: id and email are required");
  }

  // Return a properly typed User object with only valid fields
  const user: User = {
    id: data.id,
    email: data.email,
  };

  // Add optional fields if they exist and are valid
  if (data.name && typeof data.name === "string") {
    user.name = data.name;
  }
  if (data.phone && typeof data.phone === "string") {
    user.phone = data.phone;
  }
  if (data.avatar && typeof data.avatar === "string") {
    user.avatar = data.avatar;
  }
  if (data.role && typeof data.role === "string") {
    user.role = data.role;
  }
  if (data.createdAt && typeof data.createdAt === "string") {
    user.createdAt = data.createdAt;
  }
  if (data.updatedAt && typeof data.updatedAt === "string") {
    user.updatedAt = data.updatedAt;
  }

  return user;
}

/**
 * Validates partial user data for updates
 */
export function validatePartialUser(data: unknown): Partial<User> {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid user data");
  }

  const userData = data as Record<string, unknown>;
  const partialUser: Partial<User> = {};

  if (userData.id !== undefined) {
    if (typeof userData.id !== "string" || userData.id.length === 0) {
      throw new Error("Invalid user id");
    }
    partialUser.id = userData.id;
  }

  if (userData.email !== undefined) {
    if (typeof userData.email !== "string" || userData.email.length === 0) {
      throw new Error("Invalid user email");
    }
    partialUser.email = userData.email;
  }

  if (userData.name !== undefined && typeof userData.name === "string") {
    partialUser.name = userData.name;
  }
  if (userData.phone !== undefined && typeof userData.phone === "string") {
    partialUser.phone = userData.phone;
  }
  if (userData.avatar !== undefined && typeof userData.avatar === "string") {
    partialUser.avatar = userData.avatar;
  }
  if (userData.role !== undefined && typeof userData.role === "string") {
    partialUser.role = userData.role;
  }
  if (userData.createdAt !== undefined && typeof userData.createdAt === "string") {
    partialUser.createdAt = userData.createdAt;
  }
  if (userData.updatedAt !== undefined && typeof userData.updatedAt === "string") {
    partialUser.updatedAt = userData.updatedAt;
  }

  return partialUser;
}

