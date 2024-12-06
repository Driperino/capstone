import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { MongoClient, Db } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const DB_NAME = process.env.DB_NAME || "leafmatrix";
const COLLECTION_NAME = "users";

export async function PUT(request: NextRequest) {
  try {
    console.log("API Endpoint /api/users/setup hit"); // Debug Log
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(DB_NAME);
    const { email, timeZone, hardinessZone, preferredTheme } =
      await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    console.log(`Updating user with email: ${email}`); // Debug Log

    const setupCompleted = Boolean(timeZone && hardinessZone);

    const result = await db.collection(COLLECTION_NAME).updateOne(
      { email },
      {
        $set: {
          timeZone,
          hardinessZone,
          preferredTheme,
          "setup.setupCompleted": setupCompleted,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User setup updated successfully" });
  } catch (e) {
    console.error("Error updating user setup:", e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
