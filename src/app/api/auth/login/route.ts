import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { validateUser } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user: userData } = body;

    if (!userData) {
      return NextResponse.json(
        { error: "User data is required" },
        { status: 400 }
      );
    }

    // Validate and create properly typed User object
    const user = validateUser(userData);

    const session = await getSession();

    // 🔒 TypeScript + runtime safety: session null असेल तर handle कर
    if (!session) {
      console.error("Error logging in: session not initialized");
      return NextResponse.json(
        { error: "Session could not be initialized" },
        { status: 500 }
      );
    }

    // इथून पुढे session non-null आहे, त्यामुळे cast करून user ठेव
    (session as any).user = user;
    await session.save();

    return NextResponse.json({ success: true, user: (session as any).user });
  } catch (error) {
    console.error("Error logging in:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to login";

    return NextResponse.json(
      { error: errorMessage },
      {
        status:
          error instanceof Error && errorMessage.includes("Invalid")
            ? 400
            : 500,
      }
    );
  }
}
