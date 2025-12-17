import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import type { IronSession } from "iron-session";

type SessionData = {
  user?: any;
};

export async function POST() {
  try {
    // ✅ Properly typed session
    const session = (await getSession()) as IronSession<SessionData>;

    if (!session) {
      return NextResponse.json(
        { error: "Session not initialized" },
        { status: 500 }
      );
    }

    // ✅ Clear user
    session.user = undefined;

    // ✅ TS now knows save() exists
    await session.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
