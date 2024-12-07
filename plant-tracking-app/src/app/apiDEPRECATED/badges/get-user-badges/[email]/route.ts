import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import badges from "@/lib/data/badges";

const DB_NAME = process.env.DB_NAME || "leafmatrix";
const COLLECTION_NAME = "users";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const user = await db.collection(COLLECTION_NAME).findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const earnedBadges = user.earnedBadges?.map((badgeId: string) =>
      badges.find((b) => b.id === badgeId)
    );
    return NextResponse.json({ earnedBadges });
  } catch (error) {
    console.error("Error fetching user badges:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
