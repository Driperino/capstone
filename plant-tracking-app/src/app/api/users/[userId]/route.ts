import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { UserActivity, UserTotal } from "@/app/models/UserActivity";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const { _id, week, badges, plants, streak } = await req.json();

    if (!_id) {
      return NextResponse.json(
        { error: "Missing required parameter: _id" },
        { status: 400 }
      );
    }

    const objectId = new ObjectId(_id);

    const userActivityCollection =
      db.collection<UserActivity>("userActivities");
    const userTotalCollection = db.collection<UserTotal>("userTotals");

    const activity = await userActivityCollection.findOneAndUpdate(
      { _id: objectId, week: new Date(week) },
      { $set: { badges, plants, streak } },
      { upsert: true, returnDocument: "after" }
    );

    // Update lifetime totals
    await userTotalCollection.updateOne(
      { _id: objectId },
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
    const userId = searchParams.get("userId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Validate parameters
    if (!userId || !startDate || !endDate || !ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Missing or invalid required parameters" },
        { status: 400 }
      );
    }

    const objectId = new ObjectId(userId);

    const userActivityCollection =
      db.collection<UserActivity>("userActivities");
    const userTotalCollection = db.collection<UserTotal>("userTotals");

    // Fetch activities and totals concurrently
    const [activities, totals] = await Promise.all([
      userActivityCollection
        .find({
          userId: objectId,
          week: { $gte: new Date(startDate), $lte: new Date(endDate) },
        })
        .sort({ week: 1 })
        .toArray(),
      userTotalCollection.findOne({ userId: objectId }),
    ]);
    // Return the results
    return NextResponse.json({ activities, totals });
  } catch (error) {
    console.error("Error fetching user activities:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
