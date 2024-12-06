import { NextResponse } from "next/server";
import badges from "@/lib/data/badges";

export async function GET() {
  try {
    return NextResponse.json({ badges });
  } catch (error) {
    console.error("Error fetching badges:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
