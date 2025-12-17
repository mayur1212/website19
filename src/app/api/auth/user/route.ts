import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { validatePartialUser } from "@/lib/validators";

type AppSession = {
  user?: Record<string, any>;
  save?: () => Promise<void>;
};

/* ================= GET USER ================= */
export async function GET() {
  try {
    const session = (await getSession()) as AppSession | null;

    if (!session || !session.user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: session.user });
  } catch (error) {
    console.error("Error getting user from session:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}

/* ================= UPDATE USER ================= */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { user: userUpdateData } = body;

    if (!userUpdateData) {
      return NextResponse.json(
        { error: "User data is required" },
        { status: 400 }
      );
    }

    const session = (await getSession()) as AppSession | null;

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const validationResult = validatePartialUser(userUpdateData);

    // ❌ validator failed
    if (validationResult === false) {
      return NextResponse.json(
        { error: "Invalid user data" },
        { status: 400 }
      );
    }

    // ✅ TYPE GUARD — THIS IS THE KEY FIX
    if (typeof validationResult !== "object" || validationResult === null) {
      return NextResponse.json(
        { error: "Invalid user data" },
        { status: 400 }
      );
    }

    // ✅ Now TypeScript KNOWS this is an object
        session.user = {
          ...session.user,
          ...(validationResult as Record<string, any>),
        };

    if (typeof session.save === "function") {
      await session.save();
    }

    return NextResponse.json({
      success: true,
      user: session.user,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to update user";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
