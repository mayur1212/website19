// src/lib/session.ts

export type User = {
  id: string;
  name: string;
  email: string;
};

// abhi ke liye simple dummy session
// baad me isse next-auth ya apne backend se connect kar sakte ho
export async function getSession(): Promise<{ user: User } | null> {
  // real app me yahan se actual session mila karega
  return null;
}
