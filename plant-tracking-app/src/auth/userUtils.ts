import clientPromise from "@/lib/mongodb";
import { MongoClient, Db } from "mongodb";

export const getUserByEmail = async (email: string) => {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "leafmatrix");
  return await db.collection("users").findOne({ email });
};

export const createUser = async (user: {
  name?: string;
  email?: string;
  image?: string;
}) => {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "leafmatrix");

  await db.collection("users").insertOne({
    name: user.name,
    email: user.email,
    image: user.image,
    createdAt: new Date(),
    setup: { setupCompleted: false },
    earnedBadges: [],
    uploadedPlants: 0,
    streakDays: 0,
  });
};

export const updateUser = async (email: string, updates: any) => {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "leafmatrix");

  await db.collection("users").updateOne(
    { email },
    {
      $set: updates,
    }
  );
};
