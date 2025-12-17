import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { validateUser } from "@/lib/validators";
import type { IronSession } from "iron-session";

/* =========================
   Session typing
========================= */
type SessionUser = Record<string, unknown>;

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

    // ✅ validateUser returns boolean
    const isValid = validateUser(userData);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid user data" },
        { status: 400 }
      );
    }

    const session = (await getSession()) as IronSession<SessionData>;

    if (!session) {
      return NextResponse.json(
        { error: "Session could not be initialized" },
        { status: 500 }
      );
    }

    // ✅ userData is already an object → safe
    session.user = userData as SessionUser;

    await session.save();

    return NextResponse.json({
      success: true,
      user: session.user,
    });
  } catch (error) {
    console.error("Error logging in:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to login",
      },
      { status: 500 }
    );
  }
}
