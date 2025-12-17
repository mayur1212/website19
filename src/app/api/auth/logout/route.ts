import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ success: true });
    }

    // ✅ CAST (same as login)
    const sess = session as any;

    sess.user = undefined;

    if (typeof sess.save === "function") {
      await sess.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
