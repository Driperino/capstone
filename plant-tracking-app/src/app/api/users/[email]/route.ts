import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { MongoClient, Db } from "mongodb";

const DB_NAME = process.env.DB_NAME || "leafmatrix";
const COLLECTION_NAME = "users";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const { email } = params;
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(DB_NAME);
    const user = await db.collection(COLLECTION_NAME).findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("User found:", user); //TODO: Remove this line
    return NextResponse.json(user);
  } catch (e) {
    console.error("Error fetching user:", e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
