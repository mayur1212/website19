import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { validateUser } from "@/lib/validators";
import type { IronSession } from "iron-session";

/* =========================
   Session typing
========================= */
type SessionUser = {
  id: string;
  name: string;
  email: string;
};

type SessionData = {
  user?: SessionUser;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user: userData } = body;

    if (!userData || typeof userData !== "object") {
      return NextResponse.json(
        { error: "User data is required" },
        { status: 400 }
      );
    }

    // validate user payload
    const isValid = validateUser(userData);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid user data" },
        { status: 400 }
      );
    }

    // get session
    const session = (await getSession()) as IronSession<SessionData> | null;

    if (!session) {
      return NextResponse.json(
        { error: "Session could not be initialized" },
        { status: 500 }
      );
    }

    // ✅ DEFINE USER PROPERLY (this was missing)
    const user: SessionUser = {
      id: String(userData.id),
      name: String(userData.name),
      email: String(userData.email),
    };

    session.user = user;

    if (typeof session.save === "function") {
      await session.save();
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to login",
      },
      { status: 500 }
    );
  }
}
