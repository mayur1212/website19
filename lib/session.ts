import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";

export interface RegionData {
  country?: string;
  city?: string;
  cinema?: string;
}

/**
 * Base user interface with required and common optional fields
 * Extend this interface if you need additional user properties
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Session data structure stored in Iron Session
 * This interface defines all possible session properties
 */
export interface SessionData {
  language?: string;
  region?: RegionData;
  user?: User;
}

export const sessionOptions = {
  password: process.env.SESSION_SECRET || "your-secret-key-change-this-in-production-min-32-chars",
  cookieName: "hayya-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

