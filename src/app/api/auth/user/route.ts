import { NextRequest, NextResponse } from "next/server";
import { getSession, User } from "@/lib/session";

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
    const { user } = await request.json();
    
    if (!user || !user.id || !user.email) {
      return NextResponse.json(
        { error: "Invalid user data. id and email are required." },
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

    session.user = { ...session.user, ...user } as User;
    await session.save();

    return NextResponse.json({ success: true, user: session.user });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

