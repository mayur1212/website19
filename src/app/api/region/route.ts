import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

type RegionData = {
  country?: string | undefined;
  city?: string | undefined;
  cinema?: string | undefined;
};

export async function GET() {
  try {
    const session = await getSession();
    const region: RegionData = (session as any)?.region ?? {
      country: undefined,
      city: undefined,
      cinema: undefined,
    };
    return NextResponse.json({ region });
  } catch (error) {
    console.error("Error getting region from session:", error);
    return NextResponse.json(
      {
        region: {
          country: undefined,
          city: undefined,
          cinema: undefined,
        },
      },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { region } = await request.json();
    
    if (!region || typeof region !== "object") {
      return NextResponse.json(
        { error: "Invalid region data" },
        { status: 400 }
      );
    }

    const session = await getSession() as any;
    if (!session) {
      return NextResponse.json(
        { error: "No session" },
        { status: 401 }
      );
    }

    session.region = {
      country: region.country,
      city: region.city,
      cinema: region.cinema,
    };
    await session.save();

    return NextResponse.json({ success: true, region: session.region });
  } catch (error) {
    console.error("Error setting region in session:", error);
    return NextResponse.json(
      { error: "Failed to set region" },
      { status: 500 }
    );
  }
}

