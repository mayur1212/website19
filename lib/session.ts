import { getIronSession, IronSessionData } from "iron-session";
import { cookies } from "next/headers";

export interface RegionData {
  country?: string;
  city?: string;
  cinema?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: any; // Allow additional user properties
}

export interface SessionData extends IronSessionData {
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

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

