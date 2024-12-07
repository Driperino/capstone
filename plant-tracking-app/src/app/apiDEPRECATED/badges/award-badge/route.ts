import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import badges from "@/lib/data/badges";
import { ObjectId } from "mongodb";

const DB_NAME = process.env.DB_NAME || "leafmatrix";
const COLLECTION_NAME = "users";

export async function POST(req: NextRequest) {
  const { userId, badgeId } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const user = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(userId) });
    const badge = badges.find((b) => b.id === badgeId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!badge) {
      return NextResponse.json({ error: "Badge not found" }, { status: 404 });
    }

    if (!user.earnedBadges || !user.earnedBadges.includes(badgeId)) {
      await db
        .collection(COLLECTION_NAME)
        .updateOne(
          { _id: new ObjectId(userId) },
          { $push: { earnedBadges: badgeId } }
        );
      return NextResponse.json({
        message: `Badge '${badge.name}' awarded to user '${user.name}'!`,
      });
    } else {
      return NextResponse.json(
        { error: "User has already earned this badge" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error awarding badge:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
