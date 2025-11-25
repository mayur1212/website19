import { NextRequest, NextResponse } from "next/server";
import { getSession, User } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json();
    
    if (!user || !user.id || !user.email) {
      return NextResponse.json(
        { error: "Invalid user data. id and email are required." },
        { status: 400 }
      );
    }

    const session = await getSession();
    session.user = user as User;
    await session.save();

    return NextResponse.json({ success: true, user: session.user });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    );
  }
}

