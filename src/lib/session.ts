// src/lib/session.ts

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

export type Session = {
  user: User | null;
  language?: string;
  region?: Region;
};

/* ---------------- SESSION ---------------- */

// abhi ke liye simple dummy session
// baad me isse next-auth ya apne backend se connect kar sakte ho
export async function getSession(): Promise<Session | null> {
  // real app me yahan se actual session mila karega
  return null;
}
