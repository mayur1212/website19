import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    const language = session.language || "en";
    return NextResponse.json({ language });
  } catch (error) {
    console.error("Error getting language from session:", error);
    return NextResponse.json({ language: "en" }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { language } = await request.json();
    
    if (!language || typeof language !== "string") {
      return NextResponse.json(
        { error: "Invalid language" },
        { status: 400 }
      );
    }

    const session = await getSession();
    session.language = language;
    await session.save();

    return NextResponse.json({ success: true, language });
  } catch (error) {
    console.error("Error setting language in session:", error);
    return NextResponse.json(
      { error: "Failed to set language" },
      { status: 500 }
    );
  }
}

