import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { UserActivity, UserTotal } from "@/app/models/UserActivity";

export async function POST(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const { email, week, badges, plants, streak } = await req.json();

    const userActivityCollection =
      db.collection<UserActivity>("userActivities");
    const userTotalCollection = db.collection<UserTotal>("userTotals");

    const activity = await userActivityCollection.findOneAndUpdate(
      { email, week: new Date(week) },
      { $set: { badges, plants, streak } },
      { upsert: true, returnDocument: "after" }
    );

    // Update lifetime totals
    await userTotalCollection.updateOne(
      { email },
      {
        $inc: { totalBadges: badges, totalPlants: plants },
        $max: { maxStreak: streak },
      },
      { upsert: true }
    );

    if (activity.value != null) {
      return NextResponse.json(activity.value);
    } else {
      return NextResponse.json(
        { error: "Error updating user activity" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating user activity:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!email || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const userActivityCollection =
      db.collection<UserActivity>("userActivities");
    const userTotalCollection = db.collection<UserTotal>("userTotals");

    const [activities, totals] = await Promise.all([
      userActivityCollection
        .find({
          email,
          week: { $gte: new Date(startDate), $lte: new Date(endDate) },
        })
        .sort({ week: 1 })
        .toArray(),
      userTotalCollection.findOne({ email }),
    ]);

    return NextResponse.json({ activities, totals });
  } catch (error) {
    console.error("Error fetching user activities:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
