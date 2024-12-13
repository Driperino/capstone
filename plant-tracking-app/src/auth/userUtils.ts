import clientPromise from "@/lib/mongodb";
import { MongoClient, Db, ObjectId } from "mongodb";

// Fetch a user by _id
export const getUserById = async (id: string) => {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "leafmatrix");
  return await db.collection("users").findOne({ _id: new ObjectId(id) });
};

// Fetch a user by email (still useful for login scenarios)
export const getUserByEmail = async (email: string) => {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "leafmatrix");
  return await db.collection("users").findOne({ email });
};

// Create a new user
export const createUser = async (user: {
  name?: string;
  email?: string;
  image?: string;
}) => {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "leafmatrix");

  const result = await db.collection("users").insertOne({
    name: user.name,
    email: user.email,
    image: user.image,
    createdAt: new Date(),
    setup: { setupCompleted: false },
    earnedBadges: [],
    uploadedPlants: 0,
    streakDays: 0,
  });

  // Return the newly created user ID
  return result.insertedId;
};

// Update a user by _id
export const updateUserById = async (id: string, updates: any) => {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "leafmatrix");

  return await db.collection("users").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: updates,
    }
  );
};

// Update a user by email (useful for legacy cases, but not ideal)
export const updateUserByEmail = async (email: string, updates: any) => {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "leafmatrix");

  return await db.collection("users").updateOne(
    { email },
    {
      $set: updates,
    }
  );
};
