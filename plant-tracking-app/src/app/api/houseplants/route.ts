import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME || "leafmatrix");

    const houseplants = await db.collection("houseplants").find({}).toArray();
    return NextResponse.json(houseplants);
  } catch (e) {
    console.error("Error fetching plants:", e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME || "leafmatrix");
    const newPlant = await request.json();

    const result = await db.collection("houseplants").insertOne(newPlant);
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    console.error("Error inserting new plant:", e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
