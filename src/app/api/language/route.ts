// app/api/language/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

type Language = "en" | "ar";

export async function GET() {
  try {
    const session = await getSession();
    const sess = session as any;

    // default "en" if not set
    const language = (sess.language as Language) || "en";

    return NextResponse.json({ language }, { status: 200 });
  } catch (error) {
    console.error("Error getting language from session:", error);
    // safe fallback
    return NextResponse.json({ language: "en" }, { status: 200 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const language = body.language as Language | undefined;

    // validate: only "en" or "ar" allowed
    if (!language || (language !== "en" && language !== "ar")) {
      return NextResponse.json(
        { error: "Invalid language. Allowed values: 'en' or 'ar'." },
        { status: 400 }
      );
    }

    const session = await getSession();
    const sess = session as any;
    sess.language = language;
    if (typeof sess.save === "function") {
      await sess.save();
    }

    return NextResponse.json({ success: true, language }, { status: 200 });
  } catch (error) {
    console.error("Error setting language in session:", error);
    return NextResponse.json(
      { error: "Failed to set language" },
      { status: 500 }
    );
  }
}

