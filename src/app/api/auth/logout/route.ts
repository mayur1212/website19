import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST() {
  try {
    const session = await getSession();

    if (session && typeof session.destroy === "function") {
      session.destroy();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
