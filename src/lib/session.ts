// src/lib/session.ts

import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";

/* ---------------- TYPES ---------------- */

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Region = {
  country?: string;
  city?: string;
  cinema?: string;
};

export type SessionData = {
  user?: User;
  language?: string;
  region?: Region;
};

/* ---------------- SESSION OPTIONS ---------------- */

const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "mayur-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

/* ---------------- GET SESSION ---------------- */

// ✅ MUST be async
export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies(); // ✅ FIX
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
