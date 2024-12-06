import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const DB_NAME = process.env.DB_NAME || "leafmatrix";
const COLLECTION_NAME = process.env.COLLECTION_NAME || "houseplants";

export async function GET(request: NextRequest) {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(DB_NAME);

    // Extract plantId from the request URL
    const plantId = request.nextUrl.pathname.split("/").pop();

    if (!plantId || !ObjectId.isValid(plantId)) {
      return NextResponse.json(
        { message: "Invalid Plant ID" },
        { status: 400 }
      );
    }

    // Query for the specific plant by its ID
    const plant = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(plantId) });

    if (!plant) {
      return NextResponse.json({ message: "Plant not found" }, { status: 404 });
    }

    return NextResponse.json(plant);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
