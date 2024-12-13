import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { badgeIds } = req.query;

    if (!badgeIds || !Array.isArray(badgeIds)) {
      return res.status(400).json({ error: "Invalid badge IDs" });
    }

    try {
      const { db } = await connectToDatabase();
      const badges = await db
        .collection("badges")
        .find({ id: { $in: badgeIds } })
        .toArray();

      res.status(200).json(badges);
    } catch (error) {
      console.error("Error fetching badge details:", error);
      res.status(500).json({ error: "Failed to fetch badge details" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
