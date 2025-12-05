import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { validatePartialUser } from "@/lib/validators";

export async function GET() {
  try {
    const session = await getSession();
    const user = session.user || null;
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error getting user from session:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}

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

    const session = await getSession();
    
    if (!session.user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Validate and merge user data
    const partialUser = validatePartialUser(userUpdateData);
    session.user = { ...session.user, ...partialUser };
    await session.save();

    return NextResponse.json({ success: true, user: session.user });
  } catch (error) {
    console.error("Error updating user:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update user";
    return NextResponse.json(
      { error: errorMessage },
      { status: error instanceof Error && errorMessage.includes("Invalid") ? 400 : 500 }
    );
  }
}

