import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { MongoClient, Db } from "mongodb";

const DB_NAME = process.env.DB_NAME || "leafmatrix";
const COLLECTION_NAME = "users";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.pathname.split("/").pop();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(DB_NAME);
    const user = await db.collection(COLLECTION_NAME).findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (e) {
    console.error("Error fetching user:", e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.pathname.split("/").pop();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION_NAME).deleteOne({ email });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (e) {
    console.error("Error deleting user:", e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
